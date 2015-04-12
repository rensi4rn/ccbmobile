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
Ext.define('pxp.view.rendicion.RendicionForm', {
    extend: 'Ext.form.Panel',
    xtype: 'rendicionform',
    requires: [
        'Ext.field.Select',
        'Ext.field.Search',
        'Ext.Toolbar',
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'pxp.view.component.Obrero',
        'pxp.view.component.TipoMovimiento'
    ],
    
    config: {
    	ui: 'light',
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
				                itemId: 'id_movimiento_det',
				                name: 'id_movimiento_det'
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
				            type: 'hbox',
				            align: 'stretch'
				        },
				        items:[
				             {
				                xtype: 'hiddenfield',
				                itemId:'id_tipo_movimiento',
				                name:'id_tipo_movimiento'
				             },
				             {
				                xtype: 'textfield',
				                labelWidth:100,
				                label: 'Tipo Movimiento',
				                name:'desc_tipo_movimiento',
				                flex: Ext.os.is.Phone?1:undefined,
				                itemId:'desc_tipo_movimiento',
				                readOnly:true
				                
				             },
				             {
				                xtype: 'button',
				                itemId: 'tipomovimientobutton',
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
		                        itemId:'concepto',
		                        label: 'Concepto',
		                        valueField: 'codigo',
		                        displayField: 'title',
		                        store: {
		                            data: [
		                                
		                                { codigo: 'rendicion', title: 'Rendición'}
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
			                        name: 'monto',
			                        itemId:'monto',
			                        minValue : 0,
			                        label: 'Monto'
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
		                        name: 'tipo_documento',
		                        itemId:'tipo_documento',
		                        label: 'Documento',
		                        valueField: 'codigo',
		                        displayField: 'title',
		                        store: {
		                            data: [
		                                { codigo: 'factura', title: 'Factura'},
		                                { codigo: 'recibo_bien', title: 'Recibo de Bien'},
		                                { codigo: 'recibo_servicio', title: 'Recibo de Servicio'},
		                                { codigo: 'recibo_sin_retencion', title: 'Recibo sin retención'}
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
			                        xtype: 'textfield',
			                        name: 'num_documento',
			                        itemId:'num_documento',
			                        minValue : 0,
			                        label: 'Número'
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
			                        xtype: 'textareafield',
			                        name: 'obs',
			                        itemId:'obs',
			                        label: 'Obs'
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
				                itemId:'id_ot',
				                name:'id_ot'
				             },
				             {
				                xtype: 'textfield',
				                labelWidth:100,
				                label: 'Objetivo',
				                name:'desc_orden',
				                flex: Ext.os.is.Phone?1:undefined,
				                //flex: 1,
				                itemId:'desc_orden',
				                readOnly:true
				                
				             },
				             {
				                xtype: 'button',
				                itemId:'otbutton',
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
					                itemId:'id_concepto_ingas',
					                name:'id_concepto_ingas'
					             },
					             {
					                xtype: 'textfield',
					                labelWidth:100,
					                label: 'Concepto de Gasto',
					                name:'desc_ingas',
					                flex: Ext.os.is.Phone?1:undefined,
					                itemId:'desc_ingas',
					                readOnly:true
					                
					             },
					             {
					                xtype: 'button',
					                itemId: 'conceptoingasbutton',
					                iconCls: 'ico-customers-small'
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
