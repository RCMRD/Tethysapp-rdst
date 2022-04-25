// some data used in the forms
Ext.namespace('Ext.rangelands');

Ext.rangelands.counties = [];

Ext.rangelands.conservancies = [];

Ext.rangelands.nrt_grazing_blocks = [];

Ext.rangelands.nrt_rehab_areas = [];

Ext.rangelands.lwf_areas = [];

Ext.rangelands.lewa_blocks = [];

Ext.rangelands.county_blocks = []

Ext.rangelands.wards = [];
Ext.rangelands.wards2 = [];

Ext.rangelands.boundary = [
    ['Counties', 'County'], 
    ['NRT Conservancies', 'Conservancy'],
    ['NRT Grazing Blocks', 'NRT Grazing Blocks'],
    ['NRT Rehabilitation Areas', 'NRT Rehabilitation Areas'],
    ['LWF Areas', 'LWF Areas'],
    ['Lewa Blocks', 'Lewa Blocks'],
    ['County Grazing Blocks', 'County Grazing Blocks']
];

var countydata = [];

var conservancydata = [];

var stats_yr = '';
var stats_boundary = '';
var stats_region = '';


Ext.rangelands.years = [

    ['2022'],
    ['2021'],
    ['2020'],
    ['2019'],
    ['2018'],
    ['2017'],
    ['2016'],
    ['2015'],
    ['2014'],
    ['2013'],
    ['2012'],
    ['2011'],
    ['2010'],
    ['2009'],
    ['2008'],
    ['2007'],
    ['2006'],
    ['2005'],
    ['2004'],
    ['2003'],
    ['2002'],
    ['2001']
  
    
];

Ext.rangelands.months = [
    ['January',1],
    ['February',2],
    ['March',3],
    ['April',4],
    ['May',5],
    ['June',6],
    ['July',7],
    ['August',8],
    ['September',9],
    ['October',10],
    ['November',11],
    ['December',12]

    
];

Ext.rangelands.seasons = [
    ['Mar-Apr-May','01'],
    ['Oct-Nov-Dec','02']
    
];

Ext.rangelands.dekads1 = [
    ['Dekad 1 (1st - 10th)','01'],
    ['Dekad 2 (11th - 20th)','11'],
    ['Dekad 3 (21st - 30th)','21']
    
];

Ext.rangelands.dekads2 = [
    ['Dekad 1 (1st - 10th)','01'],
    ['Dekad 2 (11th - 20th)','11'],
    ['Dekad 3 (21st - 31st)','21']
    
];

Ext.rangelands.dekads3 = [
    ['Dekad 1 (1st - 10th)','01'],
    ['Dekad 2 (11th - 20th)','11'],
    ['Dekad 3 (21st - 28th)','21']
    
];

Ext.rangelands.dekads4 = [
    ['Dekad 1 (1st - 10th)','01'],
    ['Dekad 2 (11th - 20th)','11'],
    ['Dekad 3 (21st - 29th)','21']
    
];

function loadConfig(){

	var _url = '/appconfig/'
	/*
	$.ajax({
    	type: "GET",
    	url: _url,
    	//async: false,
    	dataType: "json",
		crossDomain: true,
    	success: function(data){
	*/

    		for(var i=0; i < rdst_data.counties.length; i++){
    			Ext.rangelands.counties.push([rdst_data.counties[i].name, rdst_data.counties[i].longitude, rdst_data.counties[i].latitude]);
    		}

    		for(var i=0; i < rdst_data.kenya_wards.length; i++){
    			Ext.rangelands.wards.push([rdst_data.kenya_wards[i].name, rdst_data.kenya_wards[i].county, rdst_data.kenya_wards[i].longitude, rdst_data.kenya_wards[i].latitude]);
    		}
    		
    		for(var i=0; i < rdst_data.lwf_areas.length; i++){
    			Ext.rangelands.lwf_areas.push([rdst_data.lwf_areas[i].name, rdst_data.lwf_areas[i].longitude, rdst_data.lwf_areas[i].latitude]);
    		}

    		for(var i=0; i < rdst_data.nrt_conservancies.length; i++){
    			Ext.rangelands.conservancies.push([rdst_data.nrt_conservancies[i].name, rdst_data.nrt_conservancies[i].longitude, rdst_data.nrt_conservancies[i].latitude]);
    		}


    		for(var i=0; i < rdst_data.nrt_rehab_areas.length; i++){
    			Ext.rangelands.nrt_rehab_areas.push([rdst_data.nrt_rehab_areas[i].name, rdst_data.nrt_rehab_areas[i].longitude, rdst_data.nrt_rehab_areas[i].latitude]);
    		}


    		for(var i=0; i < rdst_data.nrt_grazing_blocks.length; i++){
    			Ext.rangelands.nrt_grazing_blocks.push([rdst_data.nrt_grazing_blocks[i].name, rdst_data.nrt_grazing_blocks[i].longitude, rdst_data.nrt_grazing_blocks[i].latitude]);
    		}

    		for(var i=0; i < rdst_data.lewa_blocks.length; i++){
    			Ext.rangelands.lewa_blocks.push([rdst_data.lewa_blocks[i].name, rdst_data.lewa_blocks[i].longitude, rdst_data.lewa_blocks[i].latitude]);
    		}

            for(var i=0; i < rdst_data.county_blocks.length; i++){
                Ext.rangelands.county_blocks.push([rdst_data.county_blocks[i].name, rdst_data.county_blocks[i].longitude, rdst_data.county_blocks[i].latitude]);
             }

        	
	/*
    	}
	});
	*/




}


loadConfig();



