import { Content } from "pdfmake/interfaces"
import { ContentReplacer, getHtmlContent } from "../../global/helpers/get-html-content"
import { getFile } from "../../global/helpers/get-file"

export const getScheduleSection = (replacers: ContentReplacer = {}): Content => {
  const html = getFile('horario.html')
  const content = getHtmlContent(html, replacers)
  return content
}