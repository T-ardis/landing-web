const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.tardis-ai.com/';

// NEXT_PUBLIC_APP_URL is set per-environment and may or may not carry a trailing
// slash, so paths must not be concatenated onto it directly.
export function appLink(path: string): string {
  return `${APP_URL.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}
