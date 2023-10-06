import { Component } from "react";
 import { ToastContainer} from 'react-toastify';
import { SearchBar } from "./SearchBar/searchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";


export class App extends Component {
  state = {
    searchInput: ""
  }

  onSubmitHandle = searchInputValue => {
    this.setState({searchInput: searchInputValue})
  }
  
  
  render() {
    return (
      <>
      <SearchBar onSubmit = {this.onSubmitHandle} />
        <ImageGallery searchInput={this.state.searchInput} />  
        <ToastContainer/>

      </>
    );
  }
}



