 Ext.define('Download', {
     extend: 'Ext.data.Model',
     fields: [
         {name: 'label1', type: 'string'},
         {name: 'url1',  type: 'string'}
        
     ]
 });

// layer tree store

layers_tree_store = Ext.create('Ext.data.TreeStore', {
	model: 'GeoExt.data.LayerTreeModel',
	root: {
		expanded: true,
		children: 
		[
			{
				text: "Base Maps",
				plugins: ['gx_baselayercontainer'],
				collapsed: true
			}, 
			{
                text: "Overlays",
                plugins: ['gx_overlaylayercontainer'],
                expanded: true
            }
		]
	}
});

layer_legend_tree = Ext.create('GeoExt.tree.Panel', {
	title: "",
	autoScroll: true,
    //collapsible: true,
    //height: 300,
    //preventHeader: true,
 	viewConfig:
	{
		plugins: [{
			ptype: 'treeviewdragdrop',
			appendOnly: false
		}]
	},
	store: layers_tree_store,
    listeners:{
        'checkchange': function(node, checked){
           
            var legend_container = document.getElementById('legend_items-innerCt'); 
            
            
        }
    },
	rootVisible: false,
	lines: false
});



novatree = Ext.create('GeoExt.tree.LayerTreeBuilder', {
    enableWmsLegends: false,
    enableVectorLegends: false,
    otherLayersText: 'Overlays',
    //layerStore: map.layers,
    title: "",
    autoScroll: true,
    collapsible: true,
    height: 300,
    width: 250

});


LogoPanel = new Ext.Panel({  
    region: 'south',      
    xtype: 'panel',
    id: 'logopanelID',
    height: 90,
    width: 500,
    minWidth: 300,
    collapsible: true,
    collapseMode: 'mini',
    preventHeader: true,
    split: true,
    items:[
        {
            xtype: 'panel',
            html:'<div class="logos"><a target="new" href="http://www.usaid.gov/"><img alt="USAID" width="134" height="40" src="/static/rdst/assets/images/usaid.png"></a>'+
            '<a target="new" href="http://www.nasa.gov/"><img alt="NASA" width="49" height="40" src="/static/rdst/assets/images/nasa.png"></a>'+
            '<a target="new" href="http://www.rcmrd.org/?page_id=5130"><img alt="SERVIR East and Southern Africa" width="240" height="35" src="/static/rdst/assets/images/servir-easafricab.png"></a> </div>'
        }
    ]
}); 


NdviSearchForm = Ext.create('Ext.form.Panel', {
    bodyPadding: 10,
    id: 'ndvi_form_id', 
    title: 'Normalized Difference Vegetation Index (NDVI)',
    //height: 300,
    autoScroll: true,
    collapsible: true,
    items: [{

            xtype:'tabpanel',
            name: 'ndvi_tabs',
            id: 'ndvi_tabs',
            activeTab: 0,
            defaults:{
                bodyPadding: 10,
                layout: 'anchor'
            },
            items:[{
                title:'Near Real Time (10 days)',
                id: 'nrt',
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    xtype: 'combobox',
                    fieldLabel: 'Year',
                    //disabled: true,
                    name: 'ndvi_year1',
                    id: 'ndvi_year1',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_value'],
                        data : Ext.rangelands.years 
                    }),
                    valueField: '_value',
                    displayField: '_value',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select year...'
                },{
                    xtype: 'combobox',
                    fieldLabel: 'Month',
                    disabled: true,
                    name: 'ndvi_month1',
                    id: 'ndvi_month1',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_display','_value'],
                        data : Ext.rangelands.months 
                    }),
                    valueField: '_value',
                    displayField: '_display',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select month...'
                },{
                    xtype: 'combobox',
                    fieldLabel: 'Dekad',
                    disabled: true,
                    name: 'ndvi_dekad',
                    id: 'ndvi_dekad',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_display','_value'],
                        data : Ext.rangelands.dekads 
                    }),
                    valueField: '_value',
                    displayField: '_display',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select dekad...'
                }]
            },{
                title: 'Monthly',
                id: 'monthly',
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    xtype: 'combobox',
                    fieldLabel: 'Year',
                    //disabled: true,
                    name: 'ndvi_year',
                    id: 'ndvi_year',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_value'],
                        data : Ext.rangelands.years 
                    }),
                    valueField: '_value',
                    displayField: '_value',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select year...'
                },{
                    xtype: 'combobox',
                    fieldLabel: 'Month',
                    disabled: true,
                    name: 'ndvi_month',
                    id: 'ndvi_month',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_display','_value'],
                        data : Ext.rangelands.months 
                    }),
                    valueField: '_value',
                    displayField: '_display',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select month...'
                }]
            },{
                title: 'Seasonal',
                defaultType: 'textfield',
                id: 'seasonal',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    xtype: 'combobox',
                    fieldLabel: 'Year',
                    //disabled: true,
                    name: 'ndvi_year2',
                    id: 'ndvi_year2',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_value'],
                        data : Ext.rangelands.years 
                    }),
                    valueField: '_value',
                    displayField: '_value',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select year...'
                },{
                    xtype: 'combobox',
                    fieldLabel: 'Season',
                    disabled: true,
                    name: 'ndvi_season',
                    id: 'ndvi_season',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_display','_value'],
                        data : Ext.rangelands.seasons
                    }),
                    valueField: '_value',
                    displayField: '_display',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select season...'
                }]
            }]

    },{
                
                html: '<br /><br /> NDVI is an index of plant greenness with maximum NDVI being a better indicator in drylands due to reduced risk of cloud contamination. NDVI ranges between -1,1 where negative values represent water, snow or gaps; values <0.1 represent barren ground, rocks ; 0.2-0.5 represent sparse vegetation such as grasslands, shrubs, crops while values from 0.6 represent dense vegetation such as forests. NDVI can be used to monitor changes in vegetation over time, grazing impacts related to grazing management and plans, changes in land cover, rangeland condition and the type of vegetation.'
            }]
});

