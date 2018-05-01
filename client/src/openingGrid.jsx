import React from 'react';
import ReactDOM from 'react-dom';
import Lightbox from 'react-image-lightbox'
import $ from 'jquery';
import {Button, Icon, Modal} from 'react-materialize';


class OpeningPageGalleryView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = "openGrid">
   
        <div className = "horizontalGrid">   
          <img src = {this.props.images[0]} className= "bigThumbnail" onClick = {()=>this.props.clickHandle(0)}></img>
        </div>
        <div className= "verticalGrid"> 
          <div className = "verticalCol"> 
           <img src = {this.props.images[1]} className= "smallThumbnail" onClick = {()=>this.props.clickHandle(1)}></img>
          </div> 
          <div className = "verticalCol"> 
           <img src = {this.props.images[2]} className= "smallThumbnail" onClick = {()=>this.props.clickHandle(2)}></img>
          </div>  
        </div>  
        <div className = "horizontalGrid">
          <img src = {this.props.images[3]} className= "bigThumbnail" onClick = {()=>this.props.clickHandle(3)}></img>
        </div> 

        <div className= "verticalGrid">  
          <div className = "verticalCol"> 
            <img src = {this.props.images[4]} className= "smallThumbnail" onClick = {()=>this.props.clickHandle(4)}></img>
          </div>  
          <div className = "verticalCol"> 
            <img src = {this.props.images[5]} className= "smallThumbnail" onClick = {()=>this.props.clickHandle(5)}></img>
          </div>  
        </div> 
        <div className = "horizontalGrid">
          <img src = {this.props.images[6]} className= "bigThumbnail" onClick = {()=>this.props.clickHandle(6)}></img>
        </div> 
          <NumBox imageslength = {this.props.images.length} clickView = {this.props.clickView}/>

      </div>
    )
  }
}   


class NumBox extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return(
      <div height = "40px" width = "123px" className = "numBox" onClick = {this.props.clickView} ><span className = "widthNumBox">{this.props.imageslength + "  PHOTOS"}<span className = "plus">+</span></span></div>
    )
  }
}
export default OpeningPageGalleryView;