<template>
  <div class="repository__list">
    <div class="repository__item" v-for="rep in repositoriesList" :key="rep.id">

      <div class="repository__info">
        <a target="_blank" :href="rep.html_url">{{rep.name}}</a>
        <span>{{ rep.stargazers_count }}⭐ </span>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "RepositoriesList",
  props:{
    repositoriesList:{
      type: Array
    }
  }
}
</script>

<style scoped lang="sass">
@import "src/assets/utils/vars"
.repository__info
  display: flex
  align-items: center
  justify-content: space-between
  margin-bottom: 10px
  padding: 10px 0
  border-bottom: 1px solid $light-color

</style>