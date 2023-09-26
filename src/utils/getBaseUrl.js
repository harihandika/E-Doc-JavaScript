export const getBaseUrl = () => {
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const port = window.location.port;
  const baseUrl = `${protocol}//${hostname}${port ? `:${port}` : ""}`;
  return baseUrl;
};
