import { registerAs } from '@nestjs/config'

export default registerAs('config', () => ({
  aws: {
    region: process.env.AWS_REGION,
    pendingBucket: process.env.AWS_PENDING_BUCKET,
    approvedBucket: process.env.AWS_APPROVED_BUCKET,
    cvBucket: process.env.AWS_CV_BUCKET,
    imageProfileBucket: process.env.AWS_IMAGE_PROFILE_BUCKET,
    publicationImageBucket: process.env.AWS_PUBLICATION_IMAGE_BUCKET
  },
  jwt: {
    secret: process.env.JWT_SECRET
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  frontend: {
    url: process.env.BASE_FRONTEND_URL
  }
}))
