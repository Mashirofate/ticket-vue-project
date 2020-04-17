<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-steps :active="avtive" simple>
          <el-step title="下载模板" icon="el-icon-download"></el-step>
          <el-step title="导入" icon="el-icon-upload"></el-step>
          <el-step title="结果" icon="el-icon-success"></el-step>
        </el-steps>
        <div v-if="avtive == 1">
          <el-button @click="downloadModel()">下载</el-button>
          <el-button @click="avtive ++">下一步</el-button>
        </div>
        <div v-if="avtive == 2">
          <el-upload
            class="upload-demo"
            drag
            action="http://localhost:8080/u/addBatch"
            multiple
            name="file"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </div>
        <div v-if="avtive == 3">结果</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { downloadModel } from "../../../api/user";
export default {
  data() {
    return {
      avtive: 1
    };
  },
  methods: {
    downloadModel() {
      window.location.href = "http://localhost:8080/u/model/download";
    }
  }
};
</script>

<style>
</style>