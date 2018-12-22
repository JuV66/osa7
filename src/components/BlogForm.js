import React from 'react'

const BlogForm = ({handleSubmit,handleBlogChange,title,url,author}) => {
    console.log('BlogForm')
    return (
        <div>
        <h2>Luo uusi blogi</h2>
    
        <form onSubmit={handleSubmit}>
            <div>
            Otsikko
            <input
                type="text"
                name="title"
                value={title}
                onChange={handleBlogChange}
            />
            </div>
            <div>
            laatija
            <input
                type="text"
                name="author"
                value={author}
                onChange={handleBlogChange}
            />
            </div>
            <div>
            osoite
            <input
                type="url"
                name="url"
                value={url}
                onChange={handleBlogChange}
            />
            </div>
            <button type="submit">tallenna</button>
        </form>
        </div>
    )
}

  export default BlogForm