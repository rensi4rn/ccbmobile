/**
 * Demonstrates usage of the Ext.tab.Panel component with the tabBar docked to the bottom of the screen.
 * See also app/view/Tabs.js for an example with the tabBar docked to the top
 */
Ext.define('pxp.view.calendario.CalendarioMain', {
    extend: 'Ext.Container',
    xtype: 'calendariomain',
    requires: [
        'pxp.view.calendario.CalendarioFormFilter',
        'pxp.view.calendario.Calendario'
    ],

    config: {
        //fullscreen: true,
        layout: 'fit',
        items: [
               {
	                xtype: 'calendarioformfilter',
	                flex:1
	           },
               {
	                xtype: 'calendario',
	                flex:1,
	                hidden:true
	           }
          ]
    }
});