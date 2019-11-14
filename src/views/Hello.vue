<template>
  <div class="hero">
    <div>
      <h1 class="display-6" v-if="$auth.user">Hello {{ $auth.user.nickname }}</h1>
      <h1 class="display-6" v-if="!$auth.user">Hello Guest</h1>
      <p class="lead">{{msg}}</p>
    </div>
  </div>
</template>

<style>
  .hero {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .hero .lead {
    font-weight: 200;
    font-size: 1.5rem;
  }
</style>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Sample ToDo app'
    }
  }
}
</script>
