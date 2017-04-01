<template>
  <div >
    <v-pageTitle vtitle="Configuration"></v-pageTitle>
    <el-row>
      <!--

      -->
      <el-col :span="24">
        <el-card class="box-card">
          <el-form :inline="true" :model="config" class="demo-form-inline" label-width="260px">
              <el-form-item label="SIMRPVersion">
                <el-input v-model="config.SIMRPVersion" placeholder="SIMRPVersion"></el-input>
              </el-form-item>
              <el-form-item label="holdingTime">
                <el-input v-model="config.holdingTime" placeholder="holdingTime"></el-input>
              </el-form-item>
              <el-form-item label="keepaliveTime">
                <el-input v-model="config.keepaliveTime" placeholder="keepaliveTime"></el-input>
              </el-form-item>
              <el-form-item label="sendHelloDuration">
                <el-input v-model="config.sendHelloDuration" placeholder="sendHelloDuration"></el-input>
              </el-form-item>
              <el-form-item label="sendUpdateNIBFirstCheck">
                <el-input v-model="config.sendUpdateNIBFirstCheck" placeholder="sendUpdateNIBFirstCheck"></el-input>
              </el-form-item>
              <el-form-item label="confSizeMB">
                <el-input v-model="config.confSizeMB" placeholder="confSizeMB"></el-input>
              </el-form-item>
              <el-form-item label="maxPathNum">
                <el-input v-model="config.maxPathNum" placeholder="maxPathNum"></el-input>
              </el-form-item>
              <el-form-item label="minBandwidth">
                <el-input v-model="config.minBandwidth" placeholder="minBandwidth"></el-input>
              </el-form-item>
              <el-form-item label="maxLatency">
                <el-input v-model="config.maxLatency" placeholder="maxLatency"></el-input>
              </el-form-item>
              <el-form-item label="FLOWMOD_DEFAULT_IDLE_TIMEOUT">
                <el-input v-model="config.FLOWMOD_DEFAULT_IDLE_TIMEOUT" placeholder="FLOWMOD_DEFAULT_IDLE_TIMEOUT"></el-input>
              </el-form-item>
              <el-form-item label="FLOWMOD_DEFAULT_HARD_TIMEOUT">
                <el-input v-model="config.FLOWMOD_DEFAULT_HARD_TIMEOUT" placeholder="FLOWMOD_DEFAULT_HARD_TIMEOUT"></el-input>
              </el-form-item>
              <el-form-item label="clientReconnectTimes">
                <el-input v-model="config.clientReconnectTimes" placeholder="clientReconnectTimes"></el-input>
              </el-form-item>
              <el-form-item label="clientReconnectInterval">
                <el-input v-model="config.clientReconnectInterval" placeholder="clientReconnectInterval"></el-input>
              </el-form-item>
              <el-form-item label="serverPort">
                <el-input v-model="config.serverPort" placeholder="serverPort"></el-input>
              </el-form-item>
              <el-form-item label="controllerOFport">
                <el-input v-model="config.controllerOFport" placeholder="controllerOFport"></el-input>
              </el-form-item>
          </el-form>
          <el-button type="primary" :loading="false" style="float: right;margin-bottom: 20px;"
                     v-on:click="submitConfig">确定</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>



</template>

<script>
  import vPageTitle from '../common/pageTitle.vue';
  import axios from 'axios';

  function getConfiguration() {
    return axios.get('http://localhost/getconfg');
  }



  export default {
    data(){
      let config = {
        SIMRPVersion:'',
        holdingTime:'',
        keepaliveTime:'',
        sendHelloDuration:'',
        sendUpdateNIBFirstCheck:'',
        confSizeMB:'',
        maxPathNum:'',
        minBandwidth:'',
        maxLatency:'',
        FLOWMOD_DEFAULT_IDLE_TIMEOUT:'',
        FLOWMOD_DEFAULT_HARD_TIMEOUT:'',
        clientReconnectTimes:'',
        clientReconnectInterval:'',
        serverPort:'',
        controllerOFport:'',
      };

      let data = {
          config:config
      };
      getConfiguration().then((d)=>{
        //console.log(d.data.config);
        data.config = d.data.config;
      });
      return data;
      /*
      {
        config: {
          SIMRPVersion:'',
          holdingTime:'',
          keepaliveTime:'',
          sendHelloDuration:'',
          sendUpdateNIBFirstCheck:'',
          confSizeMB:'',
          maxPathNum:'',
          minBandwidth:'',
          maxLatency:'',
          FLOWMOD_DEFAULT_IDLE_TIMEOUT:'',
          FLOWMOD_DEFAULT_HARD_TIMEOUT:'',
          clientReconnectTimes:'',
          clientReconnectInterval:'',
          serverPort:'',
          controllerOFport:'',
        }
      }
      */
    },
    components:{
      vPageTitle
    },
    methods: {
      submitConfig: function (event) {
        console.dir(this.config);
        axios.post('http://localhost/setconf',this.config).then((d)=>{
            window.alert('修改成功');
            window.location.reload();
            //console.log('success');
        })
//        axios.post('/user', {
//          firstName: 'Fred',
//          lastName: 'Flintstone'
//        })
      }

    }
  }
</script>

<style scoped>
  .el-col{
    margin-bottom:16px;
  }
  .box-card{
    font-size:12px;
  }
  .box-card hr{
    height:1px;
    border:none;
    border-top:1px  dashed #ccc;
    margin-bottom:10px;
    margin-top:6px;
  }
  .card-a{
    height:300px;
  }




</style>
