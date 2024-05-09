export interface JwtPayload {
  sub: string
  name: string
  email: string
  role: string
  studentId?: string
  businessId?: string
}