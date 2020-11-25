import { get, post } from '/@/http';
import { SafeAny } from '/@/utils/type';

export async function login(data: SafeAny): Promise<SafeAny> {
  return post('/auth/login', { data });
}

export async function socialLogin(data: SafeAny): Promise<SafeAny> {
  return post('/auth/socialLogin', { data });
}

export function getUserInfo(): Promise<SafeAny> {
  //此处为了兼容mock.js使用data传递accessToken，如果使用mock可以走headers
  return get('/auth/userInfo');
}

export function logout(token: string): Promise<SafeAny> {
  return post('/auth/logout');
}

export function register(data: SafeAny): Promise<SafeAny> {
  return post('/auth/register', { data });
}
