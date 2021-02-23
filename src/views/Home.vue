<template>
  <div class="wrapper-content wrapper-content--fixed" theme='light'>
    <section>
      <div class="container">
        <Search @searchStart="getRepository" :value="search" placeholder="Type username..." @search="search = $event"/>

        <div class="error" v-if="this.getErrorMessage">
          <p>{{this.getErrorMessage}}</p>
        </div>

        <Profile :user="this.$store.state.user"/>

        <div class="repository__wrapper">

          <div class="sort-btns" v-if="this.$store.state.repositories.length > 0">
            <button class="sort-btns__item " @click="sort('name')" >Sort by Name</button>
            <button class="sort-btns__item " @click="sort('stargazers_count')" >Sort by stars</button>
          </div>

          <RepositoriesList />

        </div>
      </div>
    </section>
    <section class="container">
      <div class="pagination" v-if="this.getRepositories.length > 0">
        <div class="pagination__item" @click="prevPage">🠔</div>
        <div class="pagination__text">{{getCurrentPage}}</div>
        <div class="pagination__item" @click="nextPage">🠖</div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import Search from "@/components/Search";
import Profile from "@/components/Profile";
import RepositoriesList from "@/components/RepositoriesList";
import {mapGetters} from "vuex";

export default {
  components:{
    RepositoriesList,
    Profile,
    Search
  },
  data: () => ({
    search: 'github',
  }),
  methods:{
    sort(e){
      if(e === this.getCurrentSort) {
        this.$store.state.currentSortDir = this.getCurrentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.$store.state.currentSort = e
    },
    getRepository(){
      axios.get(`https://api.github.com/users/${this.search}/repos`)
        .then(res => {
          this.$store.state.page.current = 1
          if(res.data.length === 0){
            this.$store.state.errorMessage = "can't find that user"
            this.$store.state.repositories = []
          }else{
            this.$store.state.repositories = res.data
            this.$store.state.errorMessage = null
          }
        })
        .catch(err => {
          console.log(err)
          this.$store.state.repositories = []
          this.$store.state.errorMessage = "can't find that user"
        })
      axios.get(`https://api.github.com/users/${this.search}`)
          .then(res => {
            console.log(res)
            this.$store.state.user = res.data
          }).catch(err => {
        this.$store.state.user = null
        console.log(err)
      })
    },
    prevPage(){
      if(this.getCurrentPage > 1) this.$store.state.page.current--
    },
    nextPage(){
      if(this.getCurrentPage * this.getPageLength < this.$store.state.repositories.length) this.$store.state.page.current++
    }
  },
  computed: {
    ...mapGetters(['getRepositories', 'getCurrentSort', 'getCurrentSortDir', 'getCurrentPage','getPageLength', 'getErrorMessage']),
  },
}
</script>

<style scoped lang="sass">
@import "src/assets/utils/vars"
.button-list
  text-align: center
  display: flex
  width: 100%
  align-items: center
  justify-content: center
  div
    margin: 5px
.container
  display: flex
  align-items: center
  flex-direction: column
.repository__wrapper
  width: 600px
  margin: 30px 0
.sort-btns
  width: 100%
  display: flex
  justify-content: space-between
  align-items: center
  &__item
    background-color: transparent
    border: 0
    cursor: pointer
    padding: 0
    border-bottom: 1px solid transparent
    transition: .3s linear border-bottom-color
    &:hover
      border-bottom-color: $neutral-primary
.pagination
  display: flex
  justify-content: space-between
  &__item, &__text
    font-size: 22px
    padding: 5px
    cursor: pointer
</style>