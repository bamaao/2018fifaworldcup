<template>
  <div id="app">
    <el-header style="text-align: right; font-size: 12px">
      <h1>
        <center>2018俄罗斯世界杯</center>
      </h1>
    </el-header>
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']" router>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>2018俄罗斯世界杯</template>
            <el-menu-item index="/champion">冠军竞猜</el-menu-item>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>小组赛</template>
            <el-submenu index="2-1">
              <template slot="title">A组</template>
              <el-submenu index="2-1-1">
                <template slot="title">第一轮</template>
                <el-menu-item index="/a/b">俄罗斯VS乌拉圭</el-menu-item>
              </el-submenu>
              <el-submenu index="2-1-2">
                <template slot="title">第二轮</template>
                <el-menu-item index="/a/b">乌拉圭VS埃及</el-menu-item>
              </el-submenu>
            </el-submenu>
            <!-- <el-menu-item-group>
              <template slot="title">A组</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="B组">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">C组</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">D组</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">E组</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">F组</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">G组</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">H组</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group> -->
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-menu"></i>淘汰赛</template>
            <el-menu-item-group>
              <template slot="title">八分之一决赛</template>
              <el-menu-item index="/helloWorld" >HelloWorld</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="四分之一决赛">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">半决赛</template>
              <el-menu-item index="/helloWorld" >HelloWorld</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">三四名决赛</template>
              <el-menu-item index="/helloWorld" >HelloWorld</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">决赛</template>
              <el-menu-item index="/a/b">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-main>
          <!-- <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table> -->
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
       <!--  <el-footer>
          <center>联系方式:Email:zouyccq@gmail.com</center>
        </el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  import Vue from 'vue'
  import Element from 'element-ui'
  import 'element-ui/lib/theme-chalk/index.css'
  Vue.use(Element)

  export default {
    data() {
    }
  }
</script>
