import React from 'react'
import Home from '../components/App/Home.jsx'
import renderer from 'react-test-renderer'

test('Test Home', () => {
  const component = renderer.create( <Home />,)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
