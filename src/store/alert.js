export default {
  namespaced: true,
  state: {
    messages: []
  },
  mutations: {
    PUSH_MESSAGES(state, payload) {
      state.messages.push(payload)
    }
  },
  actions: {
    pushMessages(context, { showClose, message, type }) {
      context.commit('PUSH_MESSAGES', { showClose, message, type })
    }
  }
}
