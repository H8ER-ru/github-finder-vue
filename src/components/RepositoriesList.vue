<template>
  <div class="repository__list">
    <div class="repository__item" v-for="rep in repositoriesSort" :key="rep.id">

      <div class="repository__info">
        <a target="_blank" :href="rep.html_url">{{rep.name}}</a>
        <span>{{ rep.stargazers_count }}⭐ </span>
      </div>
    </div>
  </div>

</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "RepositoriesList",
  computed:{
    ...mapGetters(['getRepositories', 'getCurrentSort', 'getCurrentSortDir', 'getCurrentPage', 'getPageLength']),
    repositoriesSort(){
      return this.getRepositories.sort((a, b) =>{
        let mod = 1
        if(this.getCurrentSortDir === 'desc') mod=-1
        if(a[this.getCurrentSort] < b[this.getCurrentSort]) return -1*mod
        if(a[this.getCurrentSort] > b[this.getCurrentSort]) return mod
        return 0
      }).filter((row,index) => {
        let start = (this.getCurrentPage - 1)*this.getPageLength
        let end = this.getCurrentPage * this.getPageLength
        if(index >= start && index < end) return true
      })
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