const { handleRandomImage } = require('../../utils');
const { mock } = require('mockjs');
const List = [];
const count = 50;
for (let i = 0; i < count; i++) {
  List.push(
    mock({
      uuid: '@uuid',
      id: '@id',
      title: '@title(1, 2)',
      description: '@csentence',
      'status|1': ['published', 'draft', 'deleted'],
      author: '@cname',
      datetime: '@datetime',
      pageViews: '@integer(300, 5000)',
      img: handleRandomImage(228, 228),
      switch: '@boolean',
      percent: '@integer(80,99)',
      'rate|1': [1, 2, 3, 4, 5]
    })
  );
}

module.exports = { tableList: List };
