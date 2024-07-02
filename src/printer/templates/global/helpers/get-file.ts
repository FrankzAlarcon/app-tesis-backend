import fs from 'fs'
import path from "path";

export const getFile = (filename: string) => {
  try {
    const html = fs.readFileSync(path.join('src/printer/templates/form-fa119/html', filename), 'utf8')
    return html
  } catch (error) {
    console.error(error)
    return ''
  }

}