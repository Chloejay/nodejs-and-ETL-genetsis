'use strict';

module.exports = {
  flag: 'prash',
  url: 'http://localhost:3000/api',
  shopex: {
    stock: '/sku-stocks',
    delivery: '/deliveries',
    goods: '/goods',
    iostock: '/io-stocks',
    orders: '/orders',
    pkg: '/pkgs',
    aftersales: '/after-sales',
    sales: '/sales',
  }, 
  directory: {
    delivery: '/Users/pbalan/Documents/genetsis/delivery',
    oms: '/Users/pbalan/Documents/genetsis/oms',
    alipay: '/Users/pbalan/Documents/genetsis/alipay',
  },
  fileApi: {
    poinfosupplement: '/po-supplement-info',
    poinfoproduct: '/po-product-info',
    omsinfotags: '/oms-tag-info',
    omsinfobatch: '/oms-batch-info',
    alipayinfopayment: '/alipay-payment-info',
    alipayinfosales: '/alipay-sales-info',
    tmallmonthlyinfo:'/tmall-monthly-info',
    tmalldailyinfo:'/tmall-daily-info',
    tmallweeklyinfo:'/tmall-weekly-info',
    dfsmasterfile:'dfs-master-files',
    deltastoredailyinfo:'/delta-store-daily-info',
    deltastoreweeklyinfo:'/delta-store-weekly-info',
    deltastoremonthlyinfo:'/delta-store-monthly-info',
    brandingdailyinfo:'/branding-daily-info',
    zuanshidailyinfo:'/zuanshi-daily-info',
    alimamadailyinfo:'/alimama-daily-info',
    subwaydailyinfo:'/subway-daily-info',
    zonedailyinfo:'/zone-daily-info',
    trafficmonthlyinfo:'/traffic-monthly-info',
    trafficdailyinfo:'/traffic-daily-info',
    trafficweeklyinfo:'/traffic-weekly-info',
  },
  UTC_FORMAT: 'YYYY-MM-DD HH:mm:ss UTC+8 ', // the timezone changed to the asia region 
  downloadPath: "/root/Downloads" 
} 