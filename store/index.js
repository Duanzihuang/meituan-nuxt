import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import geo from './modules/geo'
import home from './modules/home'
import city from './modules/city'

const store = () => new Vuex.Store({
  modules:{
    geo,
    home,
    city
  },
  actions:{
    async nuxtServerInit({commit},{req,app}){
      const {status,data:{province,city}} = await app.$axios.get('/geo/getPosition')

      commit('geo/setPosition',status === 200 ? {province,city} : {province:'',city:''})

      const {status:status2,data:{menus}} = await app.$axios.get('/geo/menus')
      commit('home/setMenus',status2 === 200 ? menus : [])

      const {status:status3,data:{results}} = await app.$axios.get('/search/hotPlace')
      commit('geo/setHotPlace',status3 === 200 ? results : [])

      const {status:status4,data:{hots}} = await app.$axios.get('/geo/hotCity')
      commit('city/setHotCity',status4 === 200 ? hots:[])
    }
  }
})

export default store
