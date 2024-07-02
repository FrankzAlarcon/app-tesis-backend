import { Content } from "pdfmake/interfaces"

interface FormTitleOptions {
  title: string
  subtitle?: string
}
export const getFormTitleSection = ({
  title,
  subtitle
}: FormTitleOptions): Content => {
  const headerSubtitle: Content = subtitle ? {
    text: subtitle,
    alignment: 'center',
    margin: [0, 5, 0, 0],
    style: {
      bold: true,
      fontSize: 10
    }
  } : null

  return {
    stack: [
      {
        text: title,
        margin: [0, 10, 0, 0],
        alignment: 'center',
        style: {
          bold: true,
          fontSize: 14
        }
      },
      headerSubtitle
    ],
    style: {
      bold: true,
    }
  }
}