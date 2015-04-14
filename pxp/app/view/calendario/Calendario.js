/**
 * Demonstrates usage of the Ext.tab.Panel component with the tabBar docked to the bottom of the screen.
 * See also app/view/Tabs.js for an example with the tabBar docked to the top
 */
Ext.define('pxp.view.calendario.Calendario', {
    extend: 'Ext.Container',
    xtype: 'calendario',
    requires: [
        'Ext.ux.TouchCalendarView',
        'Ext.ux.TouchCalendar',
        'Ext.ux.TouchCalendarEventsBase',
        'Ext.ux.TouchCalendarDayEvents',
        'Ext.ux.TouchCalendarWeekEvents',
        'Ext.ux.TouchCalendarMonthEvents',
        'Ext.ux.TouchCalendarSimpleEvents',
        'Ext.ux.TouchCalendarEvents',
        'pxp.store.Evento',
        'pxp.model.Evento'
    ],

    config: {
        //fullscreen: true,
        layout: 'fit',
        items: []
    },
    
    initialize:function(){
    	var me = this;
    	me.store = Ext.create('pxp.store.Evento');
    	
		var calendar = new Ext.ux.TouchCalendarView({
                        weekStart: 0,
		                itemId: 'calendar',
		                viewMode: 'month',
	                    value: new Date(),
	                    flex:1,
		                enableSwipeNavigate: true,
	                    enableSimpleEvents: true,
                        enableEventBars: true,
	                    eventBarTpl: '<div>{desc_evento}</div>',
						weekStart: 0,
						eventStore: me.store,
						plugins: [Ext.create('Ext.ux.TouchCalendarEvents', {
			                        eventHeight: 'auto',
			                        eventBarTpl: '<div>{desc_evento}</div>'
			            })]
					
                   });
		
  me.add([calendar, {
                                xtype: 'toolbar',
                                docked: 'top',
                                items: [{
                                    xtype: 'button',
                                    text: 'Month View',
                                    handler: function(){
                                        calendar.setViewMode('month');
                                    }
                                }, {
                                    xtype: 'button',
                                    text: 'Week View',
                                    handler: function(){
                                        calendar.setViewMode('week');
                                    }
                                }]
                            }]);

        
	     var fecha_ini = Ext.Date.add(new Date(), Ext.Date.DAY, -31),
		      fecha_fin = Ext.Date.add(new Date(), Ext.Date.DAY, 31)
		 pxp.app.showMask(); 
		 me.store.getProxy().setExtraParams({
	    		     "fecha_ini": Ext.Date.format(fecha_ini,'d/m/Y'),
	    		     "fecha_fin": Ext.Date.format(fecha_fin,'d/m/Y')
				});
	     
         me.store.load({callback:function(){ 
         	 pxp.app.hideMask(); 
         	 calendar.refresh();}});
	    
	    calendar.element.on('swipe', function(a,b,c,d){
	    	
	    	 calendar.fireEvent('touchmove',calendar, a,b,c,d)
	    }, this);
    }
});