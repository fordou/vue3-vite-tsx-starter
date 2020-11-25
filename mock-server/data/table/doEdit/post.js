const { MockResponse } = require('../../../utils');
module.exports = (req,res)=>{
  return res.status(200).send(new MockResponse())
}
