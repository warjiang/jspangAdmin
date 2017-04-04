<template>
  <el-table :data="flows" style="width:100%;" stripe>
    <el-table-column prop="Cookie" label="Cookie" width="180"></el-table-column>
    <el-table-column prop="Table" label="Table" width="180"></el-table-column>
    <el-table-column prop="Priority" label="Priority" width="180"></el-table-column>
    <el-table-column prop="Match" label="Match" align="180"></el-table-column>
    <el-table-column prop="Actions" label="Actions" align="180"></el-table-column>
    <!--<el-table-column prop="Apply Actions" label="Apply Actions" align="180"></el-table-column>-->
    <!--<el-table-column prop="Write Actions" label="Write Actions" align="180"></el-table-column>-->
    <!--<el-table-column prop="Clear Actions" label="Clear Actions" align="180"></el-table-column>-->
    <!--<el-table-column prop="Goto Group" label="Goto Group" align="180"></el-table-column>-->
    <!--<el-table-column prop="Goto Meter" label="Goto Meter" align="180"></el-table-column>-->
    <!--<el-table-column prop="Write Metadata	" label="Write Metadata" align="180"></el-table-column>-->
    <!--<el-table-column prop="Experimenter" label="Experimenter" align="180"></el-table-column>-->
    <el-table-column prop="Packets" label="Packets" align="180"></el-table-column>
    <el-table-column prop="Bytes" label="Bytes" align="180"></el-table-column>
    <el-table-column prop="Age" label="Age (s)" align="180"></el-table-column>
    <el-table-column prop="Timeout" label="Timeout (s)" align="180"></el-table-column>
  </el-table>
</template>

<script>
  import axios from 'axios'
  //import Router from 'vue-router';
  //console.dir(axios);

  function getOVSFlow(DPID){
      let url = `http://localhost/floodlight/wm/core/switch/${DPID}/flow/json`;
      console.log(url);
      return axios.get(url);
  }




  //let $route = new VueRouter()
  export default {
    data() {
      console.log($route.params.id);
      let flows = [];
      let d = {flows:flows};
      return d;
    },

    method: {}
  }


</script>
<style scoped>

</style>