AnomalyForm = Ext.create('Ext.form.Panel', {
    bodyPadding: 10,
    id: 'anomaly_form_id', 
    title: 'NDVI Anomaly',
    //height: 300,
    autoScroll: true,
    collapsible: true,
    collapsed: true,
    items: {

            xtype:'tabpanel',
            name: 'anomaly_tabs',
            id: 'anomaly_tabs',
            activeTab: 0,
            defaults:{
                bodyPadding: 10,
                layout: 'anchor'
            },
            items:[{
                title: 'STD Monthly',
                id: 'std_monthly',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    xtype: 'combobox',
                    fieldLabel: 'Year',
                    //disabled: true,
                    name: 'std_anomaly_year',
                    id: 'std_anomaly_year',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_value'],
                        data : Ext.rangelands.years 
                    }),
                    valueField: '_value',
                    displayField: '_value',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select year...'
                },{
                    xtype: 'combobox',
                    fieldLabel: 'Month',
                    disabled: true,
                    name: 'std_anomaly_month',
                    id: 'std_anomaly_month',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_display','_value'],
                        data : Ext.rangelands.months 
                    }),
                    valueField: '_value',
                    displayField: '_display',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select month...'
                },{
                
                html: '<br /><br />Standardized NDVI anomalies basically give a qualitative indication of how "good" or "bad" the current season is when compared with other seasons or with the average situation. Where red represents worsening conditions and green represents improving conditions. NDVI anomalies highlight deviations from normal vegetation development (either positive or negative) and take into account variability between the years.  NDVI anomalies can thus be used as an indirect evidence for food security. Values range from -3 to +3.'
                }]
            },{
                title: 'STD Seasonal',
                id: 'std_seasonal',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    xtype: 'combobox',
                    fieldLabel: 'Year',
                    //disabled: true,
                    name: 'std_anomaly_year2',
                    id: 'std_anomaly_year2',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_value'],
                        data : Ext.rangelands.years 
                    }),
                    valueField: '_value',
                    displayField: '_value',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select year...'
                },{
                    xtype: 'combobox',
                    fieldLabel: 'Season',
                    disabled: true,
                    name: 'std_anomaly_season',
                    id: 'std_anomaly_season',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_display','_value'],
                        data : Ext.rangelands.seasons
                    }),
                    valueField: '_value',
                    displayField: '_display',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select season...'
                },{
                
                html: '<br /><br />Standardized NDVI anomalies basically give a qualitative indication of how "good" or "bad" the current season is when compared with other seasons or with the average situation. Where red represents worsening conditions and green represents improving conditions. NDVI anomalies highlight deviations from normal vegetation development (either positive or negative) and take into account variability between the years.  NDVI anomalies can thus be used as an indirect evidence for food security. Values range from -3 to +3.'
                }]
            },{
                title: 'ABS Monthly',
                id: 'abs_monthly',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    xtype: 'combobox',
                    fieldLabel: 'Year',
                    //disabled: true,
                    name: 'abs_anomaly_year',
                    id: 'abs_anomaly_year',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_value'],
                        data : Ext.rangelands.years 
                    }),
                    valueField: '_value',
                    displayField: '_value',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select year...'
                },{
                    xtype: 'combobox',
                    fieldLabel: 'Month',
                    disabled: true,
                    name: 'abs_anomaly_month',
                    id: 'abs_anomaly_month',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_display','_value'],
                        data : Ext.rangelands.months 
                    }),
                    valueField: '_value',
                    displayField: '_display',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select month...'
                },{
                
                html: '<br /><br />Absolute NDVI anomalies represent differences from long term mean therefore provide a good indication of how the current conditions compare with the average conditions of previous years. On the maps red indicates areas where the current ‘greenness’ is below the long-term average, while green indicates better-than-average conditions. Yellow indicates normal conditions. Values range from -1 to +1.'
                }]
            },{
                title: 'ABS Seasonal',
                id: 'abs_seasonal',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    xtype: 'combobox',
                    fieldLabel: 'Year',
                    //disabled: true,
                    name: 'abs_anomaly_year2',
                    id: 'abs_anomaly_year2',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_value'],
                        data : Ext.rangelands.years 
                    }),
                    valueField: '_value',
                    displayField: '_value',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select year...'
                },{
                    xtype: 'combobox',
                    fieldLabel: 'Season',
                    disabled: true,
                    name: 'abs_anomaly_season',
                    id: 'abs_anomaly_season',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_display','_value'],
                        data : Ext.rangelands.seasons
                    }),
                    valueField: '_value',
                    displayField: '_display',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select season...'
                },{
                
                html: '<br /><br />Absolute NDVI anomalies represent differences from long term mean therefore provide a good indication of how the current conditions compare with the average conditions of previous years. On the maps red indicates areas where the current ‘greenness’ is below the long-term average, while green indicates better-than-average conditions. Yellow indicates normal conditions. Values range from -1 to +1.'
                }]
            }]

    }
});

