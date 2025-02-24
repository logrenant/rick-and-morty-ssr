export const updateUrlParams = (
  params: Record<string, string | number | undefined>,
) => {
  const searchParams = new URLSearchParams(window.location.search);

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === "") {
      searchParams.delete(key);
    } else {
      searchParams.set(key, String(value));
    }
  });

  const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
  window.history.replaceState(null, "", newUrl);
};
