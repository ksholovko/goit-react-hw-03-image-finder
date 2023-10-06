import { Component } from "react";
import axios from "axios";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGalleryItem from "./ImageGalleryItem";
import Button from "components/Button/Button";
import css from "./imageGallery.module.css";
import Loader from "components/Loader/Loader";
export class ImageGallery extends Component {

  state = {
    pictures: [],
    page: 1,
    status: '',
    totalHits: ''
  }
  
  componentDidUpdate(prevProps, prevState) {
      
    if (prevProps.searchInput !== this.props.searchInput) {
      this.setState({ page: 1, pictures: [], status: "pending" });
      this.fetchPictures();
    }
    // else if (prevState.page !== this.state.page) {
    //   this.fetchPictures();
    // }
  }
 
    
  fetchPictures = () => {
    
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = "39538496-5692811f32f5eeb2890664c8c";

    setTimeout(() => {
      axios.get(`${BASE_URL}?`, {
        params: {
          key: KEY,
          q: this.props.searchInput,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: 'true',
          per_page: 12,
          page: this.state.page,
        },
      }).then(result => {
        this.setState({ pictures: [...this.state.pictures, ...result.data.hits], status: 'ready', totalHits: result.data.totalHits })
      
    //     if (Math.ceil(this.state.totalHits / 12) === this.state.page) {
    //     toast.warn("You've reached the end of the search resul",
    //     {
    //       position: "top-right",
    //       autoClose: 3000,
    //       hideProgressBar: true,
    //       theme: "dark",
    //       });
    // }

      }).catch(error => {
        console.log(error);
        toast.warn('Something went wrong. Try reloading the page.',
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            theme: "dark",
          }); this.setState({ status: "" })
      });
    }, 2000);
  }

  
  loadMoreImages = () => {
    let newPage = this.state.page + 1;

    this.setState({ page: newPage, status: "loading more" });

   this.fetchPictures();

  }
    

  render() {

    const { status } = this.state;

    if (status === "pending") {
      return <Loader />;
    }

    if (status === "ready") {
      return (
        <>
          <ul className={css.ImageGallery}>
            {this.state.pictures.map((picture) => (
              <ImageGalleryItem
                key={picture.id}
                smallImage={picture.webformatURL}
                largeImage={picture.largeImageURL}
              />
            ))}
          </ul>

          {this.state.pictures.length !== 0 &&
            Math.ceil(this.state.totalHits / 12) !== this.state.page && (
              <Button onClick={this.loadMoreImages} />
            )}

          {this.state.pictures.length === 0 && (
            <p className={css.errorMessage}>
              Sorry, we couldn't find any pictures for this search.
            </p>
          )}
        </>
      );
    }

 if (status === "loading more") {
    return (
      <>
        <ul className={css.ImageGallery}>
          {this.state.pictures.map(picture => (
            <ImageGalleryItem
              key={picture.id}
              smallImage={picture.webformatURL}
              largeImage={picture.largeImageURL}
            />
          ))}
        </ul>

        <Loader />
      </>
    );
  }



  }
}