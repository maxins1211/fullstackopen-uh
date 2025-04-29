import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { beforeEach, describe } from 'vitest'

describe('<Blog />', () => {
  let container
  beforeEach(() => {
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
    container = render(<Blog blog={blog} currentUser={currentUser} />).container
  })

  test('initially renders only title and author', () => {
    const element = container.querySelector('.blog-header')
    expect(element).toHaveTextContent('not a real title not a real author view')
    const body = container.querySelector('.blog-body')
    expect(body).toHaveStyle('display: none')
  })

  test('after clicking the view button, the blog detail is displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const body = container.querySelector('.blog-body')
    expect(body).not.toHaveStyle('display: none')
  })
})
