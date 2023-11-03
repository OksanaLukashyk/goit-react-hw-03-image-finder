import React, { Component } from 'react'
// import { nanoid } from 'nanoid';
import { Notify } from 'notiflix'
import css from './Searchbar.module.css';

// export const Searchbar = ({onSubmit}) => {
//     return (
//     <header className={css.searchbar}>
//     <form className={css.form} onSubmit={onSubmit}>
//     <button type="submit" className={css.button}>
//       <span className={css.buttonLabel}>Search</span>
//     </button>

//     <input
//       className={css.input}
//       type="text"
//       autoComplete="off"
//       autoFocus
//       placeholder="Search images and photos"
//       name="searchQuery"
//     />
//     </form>
//     </header>
//     );
// };

export class Searchbar extends Component {
  state = {
    searchQuery: "",
  }


  handlerChange =(evt) => {

    this.setState({ searchQuery: evt.target.value})
  }

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.state.searchQuery.trim()===""){
    Notify.failure("Please enter your search query")
    } 
    this.props.onSubmit(this.state.searchQuery);
      this.setState({ inputValue: ""})
  }
  
  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchQuery"
            value={this.state.searchQuery}
            onChange={this.handleChange}
            required
          />
        </form>
      </header>
    );
  };
}