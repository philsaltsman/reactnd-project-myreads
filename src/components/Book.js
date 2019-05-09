import React, {Component} from 'react'
import BookAuthors from './BookAuthors'
import BookCover from './BookCover'

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: { books: props },
            value: '',
        };
        this.handleChange = this.handleChange.bind(this);
      }

    handleChange = (event,book) => {
        event.preventDefault();
        var value=event.target.value
        this.setState(() => ({
          value: value
        }))
        if (this.props.onUpdateSelect) {
          this.props.onUpdateSelect(value,book)
        }
      }

    render() {

        const { books } = this.props

        return (
          <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.name}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">

              {books.map(book => {
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
              if (book.shelf !== undefined) {
                  bookshelf = book.shelf
              };
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
        )

    }


}


export default Book