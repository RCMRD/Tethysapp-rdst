var counties_wms, conservancies_wms, grazing_blocks_wms, water_sources, surface_water, lakes, rivers, towns, protected_areas, acacia, opuntia, wards_wms, conflict_areas, migration_routes;


Ext.define('LandCover.view.WebMapping.GeoExtMapPanel',
{
	extend: 'GeoExt.panel.Map',
	alias: 'widget.GeoExtMapPanel',
	id: 'GeoExtMapPanelId',
	border: 'false',
	layout: 'fit',
	region: 'center',
	width: '100%',
	height:'100%',
	center: '29.577899,3.443310',
	zoom: 11,
	initComponent: function() 
	{
		var me = this,
		items = [],
		ctrl;

		map = new OpenLayers.Map('map', options);
		map.addControl(new OpenLayers.Control.LayerSwitcher());
		map.addControl(new OpenLayers.Control.Navigation({dragPanOptions: {enableKinetic: true}})); 
		map.addControl(new OpenLayers.Control.Scale());
		map.addControl(new OpenLayers.Control.LoadingPanel()); 

       
        ///Baselayers
        var mapbox_street = new OpenLayers.Layer.XYZ("Mapbox Street",
            ["http://a.tiles.mapbox.com/v4/mapbox.streets/${z}/${x}/${y}.png?access_token=pk.eyJ1Ijoid29uZGllIiwiYSI6InlKcXpXT1UifQ.BQ3hMXdyffGusTRN8JnWOg"], {
                sphericalMercator: true,
                wrapDateLine: true,
                numZoomLevels: 20,
                transitionEffect: 'resize'
            });

        var esri_topo_map = new OpenLayers.Layer.XYZ( "ESRI",
            "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/${z}/${y}/${x}",
            {sphericalMercator: true} );

         var esri_imagery = new OpenLayers.Layer.XYZ( "ESRI Imagery",
            "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}",
            {sphericalMercator: true} );

        var mapquest = new OpenLayers.Layer.XYZ(
            "Imagery",
            [
                "http://otile1.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.png",
                "http://otile2.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.png",
                "http://otile3.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.png",
                "http://otile4.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.png"
            ],
            {
                sphericalMercator: true,
                wrapDateLine: true,
                numZoomLevels: 20,
                //attribution: "Tiles Courtesy of <a href='http://open.mapquest.co.uk/' target='_blank'>MapQuest</a>. Portions Courtesy NASA/JPL-Caltech '>",
                transitionEffect: "resize"
            }
        );





        //console.log(recent_wms);

        //var default_wms = "modis.dekadal.20181101.tif"
        //latestWMS();


        var default_wms = recent_wms;
        var default_wms_layer = 'rangelands:' + default_wms;



        ndvi_wms = new OpenLayers.Layer.WMS(default_wms,
                    "https://maps.rcmrd.org/geoserver/wms",
                    {
                        layers: default_wms_layer,
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: true,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                );



        conservancies_wms = new OpenLayers.Layer.WMS("Conservancies",
                    "http://apps.rcmrd.org:8080/geoserver/wms",
                    {
                        layers: 'rangelands:conservancies',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    

                );


         grazing_blocks_wms = new OpenLayers.Layer.WMS("Grazing Blocks",
                    "http://apps.rcmrd.org:8080/geoserver/wms",
                    {
                        layers: 'rangelands:nrt_grazing_blocks',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }

                );

        counties_wms = new OpenLayers.Layer.WMS("Counties",
                    "http://apps.rcmrd.org:8080/geoserver/wms",
                    {
                        layers: 'rangelands:counties',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                );

        wards_wms = new OpenLayers.Layer.WMS("Wards",
                    "http://apps.rcmrd.org:8080/geoserver/wms",
                    {
                        layers: 'rangelands:kenya_wards',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                );
    

        invasive_species = new OpenLayers.Layer.WMS("Invasive Species",
                    "http://apps.rcmrd.org:8080/geoserver/wms",
                    {
                        layers: 'rangelands:invasive_species',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                );

        lakes = new OpenLayers.Layer.WMS("Lakes",
                    "http://apps.rcmrd.org:8080/geoserver/wms",
                    {
                        layers: 'rangelands:lakes',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                );
        
        rivers = new OpenLayers.Layer.WMS("Rivers",
                    "http://apps.rcmrd.org:8080/geoserver/wms",
                    {
                        layers: 'rangelands:rivers',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                );

        towns = new OpenLayers.Layer.WMS("Towns",
                    "http://apps.rcmrd.org:8080/geoserver/wms",
                    {
                        layers: 'rangelands:towns',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                );


        water_sources = new OpenLayers.Layer.WMS("Water Sources",
                    "http://apps.rcmrd.org:8080/geoserver/wms",
                    {
                        layers: 'rangelands:surface_water',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                );
          surface_water = new OpenLayers.Layer.XYZ(
            "Surface Water","https://earthengine.googleapis.com/map/"+pond_mapid+"/${z}/${x}/${y}?token="+pond_token,
            {
                    visibility: false,
                    isBaseLayer: false,
                    sphericalMercator: true,
                    yx : {'EPSG:3857' : true}
            }
          );
          //console.log(pond_mapid,pond_token)

        protected_areas = new OpenLayers.Layer.WMS("Protected Areas",
                    "http://apps.rcmrd.org:8080/geoserver/wms",
                    {
                        layers: 'rangelands:protected_areas',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                );

        opuntia = new OpenLayers.Layer.WMS("Opuntia Occurence",
                    "http://apps.rcmrd.org:8080/geoserver/wms",
                    {
                        layers: 'rangelands:opuntia_occurence',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                );

        acacia = new OpenLayers.Layer.WMS("Acacia Reficiens Occurence",
                    "http://apps.rcmrd.org:8080/geoserver/wms",
                    {
                        layers: 'rangelands:acacia_occurence',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                );

         conflict_areas = new OpenLayers.Layer.WMS("Conflict Areas",
                    "http://apps.rcmrd.org:8080/geoserver/wms",
                    {
                        layers: 'rangelands:conflict_areas',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }

                );

          migration_routes = new OpenLayers.Layer.WMS("Migration Routes",
                    "http://apps.rcmrd.org:8080/geoserver/wms",
                    {
                        layers: 'rangelands:migration_routes',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }

                );

           // reports symbology
        var report_select_style = new OpenLayers.Style({graphicYOffset: -24});
            var report_default_style = new OpenLayers.Style({graphicYOffset: -24});

            var report_style_map = new OpenLayers.StyleMap({
                'default': report_default_style,
                'select': report_select_style
            });

            //Start creating symbology rules
            var default_report_marker = new OpenLayers.Rule({
                title: "Report",
                symbolizer: {
                    'pointRadius': 12,
                    'cursor': "pointer",
                    externalGraphic: "/static/assets/images/markers/snowy.png"
                    //graphicYOffset: 2
                }
            });

            //Start creating symbology rules
            var selected_report_marker = new OpenLayers.Rule({
                title: "Reports",
                symbolizer: {
                    'pointRadius': 14,
                    'cursor': "pointer"
                }
            });

            report_default_style.addRules([default_report_marker]);
            report_select_style.addRules([selected_report_marker]);


        // Define proxy for getfeatureinfo

        var data_url = "/static/reports.geojson";



        var reports_layer = new OpenLayers.Layer.Vector("Invasive Species Reports", {
            isBaseLayer: false, displayInLayerSwitcher: true, visibility: false,
            styleMap: report_style_map,
            projection:  new OpenLayers.Projection('EPSG:4326'),
            //displayProjection: new OpenLayers.Projection("EPSG:4326"),
            transparent: true,
            strategies: [new OpenLayers.Strategy.Fixed()],
            protocol: new OpenLayers.Protocol.HTTP({
                url: data_url,
                format: new OpenLayers.Format.GeoJSON({
                        extractStyles: true,
                        extractAttributes: true
                    })
            })
        });


        function createPopup(feature) {

                var details = '<div class="popup_output">';
                details += '<div  class="marker_popup_content">'+

                //'<div class="columnA" ><strong>Source: </strong>'+
                // feature.attributes.USER+'</div>'+
                 '<div class="columnA"><strong>Date: </strong>'+
                 feature.attributes.DATA_TIME+'</div>'+
                 '<div class="columnA" ><strong>Abundance: </strong>'+
                 feature.attributes.ABUNDANCE+'</div>'+
                 '<div class="columnA" ><strong>Infected Area: </strong>'+
                 feature.attributes.INFECTED_AREA+'</div>'+
                 '<div class="columnA"><strong>Species: </strong>'+
                 feature.attributes.SPECIES+'</div>';
                details += '</div>';
                details += '</div>';

                var markerPopup = new GeoExt.Popup({
                    title: 'Invasive Species Report',
                    height:200,
                    width: 342,
                    location: feature,
                    cls:'popup_cls',
                    bodyPadding:'6px',
                    bodyStyle:'background:rgba(228, 225, 213, 0.83);',
                    html: details,
                    maximizable: true,
                    collapsible: true,
                    anchored: true,
                    moveable: true,
                    animCollapse: true,
                    shadow: true,
                    listeners: {
                        maximize: function (){
                            Ext.select('img.popup_img').setStyle('height',( (Ext.getBody().getViewSize().height*80 ) / 100)+'px');
                            Ext.select('img.popup_img').setStyle('width', 'auto');
                            Ext.select('img.popup_img').setStyle('max-height',( (Ext.getBody().getViewSize().height*80 ) / 100)+'px');
                        },
                        restore: function (){
                            Ext.select('img.popup_img').setStyle('width', '100%');
                            Ext.select('img.popup_img').setStyle('height', 'auto');
                            Ext.select('img.popup_img').setStyle('max-height', '320px');
                        }
                    }
                });


                // unselect feature when the popup
                // is closed
                markerPopup.on({
                    close: function () {
                        if (OpenLayers.Util.indexOf(reports_layer.selectedFeatures, this.feature) > -1) {
                            unselect.unselect(reports_layer.selectedFeatures.feature);
                        }
                    }
                });
                markerPopup.show();
            }



        var maxExtent = new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508),
        restrictedExtent = maxExtent.clone();
        maxResolution = 156543.0339;

        var options = {
            projection: new OpenLayers.Projection("EPSG:900913"),
            displayProjection: new OpenLayers.Projection("EPSG:4326"),
            units: "m",
            numZoomLevels: 20,
            maxResolution: maxResolution,
			//maxExtent: maxExtent,
			sphericalMercator: true,
			restrictedExtent: restrictedExtent
		};

		map.addControl(new OpenLayers.Control.MousePosition
			(	{
				id:'MousePosition_id',
			
				numDigits: 6,
				prefix: '(Lon/Lat)',
				emptyString: '',
				displayProjection: "EPSG:4326"
			}
			));
		
		zoomInCtrl = new OpenLayers.Control.ZoomIn();
		map.addControl(zoomInCtrl);

		zoomOutCtrl = new OpenLayers.Control.ZoomOut();
		map.addControl(zoomOutCtrl);
		
		navigationHistoryCtrl = new OpenLayers.Control.NavigationHistory();
		map.addControl(navigationHistoryCtrl);



        //When there is internet use this
        map.addLayers([ndvi_wms, migration_routes, conflict_areas, protected_areas, opuntia, acacia, surface_water, towns, reports_layer, rivers, lakes, grazing_blocks_wms, conservancies_wms, wards_wms, counties_wms,
            esri_imagery, mapbox_street]);

        reports_layer.events.on({
                featureselected: function (e) {
                    createPopup(e.feature);
                }
            });

        var select_field_report = new OpenLayers.Control.SelectFeature(
                reports_layer
            );
            map.addControl(select_field_report);
            select_field_report.activate();

		map.setCenter(new OpenLayers.LonLat(37.833516, 0.259953).transform(
			new OpenLayers.Projection("EPSG:4326"),
			map.getProjectionObject()
			), 6 );

        current_wms = default_wms;


    Ext.apply(me, 
    {
    	map: map

    });


    me.callParent(arguments);
}
});
