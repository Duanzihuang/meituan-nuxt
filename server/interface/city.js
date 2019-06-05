const Router = require('koa-router')

const router = new Router({
  prefix:'/city'
})

router.get('/list',async ctx => {
  ctx.body = ['深圳','东莞']
})

module.exports = router
