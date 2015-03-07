/**
 * @class kiva.views.LoanFilter
 * @extends Ext.form.Panel
 *
 * This form enables the user to filter the types of Loans visible to those that they are interested in.
 *
 * We add a custom event called 'filter' to this class, and fire it whenever the user changes any of the
 * fields. The loans controller listens for this event and filters the Ext.data.Store that contains the
 * Loans based on the values selected (see the onFilter method in app/controllers/loans.js).
 *
 */
Ext.define('pxp.view.regionevento.RegionEventoForm', {
    extend: 'Ext.form.Panel',
    xtype: 'regioneventoform',
    requires: [
        'Ext.field.Select',
        'Ext.field.Search',
        'Ext.Toolbar',
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'pxp.view.component.CasaOracion'
    ],
    
    config: {
    	ui: 'light',
    	showAnimation: { type: "slide", direction: "down" } ,
        items: [
            {
                xtype: 'toolbar',
                ui: 'light',
                docked: 'top',
                items: [
                   {
                        xtype: 'button',
                        ui: 'back ',
                        //iconCls: 'arrow_left',
                        text:'Listado',
                        itemId: 'back'
                   },
                    { xtype: 'spacer' },
                    {
                       xtype: 'title',
                       title: 'Nuevo Evento'
                    },
                    { xtype: 'spacer' },
                    
                    {
                        text: 'Guardar',
                        xtype: 'button',
                        iconMask: true,
                        ui: 'confirm',
                        itemId: 'save'
                    }
                ]
            },
           
           {
           	xtype: 'fieldset',
           	flex: 1,
           	layout: {
	            type: 'vbox'
	        },
            items:[  {
				                xtype: 'hiddenfield',
				                itemId:'id_region_evento',
				                name:'id_region_evento'
				     },
				     {
				                xtype: 'hiddenfield',
				                itemId:'id_detalle_evento_hermano',
				                name:'id_detalle_evento_hermano'
				     },
				     {
				                xtype: 'hiddenfield',
				                itemId:'id_detalle_evento_hermana',
				                name:'id_detalle_evento_hermana'
				    
				    },
		            {
			           	xtype: 'fieldset',
			           	margin:'5 5 5 5',
			           	//flex: 1 ,
		                layout: {
				            type: Ext.os.is.Phone?'vbox':'hbox',
				            align: 'stretch'
				        },
				        items:[
					        {
		                        xtype: 'datepickerfield',
		                        itemId: 'fecha_programada',
		                        name:'fecha_programada',
		                        labelWidth:100,
		                        dateFormat: 'd/m/Y',
		                        width:Ext.os.is.Phone?undefined:'150',
		                        label: 'Fecha',
		                        //cls: 'my-component',
                                value: new Date()
		                    }
		                 ]
		             },
		            {
			           	xtype: 'fieldset',
			           	margin:'5 5 5 5',
			           	//flex: 1 ,
		                layout: {
				            type: 'hbox',
				            align: 'stretch'
				        },
				        items:[
				             {
				                xtype: 'hiddenfield',
				                itemId:'id_casa_oracion',
				                name:'id_casa_oracion'
				             },
				             {
				                xtype: 'textfield',
				                labelWidth:100,
				                label: 'Casa Oración',
				                name:'nombre_co',
				                flex: Ext.os.is.Phone?1:undefined,
				                //flex: 1,
				                itemId:'nombre_co',
				                readOnly:true
				                
				             },
				             {
				                xtype: 'button',
				                itemId:'casaoracionbutton',
				                iconCls: 'ico-customers-small'
				             }
				         ]
				     },
		            {
			           	xtype: 'fieldset',
			           	 margin:'5 5 5 5',
			           	//flex: 1 ,
		                layout: {
				            type: 'hbox',
				            align: 'stretch'
				        },
				        items:[
				             {
				                xtype: 'hiddenfield',
				                itemId:'id_evento',
				                name: 'id_evento'
				             },
				             {
				                xtype: 'textfield',
				                labelWidth: 100,
				                label: 'Evento',
				                flex: Ext.os.is.Phone?1:undefined,
				                //flex: 1,
				                itemId: 'nombre',
				                name: 'nombre',
				                readOnly:true
				                
				             },
				             {
				                xtype: 'button',
				                itemId:'eventobutton',
				                iconCls: 'ico-customers-small'
				             }
				         ]
				     },
				     
				     {
			           	xtype: 'fieldset',
			           	margin:'5 5 5 5',
			           	//flex: 1 ,
		                layout: {
				            type: Ext.os.is.Phone?'vbox':'hbox',
				            align: 'stretch'
				        },
				        items:[
					        {
		                        xtype: 'selectfield',
		                        name: 'estado',
		                        itemId:'estado',
		                        label: 'Estado',
		                        valueField: 'codigo',
		                        displayField: 'title',
		                        store: {
		                            data: [
		                                { codigo: 'pendiente', title: 'Pendiente'},
		                                { codigo: 'ejecutado', title: 'Ejecutado'},
		                                { codigo: 'cancelado', title: 'Cancelado'}
		                            ]
		                        }
		                     }
		                 ]
		             },
				     
				     {
			           	xtype: 'fieldset',
			           	margin:'5 5 5 5',
			           	//flex: 1 ,
		                layout: {
				            type: Ext.os.is.Phone?'vbox':'hbox',
				            align: 'stretch'
				        },
				        items:[
					           {
			                        xtype: 'spinnerfield',
			                        name: 'cantidad_hermano',
			                        itemId:'cantidad_hermano',
			                        stepValue: 1,
			                        minValue : 0,
			                        label: 'Hermanos'
			                    }
		                 ]
		             },
				     
				     {
			           	xtype: 'fieldset',
			           	margin:'5 5 5 5',
			           	//flex: 1 ,
		                layout: {
				            type: Ext.os.is.Phone?'vbox':'hbox',
				            align: 'stretch'
				        },
				        items:[
					        {
			                        xtype: 'spinnerfield',
			                        name: 'cantidad_hermana',
			                        itemId:'cantidad_hermana',
			                        stepValue: 1,
			                        minValue : 0,
			                        label: 'Hermanas'
			                    }
		                 ]
		             }
                     
                 ]
           	
           }
        ],
        layout: {
            type: 'vbox',
            align: 'stretch'
        }
    }   
});
