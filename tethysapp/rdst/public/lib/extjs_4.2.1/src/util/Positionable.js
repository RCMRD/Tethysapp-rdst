Ext.define("Ext.util.Positionable",{_positionTopLeft:["position","top","left"],_alignRe:/^([a-z]+)-([a-z]+)(\?)?$/,afterSetPosition:Ext.emptyFn,getAnchorToXY:function(){Ext.Error.raise("getAnchorToXY is not implemented in "+this.$className)},getBorderPadding:function(){Ext.Error.raise("getBorderPadding is not implemented in "+this.$className)},getLocalX:function(){Ext.Error.raise("getLocalX is not implemented in "+this.$className)},getLocalXY:function(){Ext.Error.raise("getLocalXY is not implemented in "+this.$className)},getLocalY:function(){Ext.Error.raise("getLocalY is not implemented in "+this.$className)},getX:function(){Ext.Error.raise("getX is not implemented in "+this.$className)},getXY:function(){Ext.Error.raise("getXY is not implemented in "+this.$className)},getY:function(){Ext.Error.raise("getY is not implemented in "+this.$className)},setLocalX:function(){Ext.Error.raise("setLocalX is not implemented in "+this.$className)},setLocalXY:function(){Ext.Error.raise("setLocalXY is not implemented in "+this.$className)},setLocalY:function(){Ext.Error.raise("setLocalY is not implemented in "+this.$className)},setX:function(){Ext.Error.raise("setX is not implemented in "+this.$className)},setXY:function(){Ext.Error.raise("setXY is not implemented in "+this.$className)},setY:function(){Ext.Error.raise("setY is not implemented in "+this.$className)},adjustForConstraints:function(n,t){var i=this.getConstrainVector(t,n);return i&&(n[0]+=i[0],n[1]+=i[1]),n},alignTo:function(n,t,i,r){var u=this,f=u.el;return u.setXY(u.getAlignToXY(n,t,i),f.anim&&!!r?f.anim(r):!1)},anchorTo:function(n,t,i,r,u,f){var e=this,s=!Ext.isEmpty(u),o=function(){e.alignTo(n,t,i,r);Ext.callback(f,e)},h=e.getAnchor();e.removeAnchor();Ext.apply(h,{fn:o,scroll:s});Ext.EventManager.onWindowResize(o,null);if(s)Ext.EventManager.on(window,"scroll",o,null,{buffer:isNaN(u)?50:u});return o(),e},calculateAnchorXY:function(n,t,i,r){var s=this,h=s.el,c=document,l=h.dom==c.body||h.dom==c,e=Math.round,u,f,o;n=(n||"tl").toLowerCase();r=r||{};f=r.width||l?Ext.Element.getViewWidth():s.getWidth();o=r.height||l?Ext.Element.getViewHeight():s.getHeight();switch(n){case"tl":u=[0,0];break;case"bl":u=[0,o];break;case"tr":u=[f,0];break;case"c":u=[e(f*.5),e(o*.5)];break;case"t":u=[e(f*.5),0];break;case"l":u=[0,e(o*.5)];break;case"r":u=[f,e(o*.5)];break;case"b":u=[e(f*.5),o];break;case"tc":u=[e(f*.5),0];break;case"bc":u=[e(f*.5),o];break;case"br":u=[f,o]}return[u[0]+t,u[1]+i]},convertPositionSpec:Ext.identityFn,getAlignToXY:function(n,t,i){var r=this,tt=Ext.Element.getViewWidth()-10,it=Ext.Element.getViewHeight()-10,rt=document,ut=rt.documentElement,ft=rt.body,c=ut.scrollLeft||ft.scrollLeft||0,l=ut.scrollTop||ft.scrollTop||0,e,y,p,a,v,o,w,b,et,s,h,k,d,g,nt,u,f;return n=Ext.get(n.el||n),n&&n.dom||Ext.Error.raise({sourceClass:"Ext.util.Positionable",sourceMethod:"getAlignToXY",msg:"Attempted to align an element that doesn't exist"}),i=i||[0,0],t=(!t||t=="?"?"tl-bl?":!/-/.test(t)&&t!==""?"tl-"+t:t||"tl-bl").toLowerCase(),t=r.convertPositionSpec(t),e=t.match(r._alignRe),e||Ext.Error.raise({sourceClass:"Ext.util.Positionable",sourceMethod:"getAlignToXY",el:n,position:t,offset:i,msg:'Attemmpted to align an element with an invalid position: "'+t+'"'}),s=e[1],h=e[2],et=!!e[3],y=r.getAnchorXY(s,!0),p=r.getAnchorToXY(n,h,!1),u=p[0]-y[0]+i[0],f=p[1]-y[1]+i[1],et&&(a=r.getWidth(),v=r.getHeight(),o=n.getRegion(),k=s.charAt(0),d=s.charAt(s.length-1),g=h.charAt(0),nt=h.charAt(h.length-1),w=k=="t"&&g=="b"||k=="b"&&g=="t",b=d=="r"&&nt=="l"||d=="l"&&nt=="r",u+a>tt+c&&(u=b?o.left-a:tt+c-a),u<c&&(u=b?o.right:c),f+v>it+l&&(f=w?o.top-v:it+l-v),f<l&&(f=w?o.bottom:l)),[u,f]},getAnchor:function(){var t=this.el,i=(t.$cache||t.getCache()).data,n;if(t.dom)return n=i._anchor,n||(n=i._anchor={}),n},getAnchorXY:function(n,t,i){var r=this,f=r.getXY(),u=r.el,e=document,o=u.dom==e.body||u.dom==e,s=u.getScroll(),h=o?s.left:t?0:f[0],c=o?s.top:t?0:f[1];return r.calculateAnchorXY(n,h,c,i)},getBox:function(n,t){var i=this,c=t?i.getLocalXY():i.getXY(),r=c[0],u=c[1],e=i.getWidth(),o=i.getHeight(),f,s,h;return n&&(f=i.getBorderPadding(),s=f.beforeX,h=f.beforeY,r+=s,u+=h,e-=s+f.afterX,o-=h+f.afterY),{x:r,left:r,0:r,y:u,top:u,1:u,width:e,height:o,right:r+e,bottom:u+o}},calculateConstrainedPosition:function(n,t,i,r){var u=this,e,s=u.floatParent,h=s?s.getTargetEl():null,f,c,l,o=!1;return i&&s?(f=h.getXY(),c=h.getBorderPadding(),f[0]+=c.beforeX,f[1]+=c.beforeY,t&&(l=[t[0]+f[0],t[1]+f[1]])):l=t,n=n||u.constrainTo||h||u.container||u.el.parent(),e=(u.constrainHeader?u.header:u).getConstrainVector(n,l,r),e&&(o=t||u.getPosition(i),o[0]+=e[0],o[1]+=e[1]),o},getConstrainVector:function(n,t,i){var r=this.getRegion(),f=[0,0],e=this.shadow&&this.constrainShadow&&!this.shadowDisabled?this.shadow.getShadowSize():undefined,o=!1,u=this.constraintInsets;return n instanceof Ext.util.Region||(n=Ext.get(n.el||n).getViewRegion()),u&&(u=Ext.isObject(u)?u:Ext.Element.parseBox(u),n.adjust(u.top,u.right,u.bottom,u.length)),t&&r.translateBy(t[0]-r.x,t[1]-r.y),i&&(r.right=r.left+i[0],r.bottom=r.top+i[1]),e&&n.adjust(e[0],-e[1],-e[2],e[3]),r.right>n.right&&(o=!0,f[0]=n.right-r.right),r.left+f[0]<n.left&&(o=!0,f[0]=n.left-r.left),r.bottom>n.bottom&&(o=!0,f[1]=n.bottom-r.bottom),r.top+f[1]<n.top&&(o=!0,f[1]=n.top-r.top),o?f:!1},getOffsetsTo:function(n){var t=this.getXY(),i=Ext.fly(n.el||n,"_internal").getXY();return[t[0]-i[0],t[1]-i[1]]},getRegion:function(){var n=this.getBox();return new Ext.util.Region(n.top,n.right,n.bottom,n.left)},getViewRegion:function(){var n=this,s=n.el,h=s.dom.nodeName==="BODY",r,u,f,t,i,e,o;return h?(u=s.getScroll(),i=u.left,t=u.top,e=Ext.dom.AbstractElement.getViewportWidth(),o=Ext.dom.AbstractElement.getViewportHeight()):(r=n.getBorderPadding(),f=n.getXY(),i=f[0]+r.beforeX,t=f[1]+r.beforeY,e=n.getWidth(!0),o=n.getHeight(!0)),new Ext.util.Region(t,i+e,t+o,i)},move:function(n,t,i){var o=this,s=o.getXY(),r=s[0],u=s[1],h=[r-t,u],c=[r+t,u],f=[r,u-t],e=[r,u+t],l={l:h,left:h,r:c,right:c,t:f,top:f,up:f,b:e,bottom:e,down:e};n=n.toLowerCase();o.setXY([l[n][0],l[n][1]],i)},removeAnchor:function(){var n=this.getAnchor();return n&&n.fn&&(Ext.EventManager.removeResizeListener(n.fn),n.scroll&&Ext.EventManager.un(window,"scroll",n.fn),delete n.fn),this},setBox:function(n,t){var i=this,f=i.el,r=n.x,u=n.y,c=[r,u],e=n.width,o=n.height,h=i.constrain||i.constrainHeader,s=h&&i.calculateConstrainedPosition(null,[r,u],!1,[e,o]);return s&&(r=s[0],u=s[1]),t&&f.anim?i.animate(Ext.applyIf({to:{x:r,y:u,width:f.adjustWidth(e),height:f.adjustHeight(o)},listeners:{afteranimate:Ext.Function.bind(i.afterSetPosition,i,[r,u])}},t)):(i.setSize(e,o),i.setXY([r,u]),i.afterSetPosition(r,u)),i},setRegion:function(n,t){return this.setBox({x:n.left,y:n.top,width:n.right-n.left,height:n.bottom-n.top},t)},translatePoints:function(n,t){var i=this.translateXY(n,t);return{left:i.x,top:i.y}},translateXY:function(n,t){var u=this,f=u.el,e=f.getStyle(u._positionTopLeft),o=e.position=="relative",i=parseFloat(e.left),r=parseFloat(e.top),s=u.getXY();return Ext.isArray(n)&&(t=n[1],n=n[0]),isNaN(i)&&(i=o?0:f.dom.offsetLeft),isNaN(r)&&(r=o?0:f.dom.offsetTop),i=typeof n=="number"?n-s[0]+i:undefined,r=typeof t=="number"?t-s[1]+r:undefined,{x:i,y:r}}})