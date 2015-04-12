/**
 * @class Kiva.controller.Loans
 * @extends Ext.app.Controller
 *
 * The only controller in this simple application - this simply sets up the fullscreen viewport panel
 * and renders a detailed overlay whenever a Loan is tapped on.
 */
Ext.define('pxp.controller.Rendicion', {
    extend: 'Ext.app.Controller',
    config: {
        profile: Ext.os.deviceType.toLowerCase(),
        
        models: [
            'pxp.model.Egreso'
        ],
        stores: [
          // 'emsysMobile.store.Customers'
        ],

        refs: {
            rendicionlist: 'rendicionlist',
            rendiciontbar: 'rendiciontbar',
            rendicionform: 'rendicionform',
            rendicionformfilter: 'rendicionformfilter'
        },

        control: {
            'rendicionlist list': {
                itemdoubletap: 'onFormEdit'
            },
            'rendiciontbar #addrendicion': {
                tap: 'onAdd'
            },
            'rendiciontbar #deleterendicion': {
                tap: 'onDelete'
            },
            
            'rendicionform #back':{
            	tap:'onBackList'
            },
            
            'rendiciontbar #backfilter':{
            	tap:'onBackFilter'
            },            
            'rendiciontbar #searchfComponent':{
            	action: 'onActiveFilter',
            	clearicontap: 'onClearFilter'
            },
            
            'rendicionform #obrerobutton':{
            	tap:'onTapListObrero'
            },
            
            'rendicionform #tipomovimientobutton':{
            	tap:'onTapListTipoMovimiento'
            },
            
            'rendicionform #eventobutton':{
            	tap:'onTapListEvento'
            },
            
            'rendicionform #save':{
            	tap:'onSave'
            },
            
            'rendicionformfilter #casaoracionbutton':{
            	tap:'onTapListCasaOracion'
            },
            'rendicionformfilter #gestionbutton':{
            	tap:'onTapListGestion'
            },
            'rendicionformfilter #aplicar':{
            	tap:'onInitFilter'
            }
            
            
            
        } 
    },
   
   
    
    
   onAdd:function(){
   	
   	    this.getRendicionlist().hide();
     	this.getRendicionform().show();
     	this.getRendicionform().down('title').setTitle('Nueva Rendicion');
     	this.getRendicionform().reset();
     	var ges = parseInt(this.getRendicionformfilter().down('#gestion').getValue())//,
     	    picker = this.getRendicionform().down('#fecha').getPicker();
     	
     	if(picker){
     		picker.setYearFrom(ges*1);
     	    picker.setYearTo(ges*1);
     	}
     	
     	
     	 
   },
   onBackList:function(){
   	    
   	    this.getRendicionform().hide();
    	this.getRendicionlist().show();
     	
   },
   
  
   
    
   
   
   onFormEdit: function(list, index, target, record, e, eOpts){
   	    this.getRendicionform().show();
    	this.getRendicionlist().hide();
    	this.getRendicionform().reset(); 
    	this.getRendicionform().setRecord(record);
    	this.getRendicionform().down('title').setTitle('Editar Rendicion');
    	
    	
   },
    
   onSave:function(){
    	
    	var me = this,
    	    fecha = me.getRendicionform().down('#fecha'),
    	    monto = me.getRendicionform().down('#monto'),
    	    obs = me.getRendicionform().down('#obs'),
    	    num_documento = me.getRendicionform().down('#num_documento'),
    	    estado = me.getRendicionform().down('#estado'),
    	    
    	    id_obrero = me.getRendicionform().down('#id_obrero'),
    	    id_tipo_movimiento = me.getRendicionform().down('#id_tipo_movimiento'),
    	    id_casa_oracion = me.getRendicionformfilter().down('#id_casa_oracion').getValue(),
            id_gestion = me.getRendicionformfilter().down('#id_gestion').getValue(),
            params =  me.getRendicionform().getValues();
            
        params  = Ext.apply(params,{ tipo: 'egreso', id_casa_oracion: id_casa_oracion, id_gestion: id_gestion});
       
        
        if(!fecha.getValue()){
         	alert('Necesitamos que indique la fecha', Ext.emptyFn);
            return;
        }
        
        if(!id_obrero.getValue()){
         	alert('Indique un obrero responsable', Ext.emptyFn);
            return;
        } 
        
        if(!id_tipo_movimiento.getValue()){
         	alert( 'Es necesario indicar el tipo de movimiento', Ext.emptyFn);
            return;
        } 
        
        if(!monto.getValue()){
         	alert('El monto es necesario', Ext.emptyFn);
            return;
        }
        
               
        if(!num_documento.getValue()){
         	alert('Es necesario indicar el numero de recibo o factura', Ext.emptyFn);
            return;
        } 
        
        if(!obs.getValue()){
         	alert( 'Es necesario indicar que se compro (Obs)', Ext.emptyFn);
            return;
        } 
        
        
          
        pxp.app.showMask();      
    	Ext.Ajax.request({
		        withCredentials: true,
	            useDefaultXhrHeader: false,
	            url: pxp.apiRest._url('admin/Movimiento/insertarMovimientoEgreso'),
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
			           me.getRendicionlist().down('list').getStore().load({start:0,limit:20,page:1});
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
    	
    	
    	var seltected = this.getRendicionlist().down('list').getSelection();
    	
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
			           me.getRendicionlist().down('list').getStore().load({start:0,limit:20,page:1});
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
    		
    		var cmphidden = me.getRendicionform().down('#id_evento'),
    		    cmpText =me.getRendicionform().down('#nombre');
    		
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
    		
    		var cmphidden = me.getRendicionform().down('#id_obrero'),
    		    cmpText = me.getRendicionform().down('#desc_obrero');
    		
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
    
    onTapListTipoMovimiento: function(){
    	var me = this;
    	if(!me.tipomovimientocmp){
    		var cmphidden = me.getRendicionform().down('#id_tipo_movimiento'),
    		    cmpText = me.getRendicionform().down('#desc_tipo_movimiento');
    		
    		me.tipomovimientocmp = Ext.create('pxp.view.component.TipoMovimiento',{
	    	   	'cmpHidden':cmphidden,
	    	   	'cmpText':cmpText,
	    	   	'displayColumn':'nombre',
	    	   	'idColumn':'id_tipo_movimiento'
    	   });
    	   
    	   Ext.Viewport.add(me.tipomovimientocmp);
    	}
    	
    	var  store = me.tipomovimientocmp.down('list').getStore();
    	
    	store.load({
    		start:0,
    		limit:20,
    		page:1
    		});
    	
    	me.tipomovimientocmp.show();
    	
   },
    
   onTapListCasaOracion:function(){
    	var me = this;
    	
    	if(!me.casaoracioncmp){
    		
    		var cmphidden = me.getRendicionformfilter().down('#id_casa_oracion'),
    		    cmpText = me.getRendicionformfilter().down('#nombre_co');
    		
    	    me.casaoracioncmp = Ext.create('pxp.view.component.CasaOracion',{
	    	   	'cmpHidden': cmphidden,
	    	   	'cmpText': cmpText,
	    	   	'displayColumn': 'nombre',
	    	   	'idColumn': 'id_casa_oracion'
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
    		var cmphidden = me.getRendicionformfilter().down('#id_gestion'),
    		    cmpText = me.getRendicionformfilter().down('#gestion');
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
   	    
   	    this.getRendicionlist().hide();
    	this.getRendicionformfilter().show();
     	
    },
    
    onInitFilter:function(){
    	var me = this,
    	    store = me.getRendicionlist().down('list').getStore(),
    	    formfilter = this.getRendicionformfilter(),
    	    id_casa_oracion = formfilter.down('#id_casa_oracion').getValue(),
    	    id_gestion = formfilter.down('#id_gestion').getValue();
    	
    	if(id_casa_oracion && id_gestion){
    		
    		me.getRendicionlist().show();
		    me.getRendicionlist().down('list').mask(); 
		    me.getRendicionformfilter().hide();
	    
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
						    "<td colspan='2' style='float: left;' width='100%'><hr></hr></td>"+
						  "</tr>"+
	    			      "<tr>"+
						    "<td style='float: left;' width='50%'><b>Total Egresos: {total_monto} </b></td>"+
						  "</tr>"+
						  "</table></div>");
						 
	    			
	    			me.getRendicionlist().down('#resumenRendicion').setHtml(tpl.apply(Response.countData));
	    			
	    			me.getRendicionlist().down('list').unmask();
	    		
	},
    	
    onActiveFilter:function(searchField){
    	var me = this,
    	    store = me.getRendicionlist().down('list').getStore();
    	    
    	var extra = store.getProxy().getExtraParams();
    	
    	
    	
    	
    	console.log('........',extra, 'value.....',searchField.getValue())
    	store.getProxy().setExtraParams(Ext.apply(extra, {
    		     "par_filtro": "mov.desc_obrero#mov.estado#mov.mes#mov.desc_tipo_movimiento#mov.obs#mov.num_documento",
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
    	    store = me.getRendicionlist().down('list').getStore();
    	    extra = store.getProxy().getExtraParams();
    	    
    	delete extra.par_filtro;
    	delete extra.query;
    	
    	store.getProxy().setExtraParams(extra);
    	store.load({
    		start: 0,
    		limit: 20,
    		page: 1,
    		scope: me,
    		callback: me.calcularResumenfunction });
    }
    
});
