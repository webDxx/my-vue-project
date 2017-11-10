<template>
  <el-form ref="form"  label-width="80px">
    <h4>单选按钮篇</h4>
    <el-radio-group v-model="radio" style="color:#000;">
      <el-radio :label="1">选项1</el-radio>
      <el-radio :label="2">选项2</el-radio>
      <el-radio :label="3">选项3</el-radio>
    </el-radio-group>
    <el-radio-group v-model="radio2" size="small" @change="handleclick">
      <el-radio-button :label="4">111</el-radio-button>
      <el-radio-button :label="5">222</el-radio-button>
      <el-radio border :label="6">333</el-radio>
    </el-radio-group>
    <h4>多选框篇</h4>
    <el-checkbox-group v-model="check">
      <el-checkbox label="check1">多选1</el-checkbox>
      <el-checkbox label="check2">多选2</el-checkbox>
      <el-checkbox label="check3">多选3</el-checkbox>
      <el-checkbox label="check4" border>多选4</el-checkbox>
    </el-checkbox-group>
    <el-checkbox-group v-model="duoxuan" @change="checkClick">
      <el-checkbox v-for="name in names" :label="name">{{name}}</el-checkbox>
    </el-checkbox-group>
      <h4>输入框</h4>
      <el-form-item label="输入框">
          <el-col :span="24">
          <el-col :span="8">
              <el-input v-model="input" placeholder="请输入内容"><template slot="append">.com</template></el-input>
          </el-col>
          <el-col :span="8">
          <el-input type="textarea" autosize v-model="input2" placeholder="再次输入"></el-input>
          </el-col>
          <el-col :span="8">
          <el-input-number label="这是个计数器" v-model="number" :min="1" :max="10" @change="numberChange"></el-input-number>
          </el-col>
          </el-col>
      </el-form-item>
      <h4>选择器</h4>
      <el-select v-model="select" placeholder="请选择" @change="selectChange">
        <el-option v-for="o in options" :label="o.label" :value="o.value"></el-option>
      </el-select>
      <h4>小组件</h4>
      <el-switch
              style="display: block"
              v-model="switch11"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="Pay by month"
              inactive-text="Pay by year">
      </el-switch>
      <div class="block">
          <el-slider v-model="slider"></el-slider>
      </div>
    <el-button type="primary" @click="buttonclick">按钮</el-button>
  </el-form>
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'

  const namedata=["小明","小红","小蓝"];
  export default {
    data() {
      return {
        radio:1,
        radio2:4,
        check:["check1","check2"],
        duoxuan:["小蓝"],
        names:namedata,
        input:"",
          input2:"",
          number:"1",
          select:"",
          options:[
              {
                  label:"11",
                  value:"1111"
              },{
                  label:"22",
                  value:"2222"
              }
          ],
          switch11:true,
          slider:10
      }
    },
    methods: {
        //单选变化时触发
      handleclick:function(val){
        alert(val);
      },
      checkClick:function(val){
          console.log(val);
      },
        numberChange:function(val,preval){
          console.log(val);
          console.log(preval);
        },
        selectChange:function(a){
            console.log(a)
        },
        buttonclick:function(){
            alert(this.input);
        },
    }
  }
</script>

<style>
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
</style>

