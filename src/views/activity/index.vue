<template>
  <div class="app-container">
    <el-card class="box-card" shadow="never">
      <!-- <div slot="header" class="clearfix">
        <span></span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>-->
      <!-- 条件搜索框 -->
      <el-form :inline="true" class="demo-form-inline" :size="'small'">
        <el-form-item label="场馆名称">
          <el-input v-model="page.vaName" placeholder="场馆名称" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="page.vaEnable" placeholder="状态">
            <el-option
              v-for="(item, index) in uStartusing"
              :key="index"
              :label="item.key"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-button
          type="success"
          size="mini"
          icon="el-icon-plus"
          @click="dialogAddVisible = true"
        >创建活动</el-button>
        <!-- <el-button @click="toAddBatch()" type="success" size="mini" icon="el-icon-circle-plus">批量添加</el-button> -->
        <el-button
          v-show="selectData.length != 0"
          type="danger"
          size="mini"
          icon="el-icon-delete-solid"
          @click="handleDels()"
        >批量删除</el-button>
      </div>
    </el-card>
    <div class="mt-3">
      <!-- 数据表格展示 -->
      <el-table
        v-loading="tabelLoading"
        :data="page.records"
        height="700"
        border
        style="width: 100%"
        :stripe="true"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="aImage" label="海报" width="120">
          <template slot-scope="scope">
            <img v-if="scope.row.aImage" width="100" height="100" :src="scope.row.aImage">
          </template>
        </el-table-column>
        <el-table-column prop="aName" label="活动名称" width="200" />
        <el-table-column prop="aEnable" label="状态" width="180" />
        <el-table-column prop="aCreationtime" label="创建时间" width="180" />
        <el-table-column prop="aTicketnumber" label="票务数量" width="180" />
        <el-table-column prop="aEmployeenumber" label="工作证总数" width="180" />
        <el-table-column prop="aNote" label="备注" />
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
            <el-button type="text" size="small">编辑</el-button>
            <el-button
              type="text"
              size="small"
              :style="{color: scope.row.aEnable == '启用'?'#F56C6C':'#409EFF'}"
              @click="handeUpdateEnable(scope.row)"
            >{{ scope.row.aEnable=='启用'? '不启用':'启用' }}</el-button>
            <el-button
              v-if="scope.row.aEnable != '删除'"
              type="text"
              size="small"
              style="color:#F56C6C"
              @click="handleDel(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-row type="flex" justify="space-between" class="mt-3">
      <div />
      <el-pagination
        background
        layout="prev, pager, next"
        :total="page.total"
        :page-size="page.size"
        :page-sizes="[10, 20, 30, 40]"
        :current-page="page.current"
        @current-change="currentChange"
      />
    </el-row>

    <!-- 创建场馆静态模态框 -->
    <el-dialog title="创建活动" :visible.sync="dialogAddVisible">
      <el-form ref="addForm" :rules="addFormrules" :model="addForm" label-width="80px">
        <el-form-item label="活动名称" prop="vaName">
          <el-input v-model="addForm.vaName" />
        </el-form-item>
        <el-form-item label="备注" prop="vaNote">
          <el-input v-model="addForm.vaNote" />
        </el-form-item>
        <el-form-item label="活动状态">
          <el-select v-model="addForm.vaEnable" placeholder="请选择用户状态">
            <el-option label="启用" value="1" />
            <el-option label="不启用" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="票务总数" prop="vaTicketnumber">
          <el-input v-model.number="addForm.vaTicketnumber" />
        </el-form-item>
        <el-form-item label="工证总数" prop="vaEmployeenumber">
          <el-input v-model.number="addForm.vaEmployeenumber" />
        </el-form-item>
        <el-form-item label="活动海报">
          <el-upload
            v-if="addForm.almage == ''"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :show-file-list="false"
            :on-change="changeAvatarUpload"
            :before-upload="beforeAvatarUpload"
          >
            <i class="el-icon-plus" />
          </el-upload>

          <img
            v-if="addForm.almage != ''"
            class="el-upload el-upload--picture-card"
            width="100%"
            :src="addForm.almage"
            alt
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addSubmit">立即创建</el-button>
          <el-button @click="clearAddFrom()">默认</el-button>
          <el-button @click="dialogAddVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getByKeys, updateEnable, addVa, delVaById } from '@/api/va';
export default {
  data() {
    return {
      dialogVisible: false,
      addForm: {
        vaName: '',
        vaEnable: '1',
        vaNote: '',
        vaTicketnumber: '',
        vaEmployeenumber: '',
        almage: ''
      },
      dialogAddVisible: false,
      tabelLoading: true,
      selectData: [],
      page: {
        total: 0,
        current: 1,
        size: 10,
        records: [],
        vaName: '',
        vaEnable: null
      },
      uStartusing: [
        {
          key: '全部',
          value: null
        },
        {
          key: '删除',
          value: 0
        },
        {
          key: '不启用',
          value: 2
        },
        {
          key: '启用',
          value: 1
        }
      ],
      addFormrules: {
        vaName: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        vaNote: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        vaTicketnumber: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          },
          { type: 'number', message: '必须为数字值', trigger: 'blur' }
        ],
        vaEmployeenumber: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          },
          { type: 'number', message: '必须为数字值', trigger: 'blur' }
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
      const { current, size, vaName, vaEnable } = this.page;
      const form = {
        current: current,
        size: size,
        vaName: vaName,
        vaEnable: vaEnable
      };
      getByKeys(form).then(res => {
        const { current, size, records, total } = res.data;
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
      const { aId } = e;
      this.tabelLoading = true;
      delVaById(aId).then(res => {
        this.$message({
          showClose: true,
          message: '删除成功啦',
          type: 'success'
        });
        this.init();
      });
    },
    handleDels() {
      let ids = '';
      for (let index = 0; index < this.selectData.length; index++) {
        ids = ids + this.selectData[index].uId;
        if (this.selectData.length !== index + 1) {
          ids = ids + ',';
        }
      }
      this.tabelLoading = true;
      // eslint-disable-next-line no-undef
      delByIds(ids).then(res => {
        this.$message({
          showClose: true,
          message: '批量删除成功啦',
          type: 'success'
        });
        this.init();
      });
    },
    handleSelectionChange(e) {
      this.selectData = e;
    },
    handeUpdateEnable(e) {
      const { aId, aEnable } = e;
      const enableCode = aEnable === '启用' ? 2 : 1;
      this.tabelLoading = true;
      updateEnable(aId, enableCode).then(res => {
        this.$message({
          showClose: true,
          message: enableCode === 2 ? '不启用成功' : '启用成功',
          type: 'success'
        });
        this.init();
      });
    },
    clearAddFrom() {
      this.$refs.addForm.resetFields();
    },
    addSubmit() {
      this.$refs['addForm'].validate(valid => {
        if (!valid) {
          return false;
        }
        addVa(this.addForm).then(res => {
          this.init();
          this.dialogAddVisible = false;
        });
      });
    },
    changeAvatarUpload(file, fileList) {
      this.getBase64(file.raw).then(res => {
        this.addForm.almage = res;
      });
    },
    beforeAvatarUpload(file) {
      return false;
    },
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader();
        let imgResult = '';
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    }
  }
};
</script>

<style>
</style>
