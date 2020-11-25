<template>
  <div class="index-container">
    <version-information />
  </div>
</template>

<script>
  import VersionInformation from './components/VersionInformation.vue'
  export default {
    name: 'Index',
    components: { VersionInformation },
  }
</script>