function drawTrend(boundary1, region1, cropland, forest, grassland, shrubland, water, settlement, bareland){

	$('#chart_div').empty();

    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

            $('#chart_div').highcharts({

                credits: 
                {
                    text: 'MODIS NDVI',
                    href: 'http://rcmrd.org'
               },

                chart: 
                {
                    type: 'line'
                },

                title:
                {
                    text: 'MODIS NDVI timeseries for '+region1+' ' +boundary1
                },

                xAxis:
                {
                    tickWidth: 1,
                    gridLineWidth: 1,
                    title:{text:stats_yr,style:{color:"#4572A7"}},
                    type: 'category',
                    //categories: [],
					/*dateTimeLabelFormats: {
           				day: '%d-%m-%Y'    //ex- 01 Jan 2017
        			},*/
                    labels:{
						 //format: '{value:%d-%m-%Y}'
                     
                    }
                },

                yAxis: [
						{
                            labels:{formatter:function(){return this.value+" "},
                            style:{color:"#4572A7"}},
                            title:{text:"NDVI Utilization (%)",style:{color:"#4572A7"}},
							//min: 2,
							//max: 309
							//opposite:!0,
                        }
						
						
                
                ],

                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },

                tooltip:{
                    shared: true,
                    crosshairs: true
                },

                plotOptions:{
                    series : 
                    {
                        cursor : 'pointer',
                        point : 
                        {
                            events : 
                            {
                                click : function(e){
                                    //var chart = $('#highcharts-container').highcharts();
                                    //$chartName = chart.series[0].options.name;
                                 
                                }
                            }
                        },
                        marker : 
                        {
                            lineWidth : 1
                        }
                    }
                },
                series: [
                    {
                        name: 'CROPLAND',
                        data: cropland,
						//yAxis: 0
                    },
                    {
                        name: 'FOREST',
                        data: forest,
						//yAxis: 1
                    },
                    {
                        name: 'GRASSLAND',
                        data: grassland,
						//yAxis: 2
                    },
                    {
                        name: 'SHRUBLAND',
                        data: shrubland,
						//yAxis: 3
                    }/*,
                    {
                        name: 'WATER',
                        data: water,
						//yAxis: 4
                    },
                    {
                        name: 'SETTLEMENT',
                        data: settlement,
						//yAxis: 5
                    },
                    {
                        name: 'BARELAND',
                        data: bareland,
						//yAxis: 6
                    }
                   
                    */
                ]

                
            });

}



function plotStats(boundary_stats, region_stats, year){

	//alert(boundary_stats + ' ' + region_stats + ' ' + year);

	var cropland_data = [];
	var forest_data = [];
	var grassland_data = [];
	var shrubland_data = [];
	var water_data = [];
	var settlement_data = [];
	var bareland_data = [];
	

	$.ajax({
		type: "GET",
		url: '/stats/'+boundary_stats+'/'+region_stats+'/'+year+'/',
		async: false,
		dataType: "json",
		success: function(data){
9
			for(var i = 0; i < data.cropland.length; i++){
				cropland_data.push([
					data.cropland[i].month, parseFloat(data.cropland[i].mean)
					]);
			}

			for(var i = 0; i < data.forest.length; i++){
				forest_data.push([
					data.forest[i].month, parseFloat(data.forest[i].mean)
					]);
			}

			for(var i = 0; i < data.grassland.length; i++){
				grassland_data.push([
					data.grassland[i].month, parseFloat(data.grassland[i].mean)
					]);
			}

			for(var i = 0; i < data.shrubland.length; i++){
				shrubland_data.push([
					data.shrubland[i].month, parseFloat(data.shrubland[i].mean)
					]);
			}

			for(var i = 0; i < data.water.length; i++){
				water_data.push([
					data.water[i].month, parseFloat(data.water[i].mean)
					]);
			}

			for(var i = 0; i < data.settlement.length; i++){
				settlement_data.push([
					data.settlement[i].month, parseFloat(data.settlement[i].mean)
					]);
			}

			for(var i = 0; i < data.bareland.length; i++){
				bareland_data.push([
					data.bareland[i].month, parseFloat(data.bareland[i].mean)
					]);
			}


			if(chart_win){
				
				chart_win.hide();
				
			}
			

			drawTrend(boundary_stats, region_stats, cropland_data, forest_data, grassland_data, shrubland_data, water_data, settlement_data, bareland_data);


			chart_win.show(); 

		}
	})

}


function plotRainfall(){

	// submit data request

	var data_request_url = "https://climateserv.servirglobal.net/chirps/submitDataRequest/?datatype=32&begintime=01/01/2018&endtime=02/29/2018&intervaltype=0&operationtype=5&callback=successCallback&dateType_Category=default&isZip_CurrentDataType=false&layerid=admin_2_af&featureids=4642";

	$.ajax({
		type: "GET",
		url: data_request_url,
		async: false,
		dataType: "jsonp",
		crossDomain: true,
		success: function(data){



		    console.log(data);



		}
	});



	// get progress

	// get rain data



}


dojo.require("esri.tasks.gp");

var _county;
var _boundary;
var ndvi_tif = '';
var current_wms = '';

function makeGraph(ghgdata){
	var _gdata = [
		['Land Cover', 'Area (Ha)']
	];
	for(var x=0; x < ghgdata.length; x++){
		_gdata.push([ghgdata[x].cover, parseFloat(ghgdata[x].area)]);
	}

	return _gdata;
	
}

function loadLayer(wms_name){

	// check layer availability
	//var _url = '/raster/' + wms_name
	/*
	$.ajax({
    	type: "GET",
    	url: _url,
    	//async: false,
    	dataType: "json",
		crossDomain: true,
    	success: function(data){
	*/

        	if (allLayers.includes(wms_name)){

        		// clear current overlay
				var current_layer = map.getLayersByName(current_wms);
				if(current_layer.length != 0){
					map.removeLayer(current_layer[0]);
				}

				var wms_layer = new OpenLayers.Layer.WMS(wms_name,
						"https://maps.rcmrd.org/geoserver/wms",
						{
						   layers: 'rangelands:' + wms_name,
						   transparent: true,
						   format: "image/png"
						}, {
						       buffer: 0,
						       visibility: true,
						       displayOutsideMaxExtent: true,
						       displayInLayerSwitcher: true,
						       isBaseLayer: false,
						       yx : {'EPSG:4326' : true}
						});



				map.addLayer(wms_layer);

				map.setLayerIndex(wms_layer, 0);

				current_wms = wms_name;



        	} else {


        		Ext.Msg.alert("Data Unavailable","Please select another date");

        	}

    	//}
	//});




}



