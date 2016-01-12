
/** 

 * @jsx React.DOM 
 */

var React = require('React');
var AddAddress=require('./AddAddress');
var Home=require('./Home');
var LocateOffice=require('./LocateOffice');
var _ = require('lodash-node');





var Content = module.exports=React.createClass({
    getInitialState: function () {
          return {
                
                
              MapCoordinates:[
                            '28.5700,77.3200' ,
                            '28.4700,77.0300',
                        
                               
              ],
              Addresses:[
                    'noida',
                    'gurgaon',
                    
                    
                    
           ]
              
          };
      },
      onUpdate: function(val,Coordinates){
        var newAddress=this.state.Addresses.concat([val]);
        var newCoordinates=this.state.MapCoordinates.concat([Coordinates]);
          this.setState({
              Addresses:newAddress,
              MapCoordinates:newCoordinates
          });
          console.log(this.state.Addresses[1]);
          
      },

    render: function(){
        self=this;
        var MapCoordinates = this.state.MapCoordinates.map(function(Add,key){

                return <LocateOffice origin={Add} location={self.state.Addresses[key]}/>
            });

        return(
            <div >
                {this.props.currentTab === 1 ?
                <div >
                    <Home Addresses={this.state.Addresses} /> 
                </div>
                :null}

                {this.props.currentTab === 2 ?
                <div>
                    <AddAddress onUpdate={ this.onUpdate }/>
                </div>
                :null}

                {this.props.currentTab === 3 ?
                  
                
                    {MapCoordinates}
                
                 
                
                :null}
            
               
            </div>
        );
    }
});