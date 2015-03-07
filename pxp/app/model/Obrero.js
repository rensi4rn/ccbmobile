Ext.define('pxp.model.Obrero', {
    extend: 'Ext.data.Model',
    config: {
    	idProperty :'id_obrero',
	    fields: [	    
			    'id_obrero',
				'estado_reg',
				'id_region',
				'fecha_fin',
				'fecha_ini',
				'obs',
				'id_tipo_ministerio',
				'id_persona',
				'fecha_reg',
				'id_usuario_reg',
				'fecha_mod',
				'id_usuario_mod',
				'usr_reg',
				'usr_mod',
                'desc_persona',
                'desc_tipo_ministerio',
                'desc_casa_oracion',
                'id_casa_oracion',
                'desc_region',
                'telefono1',
                'telefono2',
                'celular1',
                'correo'
	]}  
});