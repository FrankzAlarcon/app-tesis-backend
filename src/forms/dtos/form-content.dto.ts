import { IsValidJSON } from "@/global/decorators/is-valid-json.decorator";
import { IsNotEmpty, IsNotEmptyObject } from "class-validator";

export class FormContentDto {
    @IsNotEmpty()
    @IsNotEmptyObject()
    @IsValidJSON(
      ['businessName', 'city', 'address', 'phone', 'smartPhone', 'businessType', 'businessResponsible'],
      { message: 'The form content must contain the required properties: businessName, city, address, phone, smartPhone, businessType, businessResponsible' }
    )
    businessData: Record<string, any>;

    @IsNotEmpty()
    @IsNotEmptyObject()
    @IsValidJSON(
      ['dni', 'name', 'aprovedCredits', 'consentment'],
      { message: 'The form content must contain the required properties: dni, name, aprovedCredits, consentment' }
    )
    studentData: Record<string, any>;

    @IsNotEmpty()
    @IsNotEmptyObject()
    @IsValidJSON(
      ['internshipType', 'wideArea', 'specificArea', 'tutorEPN', 'relationWithCovenant', 'relationWithInvestigationProject', 'relationWithVinculationProject'],
      { message: 'The form content must contain the required properties: internshipType, wideArea, specificArea, tutorEPN, relationWithCovenant, relationWithInvestigationProject, relationWithVinculationProject' }
    )
    internshipData: Record<string, any>;

    @IsNotEmpty()
    @IsNotEmptyObject()
    @IsValidJSON(
      ['career', 'subjects', 'additionalSubjects'],
      { message: 'The form content must contain the required properties: career, subjects, additionalSubjects' }
    )
    subjectsData: Record<string, any>;

    @IsNotEmpty()
    @IsNotEmptyObject()
    @IsValidJSON(
      ['startDate', 'endDate', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 
        'lunchTime', 'weeklyHours', 'totalHours', 'notWorkingDays', 'observations', 'totalHours'],
      { message: 'The form content must contain the required properties: startDate, endDate, monday, tuesday, wednesday, thursday, friday, saturday, sunday, lunchTime, weeklyHours, totalHours, notWorkingDays, observations, totalHours' }
    )
    scheduleData: Record<string, any>;

    @IsNotEmpty()
    @IsNotEmptyObject()
    @IsValidJSON(
      ['area', 'wasPaid', 'paymentAmount', 'mainActivities', 'acquiredSkills', 'tutorMonitoring', 'observations', 'qualitativeEvaluation'],
      { message: 'The form content must contain the required properties: area, wasPaid, paymentAmount, mainActivities, acquiredSkills, tutorMonitoring, observations, qualitativeEvaluation' }
    )
    activitiesData: Record<string, any>;


    @IsNotEmpty()
    @IsNotEmptyObject()
    @IsValidJSON(
      ['businessSignature', 'tutorSignature', 'commissionSignature', 'deanSignature'],
      { message: 'The form content must contain the required properties: businessSignature, tutorSignature, commissionSignature, deanSignature' }
    )
    signatureData: Record<string, any>;
}