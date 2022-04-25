Ext.define("Ext.menu.Manager",{singleton:!0,requires:["Ext.util.MixedCollection","Ext.util.KeyMap"],alternateClassName:"Ext.menu.MenuMgr",uses:["Ext.menu.Menu"],menuSelector:"."+Ext.baseCSSPrefix+"menu",menus:{},groups:{},attached:!1,lastShow:new Date,init:function(){var n=this;n.active=new Ext.util.MixedCollection;Ext.getDoc().addKeyListener(27,function(){n.active.length>0&&n.hideAll()},n)},hideAll:function(){var t=this.active,i,n,r;if(t&&t.length>0){for(i=Ext.Array.slice(t.items),r=i.length,n=0;n<r;n++)i[n].hide();return!0}return!1},onHide:function(n){var t=this,i=t.active;i.remove(n);i.length<1&&(Ext.getDoc().un("mousedown",t.onMouseDown,t),t.attached=!1)},onShow:function(n){var t=this,i=t.active,r=t.attached;if(t.lastShow=new Date,i.add(n),!r){Ext.getDoc().on("mousedown",t.onMouseDown,t,{buffer:Ext.isIE9m?10:undefined});t.attached=!0}n.toFront()},onBeforeHide:function(n){n.activeChild&&n.activeChild.hide();n.autoHideTimer&&(clearTimeout(n.autoHideTimer),delete n.autoHideTimer)},onBeforeShow:function(n){var i=this.active,t=n.parentMenu;i.remove(n);t||n.allowOtherMenus?t&&t.activeChild&&n!=t.activeChild&&t.activeChild.hide():this.hideAll()},onMouseDown:function(n){var t=this,r=t.active,u=t.lastShow,i=!0;Ext.Date.getElapsed(u)>50&&r.length>0&&!n.getTarget(t.menuSelector)&&(Ext.isIE9m&&!Ext.getDoc().contains(n.target)&&(i=!1),i&&t.hideAll())},register:function(n){var t=this;if(t.active||t.init(),n.floating){t.menus[n.id]=n;n.on({beforehide:t.onBeforeHide,hide:t.onHide,beforeshow:t.onBeforeShow,show:t.onShow,scope:t})}},get:function(n){var t=this.menus;return typeof n=="string"?t?t[n]:null:n.isMenu?n:Ext.isArray(n)?new Ext.menu.Menu({items:n}):Ext.ComponentManager.create(n,"menu")},unregister:function(n){var t=this,i=t.menus,r=t.active;delete i[n.id];r.remove(n);n.un({beforehide:t.onBeforeHide,hide:t.onHide,beforeshow:t.onBeforeShow,show:t.onShow,scope:t})},registerCheckable:function(n){var i=this.groups,t=n.group;t&&(i[t]||(i[t]=[]),i[t].push(n))},unregisterCheckable:function(n){var i=this.groups,t=n.group;t&&Ext.Array.remove(i[t],n)},onCheckChange:function(n,t){var o=this.groups,f=n.group,i=0,r,e,u;if(f&&t)for(r=o[f],e=r.length;i<e;i++)u=r[i],u!=n&&u.setChecked(!1)}})