import { Content } from "pdfmake/interfaces"
import { ContentReplacer, getHtmlContent } from "../../global/helpers/get-html-content"
import { getFile } from "../../global/helpers/get-file"

export const getActivitiesInfoSection = (replacers: ContentReplacer = {}): Content => {
  const html = getFile('actividades.html')
  const content = getHtmlContent(html, replacers)
  content[0].marginTop = 60
  return content
}