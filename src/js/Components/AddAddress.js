/** 

 * @jsx React.DOM 
 */


var React = require('React');

var AddAddress= React.createClass({
	getInitialState:function(){
		return{
		visible:0
		};
	},
	 update: function(e){
        var theVal = this.refs.Address.getDOMNode().value;
        var Coordinates=this.refs.Coordinates.getDOMNode().value;
        this.props.onUpdate(theVal,Coordinates);
        this.setState({visible:1});
    },

	render:function(){
		return(
			<div className="AddAddress">
				<form>
				  <fieldset className="form-group">
				  {this.state.visible==0?
				  	<div>
				    <label for="formGroupExampleInput">Address </label>
				    <input type="text" ref="Address" placeholder="Enter your Address"/>
				    <label for="formGroupExampleInput">Coordinates </label>
				    <input  type="text" ref="Coordinates" placeholder="lat,long e.g 28.6700,77.4200 "/>
				    <br/>
				    <button type="submit" className="btn btn-primary" onClick={this.update} >Submit</button>
				    </div>
				    :
				    <div className="afterSubmit">
				    	<h3> Address Added </h3><br/><i className="fa fa-check"></i>
                	
                	</div>
                	}
				    
				  </fieldset>
				  

				  
				</form>
			</div>
			);
	}
});
module.exports=AddAddress;