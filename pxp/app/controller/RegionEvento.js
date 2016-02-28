/**
 * @class Kiva.controller.Loans
 * @extends Ext.app.Controller
 *
 * The only controller in this simple application - this simply sets up the fullscreen viewport panel
 * and renders a detailed overlay whenever a Loan is tapped on.
 */
Ext.define('pxp.controller.RegionEvento', {
    extend: 'Ext.app.Controller',
    config: {
        profile: Ext.os.deviceType.toLowerCase(),
        
        models: [
            'pxp.model.RegionEvento'
        ],
        stores: [
          // 'emsysMobile.store.Customers'
        ],

        refs: {
            regioneventolist: 'regioneventolist',
            regioneventotbar: 'regioneventotbar',
            regioneventoform:'regioneventoform',
            calendario: 'calendario',
        },

        control: {
            'regioneventolist list': {
                itemdoubletap: 'onFormEdit'
            },
            'regioneventotbar #addregionevento': {
                tap: 'onAdd'
            },
            'regioneventotbar #deleteregionevento': {
                tap: 'onDelete'
            },
            
            'regioneventoform #back':{
            	tap:'onBackList'
            },
            
            'regioneventoform #casaoracionbutton':{
            	tap:'onTapListCasaOracion'
            },
            
            'regioneventoform #obrerobutton':{
            	tap:'onTapListObrero'
            },
            
            
            'regioneventoform #eventobutton':{
            	tap:'onTapListEvento'
            },
            
            'regioneventoform #save':{
            	tap:'onSave'
            }
        } 
    },
    onFormEdit: function(list, index, target, record, e, eOpts){
   	    this.getRegioneventoform().show();
    	this.getRegioneventolist().hide();
    	this.getRegioneventoform().reset(); 
    	this.getRegioneventoform().setRecord(record);
    	this.getRegioneventoform().down('title').setTitle('Editar Evento');
    	
    	
   },
   onAdd:function(){
   
   	    this.getRegioneventolist().hide();
     	//this.getInterinotbar().hide();
     	this.getRegioneventoform().show();
     	this.getRegioneventoform().down('title').setTitle('Nuevo Evento');
     	this.getRegioneventoform().reset(); 
   },
   onBackList:function(){
   	    
   	    var objFom = this.getRegioneventoform();
   	    if(objFom.config.origen == 'calendario'){
   	    	this.getRegioneventoform().hide();
    	    this.getCalendario().show();
    	    console.log('..................................',this.getCalendario().calendar)
    	    //this.getCalendario().calendar.refreshDelta(0);
    	    
    	    pxp.app.showMask();
    	    this.getCalendario().store.load({callback:function(){
					         	pxp.app.hideMask(); 
					         	this.getCalendario().calendar.refresh();
					        },
					        scope:this});
					        
    	    this.getCalendario().calendar.refresh();
    	    
   	    }
   	    else{
   	    	this.getRegioneventoform().hide();
    	    this.getRegioneventolist().show();
   	    }
   	    
     	
   },
    
   
   
   
    
   onSave:function(){
    	var me = this,
    	    fecha_programada = me.getRegioneventoform().down('#fecha_programada'),
    	    id_evento = me.getRegioneventoform().down('#id_evento'),
    	    id_obrero = me.getRegioneventoform().down('#id_obrero'),
    	    id_casa_oracion = me.getRegioneventoform().down('#id_casa_oracion'),
    	    cantidad_hermano = me.getRegioneventoform().down('#cantidad_hermano'),
    	    cantidad_hermana = me.getRegioneventoform().down('#cantidad_hermana'),
    	    estado = me.getRegioneventoform().down('#estado'),
    	    hora = me.getRegioneventoform().down('#hora'),
    	    params =  me.getRegioneventoform().getValues();
    	 
    	
    	if(!hora.getValue()){
         	alert('Necesitamos que indique la hora del evento', Ext.emptyFn);
            return;
        } 
        
        
             
             
        if(!id_evento.getValue()){
         	alert('Necesitamos que indique el evento', Ext.emptyFn);
            return;
        } 
        
        if(!id_casa_oracion.getValue()){
         	alert('Necesitamos que indique la casa de oración', Ext.emptyFn);
            return;
        } 
        
        if(!id_obrero.getValue()){
         	alert('Necesitamos que indique el obrero que atiende', Ext.emptyFn);
            return;
        } 
        
        if(!id_casa_oracion.getValue()){
         	alert('Necesitamos que indique el estado', Ext.emptyFn);
            return;
        }   
        console.log('hora.....', hora)     
        params = Ext.apply(params, {hora: hora.getValue().getHours()+':'+hora.getValue().getMinutes()+':00'});   
        pxp.app.showMask();      
    	Ext.Ajax.request({
		        withCredentials: true,
	            useDefaultXhrHeader: false,
	            url: pxp.apiRest._url('admin/RegionEvento/insertarBautizoSantaCena'),
		        params: params,
		        method: 'POST',
		        scope: me,
		        success: function(resp){
		           var Response = Ext.JSON.decode(resp.responseText);
		           pxp.app.hideMask();
		           //mostrar y actualizar el panel de listado
		           if(Response.ROOT.error){
		           	   alert(Response.ROOT.detalle.mensaje)
		           }
		           else{
			           //mostrar y actualizar el panel de listado
			           var objFom = this.getRegioneventoform();
			           me.onBackList(); 
			           if(objFom.config.origen != 'calendario'){
				   	    	me.getRegioneventolist().down('list').getStore().load({start:0,limit:20,page:1});
				   	   }
			           
		           }
		        },
		        failure:function(resp){
                    var Response = Ext.JSON.decode(resp.responseText);
                    pxp.app.hideMask();
                    alert(Response.ROOT.detalle.mensaje)
                }
        });
    	
   }, 
   onDelete:function(){
    	
    	
    	var seltected = this.getRegioneventolist().down('list').getSelection();
    	
    	if(seltected.length == 0){
    	    Ext.Msg.alert('Info ...','Selecione una fila primero');
    	    return
    	}
    	
    	pxp.app.showMask();
    	
    	var me = this,
    	    params = {
                id_region_evento:  seltected[0].data.id_region_evento
              
              };
              
        pxp.app.showMask();      
    	Ext.Ajax.request({
		        
		        withCredentials: true,
	            useDefaultXhrHeader: false,
	            url: pxp.apiRest._url('admin/RegionEvento/eliminarBautizoSantaCena'),
		        params: params,
		        method: 'POST',
		        scope: me,
		        success: function(resp){
		        var Response = Ext.JSON.decode(resp.responseText);
		           pxp.app.hideMask();
		           //mostrar y actualizar el panel de listado
		           if(Response.ROOT.error){
		           	   alert(Response.ROOT.detalle.mensaje)
		           }
		           else{
			           //mostrar y actualizar el panel de listado
			           me.onBackList(); 
			           me.getRegioneventolist().down('list').getStore().load({start:0,limit:20,page:1});
		           }
		         
		         
		        },
		        failure:function(resp){
                    var Response = Ext.JSON.decode(resp.responseText);
                    pxp.app.hideMask();
                    alert(Response.ROOT.detalle.mensaje)
                }
        });
    	
    	
   }, 
   
   onTapListEvento: function(){
    	var me = this;
    	
    	if(!me.eventocmp){
    		
    		var cmphidden = me.getRegioneventoform().down('#id_evento'),
    		    cmpText =me.getRegioneventoform().down('#nombre');
    		
    	    me.eventocmp = Ext.create('pxp.view.component.Evento',{
	    	   	'cmpHidden': cmphidden,
	    	   	'cmpText': cmpText,
	    	   	'displayColumn':'nombre',
	    	   	'idColumn':'id_evento',
	    	   	'filtroEvento':'bsc'
    	   });
    	   
    	   Ext.Viewport.add(me.eventocmp);
    	}
    	
    	var  store = me.eventocmp.down('list').getStore();
    	store.load({
    		start:0,
    		limit:20,
    		page:1
    		});
    		
    	me.eventocmp.show();
    	
    },
    
   onTapListCasaOracion:function(){
    	var me = this;
    	
    	if(!me.casaoracioncmp){
    		
    		var cmphiddenCargo = me.getRegioneventoform().down('#id_casa_oracion'),
    		    cmpTextCargo = me.getRegioneventoform().down('#nombre_co');
    		
    	    me.casaoracioncmp = Ext.create('pxp.view.component.CasaOracion',{
	    	   	'cmpHidden':cmphiddenCargo,
	    	   	'cmpText':cmpTextCargo,
	    	   	'displayColumn':'nombre',
	    	   	'idColumn':'id_casa_oracion'
    	   });
    	   
    	   Ext.Viewport.add(me.casaoracioncmp);
    	}
    	
    	var  store = me.casaoracioncmp.down('list').getStore();
    	store.load({
    		start:0,
    		limit:20,
    		page:1
    		});
    	me.casaoracioncmp.show();
    	
    },
    
    onTapListObrero: function(){
    	var me = this;
    	
    	if(!me.obrerocmp){
    		
    		var cmphidden = me.getRegioneventoform().down('#id_obrero'),
    		    cmpText = me.getRegioneventoform().down('#desc_obrero');
    		
    	    me.obrerocmp = Ext.create('pxp.view.component.Obrero',{
	    	   	'cmpHidden':cmphidden,
	    	   	'cmpText':cmpText,
	    	   	'displayColumn':'desc_persona',
	    	   	'idColumn':'id_obrero'
    	   });
    	   
    	   Ext.Viewport.add(me.obrerocmp);
    	}
    	
    	var  store = me.obrerocmp.down('list').getStore();
    	store.getProxy().setExtraParams({
	    		     'codigo_ministerio': "''anciano''"
				});
    	store.load({
    		start:0,
    		limit:20,
    		page:1
    		});
    	me.obrerocmp.show();
    	
    },
    
    
    
    onClearFilter:function(){
    	var me = this,
	        list=this.getRegioneventolist(); 
	    
	    var storeRegionevento = Ext.getStore('RegionEvento');
    	list.mask();
    	this.getRegioneventofilter().reset();
    	
    	storeRegionevento.getProxy().setExtraParams({
			     'query':''
			});
    	
    	
    	storeRegionevento.load({
    		start: 0,
    		limit: 20,
    		page: 1,
    		callback: function(){
    		list.unmask();
    	}});
    	
    }
    
});
