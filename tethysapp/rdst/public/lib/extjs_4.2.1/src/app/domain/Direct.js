Ext.define("Ext.app.domain.Direct",{extend:"Ext.app.EventDomain",singleton:!0,requires:["Ext.direct.Provider"],type:"direct",idProperty:"id",constructor:function(){var n=this;n.callParent();n.monitor(Ext.direct.Provider)}})