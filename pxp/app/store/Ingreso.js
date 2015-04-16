Ext.define('pxp.store.Ingreso', {
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
	    model: 'pxp.model.Ingreso',
	    successProperty: 'success'       
	 },
	  
	 initialize: function(){
	   var me = this;
       me.setProxy({
	        type: 'ajax',
	        withCredentials: true,
	        useDefaultXhrHeader: false,
	        url: pxp.apiRest._url('admin/Movimiento/listarMovimientoIngreso'),
	        reader : {
		        type : 'json',
		        rootProperty : 'datos',
		        totalProperty: 'total'
		    },
		    
		    listeners:{
		    	'exception':function(proxy, response, operation){
		                    pxp.app.hideMask();
		                    Ext.Msg.alert('Ocurrio un problema', 'al comunicarce con el servidor');
				            
                      }
		    	
		      }
		});
    }  
});