VCIForm = Ext.create('Ext.form.Panel', {
    bodyPadding: 10,
    id: 'vci_form_id', 
    title: 'Vegetation Condition Index',
    //height: 300,
    autoScroll: true,
    collapsible: true,
    collapsed: true,
    items: [{

            xtype:'tabpanel',
            name: 'vci_tabs',
            id: 'vci_tabs',
            activeTab: 0,
            defaults:{
                bodyPadding: 10,
                layout: 'anchor'
            },
            items:[{
                title: 'VCI Monthly',
                id: 'vci_monthly',
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    xtype: 'combobox',
                    fieldLabel: 'Year',
                    //disabled: true,
                    name: 'vci_year',
                    id: 'vci_year',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_value'],
                        data : Ext.rangelands.years 
                    }),
                    valueField: '_value',
                    displayField: '_value',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select year...'
                },{
                    xtype: 'combobox',
                    fieldLabel: 'Month',
                    disabled: true,
                    name: 'vci_month',
                    id: 'vci_month',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_display','_value'],
                        data : Ext.rangelands.months 
                    }),
                    valueField: '_value',
                    displayField: '_display',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select month...'
                }]
            },{
                title: 'VCI Seasonal',
                defaultType: 'textfield',
                id: 'vci_seasonal',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    xtype: 'combobox',
                    fieldLabel: 'Year',
                    //disabled: true,
                    name: 'vci_year2',
                    id: 'vci_year2',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_value'],
                        data : Ext.rangelands.years 
                    }),
                    valueField: '_value',
                    displayField: '_value',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select year...'
                },{
                    xtype: 'combobox',
                    fieldLabel: 'Season',
                    disabled: true,
                    name: 'vci_season',
                    id: 'vci_season',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_display','_value'],
                        data : Ext.rangelands.seasons
                    }),
                    valueField: '_value',
                    displayField: '_display',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select season...'
                }]
            },{
                title: '3-Month Moving Average',
                id: 'vci_moving',
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    xtype: 'combobox',
                    fieldLabel: 'Year',
                    //disabled: true,
                    name: 'vci_year3',
                    id: 'vci_year3',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_value'],
                        data : Ext.rangelands.years
                    }),
                    valueField: '_value',
                    displayField: '_value',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select year...'
                },{
                    xtype: 'combobox',
                    fieldLabel: 'Month',
                    disabled: true,
                    name: 'vci_month3',
                    id: 'vci_month3',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_display','_value'],
                        data : Ext.rangelands.months
                    }),
                    valueField: '_value',
                    displayField: '_display',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select month...'
                }]
            }]

    },{
                
                html: '<br /><br />The Vegetation Condition Index (VCI) is an indicator of the current activity of the vegetation relative to the historical range (minimum and maximum NDVI values) calculated for the corresponding time from the long term mean (2000 to present). The VCI thus normalizes the NDVI according to its variability measured over many years and results in a consistent index for various land cover types. . Its values range from 0 to 1. VCI values below 0.3 can be interpreted to indicate drought conditions.'
            }]
});

