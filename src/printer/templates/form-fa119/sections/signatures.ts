import { Content } from "pdfmake/interfaces"

interface SignatureSection {
  nombreTutor: string
  ciTutor: string
  nombreResponsableEntidad: string
  ciResponsableEntidad: string
  nombrePresidenteComision: string
  ciPresidenteComision: string
  nombreDecano: string
  ciDecano: string
}

export const getSignaturesSection = (data: SignatureSection): Content => {
  return {
    table: {
      headerRows: 1,
      widths: ['*', '*'],
      body: [
        [{ text: '8. FIRMAS DE RESPONSABILIDAD', fillColor: '#d9e1f2', border: [true, true, false, true] }, { text: '', fillColor: '#d9e1f2', border: [false, true, true, true] }],
        [
          {
            layout: 'noBorders',
            table: {
              widths: ['auto', '*'],
              body: [
                [{ text: 'TUTOR ACADÉMICO DE PRÁCTICAS EPN', bold: true, colSpan: 2, alignment: 'center', fontSize: 10 }, {}],
                [{ text: 'Fecha de revisión: ', fontSize: 10 }, { text: '', fontSize: 10 }],
                [{ text: 'f.__________________________', fontSize: 10, colSpan: 2, alignment: 'center', marginTop: 30 }, {}],
                [{ text: 'Tutor', fontSize: 10, colSpan: 2, alignment: 'center' }, {}],
                [{ text: 'Nombre: ', fontSize: 10 }, { text: data.nombreTutor, fontSize: 10 }],
                [{ text: 'CI: ', fontSize: 10 }, { text: data.ciTutor, fontSize: 10 }],
              ]
            }
          },
          {
            layout: 'noBorders',
            table: {
              widths: ['auto', '*'],
              body: [
                [{ text: 'ENTIDAD RECEPTORA', bold: true, colSpan: 2, alignment: 'center', fontSize: 10 }, {}],
                [{ text: 'Fecha de revisión: ', fontSize: 10 }, { text: '', fontSize: 10 }],
                [{ text: 'f.__________________________', fontSize: 10, colSpan: 2, alignment: 'center', marginTop: 30 }, {}],
                [{ text: 'Tutor', fontSize: 10, colSpan: 2, alignment: 'center' }, {}],
                [{ text: 'Nombre: ', fontSize: 10 }, { text: data.nombreResponsableEntidad, fontSize: 10 }],
                [{ text: 'CI: ', fontSize: 10 }, { text: data.ciResponsableEntidad, fontSize: 10 }],
              ]
            }
          }
        ],
        [
          {
            layout: 'noBorders',
            table: {
              widths: ['auto', '*'],
              body: [
                [{ text: 'COMISIÓN DE PRÁCTICAS PREPROFESIONALES', bold: true, colSpan: 2, alignment: 'center', fontSize: 10 }, {}],
                [{ text: 'Fecha de revisión: ', fontSize: 10 }, { text: '', fontSize: 10 }],
                [{ text: 'f.__________________________', fontSize: 10, colSpan: 2, alignment: 'center', marginTop: 70 }, {}],
                [{ text: 'Presidente de la Comisión de Prácticas Preprofesionales', fontSize: 10, colSpan: 2, alignment: 'center' }, {}],
                [{ text: 'Nombre: ', fontSize: 10 }, { text: 'MSc. Luz Marina Vintimilla', fontSize: 10 }],
                [{ text: 'CI: ', fontSize: 10 }, { text: '1706496419', fontSize: 10 }],
              ]
            }
          },
          {
            layout: 'noBorders',
            table: {
              widths: ['auto', '*'],
              body: [
                [{ text: 'DECANO(A) DE LA FACULTAD/DIRECTOR(A) DE LA ESFOT', bold: true, colSpan: 2, alignment: 'center', fontSize: 10 }, {}],
                [{ text: 'Fecha de Entrega: ', fontSize: 10 }, { text: '', fontSize: 10 }],
                [{ text: 'Fecha de Aprobación: ', fontSize: 10 }, { text: '', fontSize: 10 }],
                [{ text: 'Fecha de Registro en SAEw: ', fontSize: 10 }, { text: '', fontSize: 10 }],
                [{ text: 'f.__________________________', fontSize: 10, colSpan: 2, alignment: 'center', marginTop: 30 }, {}],
                [{ text: 'Máxima Autoridad', fontSize: 10, colSpan: 2, alignment: 'center' }, {}],
                [{ text: 'Nombre: ', fontSize: 10, marginTop: 10 }, { text: 'Dr. José Lucio', fontSize: 10, marginTop: 10 }],
                [{ text: 'CI: ', fontSize: 10 }, { text: '1707211742', fontSize: 10 }],
              ]
            }
          }
        ]
      ]
    }
  }
}