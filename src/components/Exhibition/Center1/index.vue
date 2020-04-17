<template>
  <div id="title" class="text-white text-center">
    <h1 style="text-center">
      <strong>{{activity.aName}}</strong>
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    activity: {}
  }
};
</script>

<style scoped>
#title {
  width: 550px;
}
</style>