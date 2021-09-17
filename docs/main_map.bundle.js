(()=>{"use strict";const e={"boundary-tiles":{type:"vector",url:"https://tiles.dvrpc.org/data/census_boundaries.json"},"sidewalk-tiles":{type:"vector",url:"https://tiles.dvrpc.org/data/pedestrian-network.json"},"mcpcv1-tiles":{type:"vector",url:"https://tiles.dvrpc.org/data/sidewalk-prioritiesv3.json"}},t="62, 207, 150",i="178, 100, 168";var o=["all",["==","src_network","pedestriannetwork_lines"]],l=["all",["==","src_network","osm_edges_all_no_motorway"]];const s={montco:{id:"montco",type:"line",source:"boundary-tiles","source-layer":"county",layout:{},paint:{"line-width":10,"line-opacity":.4,"line-color":"black"},filter:["==","CNTY_NAME","Montgomery County"]},iso_osm:{id:"iso_osm",type:"fill",source:"mcpcv1-tiles","source-layer":"mcpc_isos",paint:{"fill-color":"rgba("+i+", 0.5)","fill-opacity":0},filter:l},iso_osm_outline:{id:"iso_osm_outline",type:"line",source:"mcpcv1-tiles","source-layer":"mcpc_isos",paint:{"line-color":"rgba("+i+", 0.5)","line-opacity":0,"line-width":3,"line-dasharray":[2,1.5,1,1.5]},filter:l},iso_sw:{id:"iso_sw",type:"fill",source:"mcpcv1-tiles","source-layer":"mcpc_isos",paint:{"fill-color":"rgba("+t+", 0.5)","fill-opacity":0},filter:o},iso_sw_outline:{id:"iso_sw_outline",type:"line",source:"mcpcv1-tiles","source-layer":"mcpc_isos",paint:{"line-color":"rgba("+t+", 0.5)","line-opacity":0,"line-width":3,"line-dasharray":[2,1.5,1,1.5]},filter:o}},a={sw:{id:"sw",type:"line",source:"sidewalk-tiles","source-layer":"ped_lines",paint:{"line-width":4,"line-opacity":.2,"line-color":"black"},layout:{visibility:"visible"},filter:["all",["==","line_type",1],["==","county","MONTGOMERY"]]},xwalk:{id:"xwalk",type:"line",source:"sidewalk-tiles","source-layer":"ped_lines",paint:{"line-width":9,"line-opacity":.2,"line-color":"black"},layout:{visibility:"visible"},filter:["all",["==","line_type",2],["==","county","MONTGOMERY"]]},clicked_gap:{id:"clicked_gap",type:"line",source:"mcpcv1-tiles","source-layer":"montco_missing_sidewalks",paint:{"line-color":"yellow","line-opacity":0,"line-width":{property:"island_count",default:100,stops:[[0,3],[1,10],[2,20]]}},layout:{visibility:"visible"}},gaps:{id:"gaps",type:"line",source:"mcpcv1-tiles","source-layer":"montco_missing_sidewalks",paint:{"line-color":"rgb(57,83,164)","line-opacity":0,"line-width":{property:"island_count",default:100,stops:[[0,1],[1,5],[2,10]]}},layout:{visibility:"visible"},filter:["==","uid","-1"]},selected_poi_entrypoints:{id:"selected_poi_entrypoints",type:"circle",source:"mcpcv1-tiles","source-layer":"pois_full",layout:{},paint:{"circle-radius":4,"circle-opacity":1,"circle-stroke-opacity":1,"circle-stroke-width":1,"circle-color":"black","circle-stroke-color":"white"},filter:["==","type","none - this filter should return zero results"]},all_pois:{id:"all_pois",type:"circle",source:"mcpcv1-tiles","source-layer":"pois_centroids",layout:{},paint:{"circle-radius":6,"circle-opacity":1,"circle-stroke-opacity":1,"circle-stroke-color":"black","circle-stroke-width":1,"circle-color":{property:"ab_ratio",default:"white",stops:[[0,"rgba(255, 255, 255, 0.8)"],[1e-4,"rgba(255, 0, 0, 1)"],[.1,"rgba(255, 153, 0, 1)"],[.5,"rgba(255, 255, 0, 1)"],[1,"rgba(0, 153, 0, 1)"]]}}},selected_poi:{id:"selected_poi",type:"circle",source:"mcpcv1-tiles","source-layer":"pois_centroids",layout:{},paint:{"circle-radius":20,"circle-opacity":0,"circle-stroke-opacity":0,"circle-stroke-width":8,"circle-stroke-color":"black"},filter:["==","type","none - this filter should return zero results"]}},r=e=>{["iso_sw","iso_osm","iso_sw_outline","iso_osm_outline"].forEach((t=>{e.setFilter(t,["==","src_network","none"])}))},n=e=>{r(e);["gaps","clicked_gap","selected-municipality"].forEach((t=>{e.setPaintProperty(t,"line-opacity",0)}));["selected_poi","selected_pois"].forEach((t=>{e.setPaintProperty(t,"circle-stroke-opacity",0)}))},c=e=>{document.getElementById(e).style.setProperty("display","none")},p=e=>{document.getElementById(e).style.setProperty("display","block")},d=(e,t)=>{document.getElementById(t).innerHTML=e},u=e=>{try{var t=e.split(" ").map((e=>e[0].toUpperCase()+e.substr(1).toLowerCase())).join(" ")}catch{t=e}return t},y=e=>{var t=100*e;if(t>100&&(t=100),100==t)var i="100%";else if(0==t)i="No";else if(t<0)i="Only";else i=String(t.toFixed(1))+"%";return i},g=(e,t)=>{let i="";return i=1==t?{"Public School":"Public School","Private School":"Private School","School - College, University":"College/University","Health Facility":"Health Care Facility","Food Store":"Food Store","Activity Center for Seniors or Disabled":"Activity Center for Senior/Disabled","Municipal Buildings":"Municipal Building",trailhead:"Trailhead",Libraries:"Library","Shopping Centers":"Shopping Center"}[e]:{"Public School":"Public Schools","Private School":"Private Schools","School - College, University":"Colleges/Universities","Health Facility":"Health Care Facilities","Food Store":"Food Stores","Activity Center for Seniors or Disabled":"Activity Centers for Senior/Disabled","Municipal Buildings":"Municipal Buildings",trailhead:"Trailheads",Libraries:"Libraries","Shopping Centers":"Shopping Centers"}[e],i},h=(e,t,i,o,l)=>{var s=new XMLHttpRequest;s.open("GET",t,!0),s.setRequestHeader("Access-Control-Allow-Origin","*"),s.onload=function(){if(this.status>=200&&this.status<400){var t=JSON.parse(this.response);e.addSource(o,{type:"geojson",data:t}),e.addLayer(l,i)}},s.send()},_=(e,t)=>{((e,t)=>{let i="selected-pois";h(e,"https://omad-api-lf2k9.ondigitalocean.app/sidewalk/pois-near-gap/?q=60943",t,i,{id:"selected_pois",type:"circle",source:i,paint:{"circle-radius":15,"circle-opacity":0,"circle-stroke-opacity":0,"circle-color":"rgba(0,0,0,0)","circle-stroke-width":3,"circle-stroke-color":{property:"ab_ratio",default:"black",stops:[[0,"rgba(0, 0, 0, 1)"],[1e-4,"rgba(255, 0, 0, 1)"],[.1,"rgba(255, 153, 0, 1)"],[.5,"rgba(255, 255, 0, 1)"],[1,"rgba(0, 153, 0, 1)"]]}}})})(e,t),((e,t)=>{let i="all-munis";h(e,"https://omad-api-lf2k9.ondigitalocean.app/sidewalk/all-munis",t,i,{id:"all-municipalities",type:"line",source:i,paint:{"line-color":"black","line-opacity":.5,"line-width":.5}})})(e,t),((e,t)=>{let i="one-muni";h(e,"https://omad-api-lf2k9.ondigitalocean.app/sidewalk/one-muni/?q=Abington%20Township",t,i,{source:i,id:"selected-municipality",type:"line",paint:{"line-color":"pink","line-opacity":0,"line-width":10}})})(e,t)},m=(e,t)=>{let i="https://omad-api-lf2k9.ondigitalocean.app/sidewalk/one-muni-centroid/?q="+t.replace(" ","%20");var o=new XMLHttpRequest;o.open("GET",i,!0),o.setRequestHeader("Access-Control-Allow-Origin","*"),o.onload=function(){if(this.status>=200&&this.status<400){var t=JSON.parse(this.response);e.flyTo({center:[t[0].x,t[0].y],zoom:13,essential:!0})}},o.send()},b=(e,t)=>{let i="https://omad-api-lf2k9.ondigitalocean.app/sidewalk/one-muni/?q="+t.replace(" ","%20");var o=new XMLHttpRequest;o.open("GET",i,!0),o.setRequestHeader("Access-Control-Allow-Origin","*"),o.onload=function(){if(this.status>=200&&this.status<400){var t=JSON.parse(this.response);e.getSource("one-muni").setData(t),e.setPaintProperty("selected-municipality","line-opacity",.8)}},o.send()},f=(e,t)=>{var i=new XMLHttpRequest;i.open("GET",t,!0),i.setRequestHeader("Access-Control-Allow-Origin","*"),i.onload=function(){if(this.status>=200&&this.status<400){var t=JSON.parse(this.response),i=["in","uid"].concat(t);e.setFilter("gaps",i),e.setPaintProperty("gaps","line-opacity",.5)}},i.send()},w=(e,t)=>{let i="https://omad-api-lf2k9.ondigitalocean.app/sidewalk/pois-near-gap/?q="+t.toString();var o=new XMLHttpRequest;o.open("GET",i,!0),o.setRequestHeader("Access-Control-Allow-Origin","*"),o.onload=function(){if(this.status>=200&&this.status<400){var t=JSON.parse(this.response);e.getSource("selected-pois").setData(t),e.setPaintProperty("selected_pois","circle-stroke-opacity",1);var i=Object.keys(t.features).length;let o=[];t.features.forEach((e=>{let t=e.properties.category;o.push(t)}));const l={};for(const e of o)l[e]=l[e]?l[e]+1:1;console.log(l);let s='improve pedestrian connectivity to <span class="green-text" style="font-weight: bold">'+i+"</span> destinations: <ul>";for(const[e,t]of Object.entries(l).sort(((e,t)=>t[1]-e[1]))){let i=g(e,t);s+="<li>"+t.toString()+" "+i+"</li>"}s+="</ul>",d(s,"stat-destinations")}},o.send()},v=(e,t)=>{var i="https://omad-api-lf2k9.ondigitalocean.app/sidewalk/walkshed-area/?q="+t,o=new XMLHttpRequest;o.open("GET",i,!0),o.setRequestHeader("Access-Control-Allow-Origin","*"),o.onload=function(){if(this.status>=200&&this.status<400){var t=JSON.parse(this.response);e.data.datasets[0].data=[t.pedestriannetwork_lines.area_in_square_miles],e.data.datasets[1].data=[t.osm_edges_all_no_motorway.area_in_square_miles],e.update()}},o.send()},k=(e,t,i,s,a,r)=>{(e=>{e.setPaintProperty("clicked_gap","line-opacity",0),e.setPaintProperty("selected_pois","circle-stroke-opacity",0)})(e),((e,t)=>{f(e,"https://omad-api-lf2k9.ondigitalocean.app/sidewalk/nearby-gaps/?q="+t)})(e,i=parseInt(i)),v(t,i),((e,t)=>{let i=["in","eta_uid",t.toString()];e.setFilter("iso_sw",["all",i,o]),e.setFilter("iso_sw_outline",["all",i,o]),e.setFilter("iso_osm",["all",i,l]),e.setFilter("iso_osm_outline",["all",i,l]),(e=>{e.setPaintProperty("iso_sw","fill-opacity",.7),e.setPaintProperty("iso_osm","fill-opacity",.7),e.setPaintProperty("iso_sw_outline","line-opacity",.9),e.setPaintProperty("iso_osm_outline","line-opacity",.9)})(e)})(e,i),((e,t)=>{var i=["in","poi_uid",parseInt(t)];e.setFilter("selected_poi",i),e.setFilter("selected_poi_entrypoints",i)})(e,i),e.flyTo({center:s,zoom:14,essential:!0}),e.getCanvas().style.cursor="";let n="@ "+u(decodeURI(a));d(n,"subtitle");let g=y(r)+" sidewalk coverage";d(g,"selected-poi-ratio"),e.setPaintProperty("selected_poi","circle-stroke-opacity",1),p("info-box"),p("walkshed-legend"),p("gap-legend"),c("stat-box"),c("selected-legend")},S=e=>{e.on("click","gaps",(function(t){var i=t.features[0].properties;((e,t,i,o)=>{var l=["in","uid",t];e.setFilter("clicked_gap",l),e.setPaintProperty("clicked_gap","line-opacity",.8),e.flyTo({center:i,zoom:15,essential:!0}),r(e),e.setFilter("selected_poi",["==","type","none"]);let s="";s=o<1?"add to the sidewalk network where none currently exists":1==o?'extend the coverage of  <span class="green-text" style="font-weight: bold">one</span> existing island':'connect <span class="green-text" style="font-weight: bold">'+o+"</span> existing sidewalk islands",d(s,"stat-island"),w(e,t),p("stat-box"),c("info-box"),c("walkshed-legend"),p("selected-legend")})(e,i.uid,t.lngLat,i.island_count)}))},P=(e,t,i)=>{new mapboxgl.Popup({closeButton:!1,className:"i-am-a-popup"}).setLngLat(i.lngLat).setHTML(t).addTo(e)},C=()=>{var e=document.getElementsByClassName("mapboxgl-popup");e.length&&e[0].remove()};mapboxgl.accessToken="pk.eyJ1IjoiYWFyb25kdnJwYyIsImEiOiJja2NvN2s5dnAwaWR2MnptbzFwYmd2czVvIn0.Fcc34gzGME_zHR5q4RnSOg";const x={sidewalks:{id:"sw",attribute:"line-width",style:["interpolate",["exponential",.5],["zoom"],10,.01,17,3]},crosswalks:{id:"xwalk",attribute:"line-width",style:["interpolate",["exponential",.5],["zoom"],10,.05,18,6]},all_pois:{id:"all_pois",attribute:"circle-radius",style:["interpolate",["linear"],["zoom"],10,2.5,18,8]},selected_poi:{id:"selected_poi",attribute:"circle-radius",style:["interpolate",["linear"],["zoom"],10,5,18,20]}},E=e=>{var t=document.getElementById("dropdown_category"),i={all:"All Points of Interest","Public School":"Public Schools","Private School":"Private Schools","School - College, University":"Colleges/Universities","Health Facility":"Health Care Facilities","Food Store":"Food Stores","Activity Center for Seniors or Disabled":"Activity Centers for Senior/Disabled","Municipal Buildings":"Municipal Buildings",trailhead:"Trailheads",Libraries:"Libraries","Shopping Centers":"Shopping Centers"};t.addEventListener("change",(function(){let o=i[t.value];if(d("@ "+o,"subtitle"),"all"==t.value)var l=null;else l=["==","category",t.value];e.setFilter("all_pois",l),n(e),["info-box","stat-box"].forEach((e=>{document.getElementById(e).style.setProperty("display","none")})),c("walkshed-legend"),e.setPaintProperty("selected-municipality","line-opacity",0),C(),document.getElementById("dropdown_muni").value="...",e.flyTo({center:[-75.36277290123333,40.20129661107534],zoom:10,essential:!0}),c("gap-legend")}))},F=e=>{var t=document.getElementById("dropdown_muni");t.addEventListener("change",(function(){var i=t.value;d("in "+i,"subtitle"),b(e,i),((e,t)=>{let i="https://omad-api-lf2k9.ondigitalocean.app/sidewalk/gaps-within-muni/?q="+t.replace(" ","%20");f(e,i)})(e,i),m(e,i),n(e),p("gap-legend")}))},q=new mapboxgl.Map({container:"map",style:"mapbox://styles/aarondvrpc/ckqhcmx6x95x318pgqzt4jicq",center:[-75.36277290123333,40.20129661107534],zoom:10}),L=(()=>{const e=document.getElementById("barChart");return new Chart(e,{type:"bar",data:{labels:[""],datasets:[{label:"Using existing sidewalks",backgroundColor:"rgba("+t+", 0.5)",borderColor:"rgba("+t+", 0.5)",data:[50]},{label:"If every road had sidewalks",backgroundColor:"rgba("+i+", 0.5)",borderColor:"rgba("+i+", 0.5)",data:[100]}]},options:{indexAxis:"y",maintainAspectRatio:!1}})})();q.on("load",(function(){v(L,"1007");for(const t in e)q.addSource(t,e[t]);for(const e in s)q.addLayer(s[e],"road-label");_(q,"road-label");for(const e in a)q.addLayer(a[e],"road-label");for(const e in x)q.setPaintProperty(x[e].id,x[e].attribute,x[e].style);((e,t)=>{e.on("click","all_pois",(function(i){var o=i.features[0].properties;k(e,t,o.poi_uid,i.lngLat,o.poi_name,o.ab_ratio)}))})(q,L),S(q),(e=>{["all_pois","gaps"].forEach((t=>((e,t)=>{e.on("mouseenter",t,(()=>e.getCanvas().style.cursor="pointer")),e.on("mouseleave",t,(function(t){e.getCanvas().style.cursor=""}))})(e,t))),e.on("mouseenter","all_pois",(function(t){var i=t.features[0].properties,o="<h3>"+u(i.poi_name)+"</h3>";o+="<p style='text-align: center;'>"+y(i.ab_ratio)+" sidewalk coverage</p>",P(e,o,t)})),e.on("mouseleave","all_pois",(function(e){C()})),e.on("mouseenter","gaps",(function(t){P(e,"<p class='italic' style='font-size: 80%; text-align:center'>Click this gap to learn more <br/> about nearby destinations</p>",t)})),e.on("mouseleave","gaps",(function(e){C()}))})(q),E(q),F(q);let t=(()=>{let e=new URLSearchParams(window.location).get("search");if(""==e)return null;{let t={};return e.split("&").forEach((e=>{let i=(e=e.replace("?","")).split("=");t[i[0]]=i[1]})),t}})();t&&(console.log(t),k(q,L,t.id,[t.lng,t.lat],t.name.replace("_"," "),t.ab_ratio))}))})();