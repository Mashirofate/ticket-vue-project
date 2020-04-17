<template>
  <div class="text-white">
    <div class="bg-img text-center">
      <div class="num">
        <div class="text-center pt-2">
          <strong>{{vaTicketnumber}}</strong>
        </div>
      </div>
      <div class="title">
        <strong>票务总数</strong>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    vaTicketnumber: 0
  }
};
</script>

<style scoped>
.bg-img {
  background-image: url("../../../../assets/src_imgs/5-3.png");
  height: 4.3125rem;
  width: 9.375rem;
  margin: 0 auto;
  position: absolute;
}

/* .num{
  position: absolute;
  top: 1px;
  left: 20px;
} */

.title {
  position: absolute;
  top: 40px;
  left: 45px;
}
</style>