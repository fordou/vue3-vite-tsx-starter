const { MockResponse } = require('../../../utils');

module.exports = (req,res) =>{
  res.status(200).send(new MockResponse())
}
