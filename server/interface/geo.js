import Router from 'koa-router'
import axios from './utils/axios'

// const sign = 'abcd'

const router = new Router({
  prefix:'/geo'
})

router.get('/getPosition',async ctx => {
  // const {status,data} = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  const status = 200

  if (status === 200){
    ctx.body = {
      province:'广东省',
      city:'深圳市'
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

export default router
