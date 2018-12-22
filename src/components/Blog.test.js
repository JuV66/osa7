import React from 'react'
import { shallow, mount } from 'enzyme'
import BlogItem from './BlogItem'
import TogglableBlog from  './TogglableBlog'

describe.skip('<TogglableBlog />', () => {
  let togglableBlogComponent
  const mockHandler = jest.fn()
  const likesHandler = jest.fn()
  const removeHandler = jest.fn()

  let blog = {
      "url" : "url",
      "uthor" : "author",
      "id" : 123456789,
      "users" : {
          "username" : "mluukkai"
      } 
  }
  let likes = 2

  beforeEach(() => {
    togglableBlogComponent = mount( //shallow(
      <TogglableBlog blog onClick={mockHandler} >
        <BlogItem
          blog = {blog}
          user = "blog name"
          likes = {likes}
          loggedUser = "mluukkai"
          handleAddLikes ={likesHandler}
          handleRemoveLikes = {removeHandler}
        />  
        <div className="testDiv" />
      </TogglableBlog>
    )
    //console.log(togglableBlogComponent.debug())
  })
/*
  it('renders its children', () => {
    expect(togglableBlogComponent.contains(<div className="testDiv" />)).toEqual(true)
  })
*/
  it('after clicking the button, children are displayed', () => {
    
    const nameDiv = togglableBlogComponent.find('#onClick').first()
    console.log(togglableBlogComponent.debug())
    nameDiv.simulate('click')
    console.log(togglableBlogComponent.debug())
    
    //const button = togglableBlogComponent.find('.onClick')

    console.log('nameDiv: ',nameDiv.text())
    console.log('togglableBlogComponent: ' , togglableBlogComponent)
    //console.log('button: ',button.at(0).text())

    nameDiv.simulate('click')
    const div = togglableBlogComponent.find('.togglableContent')
    //expect(div.getElement().props.style).toEqual({ display: '' })
  })
/*
  it('renders title', () => {
    const sBlog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'koe',
      likes: 2,
    }

    console.log('sBlog: ',sBlog)


    const sBlogComponent = shallow(<SimpleBlog blog={sBlog} />)
    const contentDiv = sBlogComponent.find('.title')
    console.log(sBlogComponent.debug())

    console.log('contentDiv: ', contentDiv.text())
   
    expect(contentDiv.text()).toContain(sBlog.title) //--> OK
    //expect(contentDiv.text()).toEqual(sBlog.title) //--> NOK
  })

  it('clicking the button calls event handler once', () => {
    
    const sBlog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'koe',
      likes: 2,
    }

  const mockHandler = jest.fn()
  
  const sBlogComponent = shallow( 
      <SimpleBlog 
        blog={sBlog} 
        onClick={mockHandler}
      />
    )
  
    console.log(sBlogComponent.debug())

    const button = sBlogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
  
    //expect(mockHandler.mock.calls.length).toBe(1) // --> NOK
    expect(mockHandler.mock.calls.length).toBe(2) // --> OK
  }) 
*/
})

