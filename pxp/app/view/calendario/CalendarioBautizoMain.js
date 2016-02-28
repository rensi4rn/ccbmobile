/**
 * Demonstrates usage of the Ext.tab.Panel component with the tabBar docked to the bottom of the screen.
 * See also app/view/Tabs.js for an example with the tabBar docked to the top
 */
Ext.define('pxp.view.calendario.CalendarioBautizoMain', {
    extend: 'Ext.Container',
    xtype: 'calendariobautizomain',
    requires: [
        'pxp.view.calendario.CalendarioFormFilter',
        'pxp.view.calendario.Calendario',
        'pxp.view.regionevento.RegionEventoForm'
    ],

    config: {
        //fullscreen: true,
        layout: 'fit',
        items: [
               {
	                xtype: 'calendarioformfilter',
	                editable: true,
	                flex:1
	           },
               {
	                xtype: 'calendario',
	                editable: true,
	                flex:1,
	                hidden:true
	           },
               {
	                xtype: 'regioneventoform',
	                editable: true,
	                origen: 'calendario',
	                flex:1,
	                hidden:true
	           }
          ]
    }
});