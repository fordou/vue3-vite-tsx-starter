export const timer = (ms: number) => new Promise((r) => setTimeout(r, ms));
export const interval = (ms: number, cb: Function): number => {
  return setInterval(cb, ms);
};
