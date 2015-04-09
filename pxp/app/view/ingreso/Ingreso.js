/**
 * Demonstrates usage of the Ext.tab.Panel component with the tabBar docked to the bottom of the screen.
 * See also app/view/Tabs.js for an example with the tabBar docked to the top
 */
Ext.define('pxp.view.ingreso.Ingreso', {
    extend: 'Ext.Container',
    xtype: 'ingreso',
    requires: [
        'pxp.view.ingreso.IngresoFormFilter',
        'pxp.view.ingreso.IngresoList',
        'pxp.view.ingreso.IngresoTbar',
        'pxp.view.ingreso.IngresoForm'
    ],

    config: {
        //fullscreen: true,
        layout: 'fit',
        items: [
               {
	                xtype: 'ingresoformfilter',
	                flex:1
	           },
               {
	                xtype: 'ingresolist',
	                flex:1,
	                hidden:true
	           },
	           {
	            	xtype: 'ingresoform',
	            	flex:1,
	                hidden:true
	           }
          ]
    }
});
