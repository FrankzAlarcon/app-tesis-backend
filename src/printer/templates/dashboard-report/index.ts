import { StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection } from "../global/sections/header";
import * as Utils from '../global/helpers/chart-utils'

const styles: StyleDictionary = {
  content: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
  }
}

interface DashboardReportData {
  tipoInstitucionReceptora: {
      publica: {
          type: string;
          value: number;
      };
      privada: {
          type: string;
          value: number;
      };
      organismoInternacional: {
          type: string;
          value: number;
      };
      tercerSector: {
          type: string;
          value: number;
      };
      otras: {
          type: string;
          value: number;
      };
  }
  top5Subjects: {
    [key: string]: {
        name: string;
        value: number;
    }
  };
  tipoPractica: {
    laboral: {
      type: string;
      value: number;
    },
    servicioComunitario: {
      type: string;
      value: number;
    },
  }
}



const generatetipoInstitucionReceptoraChart = (data: any) => {
  const chartData = {
    labels: Object.values(data).map((item: any) => item.type),
    datasets: [{
      label: 'Tipos de instituciones receptoras',
      data: Object.values(data).map((item: any) => item.value),
    }]
  }
  const config = {
    type: 'doughnut',
    data: chartData,
    options: {
      legend: {
        position: 'left',
      },
      // title: {
      //   text: 'Tipos de instituciones receptoras',
      //   display: true,
      // },
      plugins: {
        datalabels: {
          color: 'white',
          font: {
            weight: 'bold'
          }
        },
        // title: {
        //   display: true,
        // }
      }
    },
  };
  return Utils.chartJsToImage(config)
}

const generateTipoPracticaChart = (data: any) => {
  const chartData = {
    labels: Object.values(data).map((item: any) => item.type),
    datasets: [{
      label: 'Tipos de prácticas',
      data: Object.values(data).map((item: any) => item.value),
    }]
  }
  const config = {
    type: 'doughnut',
    data: chartData,
    options: {
      legend: {
        position: 'left',
      },
      title: {
        text: 'Tipos de prácticas preprofesionales',
      },
      plugins: {
        datalabels: {
          color: 'white',
        },
      }
    },
  };
  return Utils.chartJsToImage(config)
}

const generateTop5SubjectsChart = (data: any) => {
  const chartData = {
    labels: Object.values(data).map((item: any) => item.name),
    datasets: [
      {
        label: 'Materias más aplicadas',
        data: Object.values(data).map((item: any) => item.value),
        borderColor: Utils.NAMED_COLORS.blue,
        // backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false,
      }
    ]
  };
  const config = {
    type: 'bar',
    data: chartData,
  };
  return Utils.chartJsToImage(config)
}

export const getDashboardReportTemplate = async (data: DashboardReportData): Promise<TDocumentDefinitions> => {
  const { tipoInstitucionReceptora, tipoPractica, top5Subjects } = data
  const tipoInstitucionReceptoraChart = await generatetipoInstitucionReceptoraChart(tipoInstitucionReceptora)
  const tipoPracticaChart = await generateTipoPracticaChart(tipoPractica)
  const top5SubjectsChart = await generateTop5SubjectsChart(top5Subjects)
  console.log(tipoInstitucionReceptoraChart.slice(0, 100))
  const docDefinition: TDocumentDefinitions = {
    styles,
    header: headerSection({
      showLogo: true,
      title: 'ESCUELA POLITÉCNICA NACIONAL',
      subtitle: 'FACULTAD DE INGENIERÍA DE SISTEMAS',
      formType: 'Reporte del dashboard'
    }),
    pageMargins: [40, 80, 40, 40],
    content: [{
      columns: [
        {
          stack: [
            {
              text: 'Tipos de instituciones receptoras',
              alignment: 'center',
              margin: [0, 0, 0, 10],
            },
            {
              image: tipoInstitucionReceptoraChart,
              width: 300,
            }
          ]
        },
        {
          width: 'auto',
          layout: 'lightHorizontalLines',
          margin: [20, 20, 0, 0],
          table: {
            headerRows: 1,
            widths: [150, 'auto'],
            body: [
              ['Tipo de institución', 'Cantidad'],
              ['Pública', tipoInstitucionReceptora.publica.value],
              ['Privada', tipoInstitucionReceptora.privada.value],
              ['Organismo internacional', tipoInstitucionReceptora.organismoInternacional.value],
              ['Tercer sector', tipoInstitucionReceptora.tercerSector.value],
              ['Otras', tipoInstitucionReceptora.otras.value],
            ]
          }
        },
      ]
    }, {
      columns: [
        {
          stack: [
            {
              text: 'Top 5 de materias más aplicadas en las prácticas preprofesionales',
              alignment: 'center',
              margin: [0, 20, 0, 10],
            },
            {
              alignment: 'center',
              image: top5SubjectsChart,
              width: 300,
            }
          ]
        }
      ]
    }, {
      columns: [
        {
          stack: [
            {
              text: 'Tipo de prácticas preprofesionales',
              alignment: 'center',
              margin: [0, 20, 0, 10],
            },
            {
              alignment: 'center',
              image: tipoPracticaChart,
              width: 300,
            }
          ]
        }
      ]
    }]
  }
  return docDefinition
}