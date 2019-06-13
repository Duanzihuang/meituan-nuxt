const state = () => ({
  menus:[]
})

const getters = {
  getMenus(state){
    return state.menus
  }
}

const mutations = {
  setMenus(state,menus){
    state.menus = menus
  }
}

const actions = {
  asyncSetMenus({commit},menus){
    commit('setMenus',menus)
  }
}

export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}
