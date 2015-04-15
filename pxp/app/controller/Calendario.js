/**
 * @class Kiva.controller.Loans
 * @extends Ext.app.Controller
 *
 * The only controller in this simple application - this simply sets up the fullscreen viewport panel
 * and renders a detailed overlay whenever a Loan is tapped on.
 */
Ext.define('pxp.controller.Calendario', {
    extend: 'Ext.app.Controller',
    config: {
        profile: Ext.os.deviceType.toLowerCase(),        
        models: [],
        stores: [],
        refs: {
            calendario: 'calendario'
        },

        control: {
            'calendario #calendar': {
            	periodchange:'onChangePeriod',
            	selectionchange: 'onSelectDate',
            	eventtap: 'onEventTap',
            	touchmove: 'onTouchMove'
            }
            
        } 
    },
   onTouchMove:function(calendar, e,c,d){
         /* This code is for horizontal swipe */

		if(e.direction == "left") {
            calendar.refreshDelta(-1)
        } else {
            calendar.refreshDelta(1)
        }
   },
   onEventTap: function(event){
                    Ext.Msg.alert(
                        event.get('event'),
                        event.get('title') + ' ' + event.get('hora')
                    );
                  
   },
   onChangePeriod: function(o, minDate, maxDate, direction, eOpts){
   	  // alert('evento')
   	  var panel = o.up('calendario');
   	  pxp.app.showMask();
   	  panel.store.getProxy().setExtraParams({
    		     "fecha_ini": Ext.Date.format(minDate,'d/m/Y'),
    		     "fecha_fin": Ext.Date.format(maxDate,'d/m/Y')
			});
      panel.store.load({callback:function(){pxp.app.hideMask();}})
   },
   onSelectDate: function(o, newDate, oldDate, eOpts){
   	   console.log(newDate)
   }
   
    
});
