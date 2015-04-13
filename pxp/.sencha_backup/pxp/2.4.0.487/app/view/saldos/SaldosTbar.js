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
Ext.define('pxp.view.saldos.SaldosTbar', {
    extend: 'Ext.form.Panel',
    xtype: 'saldostbar',
    requires: [
        'Ext.field.Select',
        'Ext.field.Search',
        'Ext.Toolbar'
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
                        text: 'Filtro',
                        itemId: 'backfilter'
                    }]
            }
        ],
        layout: {
            type: 'vbox',
            align: 'stretch'
        }
    }

    
});
