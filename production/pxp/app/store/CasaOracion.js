Ext.define('pxp.store.CasaOracion', {
    extend: 'Ext.data.Store',
    
    requires: [
       'Ext.data.proxy.Memory',
       'Ext.util.Sorter',
       'pxp.model.CasaOracion'
    ],
    
    config: {
	    autoLoad: false,
	    simpleSortMode: true,
	    remoteFilter: true,
	    pageSize: 20,
	    model: 'pxp.model.CasaOracion' ,
	    successProperty: 'success'
	    
	  },
	 initialize: function(){
	   var me = this;
       me.setProxy({
	        type: 'ajax',
	        withCredentials: true,
	        useDefaultXhrHeader: false,
	        url: pxp.apiRest._url('admin/CasaOracion/listarCasaOracion'),
	        reader : {
		        type : 'json',
		        rootProperty : 'datos',
		        totalProperty: 'total'
		    }
	    });
    } 

});

