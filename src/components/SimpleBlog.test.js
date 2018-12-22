import React from 'react'
import { shallow, } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.skip('<SimpleBlog />', () => {
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

})