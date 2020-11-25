import { SafeAny } from '/@/utils/type';

export function urlQueryToObj (url: string): SafeAny {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  const t = decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"')
    .replace(/\+/g, ' ');
  return JSON.parse(`{"${t}"}`);
}
