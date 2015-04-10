/**
 * @class kiva.views.List
 * @extends Ext.DataView
 */
Ext.define('pxp.view.obrero.ObreroList', {
    extend: 'Ext.Container',
    xtype : 'obrerolist',
    requires: [
        'pxp.view.obrero.ObreroTbar',
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'pxp.store.Obrero'
    ],

    config: {
    	pivote:'',
    	showAnimation: { type: "slide", direction: "down" },
    	layout: {
            type: 'vbox',
            align: 'stretch'
        },
    	items: [{
	           	 xtype : 'obrerotbar',
	             docked: 'top'
	           }]
    },
    initialize:function(){
    	var me = this;
    	me.store = Ext.create('pxp.store.Obrero');
    	
    	
	    
	    me.add([
	   	    {
		   	    xtype: 'list',
	            flex: 1,
	            //cls:".x-item-selected a {color:#FFF;}",
	            plugins: [
	                    {
	                        xclass: 'Ext.plugin.ListPaging',
	                        autoPaging: true,
	                        noMoreRecordsText: 'No More Records'
	                    },
	                    { xclass: 'Ext.plugin.PullRefresh' }
	                ],
			   	masked: { xtype: 'loadmask', message: 'loading' },
		    	store: me.store,
		    	
		    	itemTpl: new Ext.XTemplate("<div><table width='100%'>",
		    	          "<tr>",
						  "<td colspan=2 style='float: left;' width='100%'><b>",
						  "<font color='red'>Hr. {desc_persona}</font>", 
					      "</b></td>",
						  "</tr>",						   	  
						  "<tr>",
						   "<td colspan=2 style='float: left;' width='100%'> <b>{desc_tipo_ministerio}</b></td>",						   
						  "</tr>",
						  "<tr>",
						   "<td colspan=2 style='float: left;' width='100%'> <b>{desc_casa_oracion}</b></td>",						   
						  "</tr>",						  
						  "<tr>",
						    "<td colspan=2 style='float: left;' width='100%'>Teléfono: <a href='tel:{telefono1}'>{telefono1}</a></td>",
						  "</tr>",
						  "<tr>",
						    "<td colspan=2 style='float: left;' width='100%'>Celular: <a  href='tel:{celular1}'>{celular1}</a></td>",
						  "</tr>",
						  "<tr>",
						    "<td colspan=2 style='float: left;' width='100%'>Correo: {correo}</td>",
						  "</tr>",
						  "<tr>"+
						    "<td colspan=2 style='float: left;' width='100%'><p align='right'><font size='1'>(actualizado por: {usr_mod})</font></p></td>"+						   
						  "</tr>"+
						  "</table>",
						  "</div>")
		 }]);
	   
	   me.mask(); 
       me.store.load({callback:function(){
    		me.unmask();
    		
       }});
    }
    
});
