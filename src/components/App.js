import React, { Component } from 'react'
import * as BooksAPI from '../utils/BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import '../assets/App.css'
import { Route } from 'react-router-dom'

class Social extends Component {
  render() {
    var style={
      position:'relative',
      padding:'0px',
      margin:'0px',
      fontSize: '12pt',
      top: '-9px',
      right:'2px',
    };
    return (
      <div className='socialtext' >
      <a style={style} href="http://philsaltsman.com">philsaltsman</a>
        <a href="https://github.com/philsaltsman">
          <img height="25px" width="auto" src="https://cdn.afterdawn.fi/v3/news/original/github-logo.png" alt="link to github/philsaltsman" />
        </a>
        
      </div> 
    )
  }
}


class App extends Component {
  state = {
    books: [],
    showSearchPage: false,
    value: '',
    query: '',
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  updateBooksAPI = (book,value,newBooks) => {
    BooksAPI.update(book,value)
      .then((book) => {
        this.setState({
          books: newBooks
      })
    })
  }

  updateSelect = (value,book) => {
    const newBooks = this.state.books.map((newbook) => {
      if (newbook.id === book.id) {
        newbook.shelf = value
      }
      return (newbook)
    })
    this.updateBooksAPI(book,value,newBooks)
  }

  addFromSearch = (value,book) => {
    //check for existence of book in state, if doesn't exist add it
    var checkBook=this.state.books.filter(check => {
     return (check.id === book.id)
    })

    var newAdd=this.state.books
    if (checkBook.length > 0) {
      //already exists
    } else {
      //add the book to the books state
      newAdd=this.state.books.concat(book)
    }
   
    //check for the book and update its state
    var newBooks = newAdd.map((newbook) => {
      if (newbook.id === book.id) {
        newbook.shelf = value
      }
      return (newbook)
    });
    this.updateBooksAPI(book,value,newBooks)

  }

  rememberQuery = (query) => {
    this.setState({
      query: query,
    })
  }

  clearRemQuery = () => {
    this.setState({
      query: '',
    })
  }



  render() {
    
    return (  

        <div className="app">

        
        
        <Route exact path='/' render={() => (
            <ListBooks 
              books={this.state.books}
              onUpdateSelect={(value,book) => {
                this.updateSelect(value,book)
              }}  
            />
        )} />
        <Route path='/search' render={({ history }) => (
            <SearchBooks 
              appBooks={this.state.books}
              appQuery={this.state.query}
              rememberQuery={(query) => {
                this.rememberQuery(query)
              }}
              clearRemQuery={() => {
                this.rememberQuery()
              }}
              onAddFromSearch={(value,book) => {
                this.addFromSearch(value,book)
              }}
            />
        )} />


        <Social />

        </div>

      



    )


    
  }
}

export default App
