/**
 * @class Kiva.controller.Loans
 * @extends Ext.app.Controller
 *
 * The only controller in this simple application - this simply sets up the fullscreen viewport panel
 * and renders a detailed overlay whenever a Loan is tapped on.
 */
Ext.define('pxp.controller.Agenda', {
    extend: 'Ext.app.Controller',
    config: {
        profile: Ext.os.deviceType.toLowerCase(),
        
        models: [
            'pxp.model.Agenda'
        ],
        stores: [
          // 'emsysMobile.store.Customers'
        ],

        refs: {
            agendalist: 'agendalist',
            agendatbar: 'agendatbar',
            agendaform:'agendaform',
            agendaformfilter:'agendaformfilter'
        },

        control: {
            
            'agendatbar #addingreso': {
                tap: 'onAdd'
            },
            'agendatbar #deleteingeso': {
                tap: 'onDelete'
            },
            
            'agendaform #back': {
            	tap:'onBackList'
            },
            
            'agendatbar #backfilter': {
            	tap:'onBackFilter'
            },            
            'agendatbar #searchfComponent': {
            	action: 'onActiveFilter',
            	clearicontap: 'onClearFilter'
            },
            
            'agendaform #obrerobutton': {
            	tap:'onTapListObrero'
            },
            
            'agendaform #eventobutton': {
            	tap:'onTapListEvento'
            },
            
            'agendaform #save': {
            	tap:'onSave'
            },
            
            'agendaformfilter #lugarbutton': {
            	tap:'onTapListLugar'
            },
            'agendaformfilter #gestionbutton': {
            	tap:'onTapListGestion'
            },
            'agendaformfilter #aplicar': {
            	tap:'onInitFilter'
            }
            
            
            
        } 
    },
   
   
    
    
   onAdd:function(){
   	
   	    this.getAgendalist().hide();
     	this.getAgendaform().show();
     	this.getAgendaform().down('title').setTitle('Nuevo Evento');
     	this.getAgendaform().reset();
     	var ges = parseInt(this.getAgendaformfilter().down('#gestion').getValue())//,
     	    picker = this.getAgendaform().down('#fecha').getPicker();
     	
     	if(picker){
     		picker.setYearFrom(ges*1);
     	    picker.setYearTo(ges*1);
     	}
     	
     	
     	 
   },
   onBackList:function(){
   	    
   	    this.getAgendaform().hide();
    	this.getAgendalist().show();
     	
   },
   
  
   
    
   
   
   onFormEdit: function(list, index, target, record, e, eOpts){
   	    this.getAgendaform().show();
    	this.getAgendalist().hide();
    	this.getAgendaform().reset(); 
    	this.getAgendaform().setRecord(record);
    	this.getAgendaform().down('title').setTitle('Editar Ingreso');
    	
    	
   },
    
   onSave:function(){
    	
    	var me = this,
    	    fecha = me.getAgendaform().down('#fecha'),
    	    estado = me.getAgendaform().down('#estado'),
    	    params =  me.getAgendaform().getValues(),
    	    id_obrero = me.getAgendaform().down('#id_obrero'),
    	    id_casa_oracion = me.getAgendaformfilter().down('#id_casa_oracion').getValue(),
            id_gestion = me.getAgendaformfilter().down('#id_gestion').getValue();
        
        params  = Ext.apply(params,{obs:'', tipo: 'ingreso', id_casa_oracion: id_casa_oracion, id_gestion: id_gestion});
       
        
        if(!fecha.getValue()){
         	alert('Necesitamos que indique la fecha', Ext.emptyFn);
            return;
        } 
        
        if(!id_obrero.getValue()){
         	alert('Indique un obrero responsable', Ext.emptyFn);
            return;
        }   
             
            
        pxp.app.showMask();      
    	Ext.Ajax.request({
		        withCredentials: true,
	            useDefaultXhrHeader: false,
	            url: pxp.apiRest._url('admin/Movimiento/insertarMovimientoIngreso'),
		        params: params,
		        method: 'POST',
		        scope: me,
		        success: function(resp){
		           var Response = Ext.JSON.decode(resp.responseText);
		           	pxp.app.hideMask();
		           if(Response.ROOT.error){
		           	   alert(Response.ROOT.detalle.mensaje)
		           }
		           else{
			           //mostrar y actualizar el panel de listado
			           me.onBackList(); 
			           me.getAgendalist().down('list').getStore().load({start:0,limit:20,page:1});
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
    	
    	
    	var seltected = this.getAgendalist().down('list').getSelection();
    	
    	if(seltected.length == 0){
    	    Ext.Msg.alert('Info ...','Selecione una fila primero');
    	    return
    	}
    	
    	pxp.app.showMask();
    	
    	var me = this,
    	    params = {
                id_movimiento:  seltected[0].data.id_movimiento
              
              };
              
        pxp.app.showMask();      
    	Ext.Ajax.request({
		        
		        withCredentials: true,
	            useDefaultXhrHeader: false,
	            url: pxp.apiRest._url('admin/Movimiento/eliminarMovimiento'),
		        params: params,
		        method: 'POST',
		        scope: me,
		        success: function(resp){
		        var Response = Ext.JSON.decode(resp.responseText);
		           pxp.app.hideMask();
		           
		           if(Response.ROOT.error){
		           	   alert(Response.ROOT.detalle.mensaje)
		           }
		           else{
			           //mostrar y actualizar el panel de listado
			           me.onBackList(); 
			           me.getAgendalist().down('list').getStore().load({start:0,limit:20,page:1});
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
    		
    		var cmphidden = me.getAgendaform().down('#id_evento'),
    		    cmpText =me.getAgendaform().down('#nombre');
    		
    	    me.eventocmp = Ext.create('pxp.view.component.Evento',{
	    	   	'cmpHidden': cmphidden,
	    	   	'cmpText': cmpText,
	    	   	'displayColumn':'nombre',
	    	   	'idColumn':'id_evento'
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
    
    onTapListObrero: function(){
    	var me = this;
    	
    	if(!me.obrerocmp){
    		
    		var cmphidden = me.getAgendaform().down('#id_obrero'),
    		    cmpText = me.getAgendaform().down('#desc_obrero');
    		
    	    me.obrerocmp = Ext.create('pxp.view.component.Obrero',{
	    	   	'cmpHidden':cmphidden,
	    	   	'cmpText':cmpText,
	    	   	'displayColumn':'desc_persona',
	    	   	'idColumn':'id_obrero'
    	   });
    	   
    	   Ext.Viewport.add(me.obrerocmp);
    	}
    	
    	var  store = me.obrerocmp.down('list').getStore();
    	store.load({
    		start:0,
    		limit:20,
    		page:1
    		});
    	me.obrerocmp.show();
    	
    },
    
   onTapListCasaOracion:function(){
    	var me = this;
    	
    	if(!me.casaoracioncmp){
    		
    		var cmphidden = me.getAgendaformfilter().down('#id_casa_oracion'),
    		    cmpText = me.getAgendaformfilter().down('#nombre_co');
    		
    	    me.casaoracioncmp = Ext.create('pxp.view.component.CasaOracion',{
	    	   	'cmpHidden':cmphidden,
	    	   	'cmpText':cmpText,
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
    
    onTapListLugar: function(){
    	var me = this;
    	
    	if(!me.lugarcmp){
    		
    		var cmphidden = me.getAgendaformfilter().down('#id_lugar'),
    		    cmpText = me.getAgendaformfilter().down('#nombre');
    		
    	    me.lugarcmp = Ext.create('pxp.view.component.Lugar',{
	    	   	'cmpHidden':cmphidden,
	    	   	'cmpText':cmpText,
	    	   	'displayColumn':'nombre',
	    	   	'idColumn':'id_lugar'
    	   });
    	   
    	   Ext.Viewport.add(me.lugarcmp);
    	}
    	
    	var  store = me.lugarcmp.down('list').getStore();
    	store.load({
    		start:0,
    		limit:20,
    		page:1
    		});
    	me.lugarcmp.show();
    	
    }, 
    
    onTapListGestion:function(){
    	var me = this;
    	
    	if(!me.gestioncmp){
    		console.log('1')
    		var cmphidden = me.getAgendaformfilter().down('#id_gestion'),
    		    cmpText = me.getAgendaformfilter().down('#gestion');
    		me.gestioncmp = Ext.create('pxp.view.component.Gestion',{
	    	   	'cmpHidden':cmphidden,
	    	   	'cmpText':cmpText,
	    	   	'displayColumn':'gestion',
	    	   	'idColumn':'id_gestion'
    	   });
    	   Ext.Viewport.add(me.gestioncmp);
    	   
    	}
    	
    	var  store = me.gestioncmp.down('list').getStore();
    	store.load({
    		start:0,
    		limit:20,
    		page:1
    		});
    		
    	me.gestioncmp.show();
    	
    },
    
    onBackFilter:function(){
   	    
   	    this.getAgendalist().hide();
    	this.getAgendaformfilter().show();
     	
    },
    
    onInitFilter:function(){
    	var me = this,
    	    store = me.getAgendalist().down('list').getStore(),
    	    formfilter = this.getAgendaformfilter(),
    	    id_lugar = formfilter.down('#id_lugar').getValue(),
    	    id_gestion = formfilter.down('#id_gestion').getValue();
    	
    	if(id_lugar && id_gestion){
    		
    		me.getAgendalist().show();
		    me.getAgendalist().down('list').mask(); 
		    me.getAgendaformfilter().hide();
	    
	    	store.getProxy().setExtraParams({
	    		     'id_lugar': id_lugar,
	    		     'id_gestion': id_gestion,
	    		     'tipo_registro': 'detalle',
	    		     'tipolist': 'mobile',
	    		     'sort':"fecha_programada",
	    		     "dir":"DESC"
				});
				
	    	store.load({
	    		start:0,
	    		limit:20,
	    		page:1,
	    		scope: me});	
    	}
    	
    },
    
    
    	
    onActiveFilter:function(searchField){
    	var me = this,
    	    store = me.getAgendalist().down('list').getStore();
    	    
    	var extra = store.getProxy().getExtraParams();
    	
    	store.getProxy().setExtraParams(Ext.apply(extra, {
    		     "par_filtro": "rege.estado#ep.mes#co.nombre#lug.nombre#reg.nombre#eve.nombre",
			     "query": searchField.getValue()
			}));
			
    	store.load({
    		start:0,
    		limit:20,
    		page:1,
    		scope: me});
    },
    
    onClearFilter:function(value){
    	var me = this,
    	    store = me.getAgendalist().down('list').getStore();
    	    extra = store.getProxy().getExtraParams();
    	    
    	delete extra.par_filtro;
    	delete extra.query;
    	
    	store.getProxy().setExtraParams(extra);
    	store.load({
    		start:0,
    		limit:20,
    		page:1,
    		scope: me});
    }
    
});
