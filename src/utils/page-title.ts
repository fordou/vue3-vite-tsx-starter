import { CONFIG } from '/@/config';

const { title, titleReverse, titleSeparator } = CONFIG;

/**
 * @author DOU
 * @description 设置标题
 * @param pageTitle
 * @returns {string}
 */
export function getPageTitle(pageTitle: string): string {
  let newTitles = [];

  if (pageTitle)
    newTitles.push(pageTitle);

  if (title)
    newTitles.push(title);

  if (titleReverse)
    newTitles = newTitles.reverse();

  return newTitles.join(titleSeparator);
}
