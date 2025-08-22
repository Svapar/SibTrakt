<template>
  <div>
    <h1>Карта мест</h1>
    <ClusterMap />
  </div>
</template>

<script>
import ClusterMap from '../components/MapView.vue';
export default {
  components: { ClusterMap }
};
</script>
<style scoped>
  div{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
</style>