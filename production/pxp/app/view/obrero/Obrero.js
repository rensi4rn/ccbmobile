/**
 * Demonstrates usage of the Ext.tab.Panel component with the tabBar docked to the bottom of the screen.
 * See also app/view/Tabs.js for an example with the tabBar docked to the top
 */
Ext.define('pxp.view.obrero.Obrero', {
    extend: 'Ext.Container',
    xtype: 'obrero',
    requires: [
        'pxp.view.obrero.ObreroList',
        'pxp.view.obrero.ObreroTbar'        
    ],

    config: {
        layout: 'fit',
        items: [
	           {
	                xtype: 'obrerolist',
	                flex:1
	           }
	          
          ]
    }
});