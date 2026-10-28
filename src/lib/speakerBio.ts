// Speaker bios live in the conference-proposals repo (bio.md) so there's one
// copy to keep current. They're fetched at build time.

const BIO_URL =
  'https://raw.githubusercontent.com/chrisdemars/conference-proposals/master/bio.md';

export interface SpeakerBios {
  long: string;
  short: string;
}

// bio.md is split into `# Long Bio`, `# Short Bio`, and `# Notes` sections.
function section(markdown: string, heading: string): string | undefined {
  const match = markdown.match(
    new RegExp(
      `^#\\s+${heading}\\s*\\n([\\s\\S]*?)(?=^#\\s|$(?![\\s\\S]))`,
      'm',
    ),
  );
  return match?.[1].trim() || undefined;
}

let cached: Promise<SpeakerBios | undefined> | undefined;

// Resolves to undefined (and logs) if GitHub is unreachable, so a network
// blip hides the bios instead of failing the build.
export function getSpeakerBios(): Promise<SpeakerBios | undefined> {
  cached ??= (async () => {
    try {
      const res = await fetch(BIO_URL);
      if (!res.ok) throw new Error(`GitHub responded with ${res.status}`);
      const markdown = await res.text();
      const long = section(markdown, 'Long Bio');
      const short = section(markdown, 'Short Bio');
      if (!long || !short)
        throw new Error('missing Long Bio or Short Bio section');
      return { long, short };
    } catch (err) {
      console.warn(`[speakerBio] Could not load ${BIO_URL}: ${err}`);
      return undefined;
    }
  })();
  return cached;
}
