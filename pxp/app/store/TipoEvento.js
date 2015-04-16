Ext.define('pxp.store.TipoEvento', {
    extend: 'Ext.data.Store',
    requires: [
       'Ext.data.proxy.Memory',
       'Ext.util.Sorter',
       'pxp.model.TipoEvento'
    ],
    config: {
	    autoLoad: true,
	    simpleSortMode: true,
	    remoteFilter: false,
	    pageSize: 30,
	    model: 'pxp.model.TipoEvento',
	    successProperty: 'success'       
	 },
	  
	 initialize: function(){
	   var me = this;
       me.setProxy({
	        type: 'ajax',
	        withCredentials: true,
	        useDefaultXhrHeader: false,
	        //extraParams:{tipo_interfaz:'VoBoProceso'},
	        //pageParam: 'page',//This parameter needs to be modified
	        url: pxp.apiRest._url('admin/Evento/listarEvento'),
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