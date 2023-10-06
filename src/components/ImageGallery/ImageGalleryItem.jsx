import { Component } from "react";
import css from "./imageGalleryItem.module.css"
import Modal from "components/Modal/Modal";


export default class ImageGalleryItem extends Component {

  state = {
  showModal: false
}


    toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal}))
  }

  render() {
  
    const { showModal } = this.state;

    return (
    <>
    <li className={css.ImageGalleryItem}>
            <img src={this.props.smallImage} onClick={this.toggleModal} alt="" className={css.ImageGalleryItemImage} />
          </li>
     
        {showModal && <Modal onClick={this.toggleModal} image={this.props.largeImage} /> }
       </>
    )

  }

}


