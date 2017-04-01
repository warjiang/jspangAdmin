<script>
//  import * as d3 from 'd3';
  export default {
    name: 'vue-network',
    template: '<div></div>',
    mounted() {
      /*
      const width = 800;
      const height = 500;
      const svg = d3.select(this.$el)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
      let color = d3.scaleOrdinal(d3.schemeCategory20);
      let simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(100).strength(1))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));
        */
      /*
      d3.json('http://localhost/json/topo.json', (error, graph) => {
        if (error) throw error;
        let link = svg.append("g")
          .attr("class", "links")
          .selectAll("line")
          .data(graph.links)
          .enter().append("line")
          .attr("stroke-width", function (d) {
            return Math.sqrt(d.value);
          });
        let node = svg.append("g")
          .attr("class", "nodes")
          .selectAll("circle")
          .data(graph.nodes)
          .enter().append("circle")
          .attr("r", 5)
          .attr("fill", function(d) { return color(d.group); })
          .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
        node.append("title")
          .text(function(d) { return d.id; });

        simulation
          .nodes(graph.nodes)
          .on("tick", ticked);

        simulation.force("link")
          .links(graph.links);

        function ticked() {
          link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

          node
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
        }
        function dragstarted(d) {
          if (!d3.event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }

        function dragged(d) {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        }

        function dragended(d) {
          if (!d3.event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }
      });
      */
      const width = 800, height = 500
      let color = d3.scale.category10()
      let svg = d3.select(this.$el).append("svg")
        .attr("width", width)
        .attr("height", height);

      let force = d3.layout.force()
        .gravity(.05)
        .distance(200)
        .charge(-100)
        .size([width, height]);



      function containNodes(asnum,o) {
          try{
            o.forEach((value)=>{
              if(value['id'] == asnum){
                throw Error('find it')
              }
            })
          }catch(e){return true;}
          return false;
      }

      function containLinks(source,target,o) {
        try{
          o.forEach((value)=>{
            if((value['source'] == source && value['target'] == target)||(value['target'] == source && value['source'] == target)){
              throw Error('find it')
            }
          })
        }catch(e){return true;}
        return false;
      }
      //let ret = containNodes(65536,[]);
      //console.log(ret);
      d3.json('http://localhost/json/NIB.json', (data) => {
          let nodes = [],count_nodes = 0;
          let links = [];
          let map = {};
          let content = data;
          for(let key in content){
            let item = content[key];
            for(let subkey in item){
              let subitem = item[subkey];
              let ASnodeSrc = subitem['ASnodeSrc'];
              let ASnodeDest = subitem['ASnodeDest'];
              //维护as号与索引之间关系
              map[ASnodeSrc['ASnum']] = count_nodes;
              count_nodes++;
              map[ASnodeDest['ASnum']] = count_nodes;
              count_nodes++;
              if(!containNodes(ASnodeSrc['ASnum'],nodes)){
                nodes.push({
                  name:ASnodeSrc['ASnum'],
                  group:ASnodeSrc['ASnum']
                })
              }
              if(!containNodes(ASnodeDest['ASnum'],nodes)){
                nodes.push({
                  name:ASnodeDest['ASnum'],
                  group:ASnodeDest['ASnum']
                })
              }
            }

            for(let subkey in item){
              let subitem = item[subkey];
              let ASnodeSrc = subitem['ASnodeSrc'];
              let ASnodeDest = subitem['ASnodeDest'];
              let source = map[ASnodeSrc['ASnum']];
              let target = map[ASnodeDest['ASnum']];
              if(!containLinks(source,target,links)){
                links.push({
                  "source": source,
                  "target": target,
                  "weight": 5
                })
              }
            }
          }


          let graph = {
            nodes:nodes,
            links:links
          };

          //console.table(graph.nodes);
          //console.table(graph.links);
          force
            .nodes(graph.nodes)
            .links(graph.links)
            .start();

          let link = svg.selectAll(".link")
            .data(graph.links)
            .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", function(d) { return Math.sqrt(d.weight); });

          let node = svg.selectAll(".node")
            .data(graph.nodes)
            .enter().append("g")
            .attr("class", "node")
            .call(force.drag);

          node.append("circle")
            .attr("fill",function (d){return color(d.group);})
            .attr("r","10");

          node.append("text")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(function(d) { return 'AS'+d.name});

          force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
          });
      })
    },
  };
</script>

<style>
  .link {
    stroke: #aaa;
  }

  .node text {
    stroke:#333;
    cursos:pointer;
  }

  .node circle{
    stroke:#fff;
    stroke-width:3px;
    fill:#555;
  }
</style>
