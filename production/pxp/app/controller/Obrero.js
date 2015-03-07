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
            obrerotbar: 'obrerotbar'
        },
        control: {
            'obrerolist list': {
                itemtap: 'onListTap'
            },            
            'obrerotbar #refreshobrero':{
            	tap:'onRefresh'
            },            
            'obrerotbar #searchfComponent':{
            	action: 'onActiveFilter',
            	clearicontap: 'onClearFilter'
            }
         } 
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
   },
   
});
