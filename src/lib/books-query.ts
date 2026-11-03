export type BooksSearchParams = Record<string, string | string[] | undefined>;

export function hrefWithoutCategory(params: BooksSearchParams): string {
  const remaining = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (key === "category" || value === undefined) continue;
    for (const item of Array.isArray(value) ? value : [value]) remaining.append(key, item);
  }
  const query = remaining.toString();
  return query ? `/books?${query}` : "/books";
}
