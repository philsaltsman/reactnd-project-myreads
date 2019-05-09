import React, { Component } from 'react'

class BookCover extends Component {
  render() {
    const { style } = this.props
    return (<div className="book-cover" style={style}></div>)
  }
}

export default BookCover