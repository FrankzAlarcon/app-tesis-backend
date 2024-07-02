import { Content } from "pdfmake/interfaces";

const logo: Content = {
  image: 'src/global/assets/epn-logo.png',
  width: 100,
  height: 60,
  margin: [10, 10], // [left, top, right, bottom]
}

interface HeaderOptions {
  title?: string;
  subtitle?: string;
  formType?: string;
  showLogo?: boolean;
}

export const headerSection = (options: HeaderOptions): Content => {
  const headerLogo = options.showLogo ? logo : null

  const headerSubtitle: Content = options.subtitle ? {
    text: options.subtitle,
    alignment: 'center',
    margin: [0, 5, 0, 0],
    style: {
      bold: true,
      fontSize: 10
    }
  } : null

  const headerTitle: Content = options.title ? {
    stack: [
      {
        text: options.title,
        margin: [0, 25, 0, 0],
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
  } : null


  const headerFormType: Content = options.formType ? {
    text: options.formType,
    alignment: 'left',
    style: {
      fontSize: 10,
    },
    margin: [0, 30, 0, 0],
    width: 130
  } : null

  return {
    columns: [
      headerLogo,
      headerTitle,
      headerFormType
    ]
  }
}