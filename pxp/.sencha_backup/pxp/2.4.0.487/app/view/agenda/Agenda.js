/**
 * Demonstrates usage of the Ext.tab.Panel component with the tabBar docked to the bottom of the screen.
 * See also app/view/Tabs.js for an example with the tabBar docked to the top
 */
Ext.define('pxp.view.agenda.Agenda', {
    extend: 'Ext.Container',
    xtype: 'agenda',
    requires: [
        'pxp.view.agenda.AgendaFormFilter',
        'pxp.view.agenda.AgendaList',
        'pxp.view.agenda.AgendaTbar',
        'pxp.view.agenda.AgendaForm'
    ],

    config: {
        //fullscreen: true,
        layout: 'fit',
        items: [
               {
	                xtype: 'agendaformfilter',
	                flex:1
	           },
               {
	                xtype: 'agendalist',
	                flex:1,
	                hidden:true
	           },
	           {
	            	xtype: 'agendaform',
	            	flex:1,
	                hidden:true
	           }
          ]
    }
});