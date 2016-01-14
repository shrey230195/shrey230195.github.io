/** 

 * @jsx React.DOM 
 */


var React = require('React');
var Address=require('./Address');
var _ = require('lodash-node');

var Home= React.createClass({
	getInitialState:function(){
		return{
		Addresses:this.props.Addresses
		}
	},
	 deleteAddress:function(Address){
	 	var newAddress = _.without(this.state.Addresses,Address);
	 	this.setState({ 
	 		Addresses:newAddress
	 		});
	 },

	render:function(){
		var Addresses = this.state.Addresses.map(function(Add){

				return <Address Address={Add} onDelete={this.deleteAddress}/>
			}.bind(this));
		return(
			
			<div className="jumbotron">

				<img className="img-circle" src="src/images/MyPhoto.jpg"/>
				

				<h1> Shrey </h1>
				<ul className="otherDetails">
					<li>9958483101</li>
					<li>Male</li>
					<li>India</li>

				</ul>
				<h3> Address </h3>
				{Addresses}


				
			</div>
			);
	}
});

module.exports=Home;