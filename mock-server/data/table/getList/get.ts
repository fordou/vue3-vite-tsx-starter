import { tableList } from '../data';

export const tableGetList =(req:any, res:any) => {
  const { title, current = 1, pageSize = 10 } = req.query;
  let mockList = tableList.filter((item) => {
    return !(title && item.title.indexOf(title) < 0);
  });
  const pageList = mockList.filter(
    (item, index) =>
      index < pageSize * current && index >= pageSize * (current - 1)
  );
  return {
    total: mockList.length,
    data: pageList
  };
};
