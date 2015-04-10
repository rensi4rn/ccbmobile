Ext.define('pxp.model.Egreso', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Model'
    ],
    config: {
    	     idProperty :'id_movimiento',
	        fields: [
					{name:'id_movimiento', type: 'numeric'},
					{name:'estado_reg', type: 'string'},
					{name:'tipo', type: 'string'},
					{name:'id_casa_oracion', type: 'numeric'},
					{name:'concepto', type: 'string'},
					{name:'obs', type: 'string'},
					{name:'fecha', type: 'date',dateFormat:'Y-m-d'},
					{name:'id_estado_periodo', type: 'numeric'},
					{name:'fecha_reg', type: 'date',dateFormat:'Y-m-d H:i:s.u'},
					{name:'id_usuario_reg', type: 'numeric'},
					{name:'fecha_mod', type: 'date',dateFormat:'Y-m-d H:i:s.u'},
					{name:'id_usuario_mod', type: 'numeric'},
					{name:'usr_reg', type: 'string'},
					{name:'usr_mod', type: 'string'},
					'id_tipo_movimiento' ,
			        'id_movimiento_det',
			        'monto',
			        'total_monto','tipo_reg','tipo_documento','num_documento',
			        'id_obrero',
				    'desc_obrero',
				    'estado','desc_tipo_movimiento','desc_casa_oracion'
				   ]
     }  
});