import { SafeAny } from '/@/utils/type';
import { get } from '/@/http'

export function getIconList(params: SafeAny): Promise<SafeAny> {
  return get('/icon/getList', {
    params,
  });
}
