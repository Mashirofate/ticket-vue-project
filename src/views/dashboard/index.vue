<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-row :gutter="5">
          <el-col :span="6">
            <el-card class="box-card text-white text-center" style="background-color:#F56C6C;">
              <div style="font-size: 30px;">50</div>
              <div class="mt-2">数量</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card text-white text-center" style="background-color:#E6A23C;">
              <div style="font-size: 30px;">50</div>
              <div class="mt-2">数量</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card text-white text-center" style="background-color:#67C23A;">
              <div style="font-size: 30px;">50</div>
              <div class="mt-2">数量</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card text-white text-center" style="background-color:#409EFF;">
              <div style="font-size: 30px;">50</div>
              <div class="mt-2">数量</div>
            </el-card>
          </el-col>
        </el-row>

        <el-card class="box-card mt-3">
          <p>
            <strong>开启的活动</strong>
          </p>
          <el-tabs v-model="activeName">
            <el-tab-pane
              v-for="(item, index) in openActivies"
              :key="index"
              :label="item.aName"
              ::name="index"
            >
              <p>活动标题：{{ item.aName }}</p>

              <p>活动描述：{{ item.aNote }}</p>
              <p>票数量：{{ item.aTicketnumber + '个' }}</p>
              <p>票务人员：{{ item.aEmployeenumber + '个' }}</p>
              <p>创建时间：{{ item.aCreationtime }}</p>
              <el-button type="primary" plain @click="toExhibition(item.aId)">查看面板</el-button>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getOpenActivies } from '@/api/va';

export default {
  data() {
    return {
      openActivies: [],
      activeName: '0'
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getOpenActivies().then(res => {
        const { data } = res;
        this.openActivies = data;
      });
    },
    toExhibition(id) {
      this.$router.push({ path: `/exhibition/${id}` });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
