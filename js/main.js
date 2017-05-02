'use strict';

//map js
var map;
//const api_key = config.MAP_KEY;
function initMap() {
  //console.log("initMap just ran");
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 45.5236966,
      lng: -122.660585
    },
    zoom: 13
  });
  //attempt


  let request = new Request('http://biketownpdx.socialbicycles.com/opendata/free_bike_status.json',{
    method: 'get',
    mode: 'cors',
    headers: new Headers({
  		'Content-Type': 'text/plain'
  	})
  });
  fetch(request).then(function(response_object){
    return response_object.json();
  }).then(function(json_object) {
    let results_list = document.querySelector('#results_list');
    //console.log(json_object.data)
    let current_bounty_bikes = json_object.data.bikes;
    let bike_total = current_bounty_bikes.length;
    //console.log("current total: ", bike_total);
    document.getElementById("total_bikes").textContent = bike_total;
    //write the data to the ul
    current_bounty_bikes.forEach(function(bike) {
      let bike_item = document.createElement('li');
      bike_item.classList.add('bike_entry');
      for(let property in bike) {
        if(property === 'is_reserved') {
          continue;
        }
        else if(property === 'is_disabled') {
          continue;
        }
        //print_bike_id(property, bike);
        //function : print_bike_id
        //function: print bike location
        //function print bike type
        let text_node = document.createTextNode(property + "->" + bike[property] + "\n");
        //text_node.classList.add('')
        bike_item.appendChild(text_node);
        //console.log(bike);
        const bike_loc = {lat: bike.lat, lng: bike.lon};
        //console.log(bike_loc);
        const marker = new google.maps.Marker({
              position: bike_loc,
              map: map,
              title: 'Bike Bounty!'
            });
      }
      //uncomment to print results from api call
      //results_list.appendChild(bike_item);

    });
  });
//end initMap function9
}

const print_bike_id = function(prop, bike) {
  if(bike.hasOwnProperty('bike_id')) {
    console.log(`ID: ${prop} : ${bike[prop]}`)
  }
  console.log(prop + ' : ' + bike[prop]);
}
