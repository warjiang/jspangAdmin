<template>
  <el-table :data="flows" style="width:100%;" stripe>
    <el-table-column prop="cookie" label="Cookie" width="200"></el-table-column>
    <el-table-column prop="tableId" label="Table" width="100"></el-table-column>
    <el-table-column prop="priority" label="Priority" width="100"></el-table-column>
    <el-table-column prop="match" label="Match" align="800" class="autoLine" style="word-wrap: break-word;word-break: normal;"></el-table-column>
    <el-table-column prop="actions" label="Actions" align="100"></el-table-column>
    <!--<el-table-column prop="Apply Actions" label="Apply Actions" align="180"></el-table-column>-->
    <!--<el-table-column prop="Write Actions" label="Write Actions" align="180"></el-table-column>-->
    <!--<el-table-column prop="Clear Actions" label="Clear Actions" align="180"></el-table-column>-->
    <!--<el-table-column prop="Goto Group" label="Goto Group" align="180"></el-table-column>-->
    <!--<el-table-column prop="Goto Meter" label="Goto Meter" align="180"></el-table-column>-->
    <!--<el-table-column prop="Write Metadata	" label="Write Metadata" align="180"></el-table-column>-->
    <!--<el-table-column prop="Experimenter" label="Experimenter" align="180"></el-table-column>-->
    <el-table-column prop="packetCount" label="Packets" align="100"></el-table-column>
    <el-table-column prop="byteCount" label="Bytes" align="100"></el-table-column>
    <el-table-column prop="durationSeconds" label="Age" align="100"></el-table-column>
    <!--<el-table-column prop="idleTimeoutSec" label="Timeout" align="100"></el-table-column>-->
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
      let dpid = window.location.href.substr(window.location.href.lastIndexOf('/')+1);
      let flows = [];
      let d = {flows:flows};
      getOVSFlow(dpid).then((data)=>{
        //console.log(d);
//        let arr = [];
//        for(let key in content){
//            let item = content[key];
//            let match = '';
//            for(let subkey in item['match']){
//              match += subkey+':'+item['match'][subkey]+'<br/>';
//            }
//            item['match'] = match;
//        }
        let content = data['data']['flows']||[];
        d.flows = content.map((value)=>{
          let match = '';
          for(let key in value['match']){
            match += key+':'+value['match'][key]+" ";
          }
          value['match'] = match;
          value['actions'] = value['actions']['actions'];
          return value;
        });

        //let flows = d['data'];
        //d.flows = flows;
      });
      return d;
    },

    method: {}
  }


</script>
<style>
  td>div.cell {
    word-wrap: break-word;
    word-break: normal!important;
  }
</style>
