(()=>{"use strict";const e={"boundary-tiles":{type:"vector",url:"https://tiles.dvrpc.org/data/census_boundaries.json"},"sidewalk-tiles":{type:"vector",url:"https://tiles.dvrpc.org/data/pedestrian-network.json"},"mcpcv1-tiles":{type:"vector",url:"https://tiles.dvrpc.org/data/sidewalk-prioritiesv3.json"}},t=(e,t)=>{var i;(i=new XMLHttpRequest).open("GET","https://omad-api-lf2k9.ondigitalocean.app/sidewalk/all-munis",!0),i.setRequestHeader("Access-Control-Allow-Origin","*"),i.onload=function(){if(this.status>=200&&this.status<400){var i=JSON.parse(this.response);e.addSource("all-munis",{type:"geojson",data:i}),e.addLayer({id:"all-municipalities",type:"line",source:"all-munis",paint:{"line-color":"black","line-opacity":.5}},t)}},i.send(),(i=new XMLHttpRequest).open("GET","https://omad-api-lf2k9.ondigitalocean.app/sidewalk/one-muni/?q=Abington%20Township",!0),i.setRequestHeader("Access-Control-Allow-Origin","*"),i.onload=function(){if(this.status>=200&&this.status<400){var i=JSON.parse(this.response);e.addSource("one-muni",{type:"geojson",data:i}),e.addLayer({id:"selected-municipality",type:"line",source:"one-muni",paint:{"line-color":"red","line-opacity":0,"line-width":10}},t)}},i.send(),(i=new XMLHttpRequest).open("GET","https://omad-api-lf2k9.ondigitalocean.app/sidewalk/gaps-within-muni/?q=Abington%20Township",!0),i.setRequestHeader("Access-Control-Allow-Origin","*"),i.onload=function(){if(this.status>=200&&this.status<400){var i=JSON.parse(this.response);e.addSource("gaps",{type:"geojson",data:i}),e.addLayer({id:"clicked-gap",type:"line",source:"gaps",paint:{"line-color":"yellow","line-opacity":1,"line-width":{property:"island_count",default:100,stops:[[0,3],[1,10],[2,20]]}},filter:["in","uid","-1"]},t),e.addLayer({id:"gap-layer",type:"line",source:"gaps",paint:{"line-color":"rgb(57,83,164)","line-opacity":0,"line-width":{property:"island_count",default:100,stops:[[0,1],[1,5],[2,10]]}}},t)}},i.send(),(i=new XMLHttpRequest).open("GET","https://omad-api-lf2k9.ondigitalocean.app/sidewalk/pois-near-gap/?q=60943",!0),i.setRequestHeader("Access-Control-Allow-Origin","*"),i.onload=function(){if(this.status>=200&&this.status<400){var i=JSON.parse(this.response);e.addSource("selected_poi_data",{type:"geojson",data:i}),e.addLayer({id:"selected_pois",type:"circle",source:"selected_poi_data",paint:{"circle-radius":6,"circle-opacity":0,"circle-stroke-opacity":1,"circle-stroke-color":"black","circle-stroke-width":1,"circle-color":{property:"ab_ratio",default:"black",stops:[[0,"rgba(0, 0, 0, 1)"],[1e-4,"rgba(255, 0, 0, 1)"],[.1,"rgba(255, 153, 0, 1)"],[.5,"rgba(255, 255, 0, 1)"],[1,"rgba(0, 153, 0, 1)"]]}}},t)}},i.send()},i=(e,t)=>{let i="https://omad-api-lf2k9.ondigitalocean.app/sidewalk/one-muni/?q="+t.replace(" ","%20"),o="https://omad-api-lf2k9.ondigitalocean.app/sidewalk/gaps-within-muni/?q="+t.replace(" ","%20");var a;console.log(i),(a=new XMLHttpRequest).open("GET",i,!0),a.setRequestHeader("Access-Control-Allow-Origin","*"),a.onload=function(){if(this.status>=200&&this.status<400){var t=JSON.parse(this.response);e.getSource("one-muni").setData(t),e.setPaintProperty("selected-municipality","line-opacity",.5)}},a.send(),(a=new XMLHttpRequest).open("GET",o,!0),a.setRequestHeader("Access-Control-Allow-Origin","*"),a.onload=function(){if(this.status>=200&&this.status<400){var t=JSON.parse(this.response);e.getSource("gaps").setData(t),e.setPaintProperty("gap-layer","line-opacity",.5)}},a.send()},o=e=>{e.on("click","gap-layer",(function(t){var i=t.features[0].properties;console.log(i);var o=["in","uid",i.uid];console.log(o),e.setFilter("clicked-gap",o),e.flyTo({center:t.lngLat,zoom:15,essential:!0});var a=document.getElementById("stat-island");i.island_count<1?a.innerHTML="add to the sidewalk network where none currently exists":1==i.island_count?a.innerHTML='extend the coverage of  <span class="green-text" style="font-weight: bold">one</span> existing island':a.innerHTML='connect <span class="green-text" style="font-weight: bold">'+i.island_count+"</span> existing sidewalk islands";let s="https://omad-api-lf2k9.ondigitalocean.app/sidewalk/pois-near-gap/?q="+i.uid.toString();var n=new XMLHttpRequest;n.open("GET",s,!0),n.setRequestHeader("Access-Control-Allow-Origin","*"),n.onload=function(){if(this.status>=200&&this.status<400){var t=JSON.parse(this.response),i=Object.keys(t.features).length;e.getSource("selected_poi_data").setData(t),e.setPaintProperty("selected_pois","circle-stroke-opacity",1),e.setPaintProperty("selected_pois","circle-opacity",1),document.getElementById("stat-destinations").innerHTML='improve pedestrian connectivity to <span class="green-text" style="font-weight: bold">'+i+"</span> destinations"}},n.send(),document.getElementById("stat-box").style.setProperty("visibility","visible")}))},a=e=>{e.on("click","all_pois",(function(e){var t=e.features[0].properties,i=e.lngLat.lat,o=e.lngLat.lng;let a=((s=window.location.href.split("/")).pop(),s.join("/")+"/by-destination.html?lat="+i+"&lng="+o+"&id="+t.poi_uid+"&name="+t.poi_name.replace(" ","_")+"&ab_ratio="+t.ab_ratio.toString());var s;console.log(a),window.location.href=a}))},s=(e,t,i)=>{new mapboxgl.Popup({closeButton:!1,className:"i-am-a-popup"}).setLngLat(i.lngLat).setHTML(t).addTo(e)},n=()=>{var e=document.getElementsByClassName("mapboxgl-popup");e.length&&e[0].remove()},l=e=>{["gap-layer","all_pois"].forEach((t=>((e,t)=>{e.on("mouseenter",t,(()=>e.getCanvas().style.cursor="pointer")),e.on("mouseleave",t,(function(t){e.getCanvas().style.cursor=""}))})(e,t))),e.on("mouseenter","gap-layer",(function(t){s(e,"<h3>Click this gap to learn more</h3>",t)})),e.on("mouseleave","gap-layer",(function(e){n()})),e.on("mouseenter","all_pois",(function(t){var i=t.features[0].properties,o="<h3 class='green-text'>"+(e=>{try{var t=e.split(" ").map((e=>e[0].toUpperCase()+e.substr(1).toLowerCase())).join(" ")}catch{t=e}return t})(i.poi_name)+"</h3>";o+="<p style='text-align: center;'>"+(e=>{var t=100*e;if(t>100&&(t=100),100==t)var i="100%";else i=0==t?"No":t<0?"Only":String(t.toFixed(1))+"%";return i})(i.ab_ratio)+" sidewalk coverage</p>",s(e,o,t)})),e.on("mouseleave","all_pois",(function(e){n()}))};mapboxgl.accessToken="pk.eyJ1IjoiYWFyb25kdnJwYyIsImEiOiJja2NvN2s5dnAwaWR2MnptbzFwYmd2czVvIn0.Fcc34gzGME_zHR5q4RnSOg";const r={montco:{id:"montco",type:"line",source:"boundary-tiles","source-layer":"county",layout:{},paint:{"line-width":10,"line-opacity":.4,"line-color":"black"},filter:["==","CNTY_NAME","Montgomery County"]}},c={sw:{id:"sw",type:"line",source:"sidewalk-tiles","source-layer":"ped_lines",paint:{"line-width":4,"line-opacity":.2,"line-color":"black"},layout:{visibility:"visible"},filter:["all",["==","line_type",1],["==","county","MONTGOMERY"]]},xwalk:{id:"xwalk",type:"line",source:"sidewalk-tiles","source-layer":"ped_lines",paint:{"line-width":9,"line-opacity":.2,"line-color":"black"},layout:{visibility:"visible"},filter:["all",["==","line_type",2],["==","county","MONTGOMERY"]]},all_pois:{id:"all_pois",type:"circle",source:"mcpcv1-tiles","source-layer":"pois_centroids",layout:{},paint:{"circle-radius":3,"circle-opacity":.6,"circle-stroke-opacity":.6,"circle-stroke-color":"white","circle-stroke-width":1,"circle-color":"black"}}},p={sidewalks:{id:"sw",attribute:"line-width",style:["interpolate",["exponential",.5],["zoom"],10,.01,17,3]},crosswalks:{id:"xwalk",attribute:"line-width",style:["interpolate",["exponential",.5],["zoom"],10,.05,18,6]}},d=e=>{var t=document.getElementById("dropdown_muni"),o=document.getElementById("subtitle");t.addEventListener("change",(function(){var a=t.value;o.innerHTML=a,i(e,a),document.getElementById("stat-box").style.setProperty("visibility","hidden");let s="https://omad-api-lf2k9.ondigitalocean.app/sidewalk/one-muni-centroid/?q="+a.replace(" ","%20");var n=new XMLHttpRequest;n.open("GET",s,!0),n.setRequestHeader("Access-Control-Allow-Origin","*"),n.onload=function(){if(this.status>=200&&this.status<400){var t=JSON.parse(this.response);console.log(t),e.flyTo({center:[t[0].x,t[0].y],zoom:13,essential:!0})}},n.send()}))},u=new mapboxgl.Map({container:"map",style:"mapbox://styles/aarondvrpc/ckqhcmx6x95x318pgqzt4jicq",center:[-75.36277290123333,40.20129661107534],zoom:10});u.on("load",(function(){for(const t in e)u.addSource(t,e[t]);for(const e in r)u.addLayer(r[e],"road-label");t(u,"road-label");for(const e in c)u.addLayer(c[e],"road-label");for(const e in p)u.setPaintProperty(p[e].id,p[e].attribute,p[e].style);o(u),a(u),l(u),d(u)}))})();