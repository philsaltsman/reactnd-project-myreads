import React, { Component } from 'react'

class BookAuthors extends Component {
  render() {
    const { book } = this.props

    var returnAuthors=''
    //console.log(book.authors)
    if (book.authors === undefined) {
      //console.log('authors is undefined')
    } else {
      if (Array.isArray(book.authors)) {
        //console.log('authors is an array')
        returnAuthors = book.authors.map(auth => {
          var unique = ( (book.id.toString()) + auth.replace(/\s/g,'') )
         
          return(<p key={unique}>{auth}</p>)
        })
      } else {
        //console.log('Not an array')
        var unique = ( (book.id.toString()) + book.authors.replace(/\s/g,'') )
        returnAuthors = '<p key='+unique+'>'+book.authors+'</p>'
        
        }

      }

      return (
        <div>
    	{returnAuthors}
        </div>
    )
    
    
    
  }
  


}

export default BookAuthors