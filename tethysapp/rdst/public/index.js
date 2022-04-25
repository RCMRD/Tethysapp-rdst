Ext.Loader.setConfig
({
    enabled: true,
	disableCaching: false,
    paths: {
        GeoExt: "/static/rdst/lib/geoext2-2.0.2b/src/GeoExt"
    }
});
Ext.application({
    name: 'LandCover',
    appFolder: '/static/rdst/app',
	extend: 'Ext.app.Application',
    controllers: 
	[
        'LandCover.controller.WebMapping.MapPanel'
    ],
    launch: function() 
	{
        Ext.tip.QuickTipManager.init();	
		Ext.create('LandCover.view.WebMappingViewport');
    }
});