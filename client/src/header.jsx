import React from 'react';
import Lightbox from 'react-image-lightbox'
import $ from 'jquery';
import {Button, Icon, Modal, Dropdown, Navbar } from 'react-materialize';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <div className = "header">
        <div className = "logo"></div>
         
         <div className = "searchbox">
            <label className = "labelClass">
            <i className=" searchIcon small material-icons">search</i> 
              <input placeholder = "Find a great place near you"className = "input" type="text" onKeyPress = {(event)=>{if (event.key === 'Enter') {this.props.searchRestaurant(event.target.value)}} }/>
            </label>
         </div>
         
         <div>
           <div className = "rightside"><span className = "hoverred" onClick = {this.props.gotoHotNew}>NEW & HOT</span></div>
         </div> 
         <div>
           <div className = "rightside"><span className = "hoverred" onClick = {this.props.gotoCitysBest}>CITY'S BEST</span></div>
         </div> 
         <div ><Dropdown style = {{height:'100px'}}
         trigger={
           <div className = "rightside"><span className = "hoverred">SAN FRANCISCO</span></div>
         }>
            <li>San Francisco</li>  
            <li>Berkeley</li>
            <li>Fremont</li>
           
          </Dropdown></div>
        
      </div>
    )

  }
}   

export default Header;