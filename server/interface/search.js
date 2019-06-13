import Router from 'koa-router'
import Pois from '../dbs/models/pois'
import Regions from '../dbs/models/regions'

const router = new Router({
  prefix:'/search'
})

router.get('/top', async ctx => {
  const results = await Pois.find({
    $or : [ //多条件，数组
        {name : {$regex :ctx.query.name}},
        {city:ctx.query.city}
    ]
  })

  ctx.body = {
    results:results.map(item => {
      return {
        name:item.name,
        type:item.type
      }
    })
  }
})

router.get('/hotPlace',async ctx => {
  const results = await Regions.find().limit(8)

  ctx.body = {
    results
  }
})

export default router
