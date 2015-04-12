/**
 * @class kiva.views.List
 * @extends Ext.DataView
 */
Ext.define('pxp.view.saldos.SaldosPanel', {
    extend: 'Ext.Container',
    xtype : 'saldospanel',
    requires: [
        'pxp.view.egreso.EgresoTbar',
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'Ext.List',
        'pxp.store.Egreso'
    ],

    config: {
    	showAnimation: { type: "slide", direction: "down" },
    	layout: {
            type: 'vbox',
            align: 'stretch'
        },
    	items: [
    	       {
	           	 xtype : 'saldostbar',
	             docked: 'top'
	           },
			   {
			   	  xtype: 'panel',
			   	  scrollable : true,
			   	  flex: 1,
			   	  ui: 'light',
			   	  itemId: 'resumenSaldos',
			   	  html: '<p></p>'
		
			   }]
    },
    initialize:function(){
    	var me = this;
    	me.unmask();
    	
    	
    	  
    }
    
});
