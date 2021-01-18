<template>
  <div>
    <h2>Todos</h2>
    <ul>


      <button @click="addTodo">点击</button>  {{ usersInfo }}
    </ul>


    <div>
{{ $store.state.list }}
      aa
      {{ $store.state.lists }}
    </div>

  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  computed: 
  mapGetters({
    usersInfo: 'users/get'
  }),
  methods: {
    addTodo () {
        const info = {userId:"111",token:"aaaaaaaaa"}
        this.$store.commit('users/add', info)
    },
  },
  async asyncData(ctx){
    console.log(ctx.store.state.counter,"aaa")
  }
}
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>
