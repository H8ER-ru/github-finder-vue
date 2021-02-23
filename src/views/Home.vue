<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <Search :value="search" placeholder="Type username..." @search="search = $event"/>
        <button @click="getRepository" class="btnPrimary btn">Search</button>

        <div class="error" v-if="errorMessage">
          <p>{{errorMessage}}</p>
        </div>

        <div v-if="user" class="personal-detail">
          <div class="personal-detail__img">
            <img :src="user.avatar_url" alt="">
          </div>
          <div class="personal-detail__info">
            <a :href="user.html_url" class="personal-detail__name">{{ user.login }}</a>
            <div class="personal-detail__repo">Public Repository: {{user.public_repos}}</div>
            <div class="personal-detail_followers"> Followers:  {{user.followers}}</div>
          </div>
        </div>

        <div class="repository__wrapper">
          <button class="sort-btn btn " @click="sort('name')" >Sort by Name</button>
          <button class="sort-btn btn " @click="sort('stargazers_count')" >Sort by stars</button>
          <div class="repository__item" v-for="rep in repositoriesSort" :key="rep.id">

            <div class="repository__info">
              <a target="_blank" :href="rep.html_url">{{rep.name}}</a>
              <span>{{ rep.stargazers_count }}⭐ </span>
            </div>
          </div>
          <p>debug : {{currentSort}}, dir {{currentSortDir}}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import Search from "@/components/Search";

export default {
  components:{
    Search
  },
  data: () => ({
    search: 'github',
    repositories: [],
    currentSort: 'name',
    currentSortDir: 'asc',
    errorMessage: null,
    user: null
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
            this.errorMessage = "can't find that user"
            this.repositories = null
          }else{
            this.repositories = res.data
            this.errorMessage = null
          }
        })
        .catch(err => {
          console.log(err)
          this.repositories = null
          this.errorMessage = "can't find that user"
        })
      axios.get(`https://api.github.com/users/${this.search}`)
          .then(res => {
            console.log(res)
            this.user = res.data
          })
    }
  },
  computed: {
    repositoriesSort(){
      return this.repositories.sort((a, b) =>{
        let mod = 1
        if(this.currentSortDir === 'desc') mod=-1
        if(a[this.currentSort] < b[this.currentSort]) return -1*mod
        if(a[this.currentSort] > b[this.currentSort]) return mod
        return 0
      })
    }
  },
}
</script>

<style scoped lang="sass">
.container
  display: flex
  align-items: center
  flex-direction: column
button
  margin-top: 40px
.repository__wrapper
  width: 600px
  margin: 30px 0
.repository__info
  display: flex
  align-items: center
  justify-content: space-between
  margin-bottom: 10px
  padding: 10px 0
.personal-detail
  width: 600px
  display: flex
  align-items: flex-start
  padding: 10px
  &__img
    max-width: 200px
    border-radius: 5px
    margin-right: 15px
  &__info
    div, a
      margin: 10px 0
</style>