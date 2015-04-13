Ext.define('pxp.model.Lugar', {
    extend: 'Ext.data.Model',
    config: {
    	idProperty :'id_lugar',
	    fields: ['id_lugar','id_lugar_fk','codigo','nombre','tipo','sw_municipio','sw_impuesto','codigo_largo']
	}
});