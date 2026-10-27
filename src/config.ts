// Site-wide constants. Import from anywhere with `import { SITE } from '../config'`.

export const SITE = {
  name: 'Chris DeMars',
  jobTitle: 'Senior Developer Advocate',
  title: 'Chris DeMars | Senior Developer Advocate',
  description:
    'Chris DeMars is a Senior Developer Advocate and conference speaker based in Metro Detroit, talking software supply chain security, accessibility, and frontend engineering.',
  locale: 'en',
};

export const SOCIALS = {
  github: 'https://github.com/chrisdemars',
  linkedin: 'https://www.linkedin.com/in/chrisdemars/',
  twitter: 'https://twitter.com/saltnburnem',
  sessionize: 'https://sessionize.com/chris-demars',
};

// Used by the Conference Schedule loader (#10).
export const SESSIONIZE_SLUG = 'chris-demars';

// Primary navigation, in display order.
export const NAV_LINKS = [
  { href: '/about', label: 'About Me' },
  { href: '/blog', label: 'Blog' },
  { href: '/resume', label: 'Resume' },
  { href: '/talks', label: 'Conference Talks' },
  { href: '/schedule', label: 'Conference Schedule' },
];

// Topics shown on the home page. Supply chain stays first for SEO (#12).
export const SPEAKING_TOPICS = [
  {
    title: 'Software Supply Chain Security',
    description:
      'SBOMs, dependency trust, install-time malware, and keeping the node_modules iceberg in check.',
  },
  {
    title: 'Web Accessibility',
    description:
      'ARIA in practice, focus management, screen readers, and automated a11y testing in CI.',
  },
  {
    title: 'Frontend & CSS',
    description:
      'Modern CSS, component architecture, and building fast, user-focused interfaces.',
  },
  {
    title: 'Feature Flags & Delivery',
    description:
      'Trunk-based development, A/B testing, and shipping UI safely behind flags.',
  },
  {
    title: 'Paranormal Tech',
    description:
      'Tracking Bigfoot, UFOs, and ghosts in the machine to teach real engineering concepts.',
  },
];
