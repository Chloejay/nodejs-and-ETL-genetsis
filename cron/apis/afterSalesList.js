const moment = require('moment');
const APIClient = require('../lib/APIClient')
const db = require('../lib/DB')
const config = require('../config')

class AfterSalesList {
  constructor(options) {
    options = options || {}
    this.name = "Aftersales"
    let playLoad = {}
    let tstamp = moment().unix()
    let currentDay = moment();
    let currentStr = currentDay.format('YYYY-MM-DD')
    let oneMonthAgo = currentDay.subtract(30, 'days').format('YYYY-MM-DD')
    playLoad.method = 'aftersales.getList'
    playLoad.flag = config.flag
    playLoad.end_time = options.endDate || currentStr
    playLoad.start_time = options.startDate || oneMonthAgo
    playLoad.page_no = options.page || 1
    playLoad.page_size = 100
    playLoad.timestamp = tstamp
    this.playLoad = playLoad
  }

  getPayload() {
    return this.playLoad;
  }

  async fetchData() {
    try {
      let apiClient = APIClient.getInstance()
      let x = this.getPayload()
      let res = await apiClient.getResponse(x);
      this.res = res;
      let data = this.res.response.lists
      let number = this.res.response.count
      Object.values(data).forEach(async(obj) => {
        if(obj != undefined) {
          console.log('AfterSalesList data:',obj)
          let res = await db.putTo(config.shopex.aftersales, obj)
        }
      })
    } catch (error) {
      console.log("AfterSalesList.fetchData.Err:", error)
    }
  }

  async saveDb() {
    try {
      let data = this.res.response.lists
      let number = this.res.response.count
      Object.values(data).forEach(async(obj) => {
        if(obj != undefined) {
          let res = await db.putTo(config.shopex.aftersales, obj)
        }
      })
    } catch (error) {
      console.log("AfterSalesList.saveDb.Err:", error)
    }
  }
}

module.exports = AfterSalesList;
