const { tableList } = require('../data');

module.exports = (req, res) => {
  const { title, current = 1, pageSize = 10 } = req.query;
  let mockList = tableList.filter((item) => {
    return !(title && item.title.indexOf(title) < 0);
  });
  const pageList = mockList.filter(
    (item, index) =>
      index < pageSize * current && index >= pageSize * (current - 1)
  );
  const data = {
    total: mockList.length,
    data: pageList
  };

  res.status(200).send(data);
};
