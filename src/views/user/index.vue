<template>
  <div class="app-container">
    <!-- 条件搜索功能 -->
    <el-card class="box-card" shadow="never">
      <!-- <div slot="header" class="clearfix">
        <span></span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>-->
      <el-form :inline="true" class="demo-form-inline" :size="'small'">
        <el-form-item label="用户名">
          <el-input v-model="page.uUser" placeholder="用户名" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="page.uStartusing" placeholder="状态">
            <el-option
              v-for="(item, index) in uStartusing"
              :key="index"
              :label="item.key"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="onSearchSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 其它功能 -->
      <div>
        <el-button
          type="success"
          size="mini"
          icon="el-icon-plus"
          @click="dialogAddVisible = true"
        >创建用户</el-button>
        <el-button type="success" size="mini" icon="el-icon-circle-plus" @click="toAddBatch()">批量导入</el-button>
        <el-button
          v-show="selectData.length != 0"
          type="danger"
          size="mini"
          icon="el-icon-delete-solid"
          @click="handleDels()"
        >批量删除</el-button>
      </div>
    </el-card>

    <!-- 创建用户静态模态框 -->
    <el-dialog title="创建用户" :visible.sync="dialogAddVisible">
      <el-form ref="addForm" :rules="addFormrules" :model="addForm" label-width="80px">
        <el-form-item label="用户名" prop="uUser">
          <el-input v-model="addForm.uUser" />
        </el-form-item>
        <el-form-item label="密码" prop="uPassword">
          <el-input v-model="addForm.uPassword" />
        </el-form-item>
        <el-form-item label="用户权限" prop="uAuthority">
          <el-checkbox-group v-model="addForm.uAuthority">
            <el-checkbox label="admin" name="admin" />
            <el-checkbox label="police" name="police" />
            <el-checkbox label="ordinary" name="ordinary" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-select v-model="addForm.uStartusing" placeholder="请选择用户状态">
            <el-option label="启用" value="1" />
            <el-option label="不启用" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="clearAddFrom()">默认</el-button>
          <el-button @click="dialogAddVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 数据展示 -->
    <div class="mt-3">
      <el-table
        v-loading="tabelLoading"
        :data="page.records"
        height="600"
        border
        style="width: 100%"
        :stripe="true"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="uUser" label="用户名" width="180" />
        <el-table-column prop="uAuthority" label="拥有权限" width="180" />
        <el-table-column prop="uStartusing" label="状态" />
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
            <el-button
              type="text"
              size="small"
              @click="handleRedact(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              v-if="scope.row.uStartusing != '删除'"
              type="text"
              size="small"
              style="color:#F56C6C"
              @click="handleDel(scope.row)"
            >删除</el-button>
            <el-button
              v-if="scope.row.uStartusing == '启用'? '不启用':'启用'"
              type="text"
              size="small"
              :style="{color: scope.row.uStartusing == '启用'?'#F56C6C':'#409EFF'}"
              @click="handleState(scope.row)"
            >{{ scope.row.uStartusing == '启用'? '不启用':'启用' }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <el-row type="flex" justify="space-between" class="mt-3">
      <div />
      <el-pagination
        background
        :total="page.total"
        :page-size="page.size"
        :page-sizes="[10, 20, 30, 40,50,100,200,300,400,500,600,700,800,900,1000]"
        :current-page="page.current"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="currentChange"
      />
    </el-row>
  </div>
</template>

<script>
import {
  getByKeys,
  delById,
  delByIds,
  addUser,
  updateStartusing,
  isUserUUser
} from '@/api/user';
export default {
  data() {
    var checkUUser = (rule, value, callback) => {
      if (!value || value === '') {
        return callback(new Error('用户名不能为空'));
      }
      isUserUUser(value).then(res => {
        const { data } = res;
        if (data) {
          return callback(new Error('用户名已存在'));
        } else {
          callback();
        }
      });
    };
    return {
      addForm: {
        uUser: '',
        uStartusing: '1',
        uAuthority: [],
        uPassword: '123456'
      },
      dialogAddVisible: false,
      tabelLoading: true,
      selectData: [],
      page: {
        total: 0,
        current: 1,
        size: 10,
        records: [],
        uUser: '',
        uStartusing: null
      },
      uStartusing: [
        {
          key: '全部',
          value: null
        },
        {
          key: '已删除',
          value: 0
        },
        {
          key: '启用',
          value: 1
        },
        {
          key: '不启用',
          value: 2
        }
      ],
      addFormrules: {
        uUser: [
          {
            validator: checkUUser,
            trigger: 'blur'
          }
        ],
        uPassword: [
          {
            required: true,
            message: '请输入密码，默认密码为123456',
            trigger: 'blur'
          },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
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
      const { current, size, uUser, uStartusing } = this.page;
      getByKeys({ current, size, uUser, uStartusing }).then(res => {
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
    handleSizeChange(e) {
      this.page.size = e;
      this.init();
    },
    handleDel(e) {
      const { uId } = e;
      this.tabelLoading = true;
      delById(uId).then(res => {
        this.$message({
          showClose: true,
          message: '删除成功啦',
          type: 'success'
        });
        this.init();
      });
    },
    handleRedact(e) {
      const { uId } = e;
      this.tabelLoading = true;
      delById(uId).then(res => {
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
    toAddBatch() {
      this.$router.push('/data/addBatch');
    },
    onSubmit() {
      this.$refs['addForm'].validate(valid => {
        if (!valid) {
          return false;
        }
        const form = this.addForm;
        form.uAuthority = form.uAuthority.join(',');

        addUser(form).then(res => {
          this.init();
          this.dialogAddVisible = false;
          console.log(res);
        });
      });
    },
    clearAddFrom() {
      this.$refs.addForm.resetFields();
    },
    onSearchSubmit() {
      this.init();
    },
    handleState(e) {
      updateStartusing(e.uId, e.uStartusing === '启用' ? '2' : '1').then(res => {
        this.init();
      });

      console.log(e);
    }
  }
};
</script>

<style>
</style>
