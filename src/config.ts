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
  }
}))
