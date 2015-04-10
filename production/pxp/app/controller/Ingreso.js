/**
 * @class Kiva.controller.Loans
 * @extends Ext.app.Controller
 *
 * The only controller in this simple application - this simply sets up the fullscreen viewport panel
 * and renders a detailed overlay whenever a Loan is tapped on.
 */
Ext.define('pxp.controller.Ingreso', {
    extend: 'Ext.app.Controller',
    config: {
        profile: Ext.os.deviceType.toLowerCase(),
        
        models: [
            'pxp.model.Ingreso'
        ],
        stores: [
          // 'emsysMobile.store.Customers'
        ],

        refs: {
            ingresolist: 'ingresolist',
            ingresotbar: 'ingresotbar',
            ingresoform:'ingresoform',
            ingresoformfilter:'ingresoformfilter'
        },

        control: {
            'ingresolist list': {
                itemdoubletap: 'onFormEdit'
            },
            'ingresotbar #addingreso': {
                tap: 'onAdd'
            },
            'ingresotbar #deleteingeso': {
                tap: 'onDelete'
            },
            
            'ingresoform #back':{
            	tap:'onBackList'
            },
            
            'ingresotbar #backfilter':{
            	tap:'onBackFilter'
            },            
            'ingresotbar #searchfComponent':{
            	action: 'onActiveFilter',
            	clearicontap: 'onClearFilter'
            },
            
            'ingresoform #obrerobutton':{
            	tap:'onTapListObrero'
            },
            
            'ingresoform #eventobutton':{
            	tap:'onTapListEvento'
            },
            
            'ingresoform #save':{
            	tap:'onSave'
            },
            
            'ingresoformfilter #casaoracionbutton':{
            	tap:'onTapListCasaOracion'
            },
            'ingresoformfilter #gestionbutton':{
            	tap:'onTapListGestion'
            },
            'ingresoformfilter #aplicar':{
            	tap:'onInitFilter'
            }
            
            
            
        } 
    },
   
   
    
    
   onAdd:function(){
   	
   	    this.getIngresolist().hide();
     	this.getIngresoform().show();
     	this.getIngresoform().down('title').setTitle('Nuevo Evento');
     	this.getIngresoform().reset();
     	var ges = parseInt(this.getIngresoformfilter().down('#gestion').getValue())//,
     	    picker = this.getIngresoform().down('#fecha').getPicker();
     	
     	if(picker){
     		picker.setYearFrom(ges*1);
     	    picker.setYearTo(ges*1);
     	}
     	
     	
     	 
   },
   onBackList:function(){
   	    
   	    this.getIngresoform().hide();
    	this.getIngresolist().show();
     	
   },
   
  
   
    
   
   
   onFormEdit: function(list, index, target, record, e, eOpts){
   	    this.getIngresoform().show();
    	this.getIngresolist().hide();
    	this.getIngresoform().reset(); 
    	this.getIngresoform().setRecord(record);
    	this.getIngresoform().down('title').setTitle('Editar Ingreso');
    	
    	
   },
    
   onSave:function(){
    	
    	var me = this,
    	    fecha = me.getIngresoform().down('#fecha'),
    	    estado = me.getIngresoform().down('#estado'),
    	    params =  me.getIngresoform().getValues(),
    	    id_obrero = me.getIngresoform().down('#id_obrero'),
    	    id_casa_oracion = me.getIngresoformfilter().down('#id_casa_oracion').getValue(),
            id_gestion = me.getIngresoformfilter().down('#id_gestion').getValue();
        
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
			           me.getIngresolist().down('list').getStore().load({start:0,limit:20,page:1});
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
    	
    	
    	var seltected = this.getIngresolist().down('list').getSelection();
    	
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
			           me.getIngresolist().down('list').getStore().load({start:0,limit:20,page:1});
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
    		
    		var cmphidden = me.getIngresoform().down('#id_evento'),
    		    cmpText =me.getIngresoform().down('#nombre');
    		
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
    		
    		var cmphidden = me.getIngresoform().down('#id_obrero'),
    		    cmpText = me.getIngresoform().down('#desc_obrero');
    		
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
    		
    		var cmphidden = me.getIngresoformfilter().down('#id_casa_oracion'),
    		    cmpText = me.getIngresoformfilter().down('#nombre_co');
    		
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
    
    onTapListGestion:function(){
    	var me = this;
    	
    	if(!me.gestioncmp){
    		console.log('1')
    		var cmphidden = me.getIngresoformfilter().down('#id_gestion'),
    		    cmpText = me.getIngresoformfilter().down('#gestion');
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
   	    
   	    this.getIngresolist().hide();
    	this.getIngresoformfilter().show();
     	
    },
    
    onInitFilter:function(){
    	var me = this,
    	    store = me.getIngresolist().down('list').getStore(),
    	    formfilter = this.getIngresoformfilter(),
    	    id_casa_oracion = formfilter.down('#id_casa_oracion').getValue(),
    	    id_gestion = formfilter.down('#id_gestion').getValue();
    	
    	if(id_casa_oracion && id_gestion){
    		
    		me.getIngresolist().show();
		    me.getIngresolist().down('list').mask(); 
		    me.getIngresoformfilter().hide();
	    
	    	store.getProxy().setExtraParams({
	    		     'id_casa_oracion': id_casa_oracion,
	    		     'id_gestion': id_gestion,
	    		     'tipolist': 'mobile',
	    		     'sort':"fecha",
	    		     "dir":"DESC"
				});
				
	    	store.load({
	    		start:0,
	    		limit:20,
	    		page:1,
	    		scope: me,
	    		callback: me.calcularResumenfunction});	
    	}
    	
    },
    
    calcularResumenfunction: function(records, operation, success){
	    		    var me = this,
	    		        Response = Ext.JSON.decode(operation._response.responseText);
	    			console.log('Response',Response.countData);
	    			var tpl = new Ext.XTemplate('<div><table width="100%">'+
	    			      "<tr>"+
						    "<td colspan='3' style='float: left;' width='100%'><hr></hr></td>"+
						  "</tr>"+
	    			      "<tr>"+
						    "<td style='float: left;' width='33%'><b>Mant.</b></td>"+
						    "<td style='float: left;' width='33%'><b>Const.</b></td>"+ 
						    "<td style='float: left;' width='33%'><b>Viaje</b></td>"+ 
						  "</tr>"+
						  "<tr>"+
						    "<td style='float: left;' width='33%'><b>{total_mantenimiento}</b></td>"+
						    "<td style='float: left;' width='33%'><b>{total_construccion}</b></td>"+ 
						    "<td style='float: left;' width='33%'><b>{total_viaje}</b></td>"+ 
						  "</tr>"+
						  "<tr>"+
						   "<td style='float: left;' width='33%'><b>Espec.</b></td>"+ 
						    "<td style='float: left;' width='33%'><b>Piedad</b></td>"+ 
						    "<td style='float: left;' width='33%'><b>TOTAL</b></td>"+ 
						  "</tr>"+
						  "<tr>"+
						    "<td style='float: left;' width='33%'><b>{total_especial}</b></td>"+ 
						    "<td style='float: left;' width='33%'><b>{total_piedad}</b></td>"+ 
						    "<td style='float: left;' width='33%'><b><font color='green'>{total_dia}</font></b></td>"+ 
						  "</tr>"+
						  "</table></div>");
						  
						  
	    			
	    			me.getIngresolist().down('#resumenIngreso').setHtml(tpl.apply(Response.countData));
	    			
	    			me.getIngresolist().down('list').unmask();
	    		
	},
    	
    onActiveFilter:function(searchField){
    	var me = this,
    	    store = me.getIngresolist().down('list').getStore();
    	    
    	var extra = store.getProxy().getExtraParams();
    	
    	
    	
    	
    	console.log('........',extra, 'value.....',searchField.getValue())
    	store.getProxy().setExtraParams(Ext.apply(extra, {
    		     "par_filtro": "mov.desc_obrero#mov.estado#mov.mes",
			     "query": searchField.getValue()
			}));
			
    	store.load({
    		start:0,
    		limit:20,
    		page:1,
    		scope: me,
    		callback: me.calcularResumenfunction});
    },
    
    onClearFilter:function(value){
    	var me = this,
    	    store = me.getIngresolist().down('list').getStore();
    	    extra = store.getProxy().getExtraParams();
    	    
    	delete extra.par_filtro;
    	delete extra.query;
    	
    	store.getProxy().setExtraParams(extra);
    	store.load({
    		start:0,
    		limit:20,
    		page:1,
    		scope: me,
    		callback: me.calcularResumenfunction});
    }
    
});
