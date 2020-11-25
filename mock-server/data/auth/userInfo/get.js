module.exports = (req, res) => {
  const { accessToken } = req.body;
  let roles = ['admin'];
  let ability = ['READ'];
  let username = 'admin';
  if ('admin-accessToken' === accessToken) {
    roles = ['admin'];
    ability = ['READ', 'WRITE', 'DELETE'];
    username = 'admin';
  }
  if ('editor-accessToken' === accessToken) {
    roles = ['editor'];
    ability = ['READ', 'WRITE'];
    username = 'editor';
  }
  if ('test-accessToken' === accessToken) {
    roles = ['admin', 'editor'];
    ability = ['READ'];
    username = 'test';
  }

  res.status(200).send({
    roles,
    ability,
    username,
    'avatar|1': [
      'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
      'https://i.gtimg.cn/club/item/face/img/8/15918_100.gif'
    ]
  });
};
