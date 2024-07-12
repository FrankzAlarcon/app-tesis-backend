export enum StudentFormStatus {
  EMITIDO = 'EMITIDO',
  PENDIENTE = 'PENDIENTE',
  APROBADO = 'APROBADO',
  RECHAZADO = 'RECHAZADO'
}

export enum StudentFormBucket {
  EMITTED = 'emitted',
  PENDING = 'pending',
  APPROVED = 'approved',
  REPPROVED = 'repproved'
}

export const statusToBucket = {
  [StudentFormStatus.EMITIDO]: StudentFormBucket.EMITTED,
  [StudentFormStatus.PENDIENTE]: StudentFormBucket.PENDING,
  [StudentFormStatus.APROBADO]: StudentFormBucket.APPROVED,
  [StudentFormStatus.RECHAZADO]: StudentFormBucket.REPPROVED
}