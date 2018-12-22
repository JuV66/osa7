import React from 'react'

class TogglableBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      blog : props.blog
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }
   render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    console.log('this.props.title: ', this.props.title)
    //console.log("togglableBlog_1: [" +this.state.visible + "]")
    //console.log("togglableBlog_2: [" +this.props.label + "]")
    return (
      <div className="wrapper">
        <div className="onClick" id="onClick" style={this.props.blogStyle}   onClick={this.toggleVisibility}> 
          {this.state.blog.title}, {this.state.blog.author}
          <div  style={hideWhenVisible} >
          </div>

          <div className="togglableContent" style={showWhenVisible} >
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default TogglableBlog

/*
    return (
      <div classname="wrapper">
        <div  style={hideWhenVisible} >
          <div style={this.props.blogStyle}   onClick={this.toggleVisibility}>  
          </div>
        </div>
        <div   style={showWhenVisible} >
          <div style={this.props.blogStyle} onClick={this.toggleVisibility}> {this.props.title} 
          </div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
*/