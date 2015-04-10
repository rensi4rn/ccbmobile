Ext.define('pxp.model.Evento', {
    extend: 'Ext.data.Model',
    config: {
    	idProperty :'id_evento',
	    fields: [ 
	        	{name:'id_evento', type: 'numeric'},
				{name:'estado_reg', type: 'string'},
				{name:'nombre', type: 'string'},
				{name:'descripcion', type: 'string'},
				{name:'fecha_reg', type: 'date', dateFormat:'Y-m-d H:i:s.u'},
				{name:'id_usuario_reg', type: 'numeric'},
				{name:'fecha_mod', type: 'date', dateFormat:'Y-m-d H:i:s.u'},
				{name:'id_usuario_mod', type: 'numeric'},
				{name:'usr_reg', type: 'string'},
				{name:'usr_mod', type: 'string'},'codigo'
			]
		}
});