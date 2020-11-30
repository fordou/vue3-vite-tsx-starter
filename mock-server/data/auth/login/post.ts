import { accessTokens, MockResponse } from '../../../utils';

export const login = (req: any) => {
  const { username } = JSON.parse(req.body).data || {};
  const accessToken = accessTokens[username];
  return !accessToken
    ? new MockResponse({ message: '帐户或密码不正确。' })
    : new MockResponse({ accessToken });
};
