<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <el-menu-item index="/Index">

                    <span class="sb-icon"><i class="material-icons">home</i></span>
                    <span class="sb-cn">DashBoard</span>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">

                  <span class="sb-icon"><i class="material-icons">menu</i></span>
                  <span class="sb-cn">Information Base</span>

                </template>
                <el-menu-item index="/NIB">NIB表</el-menu-item>
                <el-menu-item index="/RIB">RIB表</el-menu-item>
                <el-menu-item index="/PIB">PIB表</el-menu-item>
            </el-submenu>

          <el-menu-item index="/Configuration">
            <span class="sb-icon"><i class="material-icons">build</i></span>
            <span class="sb-cn">Configuration</span>
          </el-menu-item>
        </el-menu>
    </div>
</template>
<script>
  import ElSubmenu from "../../../node_modules/element-ui/packages/menu/src/submenu";
    export default {
      components: {ElSubmenu}, computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>
<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 200px;
        left: 0;
        top: 66px;
        bottom:0;
        background: #324157;

    }
    .sidebar > ul {
        height:100%;
    }

   .el-menu-item, .el-submenu__title{
       font-size:14px;

   }

    .material-icons {font-size:12px;}
</style>
