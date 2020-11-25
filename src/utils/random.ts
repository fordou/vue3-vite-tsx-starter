
/**
 * @author DOU
 * @description m到n的随机数
 * @param m
 * @param n
 * @returns {number}
 */
export function random(m: number, n: number): number {
  return Math.floor(Math.random() * (m - n) + n);
}
