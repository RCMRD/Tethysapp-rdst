Ext.define("Ext.grid.column.Template",{extend:"Ext.grid.column.Column",alias:["widget.templatecolumn"],requires:["Ext.XTemplate"],alternateClassName:"Ext.grid.TemplateColumn",initComponent:function(){var n=this;n.tpl=!Ext.isPrimitive(n.tpl)&&n.tpl.compile?n.tpl:new Ext.XTemplate(n.tpl);n.hasCustomRenderer=!0;n.callParent(arguments)},defaultRenderer:function(n,t,i){var r=Ext.apply({},i.data,i.getAssociatedData());return this.tpl.apply(r)}})