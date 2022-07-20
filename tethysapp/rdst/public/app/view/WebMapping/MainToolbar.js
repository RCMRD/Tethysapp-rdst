Ext.define('LandCover.view.WebMapping.MainToolbar',
{
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.MainToolbar',
    id:'TopToolbar',
	region: 'north',
    initComponent: function() 
	{
        var me = this;
        //var xx = "login";
        Ext.applyIf(me, {
            items: 
			[           
				{
					xtype: 'toolbar',
					height: 33,
					items: 
					[
						{
							xtype: 'button',
							text: '',
							cls:'tools_cls', 
							tooltip: "Zoom In",
							icon: '/static/rdst/assets/images/zoom-in.png',
							action: 'map_zoom_in'
						},
						'-',
						{
							xtype: 'button',
							text: '',
							cls:'tools_cls', 
							tooltip: "Zoom Out",
							icon: '/static/rdst/assets/images/zoom-out.png',
							action: 'map_zoom_out'
						},
						'-',
						{
							xtype: 'button',
							text: '',
							cls:'tools_cls', 
							tooltip: "Default Map Extent",
							icon: '/static/rdst/assets/images/default.png',
							action: 'map_default_map_extent'
						},
						'-',

						{
							xtype: 'button',
							text: '',
							cls:'tools_cls', 
							tooltip: "Previous in History",
							icon: '/static/rdst/assets/images/undo.png',
							action: 'navigation_history_previous'
						},	
						'-',		
						{
							xtype: 'button',
							text: '',
							cls:'tools_cls', 
							tooltip: "Next in History",
							icon: '/static/rdst/assets/images/redo.png',
							action: 'navigation_history_next'
						},
						'-'/*,
						{
							xtype: 'combobox',
							fieldLabel: '',

							allowBlank: true,
							emptyText:'Zoom to Countries',
							width: 142,
							labelWidth: 119,
							margin: "10 0 0 0",
							id:  'Zoom_to_Countries_Id',
							name:  'Zoom_to_Countries_Name',
							queryMode: 'local',
							displayField: 'country',
							store : [
                				"All Countries", "Burundi", "Djibouti", "Eritrea", "Ethiopia", "Kenya", "Rwanda", "Somalia", "Sudan", "South Sudan", "Tanzania", "Uganda"
							],
							typeAhead: true,
							lastQuery:'',
							triggerAction: 'all',
							value: '',
							selectOnFocus:true
						},
						{
							xtype: 'button',
							//id:'go',
							text: '',
							cls:'tools_countries_cls', 
							tooltip: "Click to Zoom into the Selected Countries",
							icon: 'assets/images/zoom-in-l.png',
							action: 'zoom_to_countries'
						}*/
					]
				}
				, '->', 
				{
					xtype: 'toolbar',
					height: 33,
					id:'menubar_id', 
					items:[
					    {
							text: 'Map Generator',
							cls:'tools_cls',
							tooltip: "Map Generator",
							//icon: '/static/assets/images/about.png',
							enableToggle: true,
							action: 'mapgen_app'
						},
					    '-',
                                            {
                                                        text: 'VCI Forecasts',
                                                        cls:'tools_cls',
                                                        tooltip: "VCI Forecasts",
                                                        //icon: '/static/assets/images/about.png',
                                                        enableToggle: true,
                                                        action: 'vci_app'
                                                },
                                            '-',
					    /*{
							text: 'Feedback',
							cls:'tools_cls',
							tooltip: "User Feedback",
							//icon: '/static/assets/images/about.png',
							enableToggle: true,
							action: 'feedback'
						},
						'-', */
					    {
							text: 'NDVI Products',
							cls:'tools_cls',
							tooltip: "NDVI Products",
							//icon: '/static/assets/images/about.png',
							enableToggle: true,
							action: 'ndvi_products'
						},
					    '-',
						{
							text: '',
							cls:'tools_cls', 
							tooltip: "About the System",
							icon: '/static/rdst/assets/images/about.png',
							enableToggle: true,
							action: 'about_us'
						},
						'-',
						{
							text: '',
							cls:'tools_cls', 
							tooltip: "Metadata",
							icon: '/static/rdst/assets/images/links.png',
							enableToggle: true,
							action: 'useful_links'
						},
						'-',
		 				{
							text: '',
							cls:'tools_cls', 
							tooltip: "Help",
							icon: '/static/rdst/assets/images/help.png',
							enableToggle: true,
							action: 'help_action'
						}

					]
				}
            ]
        });
        me.callParent(arguments);
    }
});
