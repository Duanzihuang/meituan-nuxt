const state = {
  hotCity:[]
}

const getters = {
  getHotCity(state){
    return state.hotCity
  }
}

const mutations = {
  setHotCity(state,val){
    state.hotCity = val
  }
}

export default {
  namespaced:true,
  state,
  getters,
  mutations
}
