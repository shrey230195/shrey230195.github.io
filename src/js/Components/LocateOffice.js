/** 

 * @jsx React.DOM 
 */


var React = require('React');

  var LocateOffice = React.createClass({
    componentDidMount:function(){
    		var myOptions = {
  mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map = new google.maps.Map(this.refs.map.getDOMNode(), myOptions);
    
// init directions service
var dirService = new google.maps.DirectionsService();
var dirRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});
dirRenderer.setMap(map);

// highlight a street
var request = {
  origin: this.props.origin ,
  destination: '28.6139,77.2090',
  //waypoints: [{location:"48.12449,11.5536"}, {location:"48.12515,11.5569"}],
  travelMode: google.maps.TravelMode.DRIVING
};
dirService.route(request, function(result, status) {
  if (status == google.maps.DirectionsStatus.OK) {
    dirRenderer.setDirections(result);
  }
});
    },
    render: function () {

    


        return (<div className="map">
                     <div ref="map" className='map-gic'></div>
                     <h4> {this.props.location} - delhi</h4>
                </div>
        	          
	        
            );
    }
});







module.exports = LocateOffice;