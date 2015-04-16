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
            
            'agendaformfilter #eventobutton': {
            	tap:'onTapListEvento'
            },
            
            'agendaformfilter #obrerobutton':{
            	tap:'onTapListObrero'
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
            },
            'agendaformfilter': {
            	activate:'onInitForm'
            },
            'agendaformfilter #reset': {
            	tap:'onResetForm'
            }
            
            
            
        } 
    },
   
   onResetForm: function(){
   	   var me = this;
   	   
   	   me.getAgendaformfilter().reset();
   },
   
   onInitForm: function(){
    	var me = this,
    	    form = this.getAgendaformfilter();
    	if(!me.lugarcmp){
    		
    		var cmphidden = form.down('#id_lugar'),
    		    cmpText = form.down('#nombre');
    		
    	    me.lugarcmp = Ext.create('pxp.view.component.Lugar',{
	    	   	'cmpHidden':cmphidden,
	    	   	'cmpText':cmpText,
	    	   	'displayColumn':'nombre',
	    	   	'idColumn':'id_lugar'
    	   });
    	   
    	   Ext.Viewport.add(me.lugarcmp);
    	   me.lugarcmp.hide();
    	}
    	
    	var store = me.lugarcmp.store;    	    
    	pxp.app.showMask();   		
    	store.load({
    		start: 0,
    		limit: 20,
    		page: 1,
    		callback:function(rec){
    			form.down('#nombre').setValue(rec[0].data.nombre);
				form.down('#id_lugar').setValue(rec[0].data.id_lugar);
    		
    	}});
    	
    	//inicia gestion
    	
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
    	   me.gestioncmp.hide();
    	}
    	
    	var storeges = me.gestioncmp.store;    	    
    	storeges.load({
    		start: 0,
    		limit: 20,
    		page: 1,
    		callback:function(rec){
    			pxp.app.hideMask();
	    		form.down('#gestion').setValue(rec[0].data.gestion);
				form.down('#id_gestion').setValue(rec[0].data.id_gestion);
    		
    	}});
    	
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
   
  
    onTapListLugar: function(){
    	var me = this;
    	var  store = me.lugarcmp.down('list').getStore();
    	store.load({
    		start:0,
    		limit:20,
    		page:1
    		});
    	me.lugarcmp.show();
    	
    }, 
    
    onTapListGestion:function(){
    	var me = this,
    	    store = me.gestioncmp.down('list').getStore();
    	store.load({
    		start:0,
    		limit:20,
    		page:1
    		});
    		
    	me.gestioncmp.show();
    	
    }, 
   
   onTapListEvento: function(){
    	var me = this;
    	
    	if(!me.eventocmp){
    		
    		var cmphidden = me.getAgendaformfilter().down('#id_evento'),
    		    cmpText =me.getAgendaformfilter().down('#nombre_evento');
    		
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
    		
    		var cmphidden = me.getAgendaformfilter().down('#id_obrero'),
    		    cmpText = me.getAgendaformfilter().down('#desc_obrero');
    		
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
    
    onBackFilter:function(){
   	    
   	    this.getAgendalist().hide();
    	this.getAgendaformfilter().show();
     	
    },
    
    onInitFilter:function(){
    	var me = this,
    	    store = me.getAgendalist().down('list').getStore(),
    	    formfilter = this.getAgendaformfilter(),
    	    id_lugar = formfilter.down('#id_lugar').getValue(),
    	    id_gestion = formfilter.down('#id_gestion').getValue(),
    	    id_obrero = formfilter.down('#id_obrero').getValue(),
    	    id_evento = formfilter.down('#id_evento').getValue();
    	
    	if(id_lugar && id_gestion){
    		
    		me.getAgendalist().show();
		    me.getAgendalist().down('list').mask(); 
		    me.getAgendaformfilter().hide();
	    
	    	store.getProxy().setExtraParams({
	    		     'id_lugar': id_lugar,
	    		     'id_gestion': id_gestion,
	    		     'id_obrero': id_obrero,
	    		     'id_evento': id_evento,
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
    	else{
    		alert('Tiene que indicar minimamente la gestion y el lugar')
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
