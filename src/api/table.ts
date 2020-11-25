import { get, post } from '/@/http'
import { SafeAny } from '/@/utils/type';

export function getList(params: SafeAny): Promise<SafeAny> {
  return get('/table/getList', { params });
}

export function doEdit(data: SafeAny): Promise<SafeAny> {
  return post('/table/doEdit', { data });
}

export function doDelete(data: SafeAny): Promise<SafeAny> {
  return post('/table/doDelete', { data });
}
