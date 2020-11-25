
/**
 * @author DOU
 * @description addEventListener
 * @type {function(...[*]=)}
 */
export const on = (() => (
  element: HTMLElement,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false,
) => {
  if (element && event && handler) {
    element.addEventListener(event, handler, useCapture);
  }
})();

/**
 * @author DOU
 * @description removeEventListener
 * @type {function(...[*]=)}
 */
export const off = (() => (
  element: HTMLElement,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false,
) => {
  if (element && event) {
    element.removeEventListener(event, handler, useCapture);
  }
})();
