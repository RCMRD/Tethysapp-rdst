var app_control = (function () {
	/*
	* GLOBAL VARIABLES
	*/
	var public_interface, map;
	var dims = {
		  a0: [1189, 841],
		  a1: [841, 594],
		  a2: [594, 420],
		  a3: [420, 297],
		  a4: [297, 210],
		  a5: [210, 148],
		};

	// selector variables
	var m_option1, m_option2, m_option3, map_layers, controls,counties, wq_layer,
	map1Layer, map2Layer;
	/*
	* FUNCTIONS
	*/
	var bind_controls,update_options, create_pdf, init_map, init_events, init_all,
	map_request, loadMap;
	
	/* 
	* FUNCTION IMPLEMENTATIONS
	*/
	// map_layers = new ol.layer.Tile ({
	// 	source: new ol.source.OSM()
	// })

	// create_map = function(){

	// 	var map = new ol.Map ({
	// 		layers:[map_layers],
	// 		target:'map',
	// 		view: new ol.View({
	// 			center: ol.proj.fromLonLat([34,0]),
	// 			zoom: 10
	// 		})
	// 	})
	// };

	update_options = function(){
		$('#option2').remove();
		$('#option3').remove();
		m_option1 = $('#option1').val();

		if (typeof controls[m_option1]['options'] != "undefined") {
			var select = $(`<select id="option2"></select>`);
			$('#navpanel').append($(select));
			for (var k in controls[m_option1]['options']){
				$('#option2').append($('<option>', {
					value:k,
					text: controls[m_option1]['options'][k]['display']
				}));
			};

			
			$('#option2').on('change', function(){
				if (typeof $('#option3').remove() != "unrecognized expression") {
					$('#option3').remove();

					m_option2 = $('#option2').val();

					if (typeof controls[m_option1]['options'][m_option2]['options'] != "undefined") {
						var select = $(`<select id="option3"></select>`);
						$('#navpanel').append($(select));
						for (var n in controls[m_option1]['options'][m_option2]['options']) {
							$('#option3').append($('<option>', {
								value:n,
								text: controls[m_option1]['options'][m_option2]['options'][n]['display']
							}));
						};
					} else {
						alert ('Option does not exist');
					};
				};
			});
		} else {
			alert('Option does not exist');
		};
	};

	bind_controls = function() {
		$('#option1').on('change', function(){
			let option1 = $('#option1').val();

			if (option1 !== m_option1) {
				m_option1 = option1;
				update_options();
			};
		});

		$('#option2').on('change', function(){
			alert('They changed it again');
		});
	};

	init_map = function(){
		// var mapOptions = {
  //           centre: [-0.5, 35],
  //           zoom: 4,
  //           maxZoom: 16,
  //           maxBounds: [[-10, 10], [10, 45]]
  //       };
  //       map = L.map('map').setView([-0.7, 33.5], 4);
  //       L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  //           attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  //           updateWhenIdle: false,
  //           updateWhenZooming: false,
  //           updateInterval: 500
  //       }).addTo(map);
  //       var editableLayers = new L.FeatureGroup();
  //       map.addLayer(editableLayers);

  //       var drawPluginOptions = {
  //           draw: {
  //               polygon: {
  //                   shapeOptions: {
  //                       color: 'rgb(6, 126, 245)'
  //                   }
  //               },
  //               polyline: false,
  //               circle: false,
  //               circlemarker: false,
  //               rectangle: {
  //                   shapeOptions: {
  //                       color: 'rgb(6, 126, 245)'
  //                   }
  //               },
  //               marker: true 
  //           },
  //           edit: {
  //               featureGroup: editableLayers,
  //               edit: false,
  //               remove: true
  //           }
  //       };

  //       var drawControl = new L.Control.Draw(drawPluginOptions);
  //       map.addControl(drawControl);

  //       map.on(L.Draw.Event.CREATED, function (e) {
  //           var type = e.layerType;
  //           drawnlayer = e.layer;
  //           gdrawnLayer = drawnlayer;
  //           createdPolyCoords = drawnlayer.toGeoJSON();
  //           gCreatedPoly = createdPolyCoords;
  //           editableLayers.addLayer(drawnlayer);
  //       });

  //       map.on('draw:drawstart', function (e) {
  //           if (drawnlayer) {
  //               drawnlayer.removeFrom(editableLayers);
  //           }
  //       });
		var raster = new ol.layer.Tile({
		  source: new ol.source.OSM()
		});

		var format = new ol.format.WKT();
		var feature = format.readFeature(
		  "POLYGON((10.689697265625 -25.0927734375, 34.595947265625 " +
		    "-20.1708984375, 38.814697265625 -35.6396484375, 13.502197265625 " +
		    "-39.1552734375, 10.689697265625 -25.0927734375))"
		);
		feature.getGeometry().transform("EPSG:4326", "EPSG:3857");

		var vector = new ol.layer.Vector({
		    source: new ol.source.Vector({
		    features: [feature]
		  }),
		  opacity: 0.5
		});

		map = new ol.Map({
		  layers: [raster],
		  target: "map",
		  view: new ol.View({
		    center: [0, 0],
		    zoom: 2
		  })
		});
	};
	create_pdf = function() {
		var exportButton = document.getElementById("createPDF");
		exportButton.addEventListener(
		  "click",
		  function () {
		    exportButton.disabled = true;
		    document.body.style.cursor = "progress";

		    var format = document.getElementById("format").value;
		    var resolution = document.getElementById("resolution").value;
		    var dim = dims[format];
		    var width = Math.round((dim[0] * resolution) / 25.4);
		    var height = Math.round((dim[1] * resolution) / 25.4);
		    var size = map.getSize();
		    var viewResolution = map.getView().getResolution();

		    map.once("rendercomplete", function () {
		      var mapCanvas = document.createElement("canvas");
		      mapCanvas.width = width;
		      mapCanvas.height = height;
		      var mapContext = mapCanvas.getContext("2d");
		      Array.prototype.forEach.call(
		        document.querySelectorAll(".ol-layer canvas"),
		        function (canvas) {
		          if (canvas.width > 0) {
		            var opacity = canvas.parentNode.style.opacity;
		            mapContext.globalAlpha = opacity === "" ? 1 : Number(opacity);
		            var transform = canvas.style.transform;
		            // Get the transform parameters from the style's transform matrix
		            var matrix = transform
		              .match(/^matrix\(([^\(]*)\)$/)[1]
		              .split(",")
		              .map(Number);
		            // Apply the transform to the export map context
		            CanvasRenderingContext2D.prototype.setTransform.apply(
		              mapContext,
		              matrix
		            );
		            mapContext.drawImage(canvas, 0, 0);
		          }
		        }
		      );
		      var pdf = new jsPDF("landscape", undefined, format);
		      pdf.addImage(
		        mapCanvas.toDataURL("image/jpeg"),
		        "JPEG",
		        15,
		        40,
		        dim[0],
		        dim[1]
		      );
		      pdf.text("Sample PDF using OpenStreet Maps", 35, 25);
		      pdf.save("map.pdf");
		      // Reset original map size
		      map.setSize(size);
		      map.getView().setResolution(viewResolution);
		      exportButton.disabled = false;
		      document.body.style.cursor = "auto";
		    });

		    // Set print size
		    var printSize = [width, height];
		    map.setSize(printSize);
		    var scaling = Math.min(width / size[0], height / size[1]);
		    map.getView().setResolution(viewResolution / scaling);
		  },
		  false
		);
	};

	init_events = function(){
		map_request = function(data_dict, layer, map){
			var mapInfo = isCached(data_dict);
			if (mapInfo) {
				loadMap(JSON.parse(mapInfo), layer, map)
			} else {
				var xhr = $.ajax({
					type: "POST",
					url: 'get_map/',
					dataType: "json",
					data: data_dict,
					cache: data_dict
				});
				xhr.done(function(data){
					if ("success" in data) {
						if (typeof (Storage) !== "undefined") {
							data.lastGatetwayUpdate = new Date();
							localStorage.setItem(JSON.stringify(this.cache), JSON.stringify(data));
						}
						loadMap(data,layer, map);
					} else {
						alert('Opps, there was a problem processing the request. Please see the error: '+ data.error);
					}
				});
			}
			return;
		};
		loadMap = function(data, layer, map){
			layer.setUrl(data.url);
			layer.addTo(map);
		};
	};

	init_all = function(){
		bind_controls();
		init_map();
		create_pdf();
		init_events();
	};

	/*
	* PUBLIC INTERFACE
	*/
	public_interface = {};

	 function getWQMap(which, num) {
        var workingLayer = num === 1 ? map1Layer : map2Layer;
        
        if (workingLayer) {
            wq_layer = workingLayer;
        } else {
            workingLayer = L.tileLayer('', {
                attribution:
                '<a href="https://earthengine.google.com" target="_">' +
                'Google Earth Engine</a>;'
            }).addTo(which);
        }
        if (num === 1) {
            map1Layer = workingLayer;
        } else {
            map2Layer = workingLayer;
        }
        
        map_request({
            collection: "MODIS/006/MOD13Q1",
            reducer: "min",
            option2: $('#option2').val(),
            visparams: getVisParams(),
            start_time: $("#time_start").val(),
            end_time: $("#time_end").val()
        }, workingLayer, which);
    };

    function isCached(data_dict) {
        if (typeof (Storage) !== "undefined") {
            if (localStorage.getItem(JSON.stringify(data_dict))) {
                var currentDate = new Date();
                currentDate.setDate(currentDate.getDate() - 1);
                var ls_item = JSON.parse(localStorage.getItem(JSON.stringify(data_dict)));
                if (new Date(ls_item.lastGatewayUpdate) > currentDate) {
                    return localStorage.getItem(JSON.stringify(data_dict));
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    };

    function getVisParams() {
        if ($("#option2").val() === "NDVI") {
            return JSON.stringify({
                "min": "0.0",
                "max": "9000",
                "palette": "FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, \
						    66A000, 529400, 3E8601, 207401, 056201, 004C00, 023B01, \
						    012E01, 011D01, 011301"
            });
    	}
    };
	/*

	* INITIALIZATIONS
	*/
	$(function(){
		// initialize constants

		// const jspdf = window.jspdf;
		controls = $('#navpanel').data('controls');
		var select = $(`<select id="option1"></select>`);
		$('#navpanel').append($(select));
		for (var i in controls) {
			$('#option1').append($('<option>', {
			value: i,
			text: controls[i]['display']
		}))
		};
		counties = $('#county').data('counties');
		for (var j in counties) {
			$('#counties').append($('<option>', {
				value: j,
				text: counties[j]
			}))
		};
		$('#togglePdf').on('click', function(){
			var checkBox = document.getElementById("togglePdf");
			var pdfdiv = document.getElementById("pdfSection");
			if (checkBox.checked == true) { 
				pdfdiv.style.display = "block";
			} else {
				pdfdiv.style.display = "none";
			}
		});

		$("#loadmap").on("click", function () {
            getWQMap(map, 1);
        });
		
		// initialize variables
		m_option1 = $('#option1').val();
		m_option2 = $('#option2').val();
		m_option3 = $('#option3').val();
		init_all();
	});

	return public_interface;
}());