<template lang="pug">
  main
    transition(name="move")
      pm-notification(v-show="showNotification", :foundNotification="foundNotification")
        p(slot="body", v-show="!foundNotification") No se encontraron resultados
        p(slot="body", v-show="foundNotification") Se encontraron {{totalSearch}} concidencias

    transition(name="move")
      pm-loader(v-show="isLoading")

    section.section(v-show="!isLoading")
      nav.nav.has-shadow
        .container
          input.input.is-large(
            type="text",
            placeholder="Buscar canciones",
            v-model="searchQuery",
            @keyup.enter="search"

          )
          a.button.is-info.is-large(@click="search") Buscar
          a.button.is-danger.is-large &times;
      .container
        p
          small {{searchMessage}}
      .container.results
          transition-group(name="move", tag="div", class="columns is-multiline")
            .column.is-one-quarter(v-for="t in tracks", :key="t.id")
              pm-track(
                v-blur="t.preview_url",
                :track="t",
                @select="setSelectedTrack",
                :class="{'is-active' : t.id === selectedTrack}")
</template>

<script>
import trackService from '@/services/track'
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
        }, 3000)
      }
    }
  }

}
</script>

<style lang="scss">
  .results {
    margin-top: 50px;
  }

  .is-active{
    border: 3px solid #3298dc;
  }
</style>
