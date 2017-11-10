<template>
  <el-container>
    <el-main style="padding:0px;">
      <!--查询框-->
      <el-col :span="24" class="toolbar">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.name" placeholder="产品名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" >查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="handleAdd" icon="el-icon-plus">新建产品</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="handleAll">批量操作</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--产品列表-->
      <el-table :data="tableData" border ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="70" >
        </el-table-column>
        <el-table-column prop="name" label="产品名称" width="160" sortable>
          <template scope="scope"><p @click=handleRow(scope.$index)>{{ scope.row.name }}</p></template>
        </el-table-column>
        <el-table-column prop="type" label="产品类型" width="140" sortable>
        </el-table-column>
        <el-table-column prop="desc" label="描述" sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template scope="scope">
            <el-button type="small" @click="handleLook(scope.row)" size="small" icon="el-icon-tickets">查看</el-button>
            <el-button type="small" @click="handleEdit(scope.row)" size="small" icon="el-icon-edit">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
        <!--<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">-->
        <!--</el-pagination>-->
      </el-col>
      <!--新建产品-->
      <el-dialog title="新建产品" :visible.sync="dialogVisible" :before-close="handleClose" width="35%">
        <el-form ref="addForm" :model="addForm" label-width="80px" :rules="rules">
          <el-form-item  label="产品名称" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="产品类型" prop="type">
            <el-select v-model="addForm.type" placeholder="请选择活动区域" style="width:100%;" >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品描述">
            <el-input type="textarea" v-model="addForm.desc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="success"  @click.native="addSubmit">保存</el-button>
            </span>
      </el-dialog>
      <!--编辑产品信息-->
      <el-dialog title="修改产品信息" :visible.sync="editVisible" :before-close="handleClose" width="35%">
        <el-form  label-width="80px">
          <el-form-item label="产品名称">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
          <el-form-item label="产品类型">
            <el-select v-model="editForm.type" placeholder="请选择活动区域" style="width:100%;">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品描述">
            <el-input type="textarea" v-model="editForm.desc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
              <el-button @click="editVisible = false">取消</el-button>
              <el-button type="success" >保存</el-button>
            </span>
      </el-dialog>
      <!--查看历史记录-->
      <el-dialog title="查看历史记录" :visible.sync="lookVisible" :before-close="handleClose" width="50%">
        <el-collapse v-for="info in lookinfo"  @change="handleChange">
          <el-collapse-item >
            <template slot="title">
              <span style="padding:0 10px;">{{info.time}}</span><span style="padding:0 15px;">{{info.user}}</span>{{info.operation}}<i class="header-icon el-icon-information"></i>
            </template>
            <el-card class="box-card">
              <div  class="text item">
                <p>产品名称：{{info.detailed.name}}</p>
                <p>产品类型：{{info.detailed.type}}</p>
                <p>产品描述：{{info.detailed.desc}}</p>
              </div>
            </el-card>
          </el-collapse-item>
        </el-collapse>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'

  export default {
    data() {
      return {
        collapsed:false,
        tableData:[],
        lookinfo: [],
        dialogVisible: false,
        editVisible:false,
        lookVisible:false,
        multipleSelection: [],
        //新增界面数据
        addForm: {
          name: '',
          type: '',
          desc: ''
        },
        //编辑
        editForm:{},
        //查询
        filters:{
          name:''
        },
        rules: {
          name: [
            {required: true, message: '请输入产品名称', trigger: 'blur'},
            { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          type: [
            {required: true, message: '请至少选择一个产品类型', trigger: 'change'},
          ],
        }
      }
    },
    created: function () {
      var data = [];
      Vue.prototype.$http = axios;
      let _this = this;
      // 请求后台数据，渲染表格
      this.$http.get('../static/table.json').then(function (res) {
        console.log(res);
        console.log(res.data.chanpin.length);
        var datas = res.data.chanpin;
        for (let i = 0; i < datas.length; i++) {
          var obj = {};
          obj.name = datas[i].name;
          obj.type = datas[i].type;
          obj.desc = datas[i].desc;
          data[i] = obj;
        }
        _this.tableData = data;
        //读取历史操作记录，渲染卡片
        _this.lookinfo = res.data.lookInfos;
      }).catch(function (error) {

      })
    },
    methods: {
      handleRow:function(index){
        alert(index)
      },
      handleSelectionChange:function(val){
        this.multipleSelection = val;
        console.log(val);
      },
      handleAdd: function () {
        this.dialogVisible = true;
        this.addForm = {
          name: '',
          type: '',
          desc: ''
        };
      },
      //获取页面数据，并追加字段后提交
      addSubmit:function(){
        this.$refs.addForm.validate((valid) => {
          console.log(valid);
          let para = Object.assign({}, this.addForm);
          para["aaa"]="111";
          para["rrr"]="222";
          para["ttt"]="333";
          console.log(para);
        });
      },
      //编辑页面
      handleEdit:function(rowData){
        this.editVisible = true;
        console.log(rowData);
        this.editForm = rowData;
      },
      //查看历史详情
      handleLook:function(rowData){
        this.lookVisible = true;
      },
      handleChange:function(a){

      },
      handleClose(done) {
//        this.$confirm('确认关闭？')
//          .then(_ => {
//            done();
//          })
//          .catch(_ => {});
        done();
      },
      //删除
      handleAll:function(){
        let arr = [];
        for (let i in this.multipleSelection) {
          arr.push(this.multipleSelection[i].name);
        }
        console.log('勾中的产品为：' + arr.join());
//        console.log(this.multipleSelection);
      },
      handleDel: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { id: row.id };
          removeUser(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
//            this.getUsers();
          });
        }).catch(() => {

        });
      },    }
  }
</script>
<style>
  .toolbar{
    margin-bottom: 10px;
    padding-bottom: 0px;
    background: #f2f2f2;
    padding: 10px 10px 0 10px;
  }
  .toolbar .el-form-item {
    margin-bottom: 10px;
  }
  thead tr{
    background: rgb(238, 241, 246) !important;
    color:#000;
  }
  /*卡片*/
  /*.el-dialog__body {*/
  /*height: 550px;*/
  /*overflow-y: scroll;*/
  /*}*/
  .el-card{
    margin-bottom:10px;
  }
  .el-card__header {
    padding: 10px 20px;
    border-bottom: 1px solid #e6ebf5;
    box-sizing: border-box;
    background: #e6ebf5;
  }
  .el_card_body{
    padding: 0px 20px;
  }
  .el_card_body p{
    margin:0px;
  }
  .el-collapse-item__header{
    background:#edf2fc;
  }
  .el-collapse-item__content {
    padding-bottom: 5px;
  }
</style>


