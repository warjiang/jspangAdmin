<template>
  <el-table :data="RIBData" style="width:100%;" stripe>
    <el-table-column prop="src" label="src" width="180"></el-table-column>
    <el-table-column prop="dest" label="dest" width="180"></el-table-column>
    <el-table-column prop="srcIPPrefix" label="srcIPPrefix" width="180"></el-table-column>
    <el-table-column prop="destIPPrefix" label="destIPPrefix" width="180"></el-table-column>
    <el-table-column prop="pathKey" label="pathKey" width="180"></el-table-column>
    <el-table-column prop="pathNode" label="pathNode" align="180"></el-table-column>
  </el-table>
</template>

<script>
  import axios from 'axios'

  function getNIB(){
    return axios.get('http://localhost/json/NIB.json');
  }

  function getRIB() {
    return axios.get('http://localhost/json/RIB.json');
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
            //console.table(ASIPPrefixMap);
            resolve(ASIPPrefixMap);
        });
    });
  }



  export default {
    data:function() {
      let RIBData = [
        {src:'',dest:'',pathKey:'',pathNode:'',srcIPPrefix:'',destIPPrefix:''}
      ];
      let data = {
        RIBData:RIBData
      };
//      parseRIB().then((d)=>{
//        console.table(d);
//        data.NIBData = d;
//      });
      //console.log('execute');
      axios.all([parseNIB(),parseRIB()]).then(axios.spread((nib,rib)=>{
          //console.table(nib);
          //console.table(rib);
          for(let key in rib){
              let item = rib[key];
              let src = item['src'];
              let dest = item['dest'];
              //console.log(src,nib[src]);
              //console.log(dest,nib[dest]);
              item['srcIPPrefix'] = nib[src]?nib[src]['ip']:'unknown';
              item['destIPPrefix'] = nib[dest]?nib[dest]['ip']:'unknown';
          }

          //console.table(rib);
          data.RIBData = rib;
      }));
      return data
    },

    method: {}
  }
</script>
<style scoped>

</style>
