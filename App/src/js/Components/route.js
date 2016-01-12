/** 

 * @jsx React.DOM 
 */


var React = require('react'),
	
	AddAddress =require('./AddAddress');
	Home = require('./Home');

var route=  React.createClass({
	render:function(){

		return(
			<div>
		<AddAddress/>
		
		
		</div>
		);
	}
});
module.exports=route;

	