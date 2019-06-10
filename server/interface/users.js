import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'

const router = new Router({prefix:'/users'})

const Store = new Redis().client

// 注册
router.post('/signup',async ctx => {
  const {username,password,email,code} = ctx.request.body

  if (code) {
    const saveCode = await Store.hget(`nodemail:${username}`,'code')
    const saveExpire = await Store.hget(`nodemail:${username}`,'expire')

    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg:'验证码已过期，请重新尝试'
        }

        return false
      }
    } else {
      ctx.body = {
        code:-1,
        msg:'请填写正确的验证码'
      }

      return false
    }
  } else {
    ctx.body = {
      code: -1,
      msg:'请填写验证码'
    }

    return false
  }

  const user = await User.find({username})
  if (user.length) {
    ctx.body = {
      code:-1,
      msg:'已被注册'
    }

    return
  }

  const nuser = await User.create({username,password,email})
  if (nuser){
    const res = await axios.post('/users/signin',{username,password})

    if (res.data && res.data.code === 0){
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user:res.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg:'error'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg:'注册失败'
    }
  }
})

// 登录
router.post('/signin',async (ctx,next) => {
  return Passport.authenticate('local',(err,user,info,status) => {
    if (err) {
      ctx.body = {
        code:-1,
        msg:err
      }
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg:'登录成功',
          user
        }

        return ctx.login(user)
      } else {
        ctx.body = {
          code:1,
          msg:info
        }
      }
    }
  })(ctx,next)
})

router.post('/verify',async (ctx,next) => {
  const username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`,'expire')
  if (saveExpire && new Date().getTime() - saveExpire < 0){
    ctx.body = {
      code:-1,
      msg:'验证请求过去频繁，1分钟内1次'
    }

    return false
  }

  const transporter = nodeMailer.createTransport({
    service: 'qq',
    auth:{
      user:Email.smtp.user,
      pass:Email.smtp.pass
    }
  })

  const ko = {
    code:Email.smtp.code(),
    expire:Email.smtp.expire(),
    email:ctx.request.body.email,
    user:ctx.request.body.username
  }

  const mailOptions = {
    from: `"认证邮件" <{${Email.smtp.user}}>`,
    to:ko.email,
    subject:'《Nuxt美团实战》 注册码',
    html:`您的验证码是 ${ko.code}`
  }

  console.log(mailOptions)

  await transporter.sendMail(mailOptions,(error,info) => {
    if (error) {
      console.log(error)
    } else {
      Store.hmset(`nodemail:${ko.user}`,'code',ko.code,'expire', ko.expire, 'email', ko.email)
    }
  })

  ctx.body = {
    code:0,
    msg:'验证码已发送,请注意查收'
  }
})

router.get('/exit',async (ctx,next) => {
  await ctx.logout()

  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

router.get('/getUser',async ctx => {
  if (ctx.isAuthenticated()){
    const {username,email} = ctx.session.passport.user

    ctx.body = {
      user:username,
      email
    }
  } else {
    ctx.body = {
      user:'',
      email:''
    }
  }
})

export default router
