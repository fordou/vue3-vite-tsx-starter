import { get } from '/@/http'
import { SafeAny } from '/@/utils/type';

export function getRouterList(params: SafeAny = {}): Promise<SafeAny> {
  return get('/menu/navigate', {
    params,
  });
}
