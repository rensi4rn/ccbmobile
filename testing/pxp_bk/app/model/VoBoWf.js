Ext.define('pxp.model.VoBoWf', {
    extend: 'Ext.data.Model',
    config: {
    	idProperty :'id_proceso_wf',
	    fields: [	    
			    'id_proceso_wf',
				'id_tipo_proceso',
				'nro_tramite',
				'id_estado_wf_prev',
				'estado_reg', 	
				'id_persona', 
				'valor_cl',
				'id_institucion', 
				'id_usuario_reg', 
				'fecha_reg', 
				'fecha_ini', 
				'fecha_mod', 
				'id_usuario_mod', 
				'usr_reg','obs',
				'usr_mod', 
				'tipo_estado_disparador',
				'tipo_estado_inicio',
				'tipo_estado_fin',
				'id_estado_wf',
				'desc_tipo_proceso',
				'desc_persona',
				'desc_institucion',
				'tipo_ini',
				'codigo_estado',
				'desc_funcionario1',
				'nombre_depto',
				'usu_reg_ew',
				'nombre_tipo_estado',
				'nombre_subsistema',
				'codigo_subsistema'
			]
     }  
});