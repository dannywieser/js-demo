
// given a url structure of  http://{domain}/{component}, return the component url segment
export const getComponentHref = () => {
  const parts = window.location.href.split('/');
  return parts[parts.length - 1];
};
