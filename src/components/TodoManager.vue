<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Todo Manager</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Updated At</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="todo in todos" :key="todo.id">
              <td>{{ todo.id }}</td>
              <td>{{ todo.title }}</td>
              <td>{{ todo.updatedAt }}</td>
              <td class="text-right">
                <a href="#" v-if="isDirector" @click.prevent="populateTodoToEdit(todo)">Edit</a> -
                <a href="#" v-if="isDirector" @click.prevent="deleteTodo(todo.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3" v-if="isDirector">
        <b-card :title="(model.id ? 'Edit Todo ID#' + model.id : 'New Todo')">
          <form @submit.prevent="saveTodo">
            <b-form-group label="Title">
              <b-form-input type="text" v-model="model.title"></b-form-input>
            </b-form-group>
            <b-form-group label="Body">
              <b-form-textarea rows="4" v-model="model.body"></b-form-textarea>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Todo</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      loading: false,
      todos: [],
      model: {},
      isDirector: true

    }
  },
  async created () {
    console.log('created')
    this.refreshTodos()
  },
  methods: {
    async refreshTodos () {
      let user = this.$auth.user
      console.log('role:' + user['https://quickstart/jwt/claims']['roles'])
      this.isDirector = ('' + user['https://quickstart/jwt/claims']['roles']) === 'Director'
      this.loading = true
      this.todos = await api.getTodos()
      this.loading = false
    },
    async populateTodoToEdit (todo) {
      this.model = Object.assign({}, todo)
    },
    async saveTodo () {
      console.log(`saveTodo ${this.model.title} ${this.model.body}`)
      if (this.model.id) {
        await api.updateTodo(this.model.id, this.model)
      } else {
        await api.createTodo(this.model)
      }
      this.model = {} // reset form
      await this.refreshTodos()
    },
    async deleteTodo (id) {
      if (confirm('Are you sure you want to delete this todo?')) {
        // if we are editing a todo we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {}
        }
        await api.deleteTodo(id)
        await this.refreshTodos()
      }
    }
  }
}
</script>
