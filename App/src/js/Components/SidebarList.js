/** 

 * @jsx React.DOM 
 */

var React = require('React');
var Tab =module.exports= React.createClass({
    handleClick: function(e){
        e.preventDefault();
        this.props.handleClick();
    },
    
    render: function(){
        return (
            <h4 className={this.props.isCurrent ? 'current' : null}>
                <a onClick={this.handleClick} href="/{this.props.url}">
                    {this.props.name}
                </a>
            </h4>
        );
    }
});