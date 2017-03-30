<template>
  <el-table :data="NIBData" style="width: 100%" stripe>
    <el-table-column prop="src" label="src" width="180"></el-table-column>
    <el-table-column prop="dest" label="dest" width="180"></el-table-column>
    <el-table-column prop="pathKey" label="pathKey" width="180"></el-table-column>
    <el-table-column prop="pathNode" label="pathNode" align="right"></el-table-column>
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

  function getPIB() {
    return axios.get('http://localhost/json/PIB.json');
  }


  //根据RIB.json解析出对应的路由表信息，包括源、目的IP、pathKey以及pathNode(pathNode用'->'join)
  function parseRIB() {
      return new Promise((resolve, reject)=>{
        getRIB().then((data)=>{
          let route = [];
          let d = data.data;
          for(let attr in d){
              let srcASN = attr;
              let content = d[srcASN];
              for(let content_key in content){
                  let content_item = content[content_key];
                  let item = content_item[content_key] || content_item[0];
                  route.push({
                    src:item["src"],
                    dest:item["dest"],
                    pathKey:item["pathKey"],
                    pathNode:item["pathNode"].join('->'),
                  })
              }
          }
          resolve(route);

        });
      })

  }
  let NIBData = [
    {src:'',dest:'',pathKey:'',pathNode:''}
  ];
  let data = {
    NIBData:NIBData
  };

  parseRIB().then((d)=>{
    console.table(d);
    NIBData = d;
  });

  export default {
    data() {
      return {
        NIBData:NIBData,
        render:()=>{
            console.log('render');
        }
      }
    },

    method: {}
  }
</script>
<style scoped>

</style>
