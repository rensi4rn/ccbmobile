/**
 * Demonstrates usage of the Ext.tab.Panel component with the tabBar docked to the bottom of the screen.
 * See also app/view/Tabs.js for an example with the tabBar docked to the top
 */  
Ext.define('pxp.view.egreso.Egreso', {
    extend: 'Ext.Container',
    xtype: 'egreso',
    requires: [
        'pxp.view.egreso.EgresoFormFilter',
        'pxp.view.egreso.EgresoList',
        'pxp.view.egreso.EgresoTbar',
        'pxp.view.egreso.EgresoForm'
    ],

    config: {
        //fullscreen: true,
        layout: 'fit',
        items: [
               {
	                xtype: 'egresoformfilter',
	                flex:1
	           },
               {
	                xtype: 'egresolist',
	                flex:1,
	                hidden:true
	           },
	           {
	            	xtype: 'egresoform',
	            	flex:1,
	                hidden:true
	           }
          ]
    }
});