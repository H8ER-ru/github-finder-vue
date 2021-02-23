<template>
  <div class="wrapper__search">

    <div class="search">
      <div class="search-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>
      <input type="text" :placeholder="placeholder" v-model="search"/>
    </div>

    <button @click="$emit('searchStart')" type="button" class="btnDefaul btn" >Search</button>

  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Поиск записей '
    }
  },
  data () {
    return { search: this.value }
  },
  watch: {
    search (val) {
      this.$emit('search', val);
    }
  },
}
</script>

<style scoped lang="sass">

.wrapper__search
  display: flex
  align-items: center
  padding-bottom: 20px
  flex-direction: column
  input
    padding: 16px 16px 16px 56px !important
    margin-bottom: 0
    border-radius: 30px
    color: #909399
    font-size: 16px
    min-width: 400px
    height: auto
  .search
    position: relative
    padding-bottom: 20px
    .search-icon
      height: 100%
      padding-left: 16px
      padding-right: 16px
      align-items: center
      display: flex
      position: absolute
      svg
        color: #e4e4e4

</style>


