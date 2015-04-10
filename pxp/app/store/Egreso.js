Ext.define('pxp.store.Egreso', {
    extend: 'Ext.data.Store',
    requires: [
       'Ext.data.proxy.Memory',
       'Ext.util.Sorter'
    ],
    config: {
	    autoLoad: true,
	    simpleSortMode: true,
	    remoteFilter: false,
	    pageSize: 30,
	    model: 'pxp.model.Egreso',
	    successProperty: 'success'       
	 },
	  
	 initialize: function(){
	   var me = this;
       me.setProxy({
	        type: 'ajax',
	        withCredentials: true,
	        useDefaultXhrHeader: false,
	        url: pxp.apiRest._url('admin/Movimiento/listarMovimientoEgreso'),
	        reader : {
		        type : 'json',
		        rootProperty : 'datos',
		        totalProperty: 'total'
		    },
		    
		    listeners:{
		    	'exception':function(proxy, response, operation){
		                    var Response = Ext.JSON.decode(response.responseText);
		                    pxp.app.hideMask();
		                    Ext.Msg.alert('Ocurrio un problema', Response.ROOT.detalle.mensaje, Ext.emptyFn);
				            
                      }
		    	
		      }
		});
    }  
});