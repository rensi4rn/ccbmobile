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
Ext.define('pxp.view.saldos.SaldosFormFilter', {
    extend: 'Ext.form.Panel',
    xtype: 'saldosformfilter',
    requires: [
        'Ext.field.Select',
        'Ext.field.Search',
        'Ext.Toolbar',
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'pxp.view.component.CasaOracion',
        'pxp.view.component.Gestion'
    ],
    
    config: {
    	ui: 'light',
    	showAnimation: { type: "slide", direction: "down" } ,
        items: [
            {
                xtype: 'toolbar',
                ui: 'light',
                docked: 'bottom',
                items: [
                    {
                        text: 'Reset',
                        xtype: 'button',
                        iconMask: true,
                        ui: 'decline',
                        itemId: 'reset'
                    },
                    { xtype: 'spacer' },
                    {
                       xtype: 'title',
                       title: ''
                    },
                    { xtype: 'spacer' },
                    
                    {
                        text: 'Aplicar',
                        xtype: 'button',
                        iconMask: true,
                        ui: 'confirm',
                        itemId: 'aplicar'
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
		                        picker : {
		                        	  yearFrom : 2014,
						     		  yearTo: new Date().getFullYear()
						     	},
		                        width: Ext.os.is.Phone?undefined:'150',
		                        label: 'Fecha'
		                        
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
				                itemId:'id_lugar',
				                name:'id_lugar'
				             },
				             {
				                xtype: 'hiddenfield',
				                itemId: 'id_region',
				                name: 'id_region'
				             },
				             {
				                xtype: 'textfield',
				                labelWidth:100,
				                label: 'Lugar',
				                name: 'nombre',
				                flex: Ext.os.is.Phone?1:undefined,
				                itemId: 'nombre',
				                readOnly: true
				                
				             },
				             {
				                xtype: 'button',
				                itemId:'lugarbutton',
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
				                label: 'Colecta',
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
