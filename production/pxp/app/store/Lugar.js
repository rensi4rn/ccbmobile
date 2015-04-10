Ext.define('pxp.store.Lugar', {
    extend: 'Ext.data.Store',
    
    requires: [
       'Ext.data.proxy.Memory',
       'Ext.util.Sorter',
       'pxp.model.Lugar'
    ],
    
    config: {
	    autoLoad: false,
	    simpleSortMode: true,
	    remoteFilter: true,
	    pageSize: 20,
	    model: 'pxp.model.Lugar' ,
	    successProperty: 'success'
	    
	  },
	 initialize: function(){
	   var me = this;
       me.setProxy({
	        type: 'ajax',
	        withCredentials: true,
	        useDefaultXhrHeader: false,
	        url: pxp.apiRest._url('parametros/Lugar/listarLugar'),
	        reader : {
		        type : 'json',
		        rootProperty : 'datos',
		        totalProperty: 'total'
		    }
	    });
    } 

});