import { StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection } from "../global/sections/header";
import { getFormTitleSection } from "../global/sections/form-title";
import { getBusinessDataSection } from "./sections/business-data";
import { getCareerModalitySection } from "./sections/carrer-modality";
import { getStudentDataSection } from "./sections/student-data";
import { getStudentConsentmentSection } from "./sections/student-consentment";
import { getPracticesInformation } from "./sections/practices-information";
import { getScheduleSection } from "./sections/shedule";
import { getActivitiesInfoSection } from "./sections/activities-info";
import { getCualitativeEvaluation } from "./sections/cualitative-evaluation";
import { getSignaturesSection } from "./sections/signatures";
import { FormContentDto } from "@/forms/dtos/form-content.dto";
// import { getSignaturesSection } from "./sections/signatures";

const styles: StyleDictionary = {
  content: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
  }
}

const validateHour = (hour: string) => {
  return hour === "" ? "hh:mm" : hour
} 

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ES-es',{
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const getObservacionesText = (
  diasNoTrabajados: { id: string, date: string }[],
  observacionesAdicionales: string
) => {
  if (!Array.isArray(diasNoTrabajados)) {
    return observacionesAdicionales
  }
  
  if (diasNoTrabajados.length === 0) {
    return observacionesAdicionales
  }
  let diasNoTrabajadosText = 'No trabajó los días:<br/>'
  diasNoTrabajados.forEach((item) => {
    const date = new Date(item.date).toLocaleDateString('ES-es',{
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
    diasNoTrabajadosText += `${date}<br/>`
  })
  return `${observacionesAdicionales}<br/>${diasNoTrabajadosText}`
}

export const getFormFa119Template = (data: FormContentDto): TDocumentDefinitions => {
  const { career, modality } = data
  const businessData = data.businessData
  const { nombres, cedula, creditos } = data.studentData
  const internshipData = data.internshipData
  const subjectsData = data.subjectsData
  const scheduleData = data.scheduleData
  const activitiesData = data.activitiesData
  const signatureData = data.signatureData

  const docDefinion: TDocumentDefinitions = {
    styles,
    header: headerSection({
      showLogo: true,
      title: 'ESCUELA POLITÉCNICA NACIONAL',
      subtitle: 'FACULTAD DE INGENIERÍA DE SISTEMAS',
      formType: 'FORMULARIO: F_AA_119\nVERSIÓN: 4'
    }),
    pageMargins: [40, 80, 40, 40],
    content: [
      getCareerModalitySection({ career, modality }),
      getFormTitleSection({
        title: 'INFORME DE PRÁCTICAS PREPROFESIONALES',
        subtitle: '(PRÁCTICAS LABORALES O SERVICIO COMUNITARIO)'
      }),
      getBusinessDataSection(businessData),
      getStudentDataSection({ nombres, cedula, creditos }),
      getStudentConsentmentSection({ name: nombres, dni: cedula }),
      getPracticesInformation({
        ...internshipData,
        convenioSi: internshipData.relacionConConvenio.value ? 'X' : '',
        convenioNo: internshipData.relacionConConvenio.value ? '' : 'X',
        convenioCodigo: internshipData.relacionConConvenio.codigo,
        convenioTitulo: internshipData.relacionConConvenio.titulo,
        investigacionSi: internshipData.relacionConInvestigacion.value ? 'X' : '',
        investigacionNo: internshipData.relacionConInvestigacion.value ? '' : 'X',
        investigacionCodigo: internshipData.relacionConInvestigacion.codigo,
        investigacionTitulo: internshipData.relacionConInvestigacion.titulo,
        vinculacionSi: internshipData.relacionConVinculacion.value ? 'X' : '',
        vinculacionNo: internshipData.relacionConVinculacion.value ? '' : 'X',
        vinculacionCodigo: internshipData.relacionConVinculacion.codigo,
        vinculacionTitulo: internshipData.relacionConVinculacion.titulo,
        subjects: subjectsData.subjects,
        additionalSubjects: subjectsData.additionalSubjects
      }),
      getScheduleSection({
        areaAsignada: scheduleData.areaAsignada,
        fechaInicio: formatDate(scheduleData.horarioSemanal.inicio),
        fechaFin: formatDate(scheduleData.horarioSemanal.fin),
        lunesInicio: validateHour(scheduleData.horarioSemanal.lunes.inicio),
        lunesFin: validateHour(scheduleData.horarioSemanal.lunes.fin),
        martesInicio: validateHour(scheduleData.horarioSemanal.martes.inicio),
        martesFin: validateHour(scheduleData.horarioSemanal.martes.fin),
        miercolesInicio: validateHour(scheduleData.horarioSemanal.miercoles.inicio),
        miercolesFin: validateHour(scheduleData.horarioSemanal.miercoles.fin),
        juevesInicio: validateHour(scheduleData.horarioSemanal.jueves.inicio),
        juevesFin: validateHour(scheduleData.horarioSemanal.jueves.fin),
        viernesInicio: validateHour(scheduleData.horarioSemanal.viernes.inicio),
        viernesFin: validateHour(scheduleData.horarioSemanal.viernes.fin),
        sabadoInicio: validateHour(scheduleData.horarioSemanal.sabado.inicio),
        sabadoFin: validateHour(scheduleData.horarioSemanal.sabado.fin),
        domingoInicio: validateHour(scheduleData.horarioSemanal.domingo.inicio),
        domingoFin: validateHour(scheduleData.horarioSemanal.domingo.fin),
        almuerzoInicio: validateHour(scheduleData.horarioSemanal.horaAlmuerzo.inicio),
        almuerzoFin: validateHour(scheduleData.horarioSemanal.horaAlmuerzo.fin),
        totalSemanal: scheduleData.horarioSemanal.total,
        totalPasantia: scheduleData.horasTotales,
        observaciones: getObservacionesText(scheduleData.fechasDiasNoTrabajados, scheduleData.observacionesAdicionales),
        pasantiasPagadasSi: scheduleData.pasantiasPagadas.value ? 'X' : '',
        pasantiasPagadasNo: scheduleData.pasantiasPagadas.value ? '' : 'X',
        pasantiasPagadasMonto: scheduleData.pasantiasPagadas.amount ? `$${scheduleData.pasantiasPagadas.amount}` : '',
      }),
      getActivitiesInfoSection({
        actividadesDesarrolladas: activitiesData.actividadesDesarrolladas,
        habilidadesAdquiridas: activitiesData.habilidadesAdquiridas,
        observacionesGenerales: activitiesData.observacionesGenerales,
        seguimientoAcademicoSi: activitiesData.seguimientoAcademico === 'si' ? 'X' : '',
        seguimientoAcademicoNo: activitiesData.seguimientoAcademico === 'no' ? 'X' : '',
      }),
      getCualitativeEvaluation({
        asistenciaExcelente: activitiesData.evaluacionCualitativa.asistencia === 'excelente' ? 'X' : '',
        asistenciaMuyBuena: activitiesData.evaluacionCualitativa.asistencia === 'muy-buena' ? 'X' : '',
        asistenciaSatisfactoria: activitiesData.evaluacionCualitativa.asistencia === 'satisfactoria' ? 'X' : '',
        asistenciaDeficiente: activitiesData.evaluacionCualitativa.asistencia === 'deficiente' ? 'X' : '',
        desempenoExcelente: activitiesData.evaluacionCualitativa.desempeno === 'excelente' ? 'X' : '',
        desempenoMuyBuena: activitiesData.evaluacionCualitativa.desempeno === 'muy-buena' ? 'X' : '',
        desempenoSatisfactoria: activitiesData.evaluacionCualitativa.desempeno === 'satisfactorio' ? 'X' : '',
        desempenoDeficiente: activitiesData.evaluacionCualitativa.desempeno === 'deficiente' ? 'X' : '',
        motivacionExcelente: activitiesData.evaluacionCualitativa.motivacion === 'excelente' ? 'X' : '',
        motivacionMuyBuena: activitiesData.evaluacionCualitativa.motivacion === 'muy-buena' ? 'X' : '',
        motivacionSatisfactoria: activitiesData.evaluacionCualitativa.motivacion === 'satisfactoria' ? 'X' : '',
        motivacionDeficiente: activitiesData.evaluacionCualitativa.motivacion === 'deficiente' ? 'X' : '',
        conocimientosExcelente: activitiesData.evaluacionCualitativa.conocimientos === 'excelente' ? 'X' : '',
        conocimientosMuyBuena: activitiesData.evaluacionCualitativa.conocimientos === 'muy-buena' ? 'X' : '',
        conocimientosSatisfactoria: activitiesData.evaluacionCualitativa.conocimientos === 'satisfactorio' ? 'X' : '',
        conocimientosDeficiente: activitiesData.evaluacionCualitativa.conocimientos === 'deficiente' ? 'X' : '',
      }),
      getSignaturesSection({
        ciTutor: signatureData.ciTutor,
        nombreTutor: signatureData.nombreTutor,
        ciResponsableEntidad: signatureData.ciResponsableEntidad,
        nombreResponsableEntidad: signatureData.nombreResponsableEntidad,
        ciDecano: signatureData.ciDecano,
        nombreDecano: signatureData.nombreDecano,
        ciPresidenteComision: signatureData.ciPresidenteComision,
        nombrePresidenteComision: signatureData.nombrePresidenteComision
      })
    ]
  }
  return docDefinion
}