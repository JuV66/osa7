import React from 'react'

const BlogItem = ({blog ,handleAddLikes, handleRemoveLikes, loggedUser}) => {
  console.log("BlogItem: ") 
  console.log("blog: " , blog)
  console.log("loggedUser: ", loggedUser)
  let visible

  console.log("loggedUser: ",loggedUser)
  //console.log("blogUser: ",blog.users.username)
  
  if (loggedUser._id  === blog.id)
    visible = { display: '' }  
  else
    visible = { display: 'none' }
  return(
  <div>
      <a href={blog.url}> {blog.url}</a><br/>
      {blog.likes} likes <button name = {blog.id} onClick={handleAddLikes}>likes</button> <br/>
      added by {loggedUser.name}<br/>
      <div style={visible}>
        <button name = {blog.id} onClick={handleRemoveLikes}>Remove</button>
      </div>
  </div>  
  )
}

export default BlogItem