SingleSearchForm = Ext.create('Ext.form.Panel', {
    bodyPadding: 10,
    id: 'single_search_id', 
    //title: 'Generate Map',
    height: 250,
    autoScroll: true,
    collapsible: true,
    items: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Boundary',
                    name: 'boundarytype',
                    disabled: true,
                    width: 400,
                    id: 'boundarytype',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_display','_value'],
                        data : Ext.rangelands.boundary 
                    }),
                    valueField: '_value',
                    displayField: '_display',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select..',
                    listeners:{
                        'select': function(valueField){
                            
                        }
                    }
                },

                {
                    xtype: 'combobox',
                    fieldLabel: 'Name',
                    name: 'county',
                    width: 400,
                    disabled: true,
                    id: 'county',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_value','longitude','latitude'],
                        data : Ext.rangelands.counties 
                    }),
                    valueField: '_value',
                    displayField: '_value',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select...',
                    listeners:{
                        'select': function(valueField){
                            
                        }
                    }
                },

                {
                    xtype: 'combobox',
                    fieldLabel: 'Ward',
                    name: 'ward',
                    width: 400,
                    disabled: true,
                    id: 'ward',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['_value', 'county', 'longitude', 'latitude'],
                        data : Ext.rangelands.wards2 
                    }),
                    valueField: '_value',
                    displayField: '_value',
                    typeAhead: true,
                    queryMode: 'local',
                    emptyText: 'Select...',
                    listeners:{
                        'select': function(valueField){
                            
                        }
                    }
                },
                {
                    html: '<br />To generate a map from selected indicators, select a county or conservancy boundary then select additional information from Overlays and click on <b>Produce Map</b>. A link to download the generated map will appear under <b>Download NDVI Map</b> which when clicked will download the map in PDF format'
  
                }

    ],
    buttons:
	[ /*  {
            text: 'Rainfall',
            id:'rain_button',
            width: 100,
            disabled: true,
            action: 'rainGraph'

        },
	{
            text: 'VCI Products',
            id:'vci_button',
            width: 100,
            disabled: true,
            action: 'vciWindow'

        },*/
	    {
            text: 'Time Series',
            id:'graph_button',
            width: 100,
            disabled: true,
            action: 'updateGraph'

        },
		{
			text: 'Produce Map',
            disabled: true,
            id:'generate_map',
			width: 100,
			action: 'generateMap'
		}
	]
});

// create the Downloads Store
   var downstore = Ext.create('Ext.data.Store', {
    model: 'Download',
    data: [
        //{label1: 'NDVI Map'}

    ]

   });

    var downloads = Ext.create('Ext.grid.Panel', {
        store: downstore,
        id: 'downgrid',
        //title: 'Downloads',
        columns: [
            {text: "Download NDVI Map", width: 400, dataIndex: 'label1'}
            
            
        ]

    });

   var vci_downstore = Ext.create('Ext.data.Store', {
    model: 'Download',
    data: [
        //{label1: 'NDVI Map'}

    ]

   });

    var vci_downloads = Ext.create('Ext.grid.Panel', {
        store: vci_downstore,
        id: 'vci_downgrid',
        //title: 'Downloads',
        columns: [
            {text: "Download VCI Products", width: 400, dataIndex: 'label1'}

            
        ]

    });



    GeoExtPanel = new Ext.Panel ({
        region: 'west',
        xtype: 'panel',
        //width: 480,
        minWidth: 300,
        height: 500, 
        autoScroll: true,
        active:true,
       // maxWidth: 500,
        listeners: {
            resize: Ext.Function.bind(function(comp, width, height,
                    oldWidth, oldHeight, eOpts) {
                comp.doLayout();
            }, this)
        },
        title: 'Greeness Indicator',
        //collapsible: true,
        //split: true,
        layout: {
            // layout-specific configs go here
            type: 'accordion',
            titleCollapse: false,
            animate: true,
            activeOnTop: false
        },
        items: [NdviSearchForm, AnomalyForm, VCIForm]

    }); 