function highLight(_layer, _name){
	// filter sld and highligh selected county/conservancy
	//alert(_layer + ' ' + _name);
	// clear current selected
	var current_selected = map.getLayersByName("Selected Boundary");
	if(current_selected.length != 0){
		map.removeLayer(current_selected[0]);
	}

	var _layer_name, property_name, selected_wms;
	var sld = '';

	property_name = 'block';

	if( _layer == 'County'){
		_layer_name = "counties";
		
	} 

	else if( _layer == 'NRT Grazing Blocks'){
		_layer_name = "nrt_grazing_blocks";
		
	} 

	else if( _layer == 'NRT Rehabilitation Areas'){
		_layer_name = "nrt_rehab_areas";
		
	} 

	else if( _layer == 'LWF Areas'){
		_layer_name = "lwf_areas";
		
	}

	else if( _layer == 'Lewa Blocks'){
		_layer_name = "lewa_blocks";
		
	} 

	else if( _layer == 'Wards'){
		_layer_name = "kenya_wards";
		
	}

	else if( _layer == 'County Grazing Blocks'){
	    _layer_name = 'county_blocks';
	}

	else {
		_layer_name = "nrt_conservancies";
		
	}

	sld += '<sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" version="1.0.0">';
	sld += '<sld:NamedLayer><sld:Name>rangelands:';
	sld += _layer_name;
	sld += '</sld:Name><sld:UserStyle><sld:Name>query</sld:Name><sld:FeatureTypeStyle>'
	sld += '<sld:Rule>';
	sld += '<ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>';
	sld += property_name;
	sld += '</ogc:PropertyName><ogc:Literal>';
	sld += _name;
	sld += '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter>';
	sld += '<PolygonSymbolizer><Stroke><CssParameter name="stroke">#F933FF</CssParameter><CssParameter name="stroke-width">2</CssParameter>';
	sld += '</Stroke></PolygonSymbolizer></sld:Rule></sld:FeatureTypeStyle></sld:UserStyle></sld:NamedLayer></sld:StyledLayerDescriptor>';

	selected_wms = new OpenLayers.Layer.WMS("Selected Boundary",
			"http://apps.rcmrd.org:8080/geoserver/wms",
			{
			   layers: 'rangelands:' + _layer_name,
			   transparent: true,
			   format: "image/png",
			   SLD_BODY: sld
			}, {
			       //buffer: 0,
			       visibility: true,
			       displayOutsideMaxExtent: true,
			       //displayInLayerSwitcher: false,
			       isBaseLayer: false,
			       hover: true,
			       yx : {'EPSG:4326' : true},
			       singleTile: true,
			       tiled: false
			});

	map.addLayer(selected_wms);



}

// load vci ftp links
function loadFTPlinks(_name){

	var vcigrid = Ext.getCmp('vci_downgrid').getStore();
	vcigrid.removeAll();  

	var ftp_data = [];

	for(var i=0; i < vci_product_links.ftp_links.length; i++){

		var county_ftp = vci_product_links.ftp_links[i].name;
		if(county_ftp == _name){

			var reports = vci_product_links.ftp_links[i].reports;

			for(var j=0; j < vci_product_links.ftp_links[i].reports.length; j++){
				var ftp_label = vci_product_links.ftp_links[i].reports[j][0];
				var ftp_link = vci_product_links.ftp_links[i].reports[j][1];
				var ftp_url = "<a href='" + ftp_link + "'>" + ftp_label + "</a>";

				ftp_data.push({label1: ftp_url});
			}

			var forecasts = vci_product_links.ftp_links[i].forecasts;

			for(var k=0; k < vci_product_links.ftp_links[i].forecasts.length; k++){
				var ftp_label = vci_product_links.ftp_links[i].forecasts[k][0];
				var ftp_link = vci_product_links.ftp_links[i].forecasts[k][1];
				var ftp_url = "<a href='" + ftp_link + "' target='_blank'>" + ftp_label + "</a>";

				ftp_data.push({label1: ftp_url});
			}


		}

	}

	vcigrid.loadData(ftp_data, true)


}


// add grazing blocks to conservancy
function addGrazingWms(_name){

	var current_selected = map.getLayersByName("Grazing Blocks");
	if(current_selected.length != 0){
		map.removeLayer(current_selected[0]);
	}

    var selected_wms;

	var _layer_name = 'nrt_grazing_blocks';
	var property_name = 'conservanc';

    var sld = '';

	sld += '<sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" version="1.0.0">';
	sld += '<sld:NamedLayer><sld:Name>rangelands:';
	sld += _layer_name;
	sld += '</sld:Name><sld:UserStyle><sld:Name>query</sld:Name><sld:FeatureTypeStyle>'
	sld += '<sld:Rule>';
	sld += '<ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>';
	sld += property_name;
	sld += '</ogc:PropertyName><ogc:Literal>';
	sld += _name;
	sld += '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter>';
	sld += '<PolygonSymbolizer><Stroke><CssParameter name="stroke">#39f9ee</CssParameter><CssParameter name="stroke-width">2</CssParameter>';
	sld += '</Stroke></PolygonSymbolizer></sld:Rule></sld:FeatureTypeStyle></sld:UserStyle></sld:NamedLayer></sld:StyledLayerDescriptor>';

	selected_wms = new OpenLayers.Layer.WMS("Grazing Blocks",
			"http://apps.rcmrd.org:8080/geoserver/wms",
			{
			   layers: 'rangelands:' + _layer_name,
			   transparent: true,
			   format: "image/png",
			   SLD_BODY: sld
			}, {
			       //buffer: 0,
			       visibility: true,
			       displayOutsideMaxExtent: true,
			       //displayInLayerSwitcher: false,
			       isBaseLayer: false,
			       hover: true,
			       yx : {'EPSG:4326' : true},
			       singleTile: true,
			       tiled: false
			});

	map.addLayer(selected_wms);



}



var gpTask;

