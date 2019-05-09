import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'



class ListBooksHeader extends Component {
  render() {
    return (
      <div className="list-books-title">
        <h1>MyReads</h1>            
      </div>
    )
  }
}

class SearchButton extends Component {
  render() {
    return (
      <Link
      to='/search'
      className='open-search'
      >
      <button>Add a book</button>
      </Link>
    )
  }
}







class ListBooks extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
        books: { books: props },
        value: '',
    };
    }
        

    updateSelect = (value,book) => {
        if (this.props.onUpdateSelect) {
            this.props.onUpdateSelect(value,book)
        }
    }



  render() {

    //verify props.books
  if (this.props.books) {

    var booksCurrentlyReading = this.props.books.filter(bookCurRead => {
      return (bookCurRead.shelf === 'currentlyReading');
    })
    var booksWantToRead = this.props.books.filter(bookWantRead => {
      return (bookWantRead.shelf === 'wantToRead');
    })
    var booksRead = this.props.books.filter(bookRead => {
      return (bookRead.shelf === 'read');
    })



    return (
      <div>


        <ListBooksHeader />
        
        <div className="list-books-content">

            <Book 
              name='Currently Reading'
              books={booksCurrentlyReading} 
              onUpdateSelect={(value,book) => {
                this.updateSelect(value,book)
              }}
            />

            <Book 
              name='Want to Read'
              books={booksWantToRead} 
              onUpdateSelect={(value,book) => {
                this.updateSelect(value,book)
              }}
            />

            <Book 
              name='Read'
              books={booksRead} 
              onUpdateSelect={(value,book) => {
                this.updateSelect(value,book)
              }}
            />

        
        </div>

        <SearchButton />
      

      </div>
    )
    
    
  }

    return (null)
  }
}

export default ListBooks