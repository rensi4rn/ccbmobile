/**
 * Demonstrates usage of the Ext.tab.Panel component with the tabBar docked to the bottom of the screen.
 * See also app/view/Tabs.js for an example with the tabBar docked to the top
 */
Ext.define('pxp.view.regionevento.RegionEvento', {
    extend: 'Ext.Container',
    xtype: 'interino',
    requires: [
        'pxp.view.regionevento.RegionEventoList',
        'pxp.view.regionevento.RegionEventoTbar',
        'pxp.view.regionevento.RegionEventoForm'
    ],

    config: {
        //fullscreen: true,
        layout: 'fit',
        items: [
	           
	           {
	                xtype: 'regioneventolist',
	                flex:1
	           },
	           {
	            	xtype: 'regioneventoform',
	            	flex:1,
	                hidden:true
	           }
          ]
    }
});