function generate_Map(ndvi_file, shapefile, fieldvalue, overlays) 
		{
			
			//var county_or_conservancy_name = fieldvalue;
			var county_or_conservancy_name = fieldvalue;
			var gis_shapefile_name = shapefile;
			//var gis_shapefile_name = 'Kenya_Range_Counties.shp';
			var normalized_difference_vegetation_index_filename = ndvi_file;
			//var normalized_difference_vegetation_index_filename = 'ea_20010101.tif';

			// original wps endpoint
			//var gpTaskUrl = "http://maps.rcmrd.org/arcgis/rest/services/wps/KenyaRangelandMapGenerator/GPServer/Kenya_Rangeland_Map_Generator";

			//var gp_Parameters = {"county_or_conservancy_name":county_or_conservancy_name, "gis_shapefile_name":gis_shapefile_name,"normalized_difference_vegetation_index_filename":normalized_difference_vegetation_index_filename};

			// modified wps endpoint
			//var gpTaskUrl = "http://maps.rcmrd.org/arcgis/rest/services/Kenya/Kenya_Rangelands_Map_Generator/GPServer/Kenya_Rangeland_Map_Generator";
			var gpTaskUrl = "https://maps.rcmrd.org/arcgis/rest/services/wps/KenyaRangelandMapGenerator/GPServer/Kenya_Rangeland_Map_Generator";

			var gp_Parameters = {"county_or_conservancy_name":county_or_conservancy_name, 
								"gis_shapefile_name":gis_shapefile_name,
								"normalized_difference_vegetation_index_filename":normalized_difference_vegetation_index_filename, 
								"invasive_layer_selection": overlays[8],
								"lakes_layer_selection": overlays[10],
								"towns_layer_selection": overlays[7],
								"acacia_layer_selection": overlays[5],
								"protected_layer_selection": overlays[3],
								"surface_layer_selection": overlays[6],
								"opuntia_layer_selection": overlays[4],
								"ndvi_layer_selection": "true", 
								"rivers_layer_selection": overlays[9],
								"grazingblocks_selection": overlays[11],
								"migration_routes_selection": overlays[1],
								"conflict_areas_selection": overlays[2]};

			gpTask = new esri.tasks.Geoprocessor(gpTaskUrl, 
			{
				async : true
			});
			
			dojo.connect(gpTask, "onJobComplete",onTaskComplete);
			dojo.connect(gpTask, "onStatusUpdate",onTaskStatus);			
			dojo.connect(gpTask, "onError",onTaskFailure);


			gpTask.submitJob(gp_Parameters);
			
		}

		function onTaskComplete(jobInfo) 
		{
			console.log("Job ID: " + jobInfo.jobId);
			gpTask.getResultData(jobInfo.jobId,"PDF_Output_File", downloadFile);
			
		}
		
		function onTaskStatus(jobInfo)
		{
			//document.getElementById("Download_PDF_Output_File").innerHTML =jobInfo.jobStatus;
			console.log(jobInfo.jobStatus);

			Ext.MessageBox.show({
			           msg: 'Generating map, please wait...',
			           //progressText: 'Processing...',
			           width:300,
			           wait:true,
			           //waitConfig: {interval:200},
			           icon:'ext-mb-download', //custom class in msg-box.html
			           iconHeight: 50
			           //animateTarget: 'mb7'
			       });
		}

		function onTaskFailure(error) 
		{
			console.log("Error Message: "+ error); 
		}
		function downloadFile(PDF_Output_File)
		{
			var pdf_download_url = PDF_Output_File.value.url; 
			//document.getElementById("Download_PDF_Output_File").innerHTML = "<a href="+pdf_download_url+" target=_blank>Click to Download Map</a>";
			//console.log("Map Output Download Link: " + pdf_download_url); 

			// load map download link
			var _downgrid = Ext.getCmp('downgrid').getStore();
			//_downgrid.removeAll();      

			var map_link = pdf_download_url;
			var link_label = map_link.split('/');
			var _link_label = link_label[11];

			var map_url = "<a href='" + map_link + "' target=_blank>" + _link_label + "</a>";
			var mapdata = [
				{label1: map_url}
			];

			_downgrid.loadData(mapdata, true); 

			var _msg = "NDVI map generated <a href='" + map_link + "' target=_blank>View Map</a>";

			Ext.Msg.alert('Done', _msg); 

		}

var splash_win = new Ext.Window
					({
						width:500,
						height:600,
						autoScroll:true,
						title: 'RANGELANDS DECISION SUPPORT TOOL',
						autoLoad:{
							url:'/static/rdst/pages/splash.html'
						}
					});

splash_win.show();


var chart_win = new Ext.Window
					({
						width:750,
						height:450,
						autoScroll:true,
						title: 'MODIS NDVI Time Series',
						contentEl: 'chart_div',
						closeAction: 'hide'
					});

var rain_win = new Ext.Window
					({
						width:750,
						height:450,
						autoScroll:true,
						title: 'Rainfall(mm)',
						contentEl: 'chart_div',
						closeAction: 'hide'
					});


