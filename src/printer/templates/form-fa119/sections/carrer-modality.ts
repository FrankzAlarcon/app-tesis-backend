import { Content } from "pdfmake/interfaces";

export const getCareerModalitySection = ({
  career,
  modality
}: {
  career: string;
  modality: string;
}): Content => {
  return {
    layout: 'noBorders',
    table: {
      headerRows: 0,
      widths: ['auto', 'auto'],
      body: [
        [{ text: 'Carrera:', bold: true }, { text: career }],
        [{ text: 'Modalidad:', bold: true }, { text: modality }],
      ]
    }
  }
}