Ext.define("Ext.rtl.layout.component.field.Trigger",{override:"Ext.layout.component.field.Trigger",adjustIEInputPadding:function(){var n=this.owner;n.inputCell.setStyle(n.getHierarchyState().rtl?"padding-left":"padding-right",this.ieInputWidthAdjustment+"px")}})