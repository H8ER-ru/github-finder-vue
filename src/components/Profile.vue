<template>
  <div v-if="user" class="personal-detail">
    <div class="personal-detail__img">
      <img :src="user.avatar_url" alt="">
    </div>
    <div class="personal-detail__info">
      <a :href="user.html_url" class="personal-detail__name">{{ user.login }}</a>
      <div class="personal-detail__name" v-if="user.name">Name: {{user.name}}</div>
      <div class="personal-detail__repo">Public Repository: {{user.public_repos}}</div>
      <div class="personal-detail_followers"> Followers:  {{user.followers}}</div>
      <div class="personal-detail_followers" v-if="user.blog">Blog: <a :href="user.blog"> {{user.blog}}</a></div>
      <div class="personal-detail_followers" v-if="user.bio">BIO:  {{user.bio}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  props:{
    user:{
      type: Object,
    }
  }
}
</script>

<style scoped lang="sass">
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