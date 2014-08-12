function initialize(data) {
	var location = new google.maps.LatLng(data.lat, data.lng);//for if we want to start elsewhere
	var map_canvas = document.getElementById('map_canvas');
	var image = 'http://www.google.com/intl/en_us/mapfiles/ms/micons/green-dot.png';
	var map_options = {
    	center: location,
    	zoom: 15,
    	mapTypeId: google.maps.MapTypeId.ROADMAP
  	}
	var map = new google.maps.Map(map_canvas, map_options)//make map with center at Uber

	var marker = new google.maps.Marker({//make marker at Uber and tie to map
      	position: location,
      	map: map,
      	title: data.text,
		icon: image
  	});
  	var infowindow = new google.maps.InfoWindow();
  	google.maps.event.addListener(marker, 'click', function(){//create infowindow for Uber
		infowindow.close();
		infowindow.setContent(data.text);
		infowindow.open(map,marker);
	});//add listener for infowindow
	
	//load truck markers
		//var json = jQuery.parseJson(data.json);
		jQuery.each(data.json, function(i, obj) {//for each entry
				var marker = new google.maps.Marker({//make new marker, tie to map
		      		position: new google.maps.LatLng(obj.latitude, obj.longitude),
		        	map: map,
		        	title: obj.name
		  		});
				google.maps.event.addListener(marker, 'click', function() {//add listener to create info window
			    	infowindow.close();
			    	infowindow.setContent('<h4>'+obj.name+'</h4>'+'<p>'+obj.address+'</p>'+'<p><b>Serves-</b> '+obj.serves+'</p>');
			    	infowindow.open(map, marker);
				});
			});//close each
	
	//load search box
    var input = (document.getElementById('truckSearch'));
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);//push controls for google maps-like feel
    var searchBox = new google.maps.places.SearchBox(input);//create search box
    google.maps.event.addListener(searchBox, 'places_changed', function() {//Listen for selection from suggestions
    		var places = searchBox.getPlaces();
    		var bounds = new google.maps.LatLngBounds();
    		for (var i = 0; i<places.length; i++) {//for each place create marker
      			var image = 'http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png';
      			var marker = new google.maps.Marker({
        			map: map,
					icon: image,
        			title: places[i].name,
        			position: places[i].geometry.location
      			});
				google.maps.event.addListener(marker, 'click', function() {//add listener to create info window
			    	infowindow.close();
			    	infowindow.setContent(places[i].name);
			    	infowindow.open(map, marker);
				});
      			bounds.extend(places[i].geometry.location);
    		}
    		map.fitBounds(bounds);
			map.setZoom(18);
  		});
  		google.maps.event.addListener(map, 'bounds_changed', function() {//this is to order by relevancy (distance)
    		var bounds = map.getBounds();
    		searchBox.setBounds(bounds);
  		});	
}//close function