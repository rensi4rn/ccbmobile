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
Ext.define('pxp.view.ingreso.IngresoForm', {
    extend: 'Ext.form.Panel',
    xtype: 'ingresoform',
    requires: [
        'Ext.field.Select',
        'Ext.field.Search',
        'Ext.Toolbar',
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'pxp.view.component.Obrero'
    ],
    
    config: {
    	ui: 'light',
    	//scroll: true,
    	//fullscreen: true,
    	scrollable : false,
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
           	scrollable : true,
           	layout: {
	            type: 'vbox'
	        },
            items:[  {
				                xtype: 'hiddenfield',
				                itemId: 'id_movimiento',
				                name: 'id_movimiento'
				     },
				     {
				                xtype: 'hiddenfield',
				                itemId: 'id_movimiento_det_mantenimiento',
				                name: 'id_movimiento_det_mantenimiento'
				     },
				     {
				                xtype: 'hiddenfield',
				                itemId: 'id_movimiento_det_piedad',
				                name: 'id_movimiento_det_piedad'
				    
				    },
				     {
				                xtype: 'hiddenfield',
				                itemId: 'id_movimiento_det_construccion',
				                name: 'id_movimiento_det_construccion'
				    
				    },
				     {
				                xtype: 'hiddenfield',
				                itemId: 'id_movimiento_det_viaje',
				                name: 'id_movimiento_det_viaje'
				    
				    },
				     {
				                xtype:  'hiddenfield',
				                itemId: 'id_movimiento_det_especial',
				                name: 'id_movimiento_det_especial'
				    
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
		                        itemId: 'fecha',
		                        name:'fecha',
		                        labelWidth:100,
		                        dateFormat: 'd/m/Y',
		                        destroyPickerOnHide: true,
		                        width:Ext.os.is.Phone?undefined:'150',
		                        label: 'Fecha',
		                        picker : {
		                        	  yearFrom : new Date().getFullYear(),
						     		  yearTo: new Date().getFullYear()
						     	}
		                        
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
				                itemId:'id_obrero',
				                name:'id_obrero'
				             },
				             {
				                xtype: 'textfield',
				                labelWidth:100,
				                label: 'Obrero',
				                name:'desc_obrero',
				                flex: Ext.os.is.Phone?1:undefined,
				                //flex: 1,
				                itemId:'desc_obrero',
				                readOnly:true
				                
				             },
				             {
				                xtype: 'button',
				                itemId:'obrerobutton',
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
		                        name: 'concepto',
		                        itemId:'estado',
		                        label: 'Concepto',
		                        valueField: 'codigo',
		                        displayField: 'title',
		                        store: {
		                            data: [
		                                { codigo: 'colecta_adultos', title: 'Colecta de Adultos'},
		                                { codigo: 'colecta_jovenes', title: 'Colecta de Jovenes'},
		                                { codigo: 'ingreso_trapaso', title: 'Ingreso por Trapaso'},
		                                { codigo: 'colecta_especial', title: 'Colecta Especial'},
		                                { codigo: 'saldo_inicial', title: 'Saldo Inicial'}
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
		                        xtype: 'selectfield',
		                        name: 'estado',
		                        itemId:'estado',
		                        label: 'Estado',
		                        valueField: 'codigo',
		                        displayField: 'title',
		                        store: {
		                            data: [
		                                { codigo: 'pendiente', title: 'Pendiente'},
		                                { codigo: 'entregado', title: 'Entregado'}
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
			                        xtype: 'numberfield',
			                        name: 'monto_mantenimiento',
			                        itemId:'monto_mantenimiento',
			                        minValue : 0,
			                        label: 'Mantenimineto'
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
			                        xtype: 'numberfield',
			                        name: 'monto_piedad',
			                        itemId:'monto_piedad',
			                        stepValue: 1,
			                        minValue : 0,
			                        label: 'Piedad'
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
			                        xtype: 'numberfield',
			                        name: 'monto_construccion',
			                        itemId:'monto_construccion',
			                        stepValue: 1,
			                        minValue : 0,
			                        label: 'Construcción'
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
			                        xtype: 'numberfield',
			                        name: 'monto_viaje',
			                        itemId:'monto_viaje',
			                        stepValue: 1,
			                        minValue : 0,
			                        label: 'Viaje'
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
			                        xtype: 'numberfield',
			                        name: 'monto_especial',
			                        itemId:'monto_especial',
			                        stepValue: 1,
			                        minValue : 0,
			                        label: 'Especial'
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
