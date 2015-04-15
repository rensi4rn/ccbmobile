/**
 * @class kiva.views.LoanInfo
 * @extends Ext.Sheet
 *
 * We use this Ext.Sheet subclass to display information about a particular Loan when the user has tapped on it.
 * Ext.Sheet is an overlay class that slides in from above, below or one of the sides, usually in response to a
 * user action such as tapping on a list item.
 *
 * In this class we set the sheet up to be modal (masks the rest of the page) and to enter and exit from the
 * right hand edge of the screen. It hides itself when the user taps on the modal mask (via the hideOnMaskTap config).
 *
 * Inside the class we have an Ext.Carousel with three cards - details, payments and map. Each card is set up
 * inside its own function to make it easy to see what is going on. The LoanInfo sheet is rendered and shown by
 * the loan controller's 'show' action (see app/controllers/loans.js).
 *
 */
Ext.define('pxp.view.casaoracion.Detail', {
    extend: 'Ext.Container',
    xtype: 'detail',
    
    requires: [
        'Ext.carousel.Carousel',
        'Ext.Map',
        'Ext.field.Select',
        'Ext.Toolbar'
    ],

    config: {
        centered : false,
        ui: 'detail',
        width: '100%',
        top: 0,
        bottom: 0,
        right: 0,
        flex: 1,
        loan: undefined,
        layout:'fit',
        items: [{
                xtype: 'toolbar',
                ui: 'light',
                docked: 'top',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back ',
                        text:'Listado',
                        itemId: 'backlistcasaoracion'
                    }
                ]
            },
            { xtype:'map'  }
           ]
    },
    

    hide: function(animation) {
        var me = this;
        me.fireEvent('hideanimationstart', me);
        me.callParent();
    },
    constructor: function (){
    	
    	var me = this;
    	me.callParent(arguments);
    	me.down('map').setMapOptions({
				           zoom : 12,
				           StreetViewPanoramaOptions:true,
				           mapTypeId : google.maps.MapTypeId.ROADMAP,
			               navigationControl: true,
			               navigationControlOptions: {
			                     style: google.maps.NavigationControlStyle.DEFAULT
			                   }
				          });
    	console.log('despues del contructor de la interface')
        me.sw = 1;
    	
    },

    
    
    setLoan: function(newCasaOracion) {
    	if(newCasaOracion){
		    	var me = this,
		    	     map = this.down('map'),
		    	     myMap = map.getMap();
		    	 
		    	
		
		        if (me.mapMarker) {
		            me.mapMarker.setMap(null);
		            delete me.mapMarker;
		        }
		
		        me.mapMarker = new google.maps.Marker({ map: myMap });
				var mapMarker = me.mapMarker;
					        
				
		        
		       Ext.Viewport.setMasked({xtype:'loadmask', message:'Please Wait...'});
		       var address = newCasaOracion.data.desc_region+'-'+newCasaOracion.data.desc_lugar,
				   lon = newCasaOracion.data.longitud,
				   lat = newCasaOracion.data.latitud,
				   coo = newCasaOracion.data.zoom,
				   swFinder=true,
				   zoom=10;
				    
				    
				swFinder=(lon && lat && lon!='' && lat !='')?false:true;
				    
				
				zoom=(coo&&coo!='')?coo:zoom;
				    
				if (me.sw==1){
		        	setTimeout(function(){ 
		        		   me.cargarMapa(swFinder,address,zoom,lat,lon,mapMarker,myMap);
		        		}, 3000);
		        }
		        else{
		        	me.cargarMapa(swFinder,address,zoom,lat,lon,mapMarker,myMap);
		        }	
    	}
    },
    
    cargarMapa: function(swFinder,address,zoom,lat,lon,mapMarker,myMap){
    	var me = this;
    	
    	if(swFinder){
			me.geocoder = new google.maps.Geocoder();    
			me.geocoder.geocode({ 'address': address}, function(results, status) {
			      Ext.Viewport.setMasked(false);
			      
			      if (status == google.maps.GeocoderStatus.OK) {	
	                myMap.setCenter(results[0].geometry.location);
			        myMap.setZoom(zoom);
	                mapMarker.setPosition(results[0].geometry.location);
			      } else {
			        alert(status);
			      }
			    });
			    
			    
		}    
		else{
			 var ll = new google.maps.LatLng(lat,lon);
		 	 Ext.Viewport.setMasked(false);	
		     mapMarker.setPosition(ll);
		     myMap.setCenter(ll);
		     myMap.setZoom(zoom*1);
		     delete ll;
		} 
		
		me.sw=2; 
    	
    }
    
});