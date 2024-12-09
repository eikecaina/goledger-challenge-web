export const removeQueryParamsFromUrl = (url: string) => {
  return url.split('?')[0]
}
