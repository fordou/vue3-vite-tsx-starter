import { STORE } from '/@/store';
import { SafeAny } from '/@/utils/type';

export function hasRole(value: SafeAny) {
  if (STORE.getters['ACL/admin']) return true;
  if (value instanceof Array && value.length > 0)
    return can({
      roleOrAbility: STORE.getters['ACL/role'], value: {
        role: value,
        mode: 'oneOf',
      }
    });
  let mode = 'oneOf';
  if (Object.prototype.hasOwnProperty.call(value, 'mode')) mode = value['mode'];
  let result = true;
  if (Object.prototype.hasOwnProperty.call(value, 'role'))
    result =
      result && can({
        roleOrAbility: STORE.getters['ACL/role'],
        value: { role: value['role'], mode }
      });
  if (result && Object.prototype.hasOwnProperty.call(value, 'ability'))
    result =
      result &&
      can({
        roleOrAbility: STORE.getters['ACL/ability'], value: {
          role: value['ability'],
          mode,
        }
      });
  return result;
}

interface CanParams {
  roleOrAbility: SafeAny;
  value: { role: any[]; mode: any };
}

export function can({ roleOrAbility, value }: CanParams ) {
  let hasRole = false;
  if (
    Object.prototype.hasOwnProperty.call(value, 'role') &&
    Object.prototype.hasOwnProperty.call(value, 'mode')
  ) {
    const { role, mode } = value;
    if (mode === 'allOf') {
      hasRole = role.every((item) => {
        return roleOrAbility.includes(item);
      });
    }
    if (mode === 'oneOf') {
      hasRole = role.some((item) => {
        return roleOrAbility.includes(item);
      });
    }
    if (mode === 'except') {
      hasRole = !role.some((item) => {
        return roleOrAbility.includes(item);
      });
    }
  }
  return hasRole;
}
