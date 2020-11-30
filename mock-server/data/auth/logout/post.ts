import { MockResponse } from '../../../utils';

export const logout = (req:any,res:any) =>{
  res.status(200).send(new MockResponse())
}
