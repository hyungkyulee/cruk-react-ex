import { render, screen } from '@testing-library/react'
import App from '../App'

test('keywords field test', () => {
  render(<App />)
  const linkElement = screen.getByText(/Keywords/i)
  expect(linkElement).toBeInTheDocument();
})

test('media type field test', () => {
  render(<App />)
  const linkElement = screen.getByText(/Media type/i)
  expect(linkElement).toBeInTheDocument();
})

test('year start field test', () => {
  render(<App />)
  const linkElement = screen.getByText(/Year start/i)
  expect(linkElement).toBeInTheDocument();
})

test('submit button test', () => {
  render(<App />)
  const linkElement = screen.getByText(/Submit/i)
  expect(linkElement).toBeInTheDocument()
})
