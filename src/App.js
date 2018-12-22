import React from 'react'
import BlogItem from './components/BlogItem'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import TogglableBlog from './components/TogglableBlog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      title: '',
      author: '',
      url: '',
      showAll: true,
      note: null,
      username: '',
      password: '',
      user: null,
      filter:''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('componentDidMoun/user: ', user)
      console.log('componentDidMoun/user.user: ', user.user)
      const userWithOutToken = user.user
      this.setState({userWithOutToken})
      blogService.setToken(user.token)
    }
  } 

  /*
    title: blog.title,
    author : blog.author,
    url : blog.url,
    likes : blog.likes,
    id: blog._id,
    users : blog.users
  }
  */
  addBlog = async (event) =>{
    event.preventDefault()
    try{
      const blogObject = {
        title: this.state.title,
        author : this.state.author,
        url : this.state.url,
        likes : 1,
      }
      this.blogForm.toggleVisibility()

      const newBlog = await blogService.create(blogObject)
      
      this.setState({
            title: '',
            author : '',
            url : '',
          })
      
      blogService.getAll().then(blogs =>
        this.setState({ blogs })
      )
      //this.state.blogs.map(p => console.log(p))    
      //console.log("app.js blog: " + this.state.blogs )
      this.setState({ note : "uusi blog talletettu onnistuneesti" })
      setTimeout(() => {
        this.setState({note: null})
      }, 5000)
      
    }  catch(exception){
      this.setState({
        note: 'jotain meni pieleen',
      })    
    }
  }

  handleAddLikes = async (event) => {
    //console.log ("handleAddLikes")
    //event.map(e => console.log(e))
    event.preventDefault()
    const addLikesToTheBlog = event.target.name
    console.log("addLikesToTheBlog: " +addLikesToTheBlog)

    const likesBlogs = this.state.blogs.find(blog => blog.id === addLikesToTheBlog)
    
    //this.state.blogs.map(b => console.log(b))
    console.log("Blogs: ",this.state.blogs )
    //console.log("likesBlogs_1")
    //likesBlogs.map(b => console.log(b))
    console.log("likesBlogs: " ,likesBlogs)
    
    try{
      const likesblogObject = {
        author : likesBlogs.author,
        likes : likesBlogs.likes + 1,
        title: likesBlogs.title,
        url : likesBlogs.url,
        user : likesBlogs.users
        
      }

      console.log("likesblogObject: " ,likesblogObject)
      
      const updateBlog = await blogService.update(addLikesToTheBlog, likesblogObject)

      console.log("updateBlog: ", updateBlog)

      blogService.getAll().then(blogs =>
        this.setState({ blogs })
      )
      this.setState({ note : "uusi blog talletettu onnistuneesti" })
      setTimeout(() => {
        this.setState({note: null})
      }, 5000)
    
    }  catch(exception){
      this.setState({
        note: 'handleAddLikes: jotain meni pieleen',
      })    
    }


  }

  handleRemoveLikes = async (event) => {
    console.log ("handleRemoveLikes")
    event.preventDefault()
    
    try{
      const removeTheBlog = event.target.name

      const removedBlog = this.state.blogs.find(blog => blog.id === removeTheBlog)
      if (window.confirm('delete ' + removedBlog.title + ' ' + removedBlog.author)) { 
      
        const removeBlog = await blogService.remove(removeTheBlog)
      
        console.log("removeBlog",removeBlog)
        blogService.getAll().then(blogs =>
        this.setState({ blogs })
        )
        this.setState({ note : "uusi blog talletettu onnistuneesti" })
        setTimeout(() => {
          this.setState({note: null})
        }, 5000)
      }
    }catch(exception){
      this.setState({
          note: 'handleRemoveLikes: jotain meni pieleen',
      })    
    }
  }

  toggleImportanceOf = (id) => {
    //...
  }

  handleBlogChange = (event) => {
    //this.setState({newBlog: event.target.value})

    this.setState({ [event.target.name]: event.target.value })
  }

  handleLoginFieldChange = (event) => {
    /*
    if (event.target.name === 'password') {
      this.setState({ password: event.target.value })
    } else if (event.target.name === 'username') {
      this.setState({ username: event.target.value })
    }
    */

   this.setState({ [event.target.name]: event.target.value })
  }
  handleFilterChange = (event) => {
    console.log(event.target.value)
    this.setState({ filter: event.target.value })
  }

  handleBlogVisible(event) {
    console.log('handleBlogChange ')
    this.setState({ visible: !this.state.visible })
  }

  toggleVisible = () => {
    this.setState({showAll: !this.state.showAll})
  }
/*
  handleAddLikes = () => {
    console.log (handleAddLikes)
  }
*/
  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      console.log('login/user: ', user)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        note: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  loginOut = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    this.setState({user: null})
  }

  render() {
    //...
    const blogStyle = {
      paddingTop : 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const loginForm = () => {

      return(
      <Togglable buttonLabel="login">
        <LoginForm
          visible={this.state.visible}
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleLoginFieldChange}
          handleSubmit={this.login}
        />
      </Togglable>
    )}

    const blogForm = () => (
      <Togglable buttonLabel="new Blog" ref={component => this.blogForm = component}>
        <BlogForm
          visible={this.state.visible}
          title={this.state.title}
          author={this.state.author}
          url = {this.state.url}
          handleBlogChange={this.handleBlogChange}
          handleSubmit={this.addBlog}
        />
      </Togglable>
    )

    const showBlog = (blog) => 
    {
      console.log("showBlog")
      console.log('blog :', blog)
      console.log('T.S: ',this.state)

      return (
  
        <div>
        <TogglableBlog blog = {blog} blogStyle={blogStyle} ref={component => this.blogItem = component}>
        <BlogItem
          blog = {blog}
          //user = {blog.users.name}
          likes = {blog.likes}
          loggedUser = {this.state.user.user}
          handleAddLikes ={this.handleAddLikes}
          handleRemoveLikes = {this.handleRemoveLikes}
        />
        </TogglableBlog>
        </div>
            
      
      )
    }

    const loginOutForm = () => (
        <form onSubmit={this.loginOut}>
          <div>
           <button type="submit">logout</button>
          </div>
        </form>
    )  
    
    const filteredShow = 
        this.state.blogs.filter(blog =>  !blog.title.toUpperCase().indexOf(this.state.filter.toUpperCase() ))
    
        //console.log ('filteredShow :', filteredShow )
    return (

      <div>   
        <h1>BLOGS</h1>

        <Notification message={this.state.note} />

        {this.state.user === null ?
          loginForm() :
          <div>
            <table><tbody>
            <tr>
            <td> {this.state.user.name} logged in </td><td> {loginOutForm()} </td>
            </tr>
            </tbody></table>

            {blogForm()}     
          
            <h2>blogs</h2>
              <div>
              rajaa naytettavia: <input 
                value={this.state.filter}
                onChange={this.handleFilterChange}
              />
              </div>
              <div>
                {filteredShow.map(blog => 
                  <ul key={blog.id}>
                    {showBlog(blog)}
                  </ul>
                )}
              </div>
          </div>
        }
        
      </div>
    );
  }
}

export default App;
