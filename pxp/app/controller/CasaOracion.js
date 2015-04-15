/**
 * @class Kiva.controller.Loans
 * @extends Ext.app.Controller
 *
 * The only controller in this simple application - this simply sets up the fullscreen viewport panel
 * and renders a detailed overlay whenever a Loan is tapped on.
 */
Ext.define('pxp.controller.CasaOracion', {
    extend: 'Ext.app.Controller',
    config: {
        profile: Ext.os.deviceType.toLowerCase(),
        
        models: [
            'pxp.model.CasaOracion'
        ],
        
        refs: {
            casaoracionlist: 'casaoracionlist',
            casaoracion: 'casaoracion',
            casaoraciontbar: 'casaoraciontbar',
            casaoracionformfilter:'casaoracionformfilter',
            detail:'detail'
        },

        control: {
            
            'casaoraciontbar #backfilter': {
            	tap:'onBackFilter'
            },
            'detail #backlistcasaoracion': {
            	tap:'onBackList'
            },  
                       
            'casaoraciontbar #searchfComponent': {
            	action: 'onActiveFilter',
            	clearicontap: 'onClearFilter'
            },
            
            'casaoracionformfilter #lugarbutton': {
            	tap:'onTapListLugar'
            },
            
            'casaoracionformfilter #aplicar': {
            	tap:'onInitFilter'
            },
            
            'casaoracionformfilter': {
            	activate:'onInitForm'
            },
            
            
            
            'casaoracionlist': {
                onDisclosure: 'onListTap'
            }
         } 
    },
    
    
    onInitForm: function(){
    	var me = this;
    	if(!me.lugarcmp){
    		
    		var cmphidden = me.getCasaoracionformfilter().down('#id_lugar'),
    		    cmpText = me.getCasaoracionformfilter().down('#nombre');
    		
    	    me.lugarcmp = Ext.create('pxp.view.component.Lugar',{
	    	   	'cmpHidden':cmphidden,
	    	   	'cmpText':cmpText,
	    	   	'displayColumn':'nombre',
	    	   	'idColumn':'id_lugar'
    	   });
    	   
    	   Ext.Viewport.add(me.lugarcmp);
    	   me.lugarcmp.hide();
    	}
    	
    	var form = this.getCasaoracionformfilter();
    	
    	
    	
    	    store = me.lugarcmp.store;
    	    
					    	pxp.app.showMask(); 
					    		
					    	store.load({
					    		start: 0,
					    		limit: 20,
					    		page: 1,
					    		callback:function(rec){
					    			pxp.app.hideMask();
						    		form.down('#nombre').setValue(rec[0].data.nombre);
	    	   						form.down('#id_lugar').setValue(rec[0].data.id_lugar);
					    		
					    	}});
    	
    	
    	
    },
    
     onListTap: function(loan) {
    
        if (!this.view) {
        	console.log('inicia constrctor');
            this.view = Ext.create('pxp.view.casaoracion.Detail');
            console.log('termina constructor');
        }
        
        
        this.getCasaoracionlist().hide();
        
        
        
        if (!this.view.getParent()) {
            this.getCasaoracion().add(this.view);
        }
        this.view.show();
        this.view.setLoan(loan);
    },
   
   
    onBackList:function(){
    	this.getDetail().hide();
   	    this.getCasaoracionlist().show();
        
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
    
    onBackFilter:function(){
   	    
   	    this.getCasaoracionlist().hide();
    	this.getCasaoracionformfilter().show();
     	
    },
    
    onInitFilter:function(){
    	var me = this,
    	    store = me.getCasaoracionlist().down('list').getStore(),
    	    formfilter = this.getCasaoracionformfilter(),
    	    id_lugar = formfilter.down('#id_lugar').getValue();
    	
    	if(id_lugar){
    		
    		me.getCasaoracionlist().show();
		    me.getCasaoracionlist().down('list').mask(); 
		    me.getCasaoracionformfilter().hide();
	    
	    	store.getProxy().setExtraParams({
	    		     'id_lugar': id_lugar,
	    		     'verificar': 'no',
	    		     'tipolist': 'mobile',
	    		     'sort':"codigo",
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
    	    store = me.getCasaoracionlist().down('list').getStore();
    	    
    	var extra = store.getProxy().getExtraParams();
    	
    	store.getProxy().setExtraParams(Ext.apply(extra, {
    		     "par_filtro":"caor.nombre#lug.nombre",
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
    	    store = me.getCasaoracionlist().down('list').getStore();
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
