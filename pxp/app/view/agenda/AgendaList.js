/**
 * @class kiva.views.List
 * @extends Ext.DataView
 */
Ext.define('pxp.view.agenda.AgendaList', {
    extend: 'Ext.Container',
    xtype : 'agendalist',
    requires: [
        'pxp.view.agenda.AgendaTbar',
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'Ext.List',  
        'pxp.store.Agenda'
    ],

    config: {
    	showAnimation: { type: "slide", direction: "down" },
    	layout: {
            type: 'vbox',
            align: 'stretch'
        },
    	items: [
    	       {
	           	 xtype : 'agendatbar',
	             docked: 'top'
	           },
			   {
			   	  xtype: 'panel',
			   	   ui: 'light',
			   	  itemId: 'resumenAgenda',
			   	  html: '<p></p>',
	              docked: 'bottom'
		
			   }]
    },
    initialize:function(){
    	var me = this;
    	me.store = Ext.create('pxp.store.Agenda');
    	
	   
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
						   "<td colspan=5 style='float: left;' width='100%'> {fecha_programada:date('j F, Y')} - <font size='2'>(Estado: {estado})</font></td>"+						   
						  "</tr>"+
						  "<tr>"+
						   "<td colspan=5 style='float: left;' width='100%'> <font size='5'>{desc_evento} ({hora})</font></td>"+						   
						  "</tr>"+
						  
						  
						  "<tr>"+
						    "<td colspan=5 style='float: left;' width='100%'>Casa Oración: {desc_casa_oracion}</td>"+						   
						  "</tr>"+
						  "<tr>"+
						    "<td colspan=5 style='float: left;' width='100%'>Lugar: {desc_lugar} - Reg: {desc_region}</td>"+						   
						  "</tr>"+	
						  "<tr>"+
						    "<td colspan=5 style='float: left;' width='100%'>Atiende: {desc_obrero}</td>"+						   
						  "</tr>"+					  
						  
						  "<tr>"+
						    "<td colspan=5 style='float: left;' width='100%'><p align='right'><font size='1'>(actualizado por: {usr_mod})</font></p></td>"+						   
						  "</tr>"+
						  "</table></div>"
     
	   	
	   }]);
	  
       me.unmask();
    	  
    }
    
});
