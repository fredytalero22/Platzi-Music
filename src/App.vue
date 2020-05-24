<template lang="pug">
  #app
    pm-header
    pm-notification(v-show="showNotification", :foundNotification="foundNotification")
      p(slot="body", v-show="!foundNotification") No se encontraron resultados
      p(slot="body", v-show="foundNotification") Se encontraron {{totalSearch}} concidencias
    pm-loader(v-show="isLoading")
    section.section(v-show="!isLoading")
      nav.nav.has-shadow
        .container
          input.input.is-large(
            type="text",
            placeholder="Buscar canciones",
            v-model="searchQuery"
          )
          a.button.is-info.is-large(@click="search") Buscar
          a.button.is-danger.is-large &times;
      .container
        p
          small {{searchMessage}}
      .container.results
        .columns.is-multiline
          .column.is-one-quarter(v-for="t in tracks")
            pm-track(
              :track="t",
              @select="setSelectedTrack",
              :class="{'is-active' : t.id === selectedTrack}")
    pm-footer
</template>

<script>
import trackService from '@/services/track'
import PmHeader from '@/components/layout/Header.vue'
import PmFooter from '@/components/layout/Footer.vue'
import PmTrack from '@/components/Track.vue'
import PmLoader from '@/components/share/Loader.vue'
import PmNotification from '@/components/share/Notification.vue'

export default {
  name: 'app',
  data () {
    return {
      searchQuery: '',
      tracks: [],
      isLoading: false,
      selectedTrack: '',
      showNotification: '',
      totalSearch: 0
    }
  },

  components: {
    PmFooter,
    PmHeader,
    PmTrack,
    PmLoader,
    PmNotification
  },

  methods: {
    search () {
      if (!this.searchQuery) { return }

      this.isLoading = true

      trackService.search(this.searchQuery)
        .then(res => {
          this.showNotification = true
          this.tracks = res.tracks.items
          this.isLoading = false
          this.totalSearch = res.tracks.total
        })
    },
    setSelectedTrack (id) {
      this.selectedTrack = id
    }
  },

  computed: {
    searchMessage () {
      return `Encontrados: ${this.tracks.length}`
    },
    foundNotification () {
      return this.totalSearch > 0
    }
  },

  watch: {
    showNotification () {
      if (this.showNotification) {
        setTimeout(() => {
          this.showNotification = false
        }, 5000)
      }
    }
  }

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
