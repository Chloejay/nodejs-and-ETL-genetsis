'use strict'
const axios = require('axios')
const config = require('../config')

const postTo = async function (resource, obj) {
  return await axios({
      method: 'post',
      url: config.url + resource,
      data: obj
  });
}

const putTo = async function (resource, obj) {
  return await axios({
      method: 'put',
      url: config.url + resource,
      data: obj
  });
}

module.exports = {
  postTo: postTo,
  putTo: putTo,
}
