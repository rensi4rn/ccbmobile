Ext.define("pxp.model.Evento", {
	extend: "Ext.data.Model",
	config: {
		idProperty :'id_region_evento',
		fields: [{
			name: 'event',
			type: 'string'
		}, {
			name: 'title',
			type: 'string'
		}, {
			name: 'start',
			type: 'date',
			dateFormat:'Y-m-d H:i:s'
		}, {
			name: 'end',
			type: 'date',
			dateFormat:'Y-m-d H:i:s'
		}, {
			name: 'css',
			type: 'string'
		}, {
			name: 'desc_evento',
			type: 'string'
		}, {
			name: 'desc_region',
			type: 'string'
		}, {
			name: 'desc_casa_oracion',
			type: 'string'
		}, {
			name: 'hora',
			type: 'string'
		}, {
			name: 'id_obrero',
			type: 'numeric'
		}, {
			name: 'desc_obrero',
			type: 'string'
		}, {
			name: 'tipo_vista',
			type: 'string'
		},
		'id_casa_oracion',
        'id_region',
        'id_evento',
        'desc_gestion',
        'id_gestion'
		
		
		
		]
	}
});

                           
                           