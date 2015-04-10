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
Ext.define('pxp.view.obrero.ObreroForm', {
    extend: 'Ext.form.Panel',
    xtype: 'obreroform',
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
				                itemId:'id_obrero',
				                name:'id_obrero'
				     },
				     {
				                xtype: 'hiddenfield',
				                itemId:'id_persona',
				                name:'id_persona'
				     },
				     
		           
				     
				     {
				         xtype: 'fieldset',
		                 items: [
		                    {
		                        xtype: 'numberfield',
		                        name: 'telefono1',
		                        clearIcon: true,
		                        label: 'Tetéfono'
		                    },
		                    {
		                        xtype: 'numberfield',
		                        name: 'celular1',
		                        clearIcon: true,
		                        label: 'Celular',
		                        minValue : 0
		                    },
		                    {
		                        xtype: 'emailfield',
		                        name: 'correo',
		                        label: 'Email',
		                        clearIcon: true,
		                        minValue : 0
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
