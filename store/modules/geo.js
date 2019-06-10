const state = () => ({position:{}})

const getters = {
  getCity(state){
    return state.position.city
  }
}

const mutations = {
  setPosition(state,val){
    state.position = val
  }
}

const actions = {
  asyncSetPosition({commit},val){
    commit('setPosition',val)
  }
}

export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}
