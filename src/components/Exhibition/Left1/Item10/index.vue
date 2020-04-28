<template>
  <div>
    <el-row :gutter="10" class="mr-3 ml-6">
      <el-col v-for="(item, index) in imgs" :key="index" :span="6">
        <el-image :preview-src-list="imgs" fit="cover" :src="item" alt />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    imgs: Array
  }
};
</script>

<style scoped>
.el-row {
  padding: 5px 20px !important;
}
.el-col {
  margin-bottom: 10px;
}
</style>
