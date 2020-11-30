import { accessTokens, MockResponse } from '../../../utils';

export const login = (req: any) => {
  console.log(req)
  const { username } = JSON.parse(req.body).data || {};

  const accessToken = accessTokens[username];

  console.log(accessToken)
  if (!accessToken) {
    return new MockResponse({
      message: '帐户或密码不正确。',
    });
  } else {
    return new MockResponse({ accessToken });
  }
};
