/**
 * @jest-environment jsdom
 */

import React from 'react'
// Using render and screen from test-utils.js instead of
// @testing-library/react
import { render, screen } from '@testing-library/react'
import HomePage from 'pages/index'

describe('HomePage', () => {
  it('should render the heading', () => {
    render(<HomePage />)

    const heading = screen.getByText(/Created/i)

    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(heading).toBeInTheDocument()
  })
})
