import { isNumeric } from './numberUtil'

describe('isNumeric', () => {
  it('should return true for a number in string', () => {
    const number = '12'
    expect(isNumeric(number)).toBe(true)
  })
  it('should return false a string containing no numbers', () => {
    const number = 'some characters'
    expect(isNumeric(number)).toBe(false)
  })
  it('should return false a string containing numbers along with characters', () => {
    const number = 'some characters 123 '
    expect(isNumeric(number)).toBe(false)
  })
})
