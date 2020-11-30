import { SafeAny } from '/@/utils/type';
import { get } from '/@/http'

export function getIconList(data: SafeAny): Promise<SafeAny> {
  return get('/icon/getList', {
    data,
  });
}
