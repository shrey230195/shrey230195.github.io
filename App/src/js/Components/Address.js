/** 

 * @jsx React.DOM 
 */


var React = require('React');

var Address= React.createClass({
	handleDelete:function(e){
		this.props.onDelete(this.props.Address);

	},

	render:function(){
		return(
			<div className="jumbotron">

				<h4>{ this.props.Address }</h4>

				<button onClick={this.handleDelete} className="btn btn-danger">x</button>


			</div>
			);
	}
});

module.exports=Address;