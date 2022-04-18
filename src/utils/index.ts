export const prettyDate = (seconds: number): string => {
  return new Date(seconds).toLocaleDateString();
};

export const prettyTime = (seconds: number): string => {
  return new Date(seconds).toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' });
};
