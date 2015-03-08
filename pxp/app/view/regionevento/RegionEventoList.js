/**
 * @class kiva.views.List
 * @extends Ext.DataView
 */
Ext.define('pxp.view.regionevento.RegionEventoList', {
    extend: 'Ext.Container',
    xtype : 'regioneventolist',
    requires: [
        'pxp.view.regionevento.RegionEventoTbar',
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'Ext.List',
        'pxp.store.RegionEvento'
    ],

    config: {
    	showAnimation: { type: "slide", direction: "down" },
    	layout: {
            type: 'vbox',
            align: 'stretch'
        },
    	items: [{
	           	 xtype : 'regioneventotbar',
	             docked: 'top'
	           }]
    },
    initialize:function(){
    	var me = this;
    	me.store = Ext.create('pxp.store.RegionEvento');
    	
	   
	   me.add([
	   	    {
		   	    xtype: 'list',
	            flex: 1,
	            plugins: [
	                    {
	                        xclass: 'Ext.plugin.ListPaging',
	                        autoPaging: true,
	                        noMoreRecordsText: 'No tenemos mas registros'
	                    },
	                    { xclass: 'Ext.plugin.PullRefresh' }
	                ],
			   	masked: { xtype: 'loadmask', message: 'loading' },
		    	store: me.store,
		    	itemTpl: "<div><table width='100%'>"+
						  "<tr>"+
						   "<td colspan=2 style='float: left;' width='100%'> {fecha_programada:date('j F, Y')} - <font size='2'>({estado})</font></td>"+						   
						  "</tr>"+
						  "<tr>"+
						    "<td colspan=2 style='float: left;' width='100%'>Casa Oración: {nombre_co}</td>"+						   
						  "</tr>"+
						  "<tr>"+
						    "<td colspan=2 style='float: left;' width='100%'>Evento: {nombre}</td>"+						   
						  "</tr>"+
						  "<tr>"+
						    "<td style='float: left;' width='50%'><b>Hermanos: {cantidad_hermano}</b></td>"+
						    "<td style='float: left;' width='50%'><b>Hermanas: {cantidad_hermana}</b></td>"+ 
						  "</tr>"+
						  "<tr>"+
						    "<td colspan=2 style='float: left;' width='100%'><p align='right'><font size='1'>(actualizado por: {cuenta})</font></p></td>"+						   
						  "</tr>"+
						  "</table></div>"
     
	   	
	   }]);
	   
	   me.mask(); 
       me.store.load({callback:function(){
    		me.unmask();
    		
       }});
       //me.callParent(arguments)
    	  
    }
    
});
