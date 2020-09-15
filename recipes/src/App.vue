<template>
  <div class="container">
      <app-header></app-header>
    <div class="row">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header';

export default {
  components: {
    appHeader: Header
  }
}
</script>

<style>

</style>
