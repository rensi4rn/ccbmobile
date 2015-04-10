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
Ext.define('pxp.view.agenda.AgendaFormFilter', {
    extend: 'Ext.form.Panel',
    xtype: 'agendaformfilter',
    requires: [
        'Ext.field.Select',
        'Ext.field.Search',
        'Ext.Toolbar',
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'pxp.view.component.Gestion',
        'pxp.view.component.Lugar'
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
            items:[  
		            
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
				                xtype: 'textfield',
				                labelWidth:100,
				                label: 'Lugar',
				                name:'nombre',
				                flex: Ext.os.is.Phone?1:undefined,
				                itemId:'nombre',
				                readOnly:true
				                
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
				                itemId:'id_gestion',
				                name: 'id_gestion'
				             },
				             {
				                xtype: 'textfield',
				                labelWidth: 100,
				                label: 'Gestión',
				                flex: Ext.os.is.Phone?1:undefined,
				                //flex: 1,
				                itemId: 'gestion',
				                name: 'gestion',
				                readOnly:true
				                
				             },
				             {
				                xtype: 'button',
				                itemId:'gestionbutton',
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
