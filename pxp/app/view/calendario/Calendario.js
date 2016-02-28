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
        editable: false,
        layout: 'fit',
        items: []
    },
    
    initialize:function(){
    	var me = this;
    	me.store = Ext.create('pxp.store.Evento');
    	/*me.calendar = new Ext.ux.TouchCalendar({*/
    	me.calendar = new Ext.ux.TouchCalendarView({
    	
                        itemId: 'calendar',
		                viewMode: 'month',
	                    value: new Date(),
	                    flex:1,
		                enableSwipeNavigate: false,
	                    enableSimpleEvents: false,
                        enableEventBars: false,
	                    eventBarTpl: '<div>{desc_evento}</div>',
						weekStart: 1,
						eventStore: me.store,
						plugins: [Ext.create('Ext.ux.TouchCalendarEvents', {
			                        eventHeight: 'auto',
			                        eventBarTpl: '<div>{desc_evento}</div>'
			            })]
					
                   });
		
         me.add([this.calendar, {
                                xtype: 'toolbar',
                                docked: 'top',
                                items: [
                                {
			                        xtype: 'button',
			                        ui: 'back ',
			                        text: 'Filtro',
			                        itemId: 'backfilter'
			                    },
                                
                                {
                                    xtype: 'button',
                                    text: 'Por Meses',
                                    handler: function(){
                                        me.calendar.setViewMode('month');
                                    }
                                }, {
                                    xtype: 'button',
                                    text: 'Por Semanas',
                                    handler: function(){
                                        me.calendar.setViewMode('week');
                                    }
                                }]
                            }]);

        /*
	     var fecha_ini = Ext.Date.add(new Date(), Ext.Date.DAY, -31),
		      fecha_fin = Ext.Date.add(new Date(), Ext.Date.DAY, 31)
		 pxp.app.showMask(); 
		 me.store.getProxy().setExtraParams({
	    		     "fecha_ini": Ext.Date.format(fecha_ini,'d/m/Y'),
	    		     "fecha_fin": Ext.Date.format(fecha_fin,'d/m/Y')
				});
	     
         me.store.load({callback:function(){ 
         	 pxp.app.hideMask(); 
         	 calendar.refresh(); }});*/
	    this.calendar.element.on('swipe', function(a,b,c,d){
	    	
	    	 this.calendar.fireEvent('touchmove',this.calendar, a,b,c,d)
	    }, this);
    },
    iniciarFiltros: function(data){
    	var me = this,
    	    calendar = this.calendar;
    	pxp.app.showMask(); 
    	
    	
		
		var fecha_ini = Ext.Date.add(calendar.currentDate, Ext.Date.DAY, -60),
		    fecha_fin = Ext.Date.add(calendar.currentDate, Ext.Date.DAY, 60);
		
		me.store.getProxy().setExtraParams(Ext.apply({
	    		     "fecha_ini": Ext.Date.format(fecha_ini,'d/m/Y'),
	    		     "fecha_fin": Ext.Date.format(fecha_fin,'d/m/Y')
				}, data));
	     
	     
        me.store.load({callback:function(){
         	pxp.app.hideMask(); 
         	calendar.refresh();
        },
        scope:this});
    }
});