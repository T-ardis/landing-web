const ORIGINAL = process.env.NEXT_PUBLIC_APP_URL;

async function loadAppLink(value: string | undefined) {
  jest.resetModules();
  if (value === undefined) delete process.env.NEXT_PUBLIC_APP_URL;
  else process.env.NEXT_PUBLIC_APP_URL = value;
  const mod = await import('./app-url');
  return mod.appLink;
}

afterEach(() => {
  if (ORIGINAL === undefined) delete process.env.NEXT_PUBLIC_APP_URL;
  else process.env.NEXT_PUBLIC_APP_URL = ORIGINAL;
});

describe('appLink', () => {
  it('should join a path when the app URL has no trailing slash', async () => {
    const appLink = await loadAppLink('https://app.tardis-ai.com');
    expect(appLink('demo')).toBe('https://app.tardis-ai.com/demo');
  });

  it('should join a path when the app URL has a trailing slash', async () => {
    const appLink = await loadAppLink('https://app.tardis-ai.com/');
    expect(appLink('demo')).toBe('https://app.tardis-ai.com/demo');
  });

  it('should join a path against the built-in fallback', async () => {
    const appLink = await loadAppLink(undefined);
    expect(appLink('demo')).toBe('https://app.tardis-ai.com/demo');
  });

  it('should not double up slashes when the path is already rooted', async () => {
    const appLink = await loadAppLink('https://app.tardis-ai.com/');
    expect(appLink('/demo')).toBe('https://app.tardis-ai.com/demo');
  });

  it('should never emit an origin fused to its path', async () => {
    for (const base of ['https://app.tardis-ai.com', 'https://app.tardis-ai.com/']) {
      const appLink = await loadAppLink(base);
      expect(appLink('demo')).not.toContain('.comdemo');
    }
  });
});
