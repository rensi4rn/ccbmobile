Ext.define('pxp.view.component.OrdenTrabajo', {
    extend: 'Ext.Container',
    xtype: 'ordentrabajocomp',
    requires: [
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'Ext.List',
        'pxp.store.OrdenTrabajo'
    ],

    config: {
    	showAnimation: { type: "slide", direction: "up" } ,
    	valueField:'desc_orden',
    	idField:'id_orden_trabajo',
        ui: 'detail',
        cmpText:undefined,
        cmpHidden:undefined,
        
        baseCls: Ext.baseCSSPrefix + 'sheet',
        modal: true,
        centered : true,
        hideOnMaskTap : true,
        
        width: Ext.os.is.Phone?'100%':450,
        top: '40%',
        bottom: 5,
        right:  Ext.os.is.Phone?0:5,

        layout: {
            type: 'vbox',
            align: 'stretch'
        },

       items: [
            {
                xtype: 'toolbar',
                itemId:'pickupstoolbar2',
                docked: 'top',
                layout:'hbox',
                items: [
                   { 
                   	 xtype: 'button',
                     text: 'Cancel',
                     align: 'left',
                     listeners: {
			                tap: function (searchField) {
			                    searchField.up('ordentrabajocomp').onCancel();
			                 },
			                 scope: this
			             
                     }
                   },
                   { 
                   	  xtype: 'searchfield', 
                   	  flex: 1 ,
                   	  itemId:'searchfComponent' ,
                   	  listeners: {
			                action: function (searchField) {
			                    searchField.up('ordentrabajocomp').onActiveFilter(searchField.getValue());
			                 },
			                clearicontap:function(searchField){
			                	searchField.up('ordentrabajocomp').onClearFilter()
			                },
			                scope: this
			            }
                   	  
                   	},
                   { 
                   	 xtype: 'button',
                   	 text: 'Done',
                   	 align: 'right',
                   	 listeners: {
			                tap: function (searchField) {
			                    searchField.up('ordentrabajocomp').onDone();
			                 },
			                scope: this
			            }
                   	 
                   	 
                   }
                ]
            }
         
        ]
    },

    hide: function(animation) {
        var me = this;

        //we fire this event so the controller can deselect all items immediately.
        me.fireEvent('hideanimationstart', me);

        //show the mask again
        me.callParent();
    },
    
    initialize: function(){
       var me = this;
       me.store = Ext.create('pxp.store.OrdenTrabajo');	
       me.add([
         {
            xtype: 'list',
            flex: 1,
            plugins: [
                    {
                        xclass: 'Ext.plugin.ListPaging',
                        autoPaging: true,
                        noMoreRecordsText: 'No More Records'
                    },
                    { xclass: 'Ext.plugin.PullRefresh' }
                ],
            store: me.store,
            itemTpl:'<p>{'+me.getValueField()+'}</p>',
            masked: { xtype: 'loadmask', message: 'loading' }

        }]);
	   
	    me.mask(); 
    	me.store.load({callback:function(){
    		me.unmask();
    		
    	}});
    	me.callParent(arguments)
    	
    },
    onActiveFilter:function(value){
    	var me = this;
	    me.mask(); 
    	var store = me.down('list').getStore();
    	
    	
    	
    	store.getProxy().setExtraParams({
    		     "par_filtro":"desc_orden",
			     "query":value
			});
    	store.load({
    		start:0,
    		limit:20,
    		page:1,
    		callback:function(){
    		me.unmask();
    		
    	}});
    },
    onClearFilter:function(value){
    	var me = this;
	    me.mask(); 
    	var store = me.down('list').getStore();
    	store.getProxy().setExtraParams({});
    	store.load({
    		start:0,
    		limit:20,
    		page:1,
    		callback:function(){
    		me.unmask();
    	}});
    },
    idColumn:'id_orden_trabajo',
    displayColumn:'desc_orden',
    onDone:function(){
    	var me = this,
    	    rec = me.down('list').getSelection();
    	console.log('registro',rec);
    	if(rec[0]){
    	   console.log('me.displayColumn',me.displayColumn)
    	   console.log('me.idColumn',me.idColumn)
    	   me.getCmpText().setValue(rec[0].data[me.displayColumn]);
    	   me.getCmpHidden().setValue(rec[0].data[me.idColumn]);
    	   me.hide()
    	}
    	
    },
    onCancel:function(){
    	this.hide();
    }
  
});
