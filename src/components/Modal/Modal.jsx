import { Component } from "react";
import { createPortal } from "react-dom";
import css from "./modal.module.css"


const modalRoot = document.querySelector("#modal-root")

export default class Modal extends Component {



  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

    handleKeyDown = e => {
      if (e.code === 'Escape') {
      this.props.onClick();
    }
    };
    
    handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClick();
    }
  };
  

    render() {
        return createPortal(
            <div className={css.Overlay} onClick={this.handleBackdropClick}>
                <div className={css.Modal}>
                    <img src={this.props.image} alt="" onClick={this.props.onClick} />
                </div>
            </div>, modalRoot)
    }
    
    
}