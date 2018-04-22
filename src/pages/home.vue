<template>
  <div class="home">
    12
  </div>
</template>
<script>
export default {
  name: 'home',
  mounted () {
    console.log(this.$store.state.index)
  }
}
</script>
<style>
</style>
