/**
 * @class kiva.views.List
 * @extends Ext.DataView
 */
Ext.define('pxp.view.casaoracion.CasaOracionList', {
    extend: 'Ext.Container',
    xtype : 'casaoracionlist',
    requires: [
        'pxp.view.casaoracion.CasaOracionTbar',
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'Ext.List',  
        'pxp.store.CasaOracion'
    ],

    config: {
    	showAnimation: { type: "slide", direction: "down" },
    	layout: {
            type: 'vbox',
            align: 'stretch'
        },
    	items: [{
	           	 xtype : 'casaoraciontbar',
	             docked: 'top'
	           }]
    },
    initialize:function(){
    	var me = this;
    	me.store = Ext.create('pxp.store.CasaOracion');
    	
	   
	   me.add([
	   	    {
		   	    xtype: 'list',
		   	    //enable disclosure icons
                disclosure: true,
                onItemDisclosure: function(record, item, index, e) {
		            //show a messagebox alert which shows the persons firstName
		            e.stopEvent();
		            me.fireEvent('onDisclosure',record);
		        },
		   	    flex: 1,
	            plugins: [
	                    {
	                        xclass: 'Ext.plugin.ListPaging',
	                        autoPaging: true,
	                        noMoreRecordsText: 'No tenemos mas registros'
	                    },
	                    { xclass: 'Ext.plugin.PullRefresh' }
	                ],
			   	//masked: { xtype: 'loadmask', message: 'loading' },
		    	store: me.store,
		    	itemTpl: "<div><table width='100%'>"+
						  
						  "<tr>"+
						   "<td colspan=5 style='float: left;' width='100%'> <font size='5'>{codigo}  {nombre}</font></td>"+						   
						  "</tr>"+
						  "<tr>"+
						    "<td colspan=5 style='float: left;' width='100%'>Lugar: {desc_lugar} - Reg: {desc_region}</td>"+						   
						  "</tr>"+
						  "<tr>"+
						    "<td colspan=5 style='float: left;' width='100%'>Dirección: {direccion}</td>"+						   
						  "</tr>"+		
						 "</table></div>"
      }]);
	   
       me.unmask();
    	  
    }
    
});
