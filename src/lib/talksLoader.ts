import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import type { Loader, LoaderContext } from 'astro/loaders';

const REPO = 'chrisdemars/conference-proposals';
const BRANCH = 'master';
const RAW = `https://raw.githubusercontent.com/${REPO}/${BRANCH}`;
const ALLOWLIST = 'src/data/approved-talks.json';

// Folders whose Markdown files are abstracts. Paths are relative to the repo root.
const ABSTRACT_DIRS = ['', 'wkshps'];
// Files in those folders that aren't talk abstracts.
const EXCLUDED_FILES = ['README.md', 'bio.md', 'short-bio.md', 'notes.md'];

export interface ApprovedTalk {
  file: string;
  featured?: boolean;
  topics: string[];
}

interface Allowlist {
  approved: ApprovedTalk[];
  declined: string[];
}

const fileToId = (file: string) =>
  file.replace(/\.md$/, '').replaceAll('/', '-');

// First paragraph as plain text, for cards and meta descriptions. Skips
// sub-headings like "### Abstract" that some files start with.
const toExcerpt = (markdown: string) =>
  (markdown.split(/\n\s*\n/).find((block) => !block.startsWith('#')) ?? '')
    .replace(/^#{1,6}\s+.*$/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Loads talk abstracts from the conference-proposals repo at build time, but
 * only the files Chris approved in src/data/approved-talks.json. Files that
 * are in neither the approved nor the declined list are logged as
 * unreviewed. GitHub being unreachable never fails the build.
 */
export function talksLoader(): Loader {
  return {
    name: 'talks-loader',
    load: async (context) => {
      const allowlistPath = fileURLToPath(
        new URL(ALLOWLIST, context.config.root),
      );
      // Re-run in `astro dev` whenever the allowlist is edited.
      context.watcher?.add(allowlistPath);
      context.watcher?.on('change', (path) => {
        if (path === allowlistPath) loadTalks(context, allowlistPath);
      });
      await loadTalks(context, allowlistPath);
    },
  };
}

async function loadTalks(
  { store, logger, parseData, generateDigest, renderMarkdown }: LoaderContext,
  allowlistPath: string,
) {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
  };
  if (import.meta.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${import.meta.env.GITHUB_TOKEN}`;
  }

  const allowlist: Allowlist = JSON.parse(
    await readFile(allowlistPath, 'utf8'),
  );
  const reviewed = new Set([
    ...allowlist.approved.map(({ file }) => file),
    ...allowlist.declined,
  ]);

  // Report new abstracts so they can be reviewed. Best effort only.
  try {
    const unreviewed: string[] = [];
    for (const dir of ABSTRACT_DIRS) {
      const res = await fetch(
        `https://api.github.com/repos/${REPO}/contents/${dir}?ref=${BRANCH}`,
        { headers },
      );
      if (!res.ok) throw new Error(`GitHub responded with ${res.status}`);
      const files: { path: string; name: string; type: string }[] =
        await res.json();
      unreviewed.push(
        ...files
          .filter(
            ({ name, path, type }) =>
              type === 'file' &&
              name.endsWith('.md') &&
              !EXCLUDED_FILES.includes(name) &&
              !reviewed.has(path),
          )
          .map(({ path }) => path),
      );
    }
    if (unreviewed.length > 0) {
      logger.info(
        `${unreviewed.length} unreviewed talk(s), not published: ${unreviewed.join(', ')}`,
      );
    }
  } catch (err) {
    logger.warn(`Could not list talks in ${REPO}: ${err}`);
  }

  store.clear();

  for (const talk of allowlist.approved) {
    let source: string;
    try {
      const res = await fetch(`${RAW}/${talk.file}`);
      if (!res.ok) throw new Error(`GitHub responded with ${res.status}`);
      source = await res.text();
    } catch (err) {
      logger.warn(`Skipping ${talk.file}: ${err}`);
      continue;
    }

    const match = source.match(/^#{1,6}\s+(.+)$/m);
    if (!match) {
      logger.warn(`Skipping ${talk.file}: no title heading found`);
      continue;
    }

    const id = fileToId(talk.file);
    const body = source.replace(match[0], '').trim();
    const data = await parseData({
      id,
      data: {
        title: match[1].trim(),
        excerpt: toExcerpt(body),
        file: talk.file,
        url: `https://github.com/${REPO}/blob/${BRANCH}/${talk.file}`,
        featured: talk.featured ?? false,
        topics: talk.topics,
      },
    });

    store.set({
      id,
      data,
      body,
      rendered: await renderMarkdown(body),
      digest: generateDigest(source),
    });
  }
}
