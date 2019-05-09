import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI'
import BookAuthors from './BookAuthors'
import BookCover from './BookCover'



class CloseButton extends Component {
  render() {
    return (
      <Link
      to='/'
      className='close-search'
      >
      Close
      </Link>
    )
  }
}


class SearchBooks extends Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    query: '',
    books: [],
    value: '',
    placehold: 0,
  }

  componentDidMount() {
    //call handleInput without event will set to props pass in
    this.handleInput()    
  }


  //for input handling
  handleInput(event) {

    var inputdata=this.props.appQuery
    if (event === undefined) {
      //do nothing, keep props data
    } else {
      event.preventDefault();
      inputdata = event.target.value;
    }
    
    if (inputdata === '') {
      //blank input
      this.setState({
        books: [],
        query: '',
        placehold: 1,        
      })
      this.props.clearRemQuery()
    } else {
      if ( (inputdata !== undefined)  ) {
        
        BooksAPI.search(inputdata)
        .then((books) => {
          if (Array.isArray(books)) {
            this.setState(() => ({
              books
            }))
            this.setState({
              query: inputdata,
            })
            this.props.rememberQuery(inputdata)
          } else {
            this.setState({
              books: [],
              query: '',
              placehold: 1,
            })
            this.props.clearRemQuery()
          }
          
        })

      }
      


    }

  }

  

  //for book manipulation
  handleChange = (event,book) => {
    event.preventDefault();
    var value=event.target.value
    this.setState(() => ({
      value: value
    }))
    if (this.props.onAddFromSearch) {
      this.props.onAddFromSearch(value,book)
    }
  }


  
  render() {


    //put prev search in the input
    var placeHolder = 'Search by title or author'
    if ( (this.props.appQuery === '') || (this.props.appQuery === undefined) ) {
      //do nothing
    } else {
      //if initial state for placehold found, can place last query here
      if (this.state.placehold === 0) {
        placeHolder=this.props.appQuery
      }
    }

    return (
      <div>
      <div className="search-books">
            <div className="search-books-bar">
              <CloseButton />
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                
                  {/*<input name="input" type="text" onChange={this.handleInput} placeholder="Search by title or author"/>*/}
                  <input name="input" type="text" onChange={this.handleInput} placeholder={placeHolder}  />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">

             
              {this.state.books.map(book => {
                  //inline style for the background cover
                  var bkgstyle = {}
                  if ( (book.imageLinks === undefined) || (book.imageLinks.thumbnail === undefined) ) {
                    bkgstyle = {
                      width: '128px',
                      height: '193px',
                      backgroundPosition: 'center',
                      backgroundImage: `url(https://upload.wikimedia.org/wikipedia/en/f/f9/No-image-available.jpg)`,
                    };
                  } else { 
                    bkgstyle = {
                      width: '128px',
                      height: '193px',
                      backgroundImage: `url(${book.imageLinks.thumbnail.replace('http://','https://')})`,
                    };
                  };
                  var bookshelf = 'none';
                  var checkAppBook = this.props.appBooks.filter(appBook => {
                   return (appBook.id === book.id)
                  })
                  if (checkAppBook.length > 0) {
                    if ( (checkAppBook[0].shelf !== undefined) && (checkAppBook[0].shelf !== '') && (checkAppBook[0].shelf !== 'none') ) {
                      bookshelf = checkAppBook[0].shelf
                    }
                  }
                  return (
                      <li key={book.id}> 
                        <div className="book">
                            <div className="book-top">
                                <a href={book.canonicalVolumeLink} target="_blank" rel="noopener noreferrer">
                                <BookCover style={bkgstyle} />
                                </a>
                                <div className="book-shelf-changer"> 

                                    <select value={bookshelf} onChange={(event) => this.handleChange(event,book)}>
                                        <option value="move" disabled>
                                        Move to...
                                        </option>
                                        <option  
                                        value="currentlyReading"
                                        >
                                        Currently Reading
                                        </option>
                                        <option 
                                        value="wantToRead"
                                        >
                                        Want to Read
                                        </option>
                                        <option 
                                        value="read"
                                        >
                                        Read
                                        </option>
                                        <option 
                                        value="none"
                                        >
                                        None
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">
                            <BookAuthors book={book} />

                            </div>
                        </div>
    
                    </li>
                    )
                }
                

                
              )}
              
              
              </ol>
            </div>
          </div>
          </div>
    )
  }
}

export default SearchBooks