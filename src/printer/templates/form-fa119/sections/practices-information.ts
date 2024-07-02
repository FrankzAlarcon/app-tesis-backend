import { Content } from "pdfmake/interfaces";
import { ContentReplacer, getHtmlContent } from "../../global/helpers/get-html-content";
import { getFile } from "../../global/helpers/get-file";

export const getPracticesInformation = (replacers: ContentReplacer = {}): Content => {
  const html = getFile('informacion-practicas.html')
  const content = getHtmlContent(html, replacers)
  return content
}