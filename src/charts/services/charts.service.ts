import { PrismaService } from '@/database/services/prisma.service';
import { PrinterService } from '@/printer/services/printer.service';
import { getDashboardReportTemplate } from '@/printer/templates/dashboard-report';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChartsService {

  constructor(
    private readonly printerService: PrinterService,
    private readonly prismaService: PrismaService
  ) {}

  async getDashboardData() {
    const formContents = await this.prismaService.formContent.findMany({
      select: {
        subjectsData: true,
        internshipData: true,
        businessData: true,
      }
    })

    // count tipoInstitucionReceptora
    const countTipoInstitucionReceptoraOptions = {
      publica: {
        type: 'Pública',
        value: 0
      },
      privada: {
        type: 'Privada',
        value: 0
      },
      organismoInternacional: {
        type: 'Organismo Internacional',
        value: 0
      },
      tercerSector: {
        type: 'Tercer Sector',
        value: 0
      },
      otras: {
        type: 'Otras',
        value: 0
      }
    }

    const businessData = formContents.map((content) => content.businessData)
    businessData.forEach((data: any) => {
      countTipoInstitucionReceptoraOptions[data.tipoInstitucion].value++
    })

    const subjectsData = formContents.map((content) => (content.subjectsData as any).subjects)
    const subjectIds = subjectsData.flat().map((subject: any) => subject)
    const uniqueSubjectIds = [...new Set(subjectIds)]
    
    const countSubjects = uniqueSubjectIds.map((subjectId) => {
      return {
        subjectId,
        count: subjectIds.filter((id) => id === subjectId).length
      }
    }).sort((a, b) => b.count - a.count)

    const top5Subjects = countSubjects.slice(0, 5)
    const top5SubjectsData = await this.prismaService.subject.findMany({
      where: {
        id: {
          in: top5Subjects.map((subject) => subject.subjectId)
        }
      },
      select: {
        id: true,
        name: true
      }
    })

    const top5SubjectsDataMap = top5SubjectsData.reduce((acc, subject) => {
      acc[subject.id] = {
        name: subject.name,
        value: top5Subjects.find((topSubject) => topSubject.subjectId === subject.id).count
      }
      return acc
    }, {})
    
    const tipoPracticas = formContents.map((content) => (content.internshipData as any).tipoPractica)
    const countTipoPracticasOptions = {
      laboral: {
        type: 'Laboral',
        value: tipoPracticas.filter((tipo) => tipo === 'laboral').length
      },
      servicioComunitario: {
        type: 'Servicio Comunitario',
        value: tipoPracticas.filter((tipo) => tipo === 'servicioComunitario').length
      },
    }
    const chartsData = {
      tipoInstitucionReceptora: countTipoInstitucionReceptoraOptions,
      top5Subjects: top5SubjectsDataMap,
      tipoPractica: countTipoPracticasOptions
    }

    return chartsData
  }

  async downloadReport() {
    const data = await this.getDashboardData()

    const docDefinion = await getDashboardReportTemplate(data)
    const doc = this.printerService.createDashboardReportPdf(docDefinion)
    return doc
  }
}
