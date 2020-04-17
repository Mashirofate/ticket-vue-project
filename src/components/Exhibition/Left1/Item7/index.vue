<template>
  <div class="text-white bg">
    <el-row type="flex" justify>
      <img src="../../../../assets/src_imgs/2.png" width="50" height="50" alt />
      <div class="pt-1 ml-1">
        <div>{{count}}</div>
        <div>实名入场</div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    count: 0
  }
};
</script>

<style>
.bg {
  width: 9.375rem;
}
.center {
  margin: 0 auto;
}
</style>