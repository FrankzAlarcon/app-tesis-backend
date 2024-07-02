import { IsValidJSON } from "@/global/decorators/is-valid-json.decorator";
import { IsNotEmpty, IsNotEmptyObject, IsString } from "class-validator";

export class FormContentDto {
    @IsString()
    @IsNotEmpty()
    career: string;

    @IsString()
    @IsNotEmpty()
    modality: string;

    @IsNotEmpty()
    @IsNotEmptyObject()
    @IsValidJSON(
      ['razonSocial', 'ciudad', 'direccion', 'telefono', 'celular', 'tipoInstitucion', 'responsable'],
      { message: 'The form content must contain the required properties: razonSocial, ciudad, direccion, telefono, celular, tipoInstitucion, responsable' }
    )
    businessData: Record<string, any>;

    @IsNotEmpty()
    @IsNotEmptyObject()
    @IsValidJSON(
      ['cedula', 'nombres', 'creditos'],
      { message: 'The form content must contain the required properties: cedula, nombres, creditos' }
    )
    studentData: Record<string, any>;

    @IsNotEmpty()
    @IsNotEmptyObject()
    @IsValidJSON(
      ['tipoPractica', 'campoAmplio', 'campoEspecifico', 'tutorEpn', 'relacionConConvenio', 'relacionConInvestigacion', 'relacionConVinculacion'],
      { message: 'The form content must contain the required properties: tipoPractica, campoAmplio, campoEspecifico, tutorEPN, relacionConConvenio, relacionConInvestigacion, relacionConVinculacion' }
    )
    internshipData: Record<string, any>;

    @IsNotEmpty()
    @IsNotEmptyObject()
    @IsValidJSON(
      ['subjects', 'additionalSubjects'],
      { message: 'The form content must contain the required properties: subjects, additionalSubjects' }
    )
    subjectsData: Record<string, any>;

    @IsNotEmpty()
    @IsNotEmptyObject()
    @IsValidJSON(
      [
        'areaAsignada','horarioSemanal', 'incluirDiasNoTrabajados', 'incluirHorasAlmuerzo',
        'pasantiasPagadas', 'fechasDiasNoTrabajados', 'observacionesAdicionales', 'horasTotales',
      ],
      { message: 'The form content must contain the required properties: areaAsignada, horarioSemanal, pasantiasPagadas, fechasNoTrabajadas, observacionesAdicionales, horasTotales' }
    )
    scheduleData: Record<string, any>;

    @IsNotEmpty()
    @IsNotEmptyObject()
    @IsValidJSON(
      ['actividadesDesarrolladas', 'habilidadesAdquiridas', 'seguimientoTutorAcademico', 'observacionesGenerales', 'evaluacionCualitativa'],
      { message: 'The form content must contain the required properties: actividadesDesarrolladas, habilidadesAdquiridas, seguimientoTutorAcademico, observacionesGenerales, evaluacionCualitativa' }
    )
    activitiesData: Record<string, any>;


    @IsNotEmpty()
    @IsNotEmptyObject()
    @IsValidJSON(
      ['tutor', 'entidadReceptora', 'comisionPracticas', 'decano'],
      { message: 'The form content must contain the required properties: tutor, entidadReceptora, comisionPracticas, decano' }
    )
    signatureData: Record<string, any>;
}