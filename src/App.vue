<template>
  <div id="app">
    <el-container class="con_section">
      <el-header class="blueheader">
        <h2 class="headlogo">微言科技</h2>
        <el-col :span="3" class="userinfo">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-col>
      </el-header>
      <el-container>
        <!--<aside :class="collapsed?'menu-collapsed':'menu-expanded'">-->
          <!--&lt;!&ndash;导航菜单&ndash;&gt;-->
          <!--<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"-->
                   <!--unique-opened router v-show="!collapsed">-->
            <!--<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">-->
              <!--<el-submenu :index="index+''" v-if="!item.leaf">-->
                <!--<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>-->
                <!--<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>-->
              <!--</el-submenu>-->
              <!--<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>-->
            <!--</template>-->
          <!--</el-menu>-->
        <!--</aside>-->
        <el-aside style="flex: 0 0 230px;width: 230px;background:#eef1f6">
          <el-menu :default-openeds="['1', '3']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>管理系统</template>
              <el-menu-item index="1-1">列表管理</el-menu-item>
              <el-menu-item index="1-2">表单管理</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <!--查询框-->
          <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="filters">
              <el-form-item>
                <el-input v-model="filters.name" placeholder="产品名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleAdd">新建产品</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <!--产品列表-->
          <el-table :data="tableData" border ref="multipleTable">
            <el-table-column type="selection" width="70">
            </el-table-column>
            <el-table-column prop="name" label="产品名称" width="160">
            </el-table-column>
            <el-table-column prop="type" label="产品类型" width="140">
            </el-table-column>
            <el-table-column prop="desc" label="描述">
            </el-table-column>
            <el-table-column label="操作" width="300">
              <template scope="scope">
                <el-button type="small" @click="handleLook(scope.row)" size="small">查看</el-button>
                <el-button type="small" @click="handleEdit(scope.row)" size="small">编辑</el-button>
                <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--新建产品-->
          <el-dialog title="新建产品" :visible.sync="dialogVisible" :before-close="handleClose" width="35%">
            <el-form ref="addForm" :model="addForm" label-width="80px">
              <el-form-item v-model="addForm.name" label="产品名称">
                <el-input ></el-input>
              </el-form-item>
              <el-form-item label="产品类型">
                <el-select v-model="addForm.type" placeholder="请选择活动区域" style="width:100%;">
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
              <el-button type="primary"  @click.native="addSubmit">保存</el-button>
            </span>
          </el-dialog>
          <!--编辑产品信息-->
          <!--<el-dialog title="修改产品信息" :visible.sync="editVisible" :before-close="handleClose" width="35%">-->
            <!--<el-form ref="editForm" :model="editForm" label-width="80px">-->
              <!--<el-form-item v-model="editForm.name" label="产品名称">-->
                <!--<el-input ></el-input>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="产品类型">-->
                <!--<el-select v-model="editForm.type" placeholder="请选择活动区域" style="width:100%;">-->
                  <!--<el-option label="区域一" value="shanghai"></el-option>-->
                  <!--<el-option label="区域二" value="beijing"></el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="产品描述">-->
                <!--<el-input type="textarea" v-model="editForm.desc"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-form>-->
            <!--<span slot="footer" class="dialog-footer">-->
              <!--<el-button @click="editVisible = false">取消</el-button>-->
              <!--<el-button type="primary" >保存</el-button>-->
            <!--</span>-->
          <!--</el-dialog>-->
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
              <el-button type="primary" >保存</el-button>
            </span>
          </el-dialog>
          <!--查看历史记录-->
          <el-dialog title="查看历史记录" :visible.sync="lookVisible" :before-close="handleClose" width="50%">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item>
                <template slot="title">
                  <span style="padding:0 10px;">2017-10-30 16:09:32</span><span style="padding:0 15px;">admin</span>编辑合作方信息<i class="header-icon el-icon-information"></i>
                </template>
                <el-card class="box-card">
                  <div v-for="o in 2" :key="o" class="text item">
                    {{'列表内容 ' + o }}
                  </div>
                </el-card>
              </el-collapse-item>
            </el-collapse>

            <el-collapse v-for="info in lookinfo"  @change="handleChange">
              <el-collapse-item >
                <template slot="title">
                  <span style="padding:0 10px;">{{info.time}}</span><span style="padding:0 15px;">{{info.user}}</span>{{info.operation}}<i class="header-icon el-icon-information"></i>
                </template>
                <el-card class="box-card">
                  <div  class="text item">
                    <p>合作方名称：{{info.detailed.name}}</p>
                    <p>产品类型：{{info.detailed.type}}</p>
                    <p>产品描述：{{info.detailed.desc}}</p>
                  </div>
                </el-card>
              </el-collapse-item>
            </el-collapse>
          </el-dialog>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'

  export default {
    name: 'app',
    data() {
      return {
        collapsed:false,
        tableData:[],
        relations:[],
        lookinfo: [],
        activeNames:["1"],
        nowIndex:-1,
//        tableData: Array(10).fill(item),
//        active:true,
        dialogVisible: false,
        editVisible:false,
        lookVisible:false,
        //新增界面数据
        addForm: {
          name: '',
          type: '',
          desc: ''
        },
        editForm:{},
        filters:{
          name:''
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
      handleopen() {
        //console.log('handleopen');
      },
      handleclose() {
        //console.log('handleclose');
      },
      handleselect: function (a, b) {
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
//        console.log(rowData.name);
      },
      handleChange:function(a){
//        console.log(a);
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
      handleDel: function (index, row) {
        alert(index);
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
            this.getUsers();
          });
        }).catch(() => {

        });
      },    }
  }
</script>

<style>
  .con_section{
    position: absolute;
    top: 0px;
    bottom: 0px;
    left:0px;
    width:100%;
  }
  .blueheader {
    height: 60px;
    line-height: 60px;
    background: #20a0ff;
    color: #fff;
  }
  .headlogo{
    float: left;
    height: 60px;
    margin: 0 20px;
    width: 300px;
  }
  ul.el-menu {
    background: #e4e8f1;
  }
  .userinfo{
    position: absolute;
    right: 0;
  }
  .el-submenu__title{
    background:#eef1f6;
  }
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

