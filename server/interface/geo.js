import Router from 'koa-router'
// import axios from './utils/axios'
import Menus from '../dbs/models/menus'
import Provinces from '../dbs/models/provinces'
import Cities from '../dbs/models/cities'

// const sign = 'abcd'

const router = new Router({
  prefix:'/geo'
})

router.get('/getPosition',async ctx => {
  // const {status,data} = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  const status = 200

  if (status === 200){
    ctx.body = {
      province:'海南省',
      city:'三亚市'
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

// 获取分类数据
router.get('/menus',async ctx => {
  const result = await Menus.findOne()

  ctx.body = {
    menus:result.menu
  }
})

// 获取省份
router.get('/provinces',async ctx => {
  const provinces = await Provinces.find()

  ctx.body = {
    provinces
  }
})

// 根据省份id、获取它下面的所有城市
router.get('/cities/:provinceId',async ctx => {
  const results = await Cities.findOne({
    id:ctx.params.provinceId
  })

  ctx.body = {
    results
  }
})

router.get('/cities',async ctx => {
  const results = await Cities.find()

  let cities = []
  results.forEach(item => {
    cities = cities.concat(item.value)
  })
  ctx.body = {
    cities:cities.map(item => {
      return {
        province:item.province,
        id:item.id,
        name:item.name === '市辖区' ? item.province : item.name
      }
    })
  }
})

router.get('/hotCity',async ctx => {
  const list = [
    '北京市',
    '上海市',
    '广州市',
    '深圳市',
    '天津市',
    '西安市',
    '杭州市',
    '南京市',
    '武汉市',
    '成都市'
  ]

  const results = await Cities.find()
  let hots = []
  results.forEach(item => {
    hots = hots.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)))
  })

  ctx.body  = {
    hots
  }
})

export default router
