import { unlink } from 'fs'
// This is to cleanup after rollup CSS generation
const filePath = '../css/rollup-dummy.js'
unlink(filePath, (err) => {
  if (err) {
    console.error(`Error removing file: ${err}`)
    return
  }
  console.log(`File ${filePath} has been successfully removed.`)
})