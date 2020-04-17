<template>
  <div>
    <el-row type="flex" justify="space-between">
      <div>
        <div class="icon" />
        <input tyle="text" placeholder="请输入姓名、身份证号、座位号" />
      </div>

      <img src="../../../../assets/src_imgs/query_03.png"  style="cursor:pointer"/>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style  scoped>
.el-row{
  position: absolute !important;
}

input {
  position: relative !important;
  margin-left: 15px;
  margin-right: 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: 0;
  width: 250px;
  height: 43px;
  background: url("../../../../assets/src_imgs/input_01.png") no-repeat center;
  cursor: pointer;
  display: block;
  font-size: 14px;
  line-height: 0;
  text-indent: inherit;
  border: 0;
  padding: 0 0 0 40px;
  color: white;
}
.icon {
  position: absolute !important;
  display: inline-block;
  margin-top: 4px;
  margin-left: 15px;
  height: 30px;
  width: 30px;
  background: url(../../../../assets/src_imgs/name_01.png);
  background-repeat: no-repeat;
  left: 5px;
  z-index: 2;
  top: 4px;
}
</style>