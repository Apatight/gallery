//opened gallery grid view with all the photographs of selected restaurant
  // restaurant name on the top, 
  //cross on the top right to close and a scroller bar on the right

import React from 'react';
import ReactDOM from 'react-dom';
import Lightbox from 'react-image-lightbox'
import $ from 'jquery';
import {Button, Icon, Modal} from 'react-materialize';


class FullGalleryOpenGrid extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className = "FullOpenGrid Modal">
         	
         {this.props.images.map((image, index)=><EachImage image = {image} index = {index} clickHandle = {this.props.clickHandle}/>)} 
      </div>
    )

  }
}   

class EachImage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = "eachImage"> 
          <img src = {this.props.image} className= "gridThumbnail" onClick = {()=>this.props.clickHandle(this.props.index)}></img>
      </div>
    )

  }
}



export default FullGalleryOpenGrid;