<template>
   <el-table :data="NIBData" style="width: 100%" border stripe>
      <el-table-column prop="id"  label="id" width="80"></el-table-column>
      <el-table-column prop="ASnumDest" label="ASNum" width="150"></el-table-column>
      <el-table-column prop="ASnodeDestIPPrefix" label="IPPrefix" width=""></el-table-column>
    </el-table>
</template>

<script>
    import axios from 'axios';
    function getNIB(){
      return axios.get('http://localhost/json/NIB.json');
    }
    export default {
      data() {
        let NIBData = [
          {id:'',ASnumDest:'',ASnodeDestIPPrefix:''}
        ];
        let data = {
          NIBData:NIBData
        };

        getNIB().then((d)=>{
          let NIBData = [];
          let id = 1;
          let content = d.data;
          for(let key in content){
            let value = content[key];
            for(let subkey in value){
              let subvalue = value[subkey];
              let item = {
                id:id,
                //ASnumSrc:subvalue['ASnodeSrc']['ASnum'],
                ASnumDest:subvalue['ASnodeDest']['ASnum'],
                //ASnodeSrcIPPrefix:subvalue['ASnodeSrc']['IPperfix']['ip'],
                ASnodeDestIPPrefix:subvalue['ASnodeDest']['IPperfix']['ip'],
                //latency:subvalue['attribute']['latency'],
                //bandwidth:subvalue['attribute']['bandwidth'],
              };
              NIBData.push(item);
              id++;
            }
          }
          //console.log(data);
          //console.table(NIBData);
          data.NIBData = NIBData;
        });

        return data;
      }
    }
</script>
<style scoped>

</style>
