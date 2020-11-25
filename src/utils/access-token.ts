import { CONFIG } from '/@/config';
import cookie from 'js-cookie';

const { storage, tokenTableName } = CONFIG;

export function getAccessToken(): string | null | undefined {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.getItem(tokenTableName);
    } else if ('sessionStorage' === storage) {
      return sessionStorage.getItem(tokenTableName);
    } else if ('cookie' === storage) {
      return cookie.get(tokenTableName);
    } else {
      return localStorage.getItem(tokenTableName);
    }
  } else {
    return localStorage.getItem(tokenTableName);
  }
}

/**
 * @author DOU
 * @description 存储accessToken
 * @param accessToken
 * @returns {void|*}
 */
export function setAccessToken(accessToken: string): void {
  if (storage) {
    if ('localStorage' === storage) {
      localStorage.setItem(tokenTableName, accessToken);
    } else if ('sessionStorage' === storage) {
      sessionStorage.setItem(tokenTableName, accessToken);
    } else if ('cookie' === storage) {
      cookie.set(tokenTableName, accessToken);
    } else {
      localStorage.setItem(tokenTableName, accessToken);
    }
  } else {
    localStorage.setItem(tokenTableName, accessToken);
  }
}

/**
 * @author DOU
 * @description 移除accessToken
 * @returns {void|Promise<void>}
 */
export function removeAccessToken(): void {
  if (storage) {
    if ('localStorage' === storage) {
      localStorage.removeItem(tokenTableName);
    } else if ('sessionStorage' === storage) {
      sessionStorage.clear();
    } else if ('cookie' === storage) {
      cookie.remove(tokenTableName);
    } else {
      localStorage.removeItem(tokenTableName);
    }
  } else {
    localStorage.removeItem(tokenTableName);
  }
}
