<template lang="pug">
    .container
        .columns
            .column.is-5.is-offset-4
                .notification(:class="{ 'is-success' : foundNotification, 'is-danger' : !foundNotification}")
                    slot(name="body") Algo anduvo mal
</template>

<script>
export default {
  props: {
    foundNotification: { type: Boolean, required: true }
  }
}
</script>

<style lang="scss" scoped>
    .notification{
        margin: 10px;
    }
</style>
