<template>
  <div class="text-white">
    <div class="icon"></div>
    <br />
    <div class="bg-img text-center">
      <div>
        <strong>{{vaEmployeenumber}}</strong>
      </div>
      <div class="mt-2">
        <strong>工作证入场</strong>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    vaEmployeenumber: 0
  }
};
</script>

<style scoped>
.icon {
  background-image: url("../../../../assets/src_imgs/5.png");
  height: 1.025rem;
  width: 10.6875rem;
  margin: 0 auto;
}
.bg-img {
  background-image: url("../../../../assets/src_imgs/8.png");
  height: 3.0625rem;
  width: 9.375rem;
  margin: 0 auto;
}
</style>