Ext.define('LandCover.controller.WebMapping.ButonOnclickActions', {
	extend: 'Ext.app.Controller',
	init: function(){
		
		this.control(
		{		
			'WebMappingViewport button[action=generateMap]':
			{
				click:function() {

					var _vector_, _property;
					var _boundarytype = Ext.getCmp('boundarytype').getValue();
					var _feature = Ext.getCmp('county').getValue();
					var _ward = Ext.getCmp('ward').getValue();

					//alert(_ward);

					if(_ward == null){

						if( _boundarytype == 'County'){
							_vector = "Kenya_Counties.shp";
							_property = 'NAME';

						} else if( _boundarytype == 'NRT Grazing Blocks'){
							_vector = "NRT_Grazing_Blocks.shp";
							_property = 'GrazingBlo';

						} else if( _boundarytype == 'NRT Rehabilitation Areas'){
							_vector = "NRT_Rehab_Areas.shp";
							_property = 'Site_1';

						} else if( _boundarytype == 'LWF Areas'){
							_vector = "LWF_Areas.shp";
							_property = 'NAME_96';

						} else if( _boundarytype == 'Lewa Blocks'){
							_vector = "Lewa_Gb.shp";
							_property = 'Block';


						} else if( _boundarytype == 'County Grazing Blocks'){
							_vector = "All_Grazing_Blocks.shp";
							_property = 'Name_2';

						}

						else {
							_vector = "NRT_Conservancies.shp";
							_property = 'Conservanc';
						}

					} else {
						_vector = "Kenya_Ward.shp";
						_property = 'NAME';
						_feature = _ward;
					}

					

					var overlays = [];

					
					var map_layers = map.layers;
					//alert(map_layers[3].isBaseLayer);
					for(var i=0; i < map_layers.length; i++){
						if(map_layers[i].isBaseLayer == false){
							if(map_layers[i].visibility == true){

								overlays.push("true");
								//alert(map_layers[i].name);

							} else {
								overlays.push("false");
							}
						}
					}

					

					generate_Map(ndvi_tif, _vector, _feature, overlays);


					/*
					setTimeout(function(){

						
                		Ext.MessageBox.hide();

                		Ext.Msg.alert('Done', 'NDVI map generated.');
                		}, 6000); */
					

					//alert(_vector + ': ' + _property + ': ' + _feature + ': ' + ndvi_tif);
					
									
				}
			},

			'WebMappingViewport button[action=updateGraph]':
			{
				click:function() {

					//var boundary = Ext.getCmp('boundarytype').getValue();
					//var region = Ext.getCmp('county').getValue();
					

					Ext.MessageBox.show({
			           msg: 'Plotting timeseries, please wait...',
			           //progressText: 'Processing...',
			           width:300,
			           wait:true,
			           //waitConfig: {interval:200},
			           icon:'ext-mb-download', //custom class in msg-box.html
			           iconHeight: 50
			           //animateTarget: 'mb7'
			       });

					setTimeout(function(){

						plotStats(stats_boundary, stats_region, stats_yr);
                		Ext.MessageBox.hide();
                		//Ext.example.msg('Done', 'inundation map generated!');
                		}, 8000);

					

									
				}


			},
			'WebMappingViewport button[action=rainGraph]':
			{
				click:function() {

					//var boundary = Ext.getCmp('boundarytype').getValue();
					//var region = Ext.getCmp('county').getValue();


					Ext.MessageBox.show({
			           msg: 'Plotting rainfall, please wait...',
			           //progressText: 'Processing...',
			           width:300,
			           wait:true,
			           //waitConfig: {interval:200},
			           icon:'ext-mb-download', //custom class in msg-box.html
			           iconHeight: 50
			           //animateTarget: 'mb7'
			       });

					setTimeout(function(){

						plotRainfall();
                		Ext.MessageBox.hide();
                		//Ext.example.msg('Done', 'inundation map generated!');
                		}, 8000);


					//rain_win.show()


				}


			},

			'WebMappingViewport combobox[name=county]': {
				select:function(valueField) {
					_boundary = valueField.value;

					var boundarytype = Ext.getCmp('boundarytype').getValue();

					

					if(boundarytype == 'County'){
						for(var i=0; i < Ext.rangelands.counties.length; i++){
							if(Ext.rangelands.counties[i][0] == _boundary){
								
								map.setCenter(
	                            	new OpenLayers.LonLat(Ext.rangelands.counties[i][1], Ext.rangelands.counties[i][2]).transform(
	                                	new OpenLayers.Projection("EPSG:4326"),
	                                	map.getProjectionObject() ), 8);


								highLight(boundarytype, _boundary);
								loadFTPlinks(_boundary);


								var _ward = Ext.getCmp('ward');
								_ward.enable();
								_ward.clearValue();

								var _wardstore = _ward.getStore();
								_wardstore.removeAll();


								var county_wards = [];

								for(var j=0; j < Ext.rangelands.wards.length; j++){
									if(Ext.rangelands.wards[j][1] == _boundary.toUpperCase()){
										//alert(Ext.rangelands.wards[j][1]);
										county_wards.push([Ext.rangelands.wards[j][0],
											Ext.rangelands.wards[j][1],
											Ext.rangelands.wards[j][2],
											Ext.rangelands.wards[j][3]
											]);
									}
								}

								

								_wardstore.loadData(county_wards);

								//alert(county_wards[0]);


							
							}
						}

						stats_boundary = 'county';
						stats_region = _boundary;
						//Ext.getCmp('graph_button').enable();
						//Ext.getCmp('vci_button').enable();

					} else if(boundarytype == 'NRT Grazing Blocks'){

						for(var i=0; i < Ext.rangelands.nrt_grazing_blocks.length; i++){
							if(Ext.rangelands.nrt_grazing_blocks[i][0] == _boundary){
								
								map.setCenter(
	                            	new OpenLayers.LonLat(Ext.rangelands.nrt_grazing_blocks[i][1], Ext.rangelands.nrt_grazing_blocks[i][2]).transform(
	                                	new OpenLayers.Projection("EPSG:4326"),
	                                	map.getProjectionObject() ), 12);


								highLight(boundarytype, _boundary);

							
							}
						}
						
					}

					else if(boundarytype == 'NRT Rehabilitation Areas'){
						
						for(var i=0; i < Ext.rangelands.nrt_rehab_areas.length; i++){
							if(Ext.rangelands.nrt_rehab_areas[i][0] == _boundary){
								
								map.setCenter(
	                            	new OpenLayers.LonLat(Ext.rangelands.nrt_rehab_areas[i][1], Ext.rangelands.nrt_rehab_areas[i][2]).transform(
	                                	new OpenLayers.Projection("EPSG:4326"),
	                                	map.getProjectionObject() ), 12);


								highLight(boundarytype, _boundary);

							
							}
						}
						
					}

					else if(boundarytype == 'LWF Areas'){
						
						for(var i=0; i < Ext.rangelands.lwf_areas.length; i++){
							if(Ext.rangelands.lwf_areas[i][0] == _boundary){
								
								map.setCenter(
	                            	new OpenLayers.LonLat(Ext.rangelands.lwf_areas[i][1], Ext.rangelands.lwf_areas[i][2]).transform(
	                                	new OpenLayers.Projection("EPSG:4326"),
	                                	map.getProjectionObject() ), 12);


								highLight(boundarytype, _boundary);

							
							}
						}
						
					}


					else if(boundarytype == 'Lewa Blocks'){
						
						for(var i=0; i < Ext.rangelands.lewa_blocks.length; i++){
							if(Ext.rangelands.lewa_blocks[i][0] == _boundary){
								
								map.setCenter(
	                            	new OpenLayers.LonLat(Ext.rangelands.lewa_blocks[i][1], Ext.rangelands.lewa_blocks[i][2]).transform(
	                                	new OpenLayers.Projection("EPSG:4326"),
	                                	map.getProjectionObject() ), 15);


								highLight(boundarytype, _boundary);

							
							}
						}
						
					}

					else if(boundarytype == 'County Grazing Blocks'){

						for(var i=0; i < Ext.rangelands.county_blocks.length; i++){
							if(Ext.rangelands.county_blocks[i][0] == _boundary){

								map.setCenter(
	                            	new OpenLayers.LonLat(Ext.rangelands.county_blocks[i][1], Ext.rangelands.county_blocks[i][2]).transform(
	                                	new OpenLayers.Projection("EPSG:4326"),
	                                	map.getProjectionObject() ), 10);


								highLight(boundarytype, _boundary);


							}
						}

					}


					else {

						for(var i=0; i < Ext.rangelands.conservancies.length; i++){
							if(Ext.rangelands.conservancies[i][0] == _boundary){
								
								map.setCenter(
	                            	new OpenLayers.LonLat(Ext.rangelands.conservancies[i][1], Ext.rangelands.conservancies[i][2]).transform(
	                                	new OpenLayers.Projection("EPSG:4326"),
	                                	map.getProjectionObject() ), 12);


								highLight(boundarytype, _boundary);


							
							}
						}

						stats_boundary = 'conservancy';
						stats_region = _boundary;
						//Ext.getCmp('graph_button').enable();




					} 

					// enable button
					Ext.getCmp('generate_map').enable();
					
					
					
				}
			},

			'WebMappingViewport combobox[name=boundarytype]': {
				select:function(valueField) {
					var _name = Ext.getCmp('county');
					_name.clearValue();

					var _store = _name.getStore();
					_store.removeAll();
					
					if(valueField.value == 'County'){

						_store.loadData(Ext.rangelands.counties);

						

					} else if(valueField.value == 'NRT Grazing Blocks'){
						_store.loadData(Ext.rangelands.nrt_grazing_blocks);
						Ext.getCmp('ward').clearValue();
						Ext.getCmp('ward').disable();

					}

					else if(valueField.value == 'NRT Rehabilitation Areas'){
						_store.loadData(Ext.rangelands.nrt_rehab_areas);
						Ext.getCmp('ward').clearValue();
						Ext.getCmp('ward').disable();
						
					}

					else if(valueField.value == 'LWF Areas'){
						_store.loadData(Ext.rangelands.lwf_areas);
						Ext.getCmp('ward').clearValue();
						Ext.getCmp('ward').disable();
						
					}

					else if(valueField.value == 'Lewa Blocks'){
						_store.loadData(Ext.rangelands.lewa_blocks);
						Ext.getCmp('ward').clearValue();
						Ext.getCmp('ward').disable();
						
					}

					else if(valueField.value == 'County Grazing Blocks'){
					    _store.loadData(Ext.rangelands.county_blocks);
					    Ext.getCmp('ward').clearValue();
					    Ext.getCmp('ward').disable();
					}

					else {
								
						_store.loadData(Ext.rangelands.conservancies);
						Ext.getCmp('ward').clearValue();
						Ext.getCmp('ward').disable();
					}
					
					_name.enable();
				}
			}, 

			'WebMappingViewport combobox[name=ward]': {
				select:function(valueField){
					var _selected_ward = valueField.value;

					stats_boundary = 'ward';
					stats_region = _selected_ward;
					//Ext.getCmp('graph_button').enable();

					for(var i=0; i < Ext.rangelands.wards.length; i++){
						if(Ext.rangelands.wards[i][0] == _selected_ward){
							map.setCenter(
	                            	new OpenLayers.LonLat(Ext.rangelands.wards[i][2], Ext.rangelands.wards[i][3]).transform(
	                                	new OpenLayers.Projection("EPSG:4326"),
	                                	map.getProjectionObject() ), 10);

							highLight('Wards', _selected_ward);
						}
					}

				}

			},

			'WebMappingViewport combobox[name=ndvi_month1]': {
				select:function(valueField) {

					var _dekad = Ext.getCmp('ndvi_dekad');
					_dekad.clearValue();
					var _store = _dekad.getStore();
					_store.removeAll();

					var _year = Ext.getCmp('ndvi_year1').getValue();
					_year = parseInt(_year);
					var _month = valueField.value;
					var days = new Date(_year, _month, 0).getDate();

					if(days == 30) {
						_store.loadData(Ext.rangelands.dekads1);
					} else if (days == 31) {
						_store.loadData(Ext.rangelands.dekads2);
					} else if (days == 28) {
						_store.loadData(Ext.rangelands.dekads3);
					} else {
						_store.loadData(Ext.rangelands.dekads4);
					}

					_dekad.enable();
					
				}
			}, 
			'WebMappingViewport combobox[name=ndvi_year1]': {
				select:function(valueField) {
					
					var ndvi_month1 = Ext.getCmp('ndvi_month1');
					ndvi_month1.enable();
					ndvi_month1.clearValue();

					Ext.getCmp('ndvi_dekad').clearValue();

					stats_yr = valueField.value;

					
				}
			},  	
			'WebMappingViewport combobox[name=ndvi_dekad]': {
				select:function() {
					
					// Get selected year, month, dekad
					var sel_year = Ext.getCmp('ndvi_year1').getValue();
					var sel_month = Ext.getCmp('ndvi_month1').getValue();
					if(sel_month < 10){
						sel_month = '0' + sel_month;
					}
					var sel_dekad = Ext.getCmp('ndvi_dekad').getValue();

					var dekad_layer = 'modis.dekadal.' + sel_year + sel_month + sel_dekad + '.tif';

					loadLayer(dekad_layer);
					ndvi_tif = dekad_layer;

					Ext.getCmp('boundarytype').enable();


					
				}
			},  	
			'WebMappingViewport combobox[name=ndvi_year]': {
				select:function(valueField) {

					Ext.getCmp('ndvi_month').enable();
					Ext.getCmp('ndvi_month').clearValue();

					stats_yr = valueField.value;
					
				}
			},  	
			'WebMappingViewport combobox[name=ndvi_month]': {
				select:function() {
					
						// Get selected year, month
					var sel_year = Ext.getCmp('ndvi_year').getValue();
					var sel_month = Ext.getCmp('ndvi_month').getValue();
					if(sel_month < 10){
						sel_month = '0' + sel_month;
					}
					//var sel_dekad = Ext.getCmp('ndvi_dekad').getValue();

					var monthly_layer = 'modis.monthly.' + sel_year + sel_month + '.tif';

					loadLayer(monthly_layer);
					ndvi_tif = monthly_layer;

					Ext.getCmp('boundarytype').enable();

					
					
				}
			},  	
			'WebMappingViewport combobox[name=ndvi_year2]': {
				select:function(valueField) {
					Ext.getCmp('ndvi_season').enable();
					Ext.getCmp('ndvi_season').clearValue();

					stats_yr = valueField.value;
				}
			},  	
			'WebMappingViewport combobox[name=ndvi_season]': {
				select:function() {

					// get selected year/season
					var sel_year = Ext.getCmp('ndvi_year2').getValue();
					var sel_season = Ext.getCmp('ndvi_season').getValue();
					//if(sel_month < 10){
					//	sel_month = '0' + sel_month;
					//}
					//var sel_dekad = Ext.getCmp('ndvi_dekad').getValue();

					var seasonal_layer = 'modis.seasonal.' + sel_year + sel_season + '.tif';

					loadLayer(seasonal_layer);
					ndvi_tif = seasonal_layer;

					Ext.getCmp('boundarytype').enable();
					
					
				}
			},  
			'WebMappingViewport tabpanel[name=ndvi_tabs]': {
				tabchange:function(tabPanel, tab) {
					// clear all combos in other tabs
					var activetab = tab.id;
					if (activetab == 'nrt'){

						Ext.getCmp('ndvi_year').clearValue();
						Ext.getCmp('ndvi_month').clearValue();

						Ext.getCmp('ndvi_year2').clearValue();
						Ext.getCmp('ndvi_season').clearValue();

					} else if ( activetab == 'monthly'){

						Ext.getCmp('ndvi_year1').clearValue();
						Ext.getCmp('ndvi_month1').clearValue();
						Ext.getCmp('ndvi_dekad').clearValue();

						Ext.getCmp('ndvi_year2').clearValue();
						Ext.getCmp('ndvi_season').clearValue();

					} else {

						Ext.getCmp('ndvi_year1').clearValue();
						Ext.getCmp('ndvi_month1').clearValue();
						Ext.getCmp('ndvi_dekad').clearValue();

						Ext.getCmp('ndvi_year').clearValue();
						Ext.getCmp('ndvi_month').clearValue();
					}
					
				}
			}, 
			'WebMappingViewport tabpanel[name=anomaly_tabs]': {
				tabchange:function(tabPanel, tab) {
					// clear all combos in other tabs
					var activetab = tab.id;
					if (activetab == 'std_monthly'){

						Ext.getCmp('std_anomaly_year2').clearValue();
						Ext.getCmp('std_anomaly_season').clearValue();
						Ext.getCmp('abs_anomaly_year').clearValue();
						Ext.getCmp('abs_anomaly_month').clearValue();
						Ext.getCmp('abs_anomaly_year2').clearValue();
						Ext.getCmp('abs_anomaly_season').clearValue();
						

					} else if ( activetab == 'std_seasonal'){

						Ext.getCmp('std_anomaly_year').clearValue();
						Ext.getCmp('std_anomaly_month').clearValue();
						Ext.getCmp('abs_anomaly_year').clearValue();
						Ext.getCmp('abs_anomaly_month').clearValue();
						Ext.getCmp('abs_anomaly_year2').clearValue();
						Ext.getCmp('abs_anomaly_season').clearValue();
						

					} else if ( activetab == 'std_seasonal'){

						Ext.getCmp('std_anomaly_year').clearValue();
						Ext.getCmp('std_anomaly_month').clearValue();
						Ext.getCmp('abs_anomaly_year').clearValue();
						Ext.getCmp('abs_anomaly_month').clearValue();
						Ext.getCmp('abs_anomaly_year2').clearValue();
						Ext.getCmp('abs_anomaly_season').clearValue();
						
					} else {

						Ext.getCmp('std_anomaly_year').clearValue();
						Ext.getCmp('std_anomaly_month').clearValue();
						Ext.getCmp('std_anomaly_year2').clearValue();
						Ext.getCmp('std_anomaly_season').clearValue();
						Ext.getCmp('abs_anomaly_year').clearValue();
						Ext.getCmp('abs_anomaly_month').clearValue();
					}
					
				}
			},  		
			'WebMappingViewport tabpanel[name=vci_tabs]': {
				tabchange:function(tabPanel, tab) {
					// clear all combos in other tabs
					var activetab = tab.id;
					if (activetab == 'vci_monthly'){
						
						Ext.getCmp('vci_year2').clearValue();
						Ext.getCmp('vci_season').clearValue();

					} else {
						Ext.getCmp('vci_year').clearValue();
						Ext.getCmp('vci_month').clearValue();
					}
					
				}
			},  		 		
			'WebMappingViewport combobox[name=std_anomaly_year]': {
				select:function(valueField) {
					Ext.getCmp('std_anomaly_month').enable();
					Ext.getCmp('std_anomaly_month').clearValue();

					stats_yr = valueField.value;
				}
			},  
			'WebMappingViewport combobox[name=std_anomaly_month]': {
				select:function() {

					//get selected year and month
					var sel_year = Ext.getCmp('std_anomaly_year').getValue();
					var sel_month = Ext.getCmp('std_anomaly_month').getValue();
					if(sel_month < 10){
						sel_month = '0' + sel_month;
					}
					var monthly_layer = 'modis.monthly.SA.' + sel_year + sel_month + '.tif';
					loadLayer(monthly_layer);
					ndvi_tif = monthly_layer;
					Ext.getCmp('boundarytype').enable();

				}
			},  
			'WebMappingViewport combobox[name=std_anomaly_year2]': {
				select:function(valueField) {
					Ext.getCmp('std_anomaly_season').enable();
					Ext.getCmp('std_anomaly_season').clearValue();

					stats_yr = valueField.value;
				}
			},  
			'WebMappingViewport combobox[name=std_anomaly_season]': {
				select:function() {

					// get selected year/season
					var sel_year = Ext.getCmp('std_anomaly_year2').getValue();
					var sel_season = Ext.getCmp('std_anomaly_season').getValue();
					var seasonal_layer = 'modis.seasonal.SA.' + sel_year + sel_season + '.tif';
					loadLayer(seasonal_layer);
					ndvi_tif = seasonal_layer;
					Ext.getCmp('boundarytype').enable();

				}
			},  	
			'WebMappingViewport combobox[name=abs_anomaly_year]': {
				select:function(valueField) {
					Ext.getCmp('abs_anomaly_month').enable();
					Ext.getCmp('abs_anomaly_month').clearValue();

					stats_yr = valueField.value;
				}
			},  
			'WebMappingViewport combobox[name=abs_anomaly_month]': {
				select:function() {

					//get selected year and month
					var sel_year = Ext.getCmp('abs_anomaly_year').getValue();
					var sel_month = Ext.getCmp('abs_anomaly_month').getValue();
					if(sel_month < 10){
						sel_month = '0' + sel_month;
					}
					var monthly_layer = 'modis.monthly.AA.' + sel_year + sel_month + '.tif';
					loadLayer(monthly_layer);
					ndvi_tif = monthly_layer;
					Ext.getCmp('boundarytype').enable();
					
				}
			},  	
			'WebMappingViewport combobox[name=abs_anomaly_year2]': {
				select:function(valueField) {
					Ext.getCmp('abs_anomaly_season').enable();
					Ext.getCmp('abs_anomaly_season').clearValue();

					stats_yr = valueField.value;
				}
			},  
			'WebMappingViewport combobox[name=abs_anomaly_season]': {
				select:function() {

					// get selected year/season
					var sel_year = Ext.getCmp('abs_anomaly_year2').getValue();
					var sel_season = Ext.getCmp('abs_anomaly_season').getValue();
					var seasonal_layer = 'modis.seasonal.AA.' + sel_year + sel_season + '.tif';
					loadLayer(seasonal_layer);
					ndvi_tif = seasonal_layer;
					Ext.getCmp('boundarytype').enable();
					
				}
			},  	
			'WebMappingViewport combobox[name=vci_year]': {
				select:function(valueField) {
					Ext.getCmp('vci_month').enable();
					Ext.getCmp('vci_month').clearValue();

					stats_yr = valueField.value;
				}
			},
			'WebMappingViewport combobox[name=vci_year3]': {
				select:function(valueField) {
					Ext.getCmp('vci_month3').enable();
					Ext.getCmp('vci_month3').clearValue();

					stats_yr = valueField.value;
				}
			},
			'WebMappingViewport combobox[name=vci_month]': {
				select:function() {

					//get selected year and month
					var sel_year = Ext.getCmp('vci_year').getValue();
					var sel_month = Ext.getCmp('vci_month').getValue();
					if(sel_month < 10){
						sel_month = '0' + sel_month;
					}
					var monthly_layer = 'modis.monthly.VCI.' + sel_year + sel_month + '.tif';
					loadLayer(monthly_layer);
					ndvi_tif = monthly_layer;
					Ext.getCmp('boundarytype').enable();
					
				}
			},
			'WebMappingViewport combobox[name=vci_month3]': {
				select:function() {

					//get selected year and month
					var sel_year = Ext.getCmp('vci_year3').getValue();
					var sel_month = Ext.getCmp('vci_month3').getValue();
					var suf_year = sel_year;


					if(sel_month == 1){
					    var suf_month = 11;
					    suf_year = suf_year - 1;
					} else if(sel_month == 2){
					    var suf_month = 12;
					    suf_year = suf_year - 1;
					} else {
					    var suf_month = sel_month - 2;
					}


					if(sel_month < 10){
						sel_month = '0' + sel_month;
					}

					if(suf_month < 10){
						suf_month = '0' + suf_month;
					}

					var monthly_layer = 'modis.moving.average.VCI.' + sel_year + sel_month + '.' + suf_year + suf_month + '.tif';
					//console.log(monthly_layer);
					loadLayer(monthly_layer);
					ndvi_tif = monthly_layer;
					Ext.getCmp('boundarytype').enable();

				}
			},
			'WebMappingViewport combobox[name=vci_year2]': {
				select:function(valueField) {
					Ext.getCmp('vci_season').enable();
					Ext.getCmp('vci_season').clearValue();

					stats_yr = valueField.value;
				}
			},  
			'WebMappingViewport combobox[name=vci_season]': {
				select:function() {

					// get selected year/season
					var sel_year = Ext.getCmp('vci_year2').getValue();
					var sel_season = Ext.getCmp('vci_season').getValue();
					var seasonal_layer = 'modis.seasonal.VCI.' + sel_year + sel_season + '.tif';
					loadLayer(seasonal_layer);
					ndvi_tif = seasonal_layer;
					Ext.getCmp('boundarytype').enable();
					
				}
			},  		
			'WebMappingViewport button[action=rangeSearchAction]':
			{
				click: function() 
				{

					var loadingPanel = new OpenLayers.Control.LoadingPanel();
					map.addControl(loadingPanel);    
					//show the control
					loadingPanel.maximizeControl();
					// load your layers here
					// remove it as the above function returns

					range_search();

					loadingPanel.minimizeControl();

		 			resizeElementHeight('legend_items', 'legend_items-body');
				}
			},
			'WebMappingViewport button[action=customSearchAction]':
			{
				click: function() 
				{

					var loadingPanel = new OpenLayers.Control.LoadingPanel();
					map.addControl(loadingPanel);    
					//show the control
					loadingPanel.maximizeControl();
					// load your layers here
					// remove it as the above function returns
					
					//flag="no_flag";
					custom_search();

					loadingPanel.minimizeControl();
					
				}
			},
			'MapPanel button[action=map_zoom_in]':
			{
				click:function()
				{	
					zoomInCtrl.trigger();
				}
			},
			'MapPanel button[action=map_zoom_out]':
			{
				click:function()
				{	
					zoomOutCtrl.trigger();
				}
			},
			'MapPanel button[action=navigation_history_previous]':
			{
				click:function()
				{	
					navigationHistoryCtrl.previousTrigger();
				}
			},
			'MapPanel button[action=navigation_history_next]':
			{
				click:function()
				{	
					navigationHistoryCtrl.nextTrigger();
				}
			},
			'MapPanel button[action=about_us]':
			{
				click: function ()
				{
					var win = new Ext.Window
					({
						width:500,
						height:500,
						autoScroll:true,
						title: 'About the Tool',
						autoLoad:{
							url:'/static/rdst/pages/about_us.html'
						}
					});
					win.show();
				}
			},
			'MapPanel button[action=useful_links]':
			{
				click: function ()
				{
					
					var win = new Ext.Window({
						width:500,
						height:500,
						autoScroll:true,
						title: 'Metadata',
						autoLoad:{
							url:'/static/rdst/pages/useful_links.html'
						}
					});
					win.show();
				}
			},
			'MapPanel button[action=help_action]':
			{
				click: function ()
				{

					var win = window.open('http://tools.rcmrd.org/docs/help/index.html', '_blank');
				}
			},
			'MapPanel button[action=feedback]':
			{
				click: function ()
				{

					var win = window.open('http://tools.rcmrd.org/feedback', '_blank');
				}
			},
			'MapPanel button[action=login]':
			{
				click: function ()
				{

					window.location.href = "/login";
				}
			},
			'MapPanel button[action=mapgen_app]':
			{
				click: function ()
				{

					var win = window.open('http://apps.rcmrd.org/rangelands/', '_blank');
				}
			},
			'MapPanel button[action=vci_app]':
                        {
                                click: function ()
                                {

                                        var win = window.open('https://apps.rcmrd.org:8443/VCI_Forecasts/', '_blank');
                                }
                        },
			'MapPanel button[action=map_default_map_extent]':
			{
				click: function() 
				{
					map.setCenter(
						new OpenLayers.LonLat(29.577899,3.443310).transform(
							new OpenLayers.Projection("EPSG:4326"),
							map.getProjectionObject()
							), 
						5);
				}
			},

			'MapPanel button[action=zoom_to_countries]':
			{
				click: function() 
				{
					var selected_country=Ext.getCmp('Zoom_to_Countries_Id').getValue();
					if(selected_country==null)
					{
						Ext.Msg.alert("No selection","Please select a country you want to Zoom to");
					}
					

				}
				
			}

		});
	}

});
