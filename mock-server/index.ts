// 设置请求延时时间
import { mock, setup } from 'mockjs';
import { login } from './data/auth/login/post';
import { logout } from './data/auth/logout/post';
import { userInfo } from './data/auth/userInfo/get';
import { getList } from './data/icon/getList/get';
import { navigate } from './data/menu/navigate/get';
import { tableDoDelete } from './data/table/doDelete/post';
import { tableDoEdit } from './data/table/doEdit/post';
import { tableGetList } from './data/table/getList/get';

setup({ timeout: '500 - 1500' })

mock('/auth/login','post', login)
mock('/auth/logout','post', logout)
mock('/auth/userInfo','get', userInfo)
mock('/icon/getList','get', getList)
mock('/menu/navigate','get', navigate)
mock('/table/doDelete','post', tableDoDelete)
mock('/table/doEdit','post', tableDoEdit)
mock('/table/getList','get', tableGetList)
