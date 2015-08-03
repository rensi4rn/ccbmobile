/**
 * @class Kiva.controller.Loans
 * @extends Ext.app.Controller
 *
 * The only controller in this simple application - this simply sets up the fullscreen viewport panel
 * and renders a detailed overlay whenever a Loan is tapped on.
 */
Ext.define('pxp.controller.Calendario', {
    extend: 'Ext.app.Controller',
    config: {
        profile: Ext.os.deviceType.toLowerCase(),        
        models: [],
        stores: [],
        refs: {
            calendario: 'calendario',
            calendarioformfilter:'calendarioformfilter'
        },

        control: {
            'calendario #calendar': {
            	periodchange:'onChangePeriod',
            	selectionchange: 'onSelectDate',
            	eventtap: 'onEventTap',
            	touchmove: 'onTouchMove'
            },
            'calendario #backfilter': {
            	tap:'onBackFilter'
            }, 
            'calendarioformfilter #eventobutton': {
            	tap:'onTapListEvento'
            },
            
            'calendarioformfilter #obrerobutton':{
            	tap:'onTapListObrero'
            },
            'calendarioformfilter #lugarbutton': {
            	tap:'onTapListLugar'
            },
            
            'calendarioformfilter #aplicar': {
            	tap:'onInitFilter'
            },
            'calendarioformfilter': {
            	activate:'onInitForm'
            },
            'calendarioformfilter #reset': {
            	tap:'onResetForm'
            }
            
        } 
    },
    
  onInitForm: function(){
    	var me = this,
    	    form = this.getCalendarioformfilter();
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
				pxp.app.hideMask();
    		
    	}});
    	
    }, 
      
    onResetForm: function(){
   	   var me = this;
   	   me.getCalendarioformfilter().reset();
    },
    
    onInitFilter:function(){
    	var me = this,
    	    formfilter = this.getCalendarioformfilter(),
    	    id_lugar = formfilter.down('#id_lugar').getValue(),
    	    id_obrero = formfilter.down('#id_obrero').getValue(),
    	    id_evento = formfilter.down('#id_evento').getValue();
    	
    	if(id_lugar){
    		
    		me.getCalendario().show();
		    me.getCalendarioformfilter().hide();
	        me.getCalendario().iniciarFiltros({
	        	id_lugar: id_lugar,
	        	id_obrero: id_obrero,
	        	id_evento: id_evento
	        });
	        
	    		
    	}
    	else{
    		alert('Por lo menos tiene que indicar el lugar')
    	}
    	
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
    onTapListObrero: function(){
    	var me = this;
    	
    	if(!me.obrerocmp){
    		
    		var cmphidden = me.getCalendarioformfilter().down('#id_obrero'),
    		    cmpText = me.getCalendarioformfilter().down('#desc_obrero');
    		
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
   
   onTapListEvento: function(){
    	var me = this;
    	
    	if(!me.eventocmp){
    		
    		var cmphidden = me.getCalendarioformfilter().down('#id_evento'),
    		    cmpText =me.getCalendarioformfilter().down('#nombre_evento');
    		
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
    
    onBackFilter:function(){
   	    
   	    this.getCalendario().hide();
    	this.getCalendarioformfilter().show();
     	
    },
    
   onTouchMove:function(calendar, e,c,d){
         /* This code is for horizontal swipe */

		if(e.direction == "left") {
            calendar.refreshDelta(1);
        } else {
           calendar.refreshDelta(-1);
        }
   },
   onEventTap: function(event){
   	
          	
   	         
             if(event.tipo_vista === 'cambiar'){
             	var calendario = this.getCalendario().down('#calendar');
   	             calendario.currentDate = event.data.start;
             	
             	calendario.setValue(event.data.start)
             	calendario.setViewMode('week');             	
             	calendario.applyViewMode('week');
             } 
             else{
             	Ext.Msg.alert(
                        event.get('event'),
                        event.get('title') + ' ' + event.get('hora') + ' ('+event.get('desc_obrero')+')'
                    );
             }      
                    
                  
   },
   onChangePeriod: function(o, minDate, maxDate, direction, eOpts){
   	  // alert('evento')
   	  console.log('onChangePeriod', o, minDate, maxDate)
   	  var panel = o.up('calendario');
   	  pxp.app.showMask();
   	  
   	  var params = panel.store.getProxy().getExtraParams()
   	  panel.store.getProxy().setExtraParams(Ext.apply(params, {
    		     "fecha_ini": Ext.Date.format(minDate,'d/m/Y'),
    		     "fecha_fin": Ext.Date.format(maxDate,'d/m/Y')
			}));
      
      panel.store.load({callback:function(){pxp.app.hideMask();}})
   },
   onSelectDate: function(o, newDate, oldDate, eOpts){
   	   console.log(newDate)
   }
   
    
});
