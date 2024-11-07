import pkg from './package.json'
import { main } from './js/main'

// Output version from package json to console
// to assist with trouble shooting.
console.log(`Running ${pkg.name} version ${pkg.version}`)

// Call main function
main()
