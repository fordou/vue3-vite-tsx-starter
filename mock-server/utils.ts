import { Random } from 'mockjs';

export class MockResponse {
  constructor (obj:any = {}) {
    Object.assign(this, obj);
  }
}
export const accessTokens:any = {
  admin: 'admin-accessToken',
  editor: 'editor-accessToken',
  test: 'test-accessToken',
}

/**
 * @author DOU
 * @description 随机生成图片url。
 * @param width
 * @param height
 * @returns {string}
 */
export function handleRandomImage(width = 50, height = 50) {
  return `https://picsum.photos/${width}/${height}?random=${Random.guid()}`
}

