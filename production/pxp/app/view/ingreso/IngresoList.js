/**
 * @class kiva.views.List
 * @extends Ext.DataView
 */
Ext.define('pxp.view.ingreso.IngresoList', {
    extend: 'Ext.Container',
    xtype : 'ingresolist',
    requires: [
        'pxp.view.ingreso.IngresoTbar',
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'Ext.List',
        'pxp.store.Ingreso'
    ],

    config: {
    	showAnimation: { type: "slide", direction: "down" },
    	layout: {
            type: 'vbox',
            align: 'stretch'
        },
    	items: [
    	       {
	           	 xtype : 'ingresotbar',
	             docked: 'top'
	           },
			   {
			   	  xtype: 'panel',
			   	   ui: 'light',
			   	  itemId: 'resumenIngreso',
			   	  html: '<p></p>',
	              docked: 'bottom'
		
			   }]
    },
    initialize:function(){
    	var me = this;
    	me.store = Ext.create('pxp.store.Ingreso');
    	
	   
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
						   "<td colspan=5 style='float: left;' width='100%'> {fecha:date('j F, Y')} - <font size='2'>(Estado: {estado})</font></td>"+						   
						  "</tr>"+
						  "<tr>"+
						    "<td colspan=5 style='float: left;' width='100%'>Casa Oración: {desc_casa_oracion}</td>"+						   
						  "</tr>"+
						  "<tr>"+
						    "<td colspan=5 style='float: left;' width='100%'>{concepto}</td>"+						   
						  "</tr>"+
						  "<tr>"+
						    "<td style='float: left;' width='20%'><b>Mant.</b></td>"+
						    "<td style='float: left;' width='20%'><b>Const.</b></td>"+ 
						    "<td style='float: left;' width='20%'><b>Viaje</b></td>"+ 
						    "<td style='float: left;' width='20%'><b>Espec.</b></td>"+ 
						    "<td style='float: left;' width='20%'><b>Piedad</b></td>"+ 
						  "</tr>"+
						  "<tr>"+
						    "<td style='float: left;' width='20%'><b>{monto_mantenimiento}</b></td>"+
						    "<td style='float: left;' width='20%'><b>{monto_construccion}</b></td>"+ 
						    "<td style='float: left;' width='20%'><b>{monto_viaje}</b></td>"+ 
						    "<td style='float: left;' width='20%'><b>{monto_especial}</b></td>"+ 
						    "<td style='float: left;' width='20%'><b>{monto_piedad}</b></td>"+ 
						  "</tr>"+
						  "<tr>"+
						    "<td colspan=5 style='float: left;' width='100%'>Total: {monto_dia}</td>"+						   
						  "</tr>"+
						  "<tr>"+
						    "<td colspan=5 style='float: left;' width='100%'>Reponsable: {desc_obrero}</td>"+						   
						  "</tr>"+
						  
						  "<tr>"+
						    "<td colspan=5 style='float: left;' width='100%'><p align='right'><font size='1'>(actualizado por: {usr_mod})</font></p></td>"+						   
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
