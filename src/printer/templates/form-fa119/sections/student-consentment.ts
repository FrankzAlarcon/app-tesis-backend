import { Content } from "pdfmake/interfaces"
import { getFile } from "../../global/helpers/get-file"
import { getHtmlContent } from "../../global/helpers/get-html-content"

interface StudentConsentmentOptions {
  name: string
  dni: string
}

export const getStudentConsentmentSection = ({
  name,
  dni
}: StudentConsentmentOptions): Content => {
  const html = getFile('consentimiento-estudiante.html')
  const content = getHtmlContent(html, { name, dni })
  return content
}