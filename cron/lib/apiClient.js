const crypto = require('crypto');
const axios = require('axios')
const qs = require("querystring")

class APIClient {
    constructor() {
        this.URL = "http://eqi.tg.taoex.com/index.php/openapi/rpc/service";
        this.sec = "SXyynIrVSMFWaNenruOZMNNaUUuRyCdX";
    } 
    
    sortObject(o) {
        return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {}); 
    }

    async getResponse(opt) { 
        let body = this.sortObject(opt)
        let str = ""
        for (var prop in body) {
            if (body.hasOwnProperty(prop)) {
                str += prop + body[prop]
            }
        } 
        var md5 = crypto.createHash('md5').update(str).digest("hex");
        let newSec = md5.toUpperCase() + this.sec
        let newmd5 = crypto.createHash('md5').update(newSec).digest("hex");
        opt.sign = newmd5.toUpperCase(); 
        let bodyX = qs.stringify(opt); 
        let res = await axios({
            method: 'post',
            url: this.URL,
            data: bodyX
        });
        
        let data = res.data 
        return data
    };
}; 

class Singleton{
    constructor(){
          if(!Singleton.instance){
              Singleton.instance = new APIClient();
         }
     }

    getInstance(){
          return Singleton.instance;
     }
}

module.exports = new Singleton();
