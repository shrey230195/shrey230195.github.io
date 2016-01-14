
/** 

 * @jsx React.DOM 
 */








var React = require('React');



var Content=require('./Contents');
var Tab =require('./SidebarList');
var Tabs= require('./Sidebar');

var tabList = [
    { 'id': 1, 'name': 'Home', 'url': '/Home' },
    { 'id': 2, 'name': 'Add Address', 'url': '/AddAddress' },
    { 'id': 3, 'name': 'Locate Office', 'url': '/LocateOffice' }
   
];





var App =module.exports= React.createClass({
    getInitialState: function () {        
        return {
            tabList: tabList,
            currentName: 'Home',
            currentTab: 1
        };
    },

    changeTab: function(tab) {
        this.setState({ currentTab: tab.id,
            currentName:tab.name
            

         });
    },

    render: function(){
        return(
            <div className="container-fluid">
              <div className="row-fluid">
                <div className="span4">
                 <nav>
                    <h2>UseDipper</h2>
                 </nav>
                   <Tabs
                                    currentTab={this.state.currentTab}
                                    tabList={this.state.tabList}
                                    changeTab={this.changeTab}
                                />
                </div>
                <div className="span8">
                <nav>
                    <h2>{this.state.currentName}</h2>
                </nav>
                  <Content currentTab={this.state.currentTab} />
                </div>
              </div>
            </div>
            
        );
    }
});

