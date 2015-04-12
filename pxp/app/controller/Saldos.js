/**
 * @class Kiva.controller.Loans
 * @extends Ext.app.Controller
 *
 * The only controller in this simple application - this simply sets up the fullscreen viewport panel
 * and renders a detailed overlay whenever a Loan is tapped on.
 */
Ext.define('pxp.controller.Saldos', {
    extend: 'Ext.app.Controller',
    config: {
        profile: Ext.os.deviceType.toLowerCase(),        
        models: [],
        stores: [],
        refs: {
            saldospanel: 'saldospanel',
            saldostbar: 'saldostbar',
            saldosformfilter: 'saldosformfilter'
        },

        control: {
            
           
            'saldostbar #backfilter': {
            	tap:'onBackList'
            },
            'saldosformfilter #lugarbutton': {
            	tap:'onTapListLugar'
            },
            'saldosformfilter #casaoracionbutton': {
            	tap:'onTapListCasaOracion'
            },
            'saldosformfilter #tipomovimientobutton':{
            	tap:'onTapListTipoMovimiento'
            },
            'saldosformfilter #obrerobutton':{
            	tap:'onTapListObrero'
            },
            'saldosformfilter #aplicar': {
            	tap:'onInitFilter'
            },
            'saldosformfilter #reset': {
            	tap:'onResetForm'
            }
            
            
            
            
            
        } 
    },
   onResetForm: function(){
   	   var me = this;
   	   
   	   me.getSaldosformfilter().reset();
   },
   onInitFilter: function(){
    	var me = this,
    	    formfilter = me.getSaldosformfilter(),
    	    params =  me.getSaldosformfilter().getValues();
    	    fecha = formfilter.down('#fecha').getValue();
    	
    	if(fecha){
    		
             
			pxp.app.showMask();      
    	    Ext.Ajax.request({
		        withCredentials: true,
	            useDefaultXhrHeader: false,
	            url: pxp.apiRest._url('admin/Movimiento/calcularSaldos'),
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
			           me.getSaldospanel().show();
    	               me.getSaldosformfilter().hide();
    	               
    	               var tpl = new Ext.XTemplate("<p> <br><br>\
		       					Ingreso  Inicial: {v_ingreso_inicial} </br>\
								Ingreso por colectas: {v_ingreso_colectas}</br>\
								Ingreso por Traspasos: {v_ingreso_traspasos}</br></br>\
								Ingreso Total =  (Ingreso por Traspasos) + (Ingreso por colectas) + (Ingreso  Inicial)</br>\
								Ingreso Total: {v_ingreso_total}</br></br>\
								Egresos por operación: {v_egreso_operacion}</br>\
								Egresos inicial por rendir: {v_egreso_inicial_por_rendir}</br>\
								Egresos contra rendición: {v_egresos_contra_rendicion}</br>\
								Rendiciones: {v_egresos_rendidos}</br>\
								Egresos por Traspaso: {v_egreso_traspaso}</br></br>\
								Egreso Efectivo = (Egresos por operación) + (Rendiciones)</br>\
								Egreso Efectivo: {v_egreso_efectivo}</br></br>\
								Saldo en efectivo =  (Ingreso Total) - (Egreso Efectivo) - (Egresos por Traspaso)</br>\
								Saldo en efectivo: {v_saldo_efectivo}</br></br>\
								Saldo en la administración =  (Ingreso Total)  - (Egresos por Traspaso) - (Egresos por operación) - (Egresos contra rendición)</br>\
								Saldo en la administración: {v_saldo_adm}</br></br>\
								Saldo por Rendir =  (Egresos inicial por rendir) + (Egresos contra rendición)  - (Rendiciones)</br>\
								Saldo por Rendir: {v_sado_x_rendir}</p>");
						 
	    			
	    			     me.getSaldospanel().down('#resumenSaldos').setHtml(tpl.apply(Response.ROOT.datos));
		           }
		           
		        },
		        failure:function(resp){
                    var Response = Ext.JSON.decode(resp.responseText);
                    pxp.app.hideMask();
                    alert(Response.ROOT.detalle.mensaje)
                }
        });
    		
    	}
    	else{
    		alert('por lo menos debe indicar la fecha del reporte')
    	}
    	
    },
    
    
   onBackList:function(){
   	    
   	    this.getSaldospanel().hide();
    	this.getSaldosformfilter().show();
     	
   },
   
  
    onTapListObrero: function(){
    	var me = this;
    	
    	if(!me.obrerocmp){
    		
    		var cmphidden = me.getSaldosformfilter().down('#id_obrero'),
    		    cmpText = me.getSaldosformfilter().down('#desc_obrero');
    		
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
    		
    		var cmphidden = me.getSaldosformfilter().down('#id_casa_oracion'),
    		    cmpText = me.getSaldosformfilter().down('#nombre_co');
    		
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
    		
    		var cmphidden = me.getSaldosformfilter().down('#id_lugar'),
    		    cmpText = me.getSaldosformfilter().down('#nombre');
    		
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
    
   
    
    onTapListTipoMovimiento: function(){
    	var me = this;
    	if(!me.tipomovimientocmp){
    		var cmphidden = me.getSaldosformfilter().down('#id_tipo_movimiento'),
    		    cmpText = me.getSaldosformfilter().down('#desc_tipo_movimiento');
    		
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
    	
   }
   
    
});
