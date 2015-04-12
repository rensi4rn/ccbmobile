/**
 * Demonstrates usage of the Ext.tab.Panel component with the tabBar docked to the bottom of the screen.
 * See also app/view/Tabs.js for an example with the tabBar docked to the top
 */  
Ext.define('pxp.view.rendicion.Rendicion', {
    extend: 'Ext.Container',
    xtype: 'rendicion',
    requires: [
        'pxp.view.rendicion.RendicionFormFilter',
        'pxp.view.rendicion.RendicionList',
        'pxp.view.rendicion.RendicionTbar',
        'pxp.view.rendicion.RendicionForm'
    ],

    config: {
        //fullscreen: true,
        layout: 'fit',
        items: [
               {
	                xtype: 'rendicionformfilter',
	                flex:1
	           },
               {
	                xtype: 'rendicionlist',
	                flex:1,
	                hidden:true
	           },
	           {
	            	xtype: 'rendicionform',
	            	flex:1,
	                hidden:true
	           }
          ]
    }
});