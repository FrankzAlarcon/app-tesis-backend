import htmlToPdfmake from 'html-to-pdfmake'
import { JSDOM } from 'jsdom'

export interface ContentReplacer {
  [key: string]: string
}

export const getHtmlContent = (html: string, replacers: ContentReplacer = {}) => {
  const { window } = new JSDOM()

  Object.keys(replacers).forEach((key) => {
    const firstKeyPattern = `{{${key}}}`
    const secondKeyPattern = `{{ ${key} }}`
    html = html.replaceAll(firstKeyPattern, replacers[key])
      .replaceAll(secondKeyPattern, replacers[key])
  })

  return htmlToPdfmake(html, {
    window
  })
}