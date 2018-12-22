import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blogs from './components/BlogItem'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe.only('<App />', () => {
    let app
    beforeAll(() => {
      
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }
      
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      app = mount(<App />)
    })
  
    it('renders all blogs it gets from backend', () => {
      app.update()
      const blogComponents = app.find(Blogs)
      //expect(blogComponents.length).toEqual(blogService.blogs.length)
      console.log('App.test_1: ' , blogService.blogs.length)
      console.log('App.test_2: ' , blogComponents.length)
    
      expect(blogService.blogs.length).toEqual(blogComponents.length)
    })
  })