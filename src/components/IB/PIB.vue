<template>
  <el-table :data="PIBData" style="width:670px;" stripe>
    <el-table-column prop="ASnum" label="ASnum" width="180"></el-table-column>
    <el-table-column prop="IPperfix" label="IPperfix" width="180"></el-table-column>
    <el-table-column prop="reason" label="reason" align="180"></el-table-column>
  </el-table>
</template>

<script>
  import axios from 'axios'
  //console.dir(axios);

  function getNIB(){
    return axios.get('http://localhost/json/NIB.json');
  }

  function getPIB() {
    return new Promise((resolve,reject)=>{
      axios.get('http://localhost/json/PIB.json').then((d)=>{
          resolve(d.data);
      })
    });
  }

  function parseNIB() {
    return new Promise((resolve,reject)=>{
      let ASIPPrefixMap = {};
      getNIB().then((data)=>{
        //console.log(data);
        let d = data.data;
        for(let key in d){
          let item = d[key];
          for(let subkey in item){
            //console.log(subkey,item[subkey]);
            let temp = item[subkey];
            let ASnodeDest = temp['ASnodeDest'];
            ASIPPrefixMap[ASnodeDest['ASnum']] = ASnodeDest['IPperfix'];
            let ASnodeSrc = temp['ASnodeSrc'];
            ASIPPrefixMap[ASnodeSrc['ASnum']] = ASnodeSrc['IPperfix'];
          }
        }
        resolve(ASIPPrefixMap);
      });
    });
  }





  export default {
    data:function() {
      let PIBData = [
        {dest:'',IPperfix:'',reason:''}
      ];
      let data = {
        PIBData:PIBData
      };
      axios.all([getPIB(),parseNIB()]).then(axios.spread((pib,nib)=>{
          //console.log(pib);
          //let data = pib.data;
          //console.table(nib);
          for(let key in pib){
              let item = pib[key];
              let dest = item['ASnum'];
              item['IPperfix'] = nib[dest] ? nib[dest]['ip']:'unknown';

          }
          data.PIBData = pib;
      }));
      return data
    },

    method: {}
  }
</script>
<style scoped>

</style>
