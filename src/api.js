import Vue from 'vue'

export default {
  async execute(method, resource, data) {
    const accessToken = await Vue.prototype.$auth.getTokenSilently()
    console.log(`accessToken ${accessToken}`)
    const client = Vue.prototype.$http.create({
      baseURL: 'http://localhost:8081/',
      json: true
    })

    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(req => {
      return req.data
    })
  },
  getTodos () {
    return this.execute('get', '/todos')
  },
  getTodo (id) {
    return this.execute('get', `/todos/${id}`)
  },
  createTodo (data) {
    return this.execute('post', '/todos', data)
  },
  updateTodo (id, data) {
    return this.execute('put', `/todos/${id}`, data)
  },
  deleteTodo (id) {
    return this.execute('delete', `/todos/${id}`)
  }
}
