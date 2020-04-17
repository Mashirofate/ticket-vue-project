<template>
  <div class="app-container">
    <el-card class="box-card">
      <h4>导入产品</h4>
      <el-divider></el-divider>
      <h5>导入步骤</h5>
      <ul>
        <li>
          下载模板文件
          <el-button type="text" @click="downloadModel()">下载</el-button>，根据模板填写信息，头的顺序不可改变。
        </li>
        <li>
          上传填写后的数据文件
          <p>
            <el-upload
              ref="upload"
              action="http://localhost:8080/ts/addBatch?aId=1"
              :multiple="false"
              :auto-upload="false"
              :limit="1 "
              name="file"
              :on-success="onSuccess"
              :on-error="onError"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </p>
        </li>
      </ul>
      <el-divider></el-divider>
      <el-select v-model="aId" placeholder="请选择所属活动">
        <el-option
          v-for="(item, index) in openActivies"
          :key="index"
          :label="item.aName"
          :value="item.aId"
        ></el-option>
      </el-select>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">开始导入</el-button>
    </el-card>
  </div>
</template>

<script>
import { getOpenActivies } from "@/api/va";
export default {
  data() {
    return {
      openActivies: [],
      aId: "0"
    };
  },
  created() {
    this.init();
  },
  watch: {
    openActivies: function(val, oldVal) {
      let first = this.openActivies[0];
      if (first) {
        this.aId = first.aId;
      }
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    onSuccess(esponse, file, fileList) {
      this.$message({
        message: "导入成功",
        type: "success"
      });
    },
    onError(err, file, fileList) {
      this.$message.error("导入失败");
    },
    downloadModel() {
      window.location.href = "http://localhost:8080/ts/model/download";
    },
    init() {
      getOpenActivies().then(res => {
        let { data } = res;
        this.openActivies = data;
      });
    }
  }
};
</script>

<style>
</style>