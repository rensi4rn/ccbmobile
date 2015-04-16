Ext.define('pxp.model.RegionEvento', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Model'
    ],
    config: {
    	idProperty :'id_region_evento',
	    fields: [	    
			    {name:'fecha_programada', type: 'date',dateFormat:'Y-m-d'},
			    'estado',
			    'id_region_evento',
			    'id_casa_oracion',
			    'id_region',
			    'nombre_region',
			    'nombre_co',
			    'cantidad_hermano',
			    'cantidad_hermana',
			    'id_gestion',
			    'gestion',
			    'id_detalle_evento_hermano',
			    'id_detalle_evento_hermana',
			    'id_evento',
			    'codigo',
			    'nombre',
			    'id_usuario_mod',
			    'cuenta','id_obrero','desc_obrero',
			    {name:'hora', type: 'date',dateFormat:'H:i:s'}
			    
			]
     }  
});