<template>
  <div class="app-container">
    <el-card shadow="never">
      <!-- 条件搜索框 -->
      <el-form :inline="true" class="demo-form-inline" :size="'small'">
        <el-form-item label="活动">
          <el-input v-model="page.tsVaName" placeholder="场馆名称"></el-input>
        </el-form-item>
        <el-form-item label="场馆">
          <el-input v-model="page.tsVmName" placeholder="场馆名称"></el-input>
        </el-form-item>
        <el-form-item label="入口">
          <el-input v-model="page.tsEmName" placeholder="场馆名称"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="page.tsIdentiycard" placeholder="场馆名称"></el-input>
        </el-form-item>
        <el-form-item label="二维码">
          <el-input v-model="page.tsQrcard" placeholder="场馆名称"></el-input>
        </el-form-item>
        <el-form-item label="座位区域">
          <el-input v-model="page.tsSeatingArea" placeholder="场馆名称"></el-input>
        </el-form-item>
        <el-form-item label="座位牌号">
          <el-input v-model="page.tsRownumber" placeholder="场馆名称"></el-input>
        </el-form-item>
        <el-form-item label="座位号">
          <el-input v-model="page.tsSeat" placeholder="场馆名称"></el-input>
        </el-form-item>
        <el-form-item label="实名">
          <el-input v-model="page.tsRealName" placeholder="场馆名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="mini" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-button @click="toAddBatch" type="success" size="mini" icon="el-icon-plus">导入票务</el-button>
        <el-button
          @click="handleDels()"
          v-show="selectData.length != 0"
          type="danger"
          size="mini"
          icon="el-icon-delete-solid"
        >批量删除</el-button>
      </div>

      <!-- 创建场馆静态模态框 -->
      <el-dialog title="创建场馆" :visible.sync="dialogAddVisible">
        <el-form ref="addForm" :rules="addFormrules" :model="addForm" label-width="80px">
          <el-form-item label="场馆名称" prop="vmName">
            <el-input v-model="addForm.vmName"></el-input>
          </el-form-item>
          <el-form-item label="场馆名称" prop="vmName">
            <el-input v-model="addForm.vmName"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="vmNote">
            <el-input v-model="addForm.vmNote"></el-input>
          </el-form-item>
          <el-form-item label="用户状态">
            <el-select v-model="addForm.vmEnable" placeholder="请选择用户状态">
              <el-option label="启用" value="1"></el-option>
              <el-option label="不启用" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="addSubmit">立即创建</el-button>
            <el-button @click="clearAddFrom()">默认</el-button>
            <el-button @click="dialogAddVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
    <div class="mt-3">
      <!-- 数据表格展示 -->
      <el-table
        v-loading="tabelLoading"
        :data="page.records"
        height="600"
        border
        style="width: 100%"
        :stripe="true"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="tSeatingarea" label="座位区域" width="180"></el-table-column>
        <el-table-column prop="tRownumber" label="座位牌号" width="180"></el-table-column>
        <el-table-column prop="tSeat" label="座位号" width="180"></el-table-column>
        <el-table-column prop="tGrandstand" label="看台信息" width="180"></el-table-column>
        <el-table-column prop="tQrcard" label="二维码" width="180"></el-table-column>
        <el-table-column prop="vaName" label="活动" width="200"></el-table-column>
        <el-table-column prop="vmName" label="场馆" width="180"></el-table-column>
        <el-table-column prop="emName" label="入口" width="180"></el-table-column>
        <el-table-column prop="tIdentitycard" label="身份证" width="180"></el-table-column>
        <el-table-column prop="tRealname" label="实名" width="180"></el-table-column>
        <el-table-column prop="tNote" label="备注" width="180"></el-table-column>
        <el-table-column prop="tPhone" label="电话" width="180"></el-table-column>
        <el-table-column prop="vmNote" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
            <el-button type="text" size="small">编辑</el-button>
            <el-button
              v-if="scope.row.vmEnable != '删除'"
              @click="handleDel(scope.row)"
              type="text"
              size="small"
              style="color:#F56C6C"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-row type="flex" justify="space-between" class="mt-3">
      <div></div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="page.total"
        :page-size="page.size"
        :page-sizes="[10, 20, 30, 40]"
        :current-page="page.current"
        @current-change="currentChange"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
import { getByKeys, addVm, dekVmById } from "@/api/ts";
export default {
  data() {
    return {
      addForm: {
        vmName: "",
        vmEnable: "1",
        vmNote: ""
      },
      dialogAddVisible: false,
      tabelLoading: true,
      selectData: [],
      page: {
        total: 0,
        current: 1,
        size: 10,
        records: [],

        tsVaName: "",
        tsVmName: "",
        tsEmName: "",
        tsIdentiycard: "",
        tsQrcard: "",
        tsSeatingArea: "",
        tsRownumber: "",
        tsSeat: "",
        tsRealName: "",
        tsPhone: "",
        tsNickname: ""
      },
      uStartusing: [
        {
          key: "全部",
          value: null
        },
        {
          key: "删除",
          value: 0
        },
        {
          key: "不启用",
          value: 2
        },
        {
          key: "启用",
          value: 1
        }
      ],
      addFormrules: {
        vmName: [
          {
            required: true,
            message: "场馆名称不能为空",
            trigger: "blur"
          },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        vmNote: [
          {
            required: true,
            message: "备注不能为空",
            trigger: "blur"
          },
          { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.tabelLoading = true;
      let page = this.page;
      delete page.records;
      delete page.total;
      getByKeys(page).then(res => {
        let { current, size, records, total } = res.data;
        this.page.current = current;
        this.page.size = size;
        this.page.records = records;
        this.page.total = total;
        this.tabelLoading = false;
      });
    },
    currentChange(e) {
      this.page.current = e;
      this.init();
    },
    onSubmit() {
      this.init();
    },
    handleDel(e) {
      let { vmId } = e;
      // this.tabelLoading = true;
      // dekVmById(vmId).then(res => {
      //   this.$message({
      //     showClose: true,
      //     message: "删除成功啦",
      //     type: "success"
      //   });
      //   this.init();
      // });
    },
    handleDels() {
      let ids = "";
      for (let index = 0; index < this.selectData.length; index++) {
        ids = ids + this.selectData[index].uId;
        if (this.selectData.length != index + 1) {
          ids = ids + ",";
        }
      }
      this.tabelLoading = true;
      delByIds(ids).then(res => {
        this.$message({
          showClose: true,
          message: "批量删除成功啦",
          type: "success"
        });
        this.init();
      });
    },
    handleSelectionChange(e) {
      this.selectData = e;
    },
    clearAddFrom() {
      this.$refs.addForm.resetFields();
    },
    addSubmit() {
      this.$refs["addForm"].validate(valid => {
        if (!valid) {
          return false;
        }
        addVm(this.addForm).then(res => {
          this.init();
          this.dialogAddVisible = false;
          console.log(res);
        });
      });
    },
    toAddBatch() {
      this.$router.push("/data/addticketingBatch");
    }
  }
};
</script>

<style>
</style>