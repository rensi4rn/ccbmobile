Ext.define('pxp.model.CasaOracion', {
    extend: 'Ext.data.Model',
    config: {
    	idProperty :'id_casa_oracion',
	    fields: [ 
	        {name:'id_casa_oracion', type: 'numeric'},
			{name:'estado_reg', type: 'string'},
			{name:'fecha_cierre', type: 'date', dateFormat:'Y-m-d'},
			{name:'codigo', type: 'string'},
			{name:'id_region', type: 'numeric'},
			{name:'id_lugar', type: 'numeric'},
			{name:'direccion', type: 'string'},
			{name:'nombre', type: 'string'},
			{name:'fecha_apertura', type: 'date', dateFormat:'Y-m-d'},
			{name:'fecha_reg', type: 'date', dateFormat:'Y-m-d H:i:s.u'},
			{name:'id_usuario_reg', type: 'numeric'},
			{name:'fecha_mod', type: 'date', dateFormat:'Y-m-d H:i:s.u'},
			{name:'id_usuario_mod', type: 'numeric'},
			{name:'usr_reg', type: 'string'},
			{name:'usr_mod', type: 'string'},
			'desc_region',
			'desc_lugar','latitud','longitud','zoom'
			]
		}
});