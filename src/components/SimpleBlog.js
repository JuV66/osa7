import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className="wrapper">
    <div className="title">
      {blog.title}, 2{blog.author}
    </div>
    <div className="likes">
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>

    </div>
  </div>
)

export default SimpleBlog