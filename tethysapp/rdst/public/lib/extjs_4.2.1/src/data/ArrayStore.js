Ext.define("Ext.data.ArrayStore",{extend:"Ext.data.Store",alias:"store.array",requires:["Ext.data.proxy.Memory","Ext.data.reader.Array"],constructor:function(n){n=Ext.apply({proxy:{type:"memory",reader:"array"}},n);this.callParent([n])},loadData:function(n,t){if(this.expandData===!0){for(var i=[],r=0,u=n.length;r<u;r++)i[i.length]=[n[r]];n=i}this.callParent([n,t])}},function(){Ext.data.SimpleStore=Ext.data.ArrayStore})