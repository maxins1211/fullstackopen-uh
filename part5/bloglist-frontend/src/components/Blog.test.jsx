import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders only title and author', () => {
  const blog = {
    title: 'not a real title',
    url: 'not a real url',
    author: 'not a real author',
    likes: 6,
    user: { name: 'Lam' },
  }
  const currentUser = {
    name: 'Lam',
  }
  const { container } = render(<Blog blog={blog} currentUser={currentUser} />)
  screen.debug()
  const element = container.querySelector('.blog-header')
  expect(element).toHaveTextContent('not a real title not a real author view')
  const body = container.querySelector('.blog-body')
  expect(body).not.toHaveStyle('display: block')
})