var GeneralTabs = Ext.create('Ext.tab.Panel', {
    id: "generaltabsID",
    layout: 'card',
    region: 'west',
    width:500,
    minWidth:500,
    //height: 600, 
    //autoScroll: true,
    animate: true,
    preventHeader: true,
     hideCollapseTool: true,
    collapsible: true,
    activeTab: 0,
    split: true,
    tabPosition: 'top',
    items: [
            GeoExtPanel, 
        {
            title: 'Compose Map',
            items:[
                SingleSearchForm, layer_legend_tree, downloads, vci_downloads
            ]
        }/*,
        {
            title: 'Time Series',
            items:[
                ChartForm
            ]
        }*/
    ]
});

 function fix_to_bottom(){

     if (legend_popup.collapsed){
         legend_popup.anchorTo("GeoExtMapPanelId", "bl", [0, -30]);
     }else {
         legend_popup.anchorTo("GeoExtMapPanelId", "bl", [0, -235]);
     }
 }

WestPanel = new Ext.Panel({  
    region: 'west',
    xtype: 'panel',
    width: 500,
    //height: 800, 
    minWidth: 500,
    collapsible: true,
    autoScroll: true,
    title: '',
   // preventHeader: true,
    //  hideCollapseTool: true,
    split: true,
    items: [
        GeneralTabs//, LogoPanel
    ],
    listeners: {
        collapse: function() {
            fix_to_bottom();
        },
        expand: function() {
            fix_to_bottom();
        }
    }

});


 legendPanel = Ext.create ('GeoExt.LegendPanel', {
     bodyStyle: 'padding:5px',
     autoScroll: true,
     header:false,
     id:"legend_id",
     width:240,
     height:205,
     collapsible: true,
     defaults: {
         style: 'padding:5px',
         baseParams: {
             FORMAT: 'image/png',
             LEGEND_OPTIONS: 'forceLabels:on;fontName=Verdana;fontSize:12',
             WIDTH:'16',
             HEIGHT:'12'
         }
     },
     lines: false,
     layers: []
     
 });

 legend_popup = new Ext.Window({
     extend: 'Ext.window.Window',
     title:'Legend',
     width: 240,
     id:'legend_popup_id',
     minimizable: true,
     closable:false,
     collapseDirection: Ext.Component.DIRECTION_BOTTOM,
     items:[legendPanel],
     listeners: {
         show: function() {
             Ext.select('#legend_popup_id .x-tool-restore').setStyle('display', 'none');
             Ext.select('#legend_popup_id .x-tool-minimize').setStyle('display', 'block');
         },
         "minimize": function (window, opts) {
             window.collapse();
             window.setWidth(150);
             window.anchorTo("GeoExtMapPanelId", "bl", [0, -30]);
             Ext.select('#legend_popup_id .x-tool-restore').setStyle('display', 'block');
             Ext.select('#legend_popup_restore_id').setStyle('left', '122px');
             Ext.select('#legend_popup_restore_id').setStyle('z-index', '100');
             Ext.select('#legend_popup_id .x-tool-minimize').setStyle('display', 'none');
         }
     },
     tools: [{
         type: 'restore',
         id: 'legend_popup_restore_id',
         handler: function (evt, toolEl, owner, tool) {
             var window = owner.up('window');
             window.setWidth(200);
             window.expand('', false);
             window.anchorTo("GeoExtMapPanelId", "bl", [0, -350]);
             Ext.select('#legend_popup_id .x-tool-restore').setStyle('display', 'none');
             Ext.select('#legend_popup_id .x-tool-minimize').setStyle('display', 'block');
         }
     }]
 });

 

 Ext.onReady(function(){


     legend_popup.show();
     legend_popup.anchorTo("GeoExtMapPanelId", "bl", [0, -230]);
     window.onresize = function() {
         fix_to_bottom();
     };

 });

 Ext.define('LandCover.view.WebMappingViewport',
{
    extend: 'Ext.container.Viewport',
    alias: 'widget.WebMappingViewport',
	id: 'viewportId',
	renderTo: Ext.getBody(),
    layout: {
        type: 'border'
    },
    initComponent: function() 
	{
        var me = this;
        Ext.applyIf(me, {
		items: 
			[
				{
					xtype: 'panel',
					region: 'north',
					height: 60, //original 60
					html: '<div class="fire"><div class="satimage"><div class="fireimage"><div class="topcont">' +
                    '<div class="logobox"><a href=""><img alt="RCMRD" width="153"' +
                    ' height="53" class="rcmrd" src="/static/rdst/assets/images/rcmrd.png"></a></div><h1 class="topheader">'+
					'Rangelands Decision Support Tool</h1></div></div></div></div>'
				},
				{
					xtype: 'MapPanel'
				},
                 WestPanel
    
			]
        });
        me.callParent(arguments);
    }
});
