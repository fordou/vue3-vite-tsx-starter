const { accessTokens,MockResponse } = require('../../../utils');

module.exports = (req, res) => {
  const { username } = req.body.data || {};

  const accessToken = accessTokens[username]

  if (!accessToken) {
    return res.status(500).send(new MockResponse({
      message: '帐户或密码不正确。'
    }));
  } else {
    return res.status(200).send(new MockResponse({ accessToken }));
  }
};
