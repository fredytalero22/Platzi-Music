<template lang="pug">
    section.hero.is-info
        .hero-head
            header.nav
                .container
                    .nav-left
                        .nav-item
                            strong 🎶 Platzi Music
                    .nav-rigth.nav-menu
                        router-link.nav-item(:to="{ name: 'search'}") Buscar
                        router-link.nav-item(to="about") Nosotros
        .hero-body
            .container.has-text-centered
                h1.title Platzi Music
                h2.subtitle Canciones que estan Vue-nicimas!
                pm-player
</template>

<script>
import PmPlayer from '@/components/Player.vue'

export default {
  components: { PmPlayer }
}
</script>
