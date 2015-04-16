Ext.define('pxp.store.Interinos', {
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
	    model: 'pxp.model.Interino',
	    successProperty: 'success'       
	 },
	  
	 initialize: function(){
	   var me = this;
       me.setProxy({
	        type: 'ajax',
	        withCredentials: true,
	        useDefaultXhrHeader: false,
	        //pageParam: 'page',//This parameter needs to be modified
	        url: pxp.apiRest._url('organigrama/Interinato/listarMisSuplentes'),
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