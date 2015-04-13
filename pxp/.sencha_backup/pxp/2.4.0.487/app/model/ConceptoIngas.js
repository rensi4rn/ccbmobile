Ext.define('pxp.model.ConceptoIngas', {
    extend: 'Ext.data.Model',
    config: {
    	idProperty :'id_concepto_ingas',
	    fields: ['id_concepto_ingas',
	             'tipo',
	             'desc_ingas',
	             'movimiento',
	             'desc_partida',
	             'id_grupo_ots',
	             'filtro_ot',
	             'requiere_ot']
        }
});