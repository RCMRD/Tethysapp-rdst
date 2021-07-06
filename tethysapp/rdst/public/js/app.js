const app_control = (function () {
    /*
    * GLOBAL VARIABLES
    */
    let public_interface, map;
    const dims = {
        a0: [1189, 841],
        a1: [841, 594],
        a2: [594, 420],
        a3: [420, 297],
        a4: [165, 190],
        a5: [210, 148],
    };

    // selector variables
    let m_option1, m_option2, m_option3, map_layers, controls, counties, wq_layer,
        map1Layer, map2Layer;
    /*
    * FUNCTIONS
    */
    let bind_controls, update_options, create_pdf, init_map, init_events, init_all,
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

    update_options = function () {
        $('#option2').remove();
        $('#option3').remove();
        m_option1 = $('#option1').val();

        if (typeof controls[m_option1]['options'] != "undefined") {
            const select = $(`<select id="option2"></select>`);
            $('#navpanel').append($(select));
            for (const k in controls[m_option1]['options']) {
                $('#option2').append($('<option>', {
                    value: k,
                    text: controls[m_option1]['options'][k]['display']
                }));
            }



            $('#option2').on('change', function () {
                if (typeof $('#option3').remove() != "unrecognized expression") {
                    $('#option3').remove();

                    m_option2 = $('#option2').val();

                    if (typeof controls[m_option1]['options'][m_option2]['options'] != "undefined") {
                        const select = $(`<select id="option3"></select>`);
                        $('#navpanel').append($(select));
                        for (const n in controls[m_option1]['options'][m_option2]['options']) {
                            $('#option3').append($('<option>', {
                                value: n,
                                text: controls[m_option1]['options'][m_option2]['options'][n]['display']
                            }));
                        }

                    } else {
                        alert('Option does not exist');
                    }

                }

            });
        } else {
            alert('Option does not exist');
        }

    };

    bind_controls = function () {
        $('#option1').on('change', function () {
            let option1 = $('#option1').val();

            if (option1 !== m_option1) {
                m_option1 = option1;
                update_options();
            }

        });

        $('#option2').on('change', function () {
            alert('They changed it again');
        });
    };

    init_map = function () {
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
        const raster = new ol.layer.Tile({
            source: new ol.source.OSM()
        });

        const format = new ol.format.WKT();
        const feature = format.readFeature(
            "POLYGON((10.689697265625 -25.0927734375, 34.595947265625 " +
            "-20.1708984375, 38.814697265625 -35.6396484375, 13.502197265625 " +
            "-39.1552734375, 10.689697265625 -25.0927734375))"
        );
        feature.getGeometry().transform("EPSG:4326", "EPSG:3857");

        const vector = new ol.layer.Vector({
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
    create_pdf = function () {
        const exportButton = document.getElementById("createPDF");
        exportButton.addEventListener(
            "click",
            function () {
                exportButton.disabled = true;
                document.body.style.cursor = "progress";

                const format = document.getElementById("format").value;
                const resolution = document.getElementById("resolution").value;
                const dim = dims[format];
                const width = Math.round((dim[0] * resolution) / 25.4);
                const height = Math.round((dim[1] * resolution) / 25.4);
                const size = map.getSize();
                const viewResolution = map.getView().getResolution();
                const rcmrdimage = document.getElementById("rcmrd_image");
                const servirimage = document.getElementById("servir_image");
                const nasaimage = document.getElementById("nasa_image");
                const usaidimage = document.getElementById("usaid_image");
                const arrow = document.getElementById("north");
                const legend = document.getElementById("legend");
                const text = 
                    "NDVI is an index of plant greenness with maximum NDVI being\n"+
                    "a better indicator in drylands due to reduced risk of cloud\n"+
                    "contamination. NDVI ranges between -1, 1 where negative\n"+
                    "values represent water, snow or gaps; values < 0.1 represent \n"+
                    "barren ground, rocks; 0.2 - 0.5 represent sparse vegetation \n"+
                    "such as grasslands, shrubs, crops while values from 0.6 \n"+
                    "represent dense vegetation such as forests. NDVI can be used \n"+
                    "to monitor changes in vegetation over time, grazing impacts \n"+
                    "related to grazing management and plans, changes in land \n"+
                    "cover, rangeland condition and the type of vegetation."
                const pdf = new jsPDF("potrait", undefined, format).setProperties({
                    title: "PDF Map for County and Conservancy X"
                });
                const textLines = pdf
                    .setFont("Times New Roman")
                    .setFontSize(8.3)
                    .splitTextToSize(text,120)

                map.once("rendercomplete", function () {
                    const mapCanvas = document.createElement("canvas");
                    mapCanvas.width = width;
                    mapCanvas.height = height;
                    const mapContext = mapCanvas.getContext("2d");
                    Array.prototype.forEach.call(
                        document.querySelectorAll(".ol-layer canvas"),
                        function (canvas) {
                            if (canvas.width > 0) {
                                const opacity = canvas.parentNode.style.opacity;
                                mapContext.globalAlpha = opacity === "" ? 1 : Number(opacity);
                                const transform = canvas.style.transform;
                                // Get the transform parameters from the style's transform matrix
                                const matrix = transform
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

                    pdf.addImage(
                        mapCanvas.toDataURL("image/jpeg"),
                        "JPEG",
                        20,
                        40,
                        dim[0],
                        dim[1],
                        "canvas"
                    );
                    pdf.setDrawColor(0, 0, 0);
                    pdf.rect(20, 40, 165, 190, "S");
                    pdf.setDrawColor(255, 0, 0);
                    pdf.setFillColor(182, 183, 210);
                    pdf.rect(20, 242, 80, 37, "FD");
                    pdf.text(textLines, 21,247);
                    pdf.addImage(arrow, "PNG", 110, 235, 10, 10, "north");
                    pdf.addImage(usaidimage, "PNG", 110, 247, 20, 8, "usaid");
                    pdf.addImage(nasaimage, "PNG", 110, 257, 10, 10, "nasa");
                    pdf.addImage(rcmrdimage, "PNG", 110, 269, 20, 8, "rcmrd");
                    pdf.addImage(servirimage, "PNG", 110, 281, 20, 8, "servir");
                    pdf.addImage(legend, "PNG", 143, 235, 33, 45, "legend");
                    pdf.setFontSize(16);
                    pdf.setFont("courier", "bold")
                    pdf.text("PDF Map for County and Conservancy X", 35, 25)

                    pdf.save("map.pdf");
                    // Reset original map size
                    map.setSize(size);
                    map.getView().setResolution(viewResolution);
                    exportButton.disabled = false;
                    document.body.style.cursor = "auto";
                });

                // Set print size
                const printSize = [width, height];
                map.setSize(printSize);
                const scaling = Math.min(width / size[0], height / size[1]);
                map.getView().setResolution(viewResolution / scaling);
            },
            false
        );
    };

    init_events = function () {
        map_request = function (data_dict, layer, map) {
            const mapInfo = isCached(data_dict);
            if (mapInfo) {
                loadMap(JSON.parse(mapInfo), layer, map)
            } else {
                const xhr = $.ajax({
                    type: "POST",
                    url: 'get_map/',
                    dataType: "json",
                    data: data_dict,
                    cache: data_dict
                });
                xhr.done(function (data) {
                    if ("success" in data) {
                        if (typeof (Storage) !== "undefined") {
                            data.lastGatetwayUpdate = new Date();
                            localStorage.setItem(JSON.stringify(this.cache), JSON.stringify(data));
                        }
                        loadMap(data, layer, map);
                    } else {
                        alert('Opps, there was a problem processing the request. Please see the error: ' + data.error);
                    }
                });
            }

        };
        loadMap = function (data, layer, map) {
            layer.getSource().setUrl(data.url);
            map.addLayer(layer);
        };
    };

    init_all = function () {
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
        let workingLayer = num === 1 ? map1Layer : map2Layer;

        if (workingLayer) {
            wq_layer = workingLayer;
        } else {
            workingLayer = new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: '',
                    crossOrigin: 'Anonymous',
                    timeLoadFunction: function (tile, src) {
                        tile.setImage().src = src;
                    }
                })
            });
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
    }

    function isCached(data_dict) {
        if (typeof (Storage) !== "undefined") {
            if (localStorage.getItem(JSON.stringify(data_dict))) {
                const currentDate = new Date();
                currentDate.setDate(currentDate.getDate() - 1);
                const ls_item = JSON.parse(localStorage.getItem(JSON.stringify(data_dict)));
                if (new Date(ls_item.lastGatewayUpdate) > currentDate) {
                    return localStorage.getItem(JSON.stringify(data_dict));
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    }

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
    }
    /*

    * INITIALIZATIONS
    */
    $(function () {
        // initialize constants

        // const jspdf = window.jspdf;
        controls = $('#navpanel').data('controls');
        const select = $(`<select id="option1"></select>`);
        $('#navpanel').append($(select));
        for (const i in controls) {
            $('#option1').append($('<option>', {
                value: i,
                text: controls[i]['display']
            }))
        }

        counties = $('#county').data('counties');
        for (const j in counties) {
            $('#counties').append($('<option>', {
                value: j,
                text: counties[j]
            }))
        }

        $('#togglePdf').on('click', function () {
            const checkBox = document.getElementById("togglePdf");
            const pdfdiv = document.getElementById("pdfSection");
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