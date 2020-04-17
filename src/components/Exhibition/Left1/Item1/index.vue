<template>
  <div class="text-white">
    <div class="bg-img">
      <!-- <h2 class="text-center" style="padding-top: 0px !important; padding-bottom: 0px !important;">132</h2>
      <h2 class="text-center"  style="padding-top: 0px !important; padding-bottom: 0px !important;">实时入场</h2>-->
      <p class="text-center">
        <strong style="font-size: 20px !important;">{{count}}</strong>
      </p>
      <p class="text-center">
        <strong style="font-size: 20px !important;">实时入场</strong>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    count: 0
  }
};
</script>

<style scoped>
.bg-img {
  background-image: url("../../../../assets/src_imgs/7.png");
  height: 6rem;
  width: 11.125rem;
  position: absolute;
}
</style>