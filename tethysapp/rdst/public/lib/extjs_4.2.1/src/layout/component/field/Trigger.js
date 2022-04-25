Ext.define("Ext.layout.component.field.Trigger",{alias:"layout.triggerfield",extend:"Ext.layout.component.field.Field",type:"triggerfield",borderWidths:{},beginLayout:function(n){var t=this,i=t.owner,r;n.triggerWrap=n.getEl("triggerWrap");t.callParent(arguments);r=i.getTriggerStateFlags();r!=i.lastTriggerStateFlags&&(i.lastTriggerStateFlags=r,t.updateEditState())},beginLayoutCycle:function(n){this.callParent(arguments);n.widthModel.shrinkWrap&&!this.owner.inputWidth&&n.inputContext.el.setStyle("width","")},beginLayoutFixed:function(n,t,i){var u=this,r=n.target,e=u.ieInputWidthAdjustment||0,f="100%",o=r.triggerWrap;u.callParent(arguments);r.inputCell.setStyle("width","100%");e&&(u.adjustIEInputPadding(n),i==="px"&&(f=(r.inputWidth?r.inputWidth-u.getExtraWidth(n):t-e-u.getExtraWidth(n))+"px"));r.inputEl.setStyle("width",f);f=r.inputWidth;f?o.setStyle("width",f+e+"px"):o.setStyle("width",t+i);o.setStyle("table-layout","fixed")},adjustIEInputPadding:function(){this.owner.inputCell.setStyle("padding-right",this.ieInputWidthAdjustment+"px")},getExtraWidth:function(n){var u=this,t=u.owner,i=u.borderWidths,r=t.ui+t.triggerEl.getCount();return r in i||(i[r]=n.triggerWrap.getBorderInfo().width),i[r]+t.getTriggerWidth()},beginLayoutShrinkWrap:function(n){var t=n.target,r="",i=t.inputWidth,u=t.triggerWrap;this.callParent(arguments);i?(u.setStyle("width",i+"px"),i=i-this.getExtraWidth(n)+"px",t.inputEl.setStyle("width",i),t.inputCell.setStyle("width",i)):(t.inputCell.setStyle("width",r),t.inputEl.setStyle("width",r),u.setStyle("width",r),u.setStyle("table-layout","auto"))},getTextWidth:function(){var r=this,n=r.owner,t=n.inputEl,i;return i=(t.dom.value||(n.hasFocus?"":n.emptyText)||"")+n.growAppend,t.getTextWidth(i)},publishOwnerWidth:function(n,t){var i=this.owner;this.callParent(arguments);i.grow||i.inputWidth||(t-=this.getExtraWidth(n),i.labelAlign!="top"&&(t-=i.getLabelWidth()),n.inputContext.setWidth(t))},publishInnerHeight:function(n,t){n.inputContext.setHeight(t-this.measureLabelErrorHeight(n))},measureContentWidth:function(n){var t=this,i=t.owner,u=t.callParent(arguments),e=n.inputContext,f,r,o;return i.grow&&!n.state.growHandled?(f=t.getTextWidth()+n.inputContext.getFrameInfo().width,r=i.growMax,o=Math.min(r,u),r=Math.max(i.growMin,r,o),f=Ext.Number.constrain(f,i.growMin,r),e.setWidth(f),n.state.growHandled=!0,e.domBlock(t,"width"),u=NaN):i.inputWidth||(u-=t.getExtraWidth(n)),u},updateEditState:function(){var n=this,f=n.owner,t=f.inputEl,r=Ext.baseCSSPrefix+"trigger-noedit",u,i;n.owner.readOnly?(t.addCls(r),i=!0,u=!1):(n.owner.editable?(t.removeCls(r),i=!1):(t.addCls(r),i=!0),u=!n.owner.hideTrigger);f.triggerCell.setDisplayed(u);t.dom.readOnly=i}})