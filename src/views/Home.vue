<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <Search @searchStart="getRepository" :value="search" placeholder="Type username..." @search="search = $event"/>

        <div class="error" v-if="this.$store.state.errorMessage">
          <p>{{this.$store.state.errorMessage}}</p>
        </div>

        <Profile :user="this.$store.state.user"/>

        <div class="repository__wrapper">

          <div class="sort-btns" v-if="this.$store.state.repositories.length > 0">
            <button class="sort-btn__item btn btnDefaul " @click="sort('name')" >Sort by Name</button>
            <button class="sort-btn__item btn btnDefaul " @click="sort('stargazers_count')" >Sort by stars</button>
          </div>

          <RepositoriesList :repositoriesList="repositoriesSort"/>

        </div>
      </div>
    </section>
    <section class="container">
      <div class="button-list" v-if="this.$store.state.repositories.length > 0">
        <div class="btn btnPrimary" @click="prevPage">🠔</div>
        <div>{{page.current}}</div>
        <div class="btn btnPrimary" @click="nextPage">🠖</div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import Search from "@/components/Search";
import Profile from "@/components/Profile";
import RepositoriesList from "@/components/RepositoriesList";

export default {
  components:{
    RepositoriesList,
    Profile,
    Search
  },
  data: () => ({
    search: 'github',
    currentSort: 'name',
    currentSortDir: 'asc',
    page: {
      current: 1,
      length: 5
    }
  }),
  methods:{
    sort(e){
      if(e === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = e
    },
    getRepository(){
      axios.get(`https://api.github.com/users/${this.search}/repos`)
        .then(res => {
          console.log(res)
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
      if(this.page.current > 1) this.page.current--
    },
    nextPage(){
      if(this.page.current * this.page.length < this.$store.state.repositories.length) this.page.current++
    }
  },
  computed: {
    repositoriesSort(){
      return this.$store.state.repositories.sort((a, b) =>{
        let mod = 1
        if(this.currentSortDir === 'desc') mod=-1
        if(a[this.currentSort] < b[this.currentSort]) return -1*mod
        if(a[this.currentSort] > b[this.currentSort]) return mod
        return 0
      }).filter((row,index) => {
        let start = (this.page.current - 1)*this.page.length
        let end = this.page.current * this.page.length
        if(index >= start && index < end) return true
      })
    }
  },
}
</script>

<style scoped lang="sass">
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
</style>