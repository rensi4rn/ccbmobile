/**
 * @class kiva.views.List
 * @extends Ext.DataView
 */
Ext.define('pxp.view.egreso.EgresoList', {
    extend: 'Ext.Container',
    xtype : 'egresolist',
    requires: [
        'pxp.view.egreso.EgresoTbar',
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'Ext.List',
        'pxp.store.Egreso'
    ],

    config: {
    	showAnimation: { type: "slide", direction: "down" },
    	layout: {
            type: 'vbox',
            align: 'stretch'
        },
    	items: [
    	       {
	           	 xtype : 'egresotbar',
	             docked: 'top'
	           },
			   {
			   	  xtype: 'panel',
			   	   ui: 'light',
			   	  itemId: 'resumenEgreso',
			   	  html: '<p></p>',
	              docked: 'bottom'
		
			   }]
    },
    initialize:function(){
    	var me = this;
    	me.store = Ext.create('pxp.store.Egreso');
    	
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
			   	//masked: { xtype: 'loadmask', message: 'loading' },
		    	store: me.store,
		    	itemTpl: "<div><table width='100%'>"+
						  "<tr>"+
						   "<td colspan=2 style='float: left;' width='100%'> {fecha:date('j F, Y')} - <font size='2'>(Estado: {estado})</font></td>"+						   
						  "</tr>"+
						  "<tr>"+
						    "<td colspan=2 style='float: left;' width='100%'>Casa Oración:  <b>{desc_casa_oracion}</b></td>"+						   
						  "</tr>"+
						  "<tr>"+
						    "<td colspan=2 style='float: left;' width='100%'>Egreso por:  {concepto}</td>"+						   
						  "</tr>"+
						  "<tr>"+
						    "<td colspan=2 style='float: left;' width='100%'>Coletas de:  {desc_tipo_movimiento}</td>"+						   
						  "</tr>"+
						 
						  "<tr>"+
						    "<td colspan=2 style='float: left;' width='100%'>Total:  {monto}</td>"+						   
						  "</tr>"+
						  "<tr>"+
						    "<td colspan=1 style='float: left;' width='50%'>Doc:  {tipo_documento}</td>"+
						    "<td colspan=1 style='float: left;' width='50%'>Num:  {num_documento}</td>"+							   
						  "</tr>"+						  
						  "<tr>"+
						    "<td colspan=2 style='float: left;' width='100%'>{desc_ingas} - {obs}</td>"+							   
						  "</tr>"+						  
						  "<tr>"+
						    "<td colspan=2 style='float: left;' width='100%'>Reponsable:  {desc_obrero}</td>"+						   
						  "</tr>"+
						  "<tr>"+
						    "<td colspan=2 style='float: left;' width='100%'>OBjetivo:  {desc_orden}</td>"+						   
						  "</tr>"+
						  "<tr>"+
						    "<td colspan=2 style='float: left;' width='100%'><p align='right'><font size='1'>(actualizado por: {usr_mod})</font></p></td>"+						   
						  "</tr>"+
						  "</table></div>"
     
	   	
	   }]);
	   /*
	   me.mask(); 
       me.store.load({callback:function(){
    		me.unmask();
    		
       }});*/
       //me.callParent(arguments)
       me.unmask();
    	  
    }
    
});
