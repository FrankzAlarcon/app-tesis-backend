import { registerAs } from '@nestjs/config'

export default registerAs('config', () => ({
  aws: {
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_BUCKET
  },
  jwt: {
    secret: process.env.JWT_SECRET
  }
}))
