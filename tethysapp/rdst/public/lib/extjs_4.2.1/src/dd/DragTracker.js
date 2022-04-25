Ext.define("Ext.dd.DragTracker",{uses:["Ext.util.Region"],mixins:{observable:"Ext.util.Observable"},active:!1,trackOver:!1,tolerance:5,autoStart:!1,constructor:function(n){var t=this;Ext.apply(t,n);t.addEvents("mouseover","mouseout","mousedown","mouseup","mousemove","beforedragstart","dragstart","dragend","drag");t.dragRegion=new Ext.util.Region(0,0,0,0);t.el&&t.initEl(t.el);t.mixins.observable.constructor.call(t);t.disabled&&t.disable()},initEl:function(n){var t=this;t.el=Ext.get(n);t.handle=Ext.get(t.delegate);t.delegate=t.handle?undefined:t.delegate;t.handle||(t.handle=t.el);t.handleListeners={scope:t,delegate:t.delegate,mousedown:t.onMouseDown};(t.trackOver||t.overCls)&&Ext.apply(t.handleListeners,{mouseover:t.onMouseOver,mouseout:t.onMouseOut});t.mon(t.handle,t.handleListeners)},disable:function(){this.disabled=!0},enable:function(){this.disabled=!1},destroy:function(){var n=this;n.active&&n.endDrag({});n.clearListeners();n.mun(n.handle,n.handleListeners);n.el=n.handle=null},onMouseOver:function(n,t){var i=this;i.disabled||(Ext.EventManager.contains(n)||i.delegate)&&(i.mouseIsOut=!1,i.overCls&&i.el.addCls(i.overCls),i.fireEvent("mouseover",i,n,i.delegate?n.getTarget(i.delegate,t):i.handle))},onMouseOut:function(n){var t=this;t.mouseIsDown?t.mouseIsOut=!0:(t.overCls&&t.el.removeCls(t.overCls),t.fireEvent("mouseout",t,n))},onMouseDown:function(n,t){var i=this,r;if(!i.disabled&&!n.dragTracked&&(i.dragTarget=i.delegate?t:i.handle.dom,i.startXY=i.lastXY=n.getXY(),i.startRegion=Ext.fly(i.dragTarget).getRegion(),i.fireEvent("mousedown",i,n)!==!1&&i.fireEvent("beforedragstart",i,n)!==!1&&i.onBeforeStart(n)!==!1)){i.mouseIsDown=!0;n.dragTracked=!0;r=i.el.dom;Ext.isIE&&r.setCapture&&r.setCapture();i.preventDefault!==!1&&n.preventDefault();Ext.getDoc().on({scope:i,mouseup:i.onMouseUp,mousemove:i.onMouseMove,selectstart:i.stopSelect});i.autoStart&&(i.timer=Ext.defer(i.triggerStart,i.autoStart===!0?1e3:i.autoStart,i,[n]))}},onMouseMove:function(n){var t=this,i=n.getXY(),r=t.startXY;if(n.preventDefault(),t.lastXY=i,!t.active)if(Math.max(Math.abs(r[0]-i[0]),Math.abs(r[1]-i[1]))>t.tolerance)t.triggerStart(n);else return;if(t.fireEvent("mousemove",t,n)===!1)t.onMouseUp(n);else{t.onDrag(n);t.fireEvent("drag",t,n)}},onMouseUp:function(n){var t=this;if(t.mouseIsDown=!1,t.mouseIsOut){t.mouseIsOut=!1;t.onMouseOut(n)}n.preventDefault();Ext.isIE&&document.releaseCapture&&document.releaseCapture();t.fireEvent("mouseup",t,n);t.endDrag(n)},endDrag:function(n){var t=this,i=t.active;if(Ext.getDoc().un({mousemove:t.onMouseMove,mouseup:t.onMouseUp,selectstart:t.stopSelect,scope:t}),t.clearStart(),t.active=!1,i){t.onEnd(n);t.fireEvent("dragend",t,n)}t._constrainRegion=Ext.EventObject.dragTracked=null},triggerStart:function(n){var t=this;t.clearStart();t.active=!0;t.onStart(n);t.fireEvent("dragstart",t,n)},clearStart:function(){var n=this.timer;n&&(clearTimeout(n),this.timer=null)},stopSelect:function(n){return n.stopEvent(),!1},onBeforeStart:function(){},onStart:function(){},onDrag:function(){},onEnd:function(){},getDragTarget:function(){return this.dragTarget},getDragCt:function(){return this.el},getConstrainRegion:function(){var n=this;if(n.constrainTo){if(n.constrainTo instanceof Ext.util.Region)return n.constrainTo;n._constrainRegion||(n._constrainRegion=Ext.fly(n.constrainTo).getViewRegion())}else n._constrainRegion||(n._constrainRegion=n.getDragCt().getViewRegion());return n._constrainRegion},getXY:function(n){return n?this.constrainModes[n](this,this.lastXY):this.lastXY},getOffset:function(n){var t=this.getXY(n),i=this.startXY;return[t[0]-i[0],t[1]-i[1]]},constrainModes:{point:function(n,t){var i=n.dragRegion,r=n.getConstrainRegion();return r?(i.x=i.left=i[0]=i.right=t[0],i.y=i.top=i[1]=i.bottom=t[1],i.constrainTo(r),[i.left,i.top]):t},dragTarget:function(n,t){var f=n.startXY,i=n.startRegion.copy(),r=n.getConstrainRegion(),u;return r?(i.translateBy(t[0]-f[0],t[1]-f[1]),i.right>r.right&&(t[0]+=u=r.right-i.right,i.left+=u),i.left<r.left&&(t[0]+=r.left-i.left),i.bottom>r.bottom&&(t[1]+=u=r.bottom-i.bottom,i.top+=u),i.top<r.top&&(t[1]+=r.top-i.top),t):t}}})