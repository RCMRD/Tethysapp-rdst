Ext.define("Ext.dd.DropTarget",{extend:"Ext.dd.DDTarget",requires:["Ext.dd.ScrollManager"],constructor:function(n,t){this.el=Ext.get(n);Ext.apply(this,t);this.containerScroll&&Ext.dd.ScrollManager.register(this.el);this.callParent([this.el.dom,this.ddGroup||this.group,{isTarget:!0}])},dropAllowed:Ext.baseCSSPrefix+"dd-drop-ok",dropNotAllowed:Ext.baseCSSPrefix+"dd-drop-nodrop",isTarget:!0,isNotifyTarget:!0,notifyEnter:function(){return this.overClass&&this.el.addCls(this.overClass),this.dropAllowed},notifyOver:function(){return this.dropAllowed},notifyOut:function(){this.overClass&&this.el.removeCls(this.overClass)},notifyDrop:function(){return!1},destroy:function(){this.callParent();this.containerScroll&&Ext.dd.ScrollManager.unregister(this.el)}})