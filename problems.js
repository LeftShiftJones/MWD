/**
 * Updated 'problems.js' file
 * Authored by Ryan Jones - 10/24/2018
 * For COS 243
 * 
 * Descriptions are provided for each regex to demonstrate understanding
 */

module.exports = [
  {
    /**
     * Regex that looks for at least one a to appear.
     */
	re: /a+/,
	targets: [
	  { string: '', expected: false },
	  { string: 'a', expected: true },
	  { string: 'babba', expected: true }
	]
  },
  {
    /**
     * Regex that looks for an empty string
     */
	re: /^$/,
	targets: [
	  { string: 'a', expected: false },
	  { string: '', expected: true },
	  { string: 'babba', expected: false }
	]
  },
  { 
    /**
     * Regex that looks for three characters (could also use ^.{3}$, but this took less characters)
     */
    re: /^...$/,
	targets: [
	  { string: '', expected: false },
	  { string: 'ab', expected: false },
	  { string: 'abcd', expected: false },
	  { string: 'abc', expected: true },
	  { string: 'bcd', expected: true },
	  { string: '$#@', expected: true },
	]
  },
  {
    /**
     * Regex that looks for the string 'abc' (or at least to start with 'abc')
     */
	re: /^abc$/,
	targets: [
	  { string: '', expected: false },
	  { string: 'abc', expected: true },
	  { string: 'babc', expected: false }
	]
  },
  {
    /**
     * regex that looks for 'xy', any number of 'z's, and and a 'y'
     */
	re: /xyz*y/,
	targets: [
	  { string: 'abcxyzzy', expected: true },
	  { string: 'abcxyzz', expected: false },
	  { string: 'xyzy', expected: true },
	  { string: 'xyzzzzzzy', expected: true },
	]
  },
  {
    /**
     * Regex that looks for a string that starts with a phone number (can have words/characters after)
     * (Fun Fact: the //commented out regex also works)
     */
    //re: /d*[-d]*[-d]*-d*/,
    re: /^(\d-)?(\d{3}-)+(\d{4})/,
	targets: [
	  { string: '555-1212', expected: true },
	  { string: '1-800-555-1234', expected: true },
	  { string: '1-800-555-4321 ext. 42', expected: true },
	  { string: 'babc', expected: false }
	]
  },
  {
    /**
     * Regex that looks only for a phone number
     */
	re: /^(\d-)?(\d{3}-)+(\d{4})$/,
	targets: [
	  { string: '555-1212', expected: true },
	  { string: '1-800-555-1212', expected: true },
	  { string: '1-800-555-1212 ext. 42', expected: false },
	  { string: 'babc', expected: false }
	]
  },
  {
    /**
     * Regex that looks for a date in the format '(d)d-Mmm-yyyy'
     */
	re: /^\d{1,2}-[A-Z][a-z][a-z]-\d{4}/,
	targets: [
	  { string: '4-Jul-1776', expected: true },
	  { string: '25-Dec-1961', expected: true },
	  { string: '25-dec-1961', expected: false },
	  { string: '4-July-1776', expected: false },
	  { string: '4-Jul-76', expected: false },
	]
  },
  {
    /**
     * Regex that looks for 'abcdef' with 1 a, 1 or 4 b's, 0 or more c's, a 'd', 0 or more e's, and an 'f'
     */
	re: /a(b)?(b{4})?c*de*f/,
	targets: [
	  { string: 'abcdef', expected: true },
	  { string: 'abcdeeef', expected: true },
	  { string: 'bcdef', expected: false },
	  { string: 'abdf', expected: true },
	  { string: 'abcdf', expected: true },
	  { string: 'abbbccdeef', expected: false },
	  { string: 'abcde', expected: false },
	  { string: 'abbbbcdeeeefg', expected: true },
	  { string: 'wxabbbbcdeeeefyz', expected: true }
	]
  },
  {
    /**
     * Regex that looks for a hot color and then a cool color (roy[space]gbv)
     */
	re: /^[roy].* [gbv].*$/,
	targets: [
	  { string: 'red blue', expected: true },
	  { string: 'orange blue', expected: true },
	  { string: 'red     green', expected: true },
	  { string: 'yellow green', expected: true },
	  { string: 'yellow    violet', expected: true },
	  { string: 'red red', expected: false },
	  { string: 'green red', expected: false },
	  { string: 'redviolet', expected: false },
	  { string: 'blue red', expected: false },
	  { string: 'blue', expected: false }
	]
  }
];
