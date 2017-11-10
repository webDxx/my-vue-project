<template>
<div id="app">
  <el-container class="con_section">
    <el-header class="blueheader">
      <h2 class="headlogo">我的公司logo</h2>
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
      <el-aside style="flex: 0 0 230px;width: 230px;background:#eef1f6">
        <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>管理系统</template>
            <el-menu-item index="1">列表管理</el-menu-item>
            <el-menu-item index="2">表单管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="home_main">
        <el-col :span="24" class="breadcrumb-container">
          <strong class="title">{{$route.name}}</strong>
          <el-breadcrumb separator="/" class="breadcrumb-inner">
            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
              {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="24">
          <div style="margin-top:10px">
            <router-view></router-view>
          </div>
        </el-col>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
  export default {
    data(){
      return {
        searchCriteria: '',
      }
    },
    methods:{
      handleIconClick(ev) {
        console.log(ev);
      },
      handleSelect(key, keyPath){
        switch(key){
          case '1':
            this.$router.push('/product');
            break;
          case '2':
            this.$router.push('/forms')
            break;
        }
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    background: #67c23a;
    color: #fff;
  }
  .el-menu-item.is-active {
      color: #67c23a;
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
  .el_main{
    padding:0px;
  }
  .home_main{
    padding:10px;
  }
  .breadcrumb-container .title {
      width: 200px;
      float: left;
      color: #475669;
    font-size: 13px;
    }
  .breadcrumb-inner {
      float: right;
      font-size: 13px;
  }
  .el-breadcrumb__inner, .el-breadcrumb__inner a {
    font-weight: 400;
  }

</style>
