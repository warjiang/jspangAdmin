<template>
  <el-table :data="NIBData" style="width:100%;" stripe>
    <el-table-column prop="ASnumSrc" label="ASnumSrc" width="180"></el-table-column>
    <el-table-column prop="ASnumDest" label="ASnumDest" width="180"></el-table-column>
    <el-table-column prop="ASnodeSrcIPPrefix" label="ASnodeSrcIPPrefix" width="180"></el-table-column>
    <el-table-column prop="ASnodeDestIPPrefix" label="ASnodeDestIPPrefix" align="180"></el-table-column>
    <el-table-column prop="latency" label="latency" align="180"></el-table-column>
    <el-table-column prop="bandwidth" label="bandwidth" align="180"></el-table-column>
  </el-table>
</template>

<script>
  import axios from 'axios'
  //console.dir(axios);

  function getNIB(){
      return axios.get('http://localhost/json/NIB.json');
  }

  function getRIB() {
      return axios.get('http://localhost/json/RIB.json');
  }





  export default {
    data:function() {
      let NIBData = [
        {ASnumSrc:'',ASnumDest:'',ASnodeSrcIPPrefix:'',ASnodeDestIPPrefix:'',latency:'',bandwidth:''}
      ];
      let data = {
        NIBData:NIBData
      };

      getNIB().then((d)=>{
          let NIBData = [];
          let content = d.data;
          for(let key in content){
              let value = content[key];
              for(let subkey in value){
                  let subvalue = value[subkey];
                  let item = {
                    ASnumSrc:subvalue['ASnodeSrc']['ASnum'],
                    ASnumDest:subvalue['ASnodeDest']['ASnum'],
                    ASnodeSrcIPPrefix:subvalue['ASnodeSrc']['IPperfix']['ip'],
                    ASnodeDestIPPrefix:subvalue['ASnodeDest']['IPperfix']['ip'],
                    latency:subvalue['attribute']['latency'],
                    bandwidth:subvalue['attribute']['bandwidth'],
                  };
                NIBData.push(item);
              }
          }
          //console.log(data);
          //console.table(NIBData);
          data.NIBData = NIBData;
      });
      return data;
    },

    method: {}
  }
</script>
<style scoped>

</style>
