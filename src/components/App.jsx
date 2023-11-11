import { Component } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
import { SearchBar } from "./SearchBar/searchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";


export class App extends Component {
  
  state = {
    searchInput: "",
    pictures: [],
    page: 1,
    status: '',
    totalHits: '',
  }

  onSubmitHandle = searchInputValue => {
    this.setState({searchInput: searchInputValue})
  }
  
  componentDidUpdate(prevProps, prevState) {
      
    if (prevState.searchInput !== this.state.searchInput) {
      this.setState({ page: 1, pictures: [], status: "pending" });
      this.fetchPictures();
    }

    if (prevState.page !== this.state.page) {
      this.fetchPictures();
    }

  }
 
    
  fetchPictures = () => {
    
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = "39538496-5692811f32f5eeb2890664c8c";

   
      axios.get(`${BASE_URL}?`, {
        params: {
          key: KEY,
          q: this.state.searchInput,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: 'true',
          per_page: 12,
          page: this.state.page,
        },
      }).then(result => {
        this.setState({ pictures: [...this.state.pictures, ...result.data.hits], status: 'ready', totalHits: result.data.totalHits })
  
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
    
  }

  
  loadMoreImages = () => {

    let newPage = this.state.page + 1;
    this.setState({ page: newPage, status: "loading more" });

  }


  render() {
    return (
      <>
      <SearchBar onSubmit = {this.onSubmitHandle} />
        <ImageGallery searchInput={this.state.searchInput} status={this.state.status} pictures={this.state.pictures}
          totalHits={this.state.totalHits} page={this.state.page} loadMoreImages = {this.loadMoreImages} />  
        <ToastContainer/>

      </>
    );
  }
}



