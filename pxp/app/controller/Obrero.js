/**
 * @class Kiva.controller.Loans
 * @extends Ext.app.Controller
 *
 * The only controller in this simple application - this simply sets up the fullscreen viewport panel
 * and renders a detailed overlay whenever a Loan is tapped on.
 */
Ext.define('pxp.controller.Obrero', {
    extend: 'Ext.app.Controller',
    config: {
    	profile: Ext.os.deviceType.toLowerCase(),
        models: [
            'pxp.model.Obrero'
        ],
        stores: [
          // 'emsysMobile.store.Customers'
        ],

        refs: {
            obrerolist: 'obrerolist',
            obreroform: 'obreroform',
            obrerotbar: 'obrerotbar'
        },
        control: {
            'obrerolist list': {
                itemdoubletap: 'onFormEdit'
            },            
            'obrerotbar #refreshobrero':{
            	tap:'onRefresh'
            },            
            'obrerotbar #searchfComponent':{
            	action: 'onActiveFilter',
            	clearicontap: 'onClearFilter'
            },
            'obreroform #back':{
            	tap:'onBackList'
            },
            
            'obreroform #save':{
            	tap:'onSave'
            }
         } 
    },
    onFormEdit: function(list, index, target, record, e, eOpts){
   	    this.getObreroform().show();
    	this.getObrerolist().hide();
    	this.getObreroform().reset(); 
    	this.getObreroform().setRecord(record);
    	this.getObreroform().down('title').setTitle('Editar cotacto');
    	
    	
   },
   onBackList:function(){
   	   this.getObreroform().hide();
       this.getObrerolist().show();
   },
   onSave:function(){
    	var me = this,
    	    params =  me.getObreroform().getValues();
             
        pxp.app.showMask();      
    	Ext.Ajax.request({
		        withCredentials: true,
	            useDefaultXhrHeader: false,
	            url: pxp.apiRest._url('admin/Obrero/modificarObreroMobile'),
		        params: params,
		        method: 'POST',
		        scope: me,
		        success: function(resp){
		           var Response = Ext.JSON.decode(resp.responseText);
		           pxp.app.hideMask();
		           me.onBackList(); 
		           me.getObrerolist().down('list').getStore().load({start:0,
															    	  limit:20,
															    	  page:1});
		        },
		        failure:function(resp){
                    var Response = Ext.JSON.decode(resp.responseText);
                    pxp.app.hideMask();
                    alert(Response.ROOT.detalle.mensaje)
                }
        });
    	
   },
   onActiveFilter:function(field){
    	var me = this;
	    me.getObrerolist().down('list').mask(); 
    	var store = me.getObrerolist().down('list').getStore();
    	
    	store.getProxy().setExtraParams({
    		     "par_filtro":"tipmi.nombre#per.nombre_completo1",
			     "query":field.getValue()
			});
			
    	store.load({
    		start:0,
    		limit:20,
    		page:1,
    		callback:function(){
    		me.getObrerolist().down('list').unmask();
    		
    	}});
    },
    onClearFilter:function(){
    	var me = this;
	    me.getObrerolist().down('list').mask(); 
    	var store = me.getObrerolist().down('list').getStore();
    	store.getProxy().setExtraParams({});
    	store.load({
    		start:0,
    		limit:20,
    		page:1,
    		callback:function(){
    		me.getObrerolist().down('list').unmask();
    	}});
    },
    
   launch:function(){
	   	/*Ext.define("Obs", { extend: "Ext.data.Model", 
	                         config:{
	                           fields: [
				                {name: 'obs',     type: 'string'}
				               ],
				                validations: [
				                {type: 'presence', name: 'obs',message:"Indique una Observacion"}
				                ]
				              }
				            });*/
   }, 
   
   
   
   onRefresh: function(){
   	
   	   var me = this;
   	   me.getObrerolist().down('list').getStore().load();
   	
   },
    
   
    
   onListTap: function(lista, index, target, record, e, eOpts){
   	console.log('...  ',record);
   }
   
});