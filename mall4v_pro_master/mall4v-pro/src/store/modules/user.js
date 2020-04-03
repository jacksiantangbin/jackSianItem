export default {
  namespaced: true,
  state: {
    id: 0,
    name: '',
    tenantId:0,
    storeId:0
  },
  mutations: {
    updateId (state, id) {
      state.id = id
    },
    updateName (state, name) {
      state.name = name
    },
    updateTenantId (state, tenantId) {
      state.tenantId = tenantId
    },
    updateStoreId (state, storeId) {
      state.storeId = storeId
    },
  }
}
