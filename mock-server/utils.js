const { Random } = require('mockjs');

class MockResponse {
  constructor (obj) {
    Object.assign(this, obj);
  }
}
const accessTokens = {
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
function handleRandomImage(width = 50, height = 50) {
  return `https://picsum.photos/${width}/${height}?random=${Random.guid()}`
}

module.exports = {
  accessTokens,
  MockResponse,
  handleRandomImage
};
