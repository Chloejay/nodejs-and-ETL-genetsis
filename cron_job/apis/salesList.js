const moment = require('moment');
const APIClient = require('../lib/APIClient')
const db = require('../lib/DB')
const config = require('../config')

class SalesList {
  constructor(options) {
    options = options || {}
    this.name = "Sales"
    let playLoad = {}
    let tstamp = moment().unix()
    let currentDay = moment();
    let currentStr = currentDay.format('YYYY-MM-DD')
    let oneMonthAgo = currentDay.subtract(30, 'days').format('YYYY-MM-DD')
    playLoad.method = 'sales.getList'
    playLoad.flag = config.flag
    playLoad.end_time = options.endDate || currentStr
    playLoad.start_time = options.startDate || oneMonthAgo 
    let page = 1;
    for (let i= 1; i < playLoad.options; i++) {
        page = i; 
     }  
    playLoad.page_no = page;  
    playLoad.page_size = 100
    playLoad.timestamp = tstamp
    this.playLoad = playLoad
    console.log(playLoad);  
  } 
  getPayload() {
    return this.playLoad;
  }

  async fetchData() {
    try {
      let apiClient = APIClient.getInstance()
      let x = this.getPayload() 
      let res = await apiClient.getResponse(x);
      console.log(res); 
      this.res = res;
      let data = this.res.response.lists
      let number = this.res.response.count
      Object.values(data).forEach(async(obj) => {
         console.log('obj', obj.sale_no)
        if(obj != undefined) {
          console.log("process",obj)
          let res = await db.putTo(config.shopex.sales, obj)
       }
      })
    } catch (error) {
      console.log("SalesList.fetchData.Err:", error)
    }
  }

  async saveDb() {
    try {
      let data = this.res.response.lists
      let number = this.res.response.count
      Object.values(data).forEach(async(obj) => {
        console.log('obj', obj.sale_no)
        if(obj != undefined) {
          let res = await db.putTo(config.shopex.sales, obj)
        }
      })
    } catch (error) {
      console.log("SalesList.saveDb.Err:", error)
    }
  }
}

module.exports = SalesList; 
