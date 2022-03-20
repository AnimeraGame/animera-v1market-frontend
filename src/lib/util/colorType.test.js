import { lightOrDarkColor } from './colorType'

describe('lightOrDarkColor', () => {
  it('it returns light or dark output based on the provided color', () => {
    expect(lightOrDarkColor('#fff')).toBe('light')
  })
})

describe('lightOrDarkColor', () => {
  it('it returns light or dark output based on the provided color', () => {
    expect(lightOrDarkColor('#f7f7f7')).toBe('light')
  })
})

describe('lightOrDarkColor', () => {
  it('it returns light or dark output based on the provided color', () => {
    expect(lightOrDarkColor('#283B3F')).toBe('dark')
  })
})

describe('lightOrDarkColor', () => {
  it('it returns light or dark output based on the provided color', () => {
    expect(lightOrDarkColor('#000')).toBe('dark')
  })
})
