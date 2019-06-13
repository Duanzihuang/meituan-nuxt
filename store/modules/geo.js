const state = () => ({position:{},hotPlace:[]})

const getters = {
  getCity(state){
    return state.position.city
  },
  getHotPlace(state){
    return state.hotPlace
  }
}

const mutations = {
  setPosition(state,val){
    state.position = val
  },
  setHotPlace(state,val){
    state.hotPlace = val
  }
}

const actions = {
  asyncSetPosition({commit},val){
    commit('setPosition',val)
  },
  asyncSetHotPlace({commit},val){
    commit('setHotPlace',val)
  }
}

export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}
