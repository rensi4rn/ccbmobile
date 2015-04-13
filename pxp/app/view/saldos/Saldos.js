/**
 * Demonstrates usage of the Ext.tab.Panel component with the tabBar docked to the bottom of the screen.
 * See also app/view/Tabs.js for an example with the tabBar docked to the top
 */  
Ext.define('pxp.view.saldos.Saldos', {
    extend: 'Ext.Container',
    xtype: 'egreso',
    requires: [
        'pxp.view.saldos.SaldosFormFilter',
        'pxp.view.saldos.SaldosPanel',
        'pxp.view.saldos.SaldosTbar'
    ],

    config: {
        //fullscreen: true,
        layout: 'fit',
        
        items: [
               {
	                xtype: 'saldosformfilter',
	                flex:1
	           },
               {
	                xtype: 'saldospanel',
	                flex:1,
	                hidden:true
	           }
          ]
    }
});