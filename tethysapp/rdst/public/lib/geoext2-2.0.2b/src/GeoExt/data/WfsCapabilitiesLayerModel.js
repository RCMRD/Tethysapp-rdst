Ext.define("GeoExt.data.WfsCapabilitiesLayerModel",{extend:"GeoExt.data.LayerModel",alternateClassName:["GeoExt.data.WFSCapabilitiesModel","GeoExt.data.WfsCapabilitiesModel"],requires:["GeoExt.data.reader.WfsCapabilities"],alias:"model.gx_wfscapabilities",fields:[{name:"name",type:"string",mapping:"metadata.name"},{name:"namespace",type:"string",mapping:"metadata.featureNS"},{name:"abstract",type:"string",mapping:"metadata.abstract"}],proxy:{type:"ajax",reader:{type:"gx_wfscapabilities"}}})