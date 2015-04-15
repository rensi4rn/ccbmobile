/**
 * Demonstrates usage of the Ext.tab.Panel component with the tabBar docked to the bottom of the screen.
 * See also app/view/Tabs.js for an example with the tabBar docked to the top
 */
Ext.define('pxp.view.casaoracion.CasaOracion', {
    extend: 'Ext.Container',
    xtype: 'casaoracion',
    requires: [
        'pxp.view.casaoracion.CasaOracionFormFilter',
        'pxp.view.casaoracion.CasaOracionList',
        'pxp.view.casaoracion.CasaOracionTbar',
        'pxp.view.casaoracion.Detail'
    ],

    config: {
        layout: 'card',
        items: [{
	                xtype: 'casaoracionformfilter',
	                flex:1
	           },
               {
	                xtype: 'casaoracionlist',
	                flex:1,
	                hidden:true
	           }
          ]
    }
});