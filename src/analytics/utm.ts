const campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

/** Only public campaign labels may be forwarded to analytics or retained during Topic navigation. */
export function campaignParameters(search: string): URLSearchParams {
  const input = new URLSearchParams(search);
  const output = new URLSearchParams();
  for (const key of campaignKeys) {
    const values = input.getAll(key);
    // Do not silently choose one of conflicting duplicate tags or forward free text.
    if (values.length === 1 && /^[a-z0-9][a-z0-9_-]{0,99}$/i.test(values[0])) output.set(key, values[0]);
  }
  return output;
}

export function analyticsPageLocation(origin: string, pathname: string, search: string): string {
  const campaign = campaignParameters(search).toString();
  return origin + pathname + (campaign ? `?${campaign}` : '');
}
