import { Component } from "react";
import { FaSearch } from 'react-icons/fa';
import {toast } from 'react-toastify';
import css from "./searchBar.module.css"

export class SearchBar extends Component {

  state = {
    isHovered: false,
    searchInput: ""
  }
  
  handleHover = () => {
    this.setState({
      isHovered: true
    });
  }

   handleInputChange = event => {
    
        const { value } = event.currentTarget;
        this.setState({ searchInput: value.toLowerCase() })
    }

    handleSubmit = event => {
    
      event.preventDefault();
      
      if (this.state.searchInput.trim() === "") {
     toast.warn('Please, enter something.',
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              theme: "dark",
            }); this.setState({ status:""});
        return;
      }
      
        this.props.onSubmit(this.state.searchInput)
        this.resetInput();
    }
  
        resetInput = () => { this.setState({ searchInput: ''}) }
  
    
    
  render() {
    return (
        <div className={css.box} >
        <form name="search-form" onSubmit={this.handleSubmit}>
          <input type="text" name="search" onMouseOver={this.handleHover} onChange={this.handleInputChange}
            value={this.state.searchInput} placeholder="Search images..."
                    className={`${css.input} ${this.state.isHovered ? css.inputHovered : ""}`}/>
        <button onMouseOver={this.handleHover} className={`${css.searchbtn} ${this.state.isHovered ? css.searchbtnHovered : ""}`} type='submit'>
        <FaSearch fill='#ffd52d' /></button>
        </form>
      </div>
    );
  }
}
