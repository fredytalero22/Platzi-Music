<template lang="pug">
  #app
    pm-header

    router-view

    pm-footer
</template>

<script>
import PmHeader from '@/components/layout/Header.vue'
import PmFooter from '@/components/layout/Footer.vue'

export default {
  name: 'app',

  components: { PmFooter, PmHeader }

}
</script>

<style lang="scss">
  @import './scss/main.scss';

  .results {
    margin-top: 50px;
  }

  .is-active{
    border: 3px solid #3298dc;
  }
</style>
