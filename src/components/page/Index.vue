<template>
  <div >
    <v-pageTitle vtitle="DashBoard"></v-pageTitle>

    <div class="clear"></div>
    <!--拓扑图-->
    <el-row>
      <el-col :lg="24">
        <div>
          <network-topo></network-topo>
          <div>拓扑图</div>
        </div>
        <div>
          <span class="tips">floodlight@v1.2</span>
          <!--<button style="padding: 2px;"></button>-->
          <el-button type="primary" :loading="false">启动SIMRP</el-button>
        </div>
      </el-col>
    </el-row>

    <!--本自治域以及相邻自治域信息-->
    <el-row :gutter="20">
      <!--本自治域信息-->
      <el-col :lg="12">
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-card class="box-list">
            本自治域信息
            <hr>
            <ovs-border-table></ovs-border-table>
          </el-card>
        </el-col>
      </el-col>
      <!--相邻自治域信息-->
      <el-col :lg="12">
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-card class="box-list">
            相邻自治域信息
            <hr>
            <neighbor-border-table></neighbor-border-table>
          </el-card>
        </el-col>
      </el-col>
    </el-row>
  </div>



</template>

<script>
  import vPageTitle from '../common/pageTitle.vue';
//  import barChart from '../charts/barChart.vue';
//  import pieChart from '../charts/pieChart.vue';
//  import lineChart from '../charts/lineChart.vue';
//  import radarChart from '../charts/radarChart.vue';
//  import funnelChart from '../charts/funnelChart.vue';
//  import TodoList from '../todoList/TodoList.vue';
  import borderTable from '../tables/borderTable.vue';
//  import MessageList from '../message/MessageList.vue';
  import ElRow from "../../../node_modules/element-ui/packages/row/src/row";
  import NetworkTopo from "../NetWorkGraph/NetworkTopo.vue";
  import ovsBorderTable from "../NetWorkGraph/ovsBorderTable.vue";
  import neighborBorderTable from "../NetWorkGraph/neighborBorderTable.vue";
  import axios from 'axios'
  // nginx 反向代理获取floodlight REST API
  // 获取所有交换机信息
  function getSwitchList() {
    return axios.get('http://localhost/floodlight/wm/core/controller/switches/json');
  }
  function getSingleSwitchInfo(switchDPID){
    let url = `http://localhost/floodlight//wm/core/switch/${switchDPID}/flow/json`;
    return axios.get(url);
  }

//  getSwitchList().then((d)=>{
//      //console.log(d)
//      let switchList = d['data'];
//      return switchList.map((value,index)=>{
//        return value['switchDPID'];
//      });
//  }).then((switchInfo)=>{
//      //console.log(switchInfo);
//      let promiseList = switchInfo.map((value,index)=>{
//          return getSingleSwitchInfo(value);
//      });
//      Promise.all(promiseList).then(values => {
//        console.log(values); // [3, 1337, "foo"]
//      });
//  });
  //getSwitchList();
  //getSingleSwitchInfo(1111);
  export default {
    data(){
      return{
        //percentage:10
      }
    },
    components:{
      ElRow, vPageTitle,borderTable,NetworkTopo,ovsBorderTable,neighborBorderTable
    }
  }
</script>

<style scoped>
  .el-col{
    margin-bottom:16px;
    text-align:center;
  }
  .material-icons{
    font-size:80px;
    color:#ddd;
  }
  .box-card{
    height:110px;
  }
  .cart-string{
    height:100px;
    padding-top:10px;
    font-size:1.1rem;

  }
  .box-chart{
    height:420px;
  }
  .box-list{
    height:auto;
    text-align:left;
  }
  .box-list hr{
    height:1px;
    border:none;
    border-top:1px  dashed #ccc;
    margin-bottom:5px;
    margin-top:6px;

  }
  .tips{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    color: #1f2d3d;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    padding: 10px 15px;
    font-size: 16px;
    border-radius: 4px;
  }
</style>
