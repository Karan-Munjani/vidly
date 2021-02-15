// import React, { Component } from 'react';
import "./like.css";

// class Like extends Component {
//     state = {}
//     render() {
//         let classes = "fa fa-heart";
//         if (!this.props.liked) {
//             classes += "-o";
//         }
//         return (
//             <i onClick={this.props.onClick} className={classes}></i>
//         );
//     }
// }

const Like = (props) => {
  let classes = "fa fa-heart";
  if (!props.liked) {
    classes += "-o";
  }
  return <i onClick={props.onClick} className={classes}></i>;
};

export default Like;

// export default Like;
