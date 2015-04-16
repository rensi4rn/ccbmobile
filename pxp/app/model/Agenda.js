Ext.define('pxp.model.Agenda', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Model'
    ],
    config: {
    	     idProperty :'id_region_evento',
	        fields: [
						{name:'id_region_evento', type: 'numeric'},
						{name:'estado_reg', type: 'string'},
						{name:'id_gestion', type: 'numeric'},
						{name:'fecha_programada', type: 'date',dateFormat:'Y-m-d'},
						{name:'id_evento', type: 'numeric'},
						{name:'estado', type: 'string'},
						{name:'id_region', type: 'numeric'},
						{name:'fecha_reg', type: 'date',dateFormat:'Y-m-d H:i:s.u'},
						{name:'id_usuario_reg', type: 'numeric'},
						{name:'fecha_mod', type: 'date',dateFormat:'Y-m-d H:i:s.u'},
						{name:'id_usuario_mod', type: 'numeric'},
						{name:'usr_reg', type: 'string'},
						{name:'usr_mod', type: 'string'},
						'desc_gestion','desc_evento','desc_region',
						'desc_casa_oracion','mes','hora','id_obrero','desc_obrero'	
					]
     }  
});