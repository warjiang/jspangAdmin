<template>
   <el-table :data="switchData" style="width: 100%;cursor: pointer;" border stripe  @row-click="gotoFlows">
      <el-table-column prop="id"  label="id" width="80"></el-table-column>
      <el-table-column prop="DPID" label="DPID" width=""></el-table-column>
      <el-table-column prop="inetAddress" label="内部地址" width="160"></el-table-column>
      <el-table-column prop="connectedSince" label="连接时间" width="160"></el-table-column>
    </el-table>
</template>

<script>
    import axios from 'axios';
    function getSwitchList() {
      return axios.get('http://localhost/floodlight/wm/core/controller/switches/json');
    }
    export default {
      data() {
        let switchData =[{id:'', DPID:'',inetAddress:'',connectedSince:''}];//{id:'', DPID:''}
        let data = {
          switchData:switchData
        };
        getSwitchList().then((d)=>{
            let switchList = d['data'];
            //console.log(switchList);

            data.switchData = switchList.map((value,index)=>{
                return {
                  id:index+1,
                  DPID:value['switchDPID'],
                  inetAddress:value['inetAddress'],
                  connectedSince:value['connectedSince']
                }
            });
        });

        return data;
      },
      methods:{
          gotoFlows:function(row, event, column){
            let dpid = row['DPID'];
            //console.log(dpid);
            let url = `/ovsflow/${dpid}`;
            //console.log(url);
            window.location.href = url;

          }
      }
    }
</script>
<style scoped>

</style>
