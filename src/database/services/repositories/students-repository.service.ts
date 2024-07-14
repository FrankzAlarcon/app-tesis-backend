import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StudentsRepositoryService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  async getRecommendationsCount(publicationId: string) {
    const publicationSkills = await this.prismaService.publicationSkill.findMany({
      where: {
        publicationId
      },
      select: {
        skillId: true
      }
    })

    const publicationSkillIds = publicationSkills.map(skill => skill.skillId);

    if (publicationSkillIds.length === 0) {
      return 0
    }

    const recommendations = await this.prismaService.$queryRaw`
      SELECT COUNT(*)
      FROM (
        SELECT
          s.id
        FROM
          students s
        LEFT JOIN
          users u ON s.user_id = u.id
        LEFT JOIN
          project_skills ps ON ps.project_id IN (SELECT id FROM projects WHERE student_id = s.id) AND ps.skill_id IN (SELECT skill_id FROM publication_skills WHERE publication_id = ${publicationId})
        GROUP BY
          s.id, u.id
        HAVING
          COUNT(ps.skill_id)::decimal / NULLIF((SELECT COUNT(*) FROM publication_skills WHERE publication_id = ${publicationId}), 0) > 0
      ) AS subquery;
    `

    return Number(recommendations[0].count.toString())
  }
  async getRecommendations(publicationId: string, limit: number = 5) {
    const publicationSkills = await this.prismaService.publicationSkill.findMany({
      where: {
        publicationId
      },
      select: {
        skillId: true
      }
    })

    const publicationSkillIds = publicationSkills.map(skill => skill.skillId);

    if (publicationSkillIds.length === 0) {
      return []
    }

    const recommendations = await this.prismaService.$queryRaw`
      SELECT
        s.id,
        s.short_presentation,
        s.image_url,
        s.created_at,
        u.email,
        u.name as "name",
        COUNT(DISTINCT ps.skill_id) as "matchCount",
        (SELECT COUNT(DISTINCT skill_id) FROM project_skills WHERE project_id IN (SELECT id FROM projects WHERE student_id = s.id)) as "totalStudentSkills",
        COUNT(DISTINCT ps.skill_id)::decimal / NULLIF((SELECT COUNT(*) FROM publication_skills WHERE publication_id = ${publicationId}), 0) as "matchScore"
      FROM
        students s
      LEFT JOIN
        users u ON s.user_id = u.id
      LEFT JOIN
        project_skills ps ON ps.project_id IN (SELECT id FROM projects WHERE student_id = s.id) AND ps.skill_id IN (SELECT skill_id FROM publication_skills WHERE publication_id = ${publicationId})
      GROUP BY
        s.id, u.id
      HAVING
      COUNT(ps.skill_id)::decimal / NULLIF((SELECT COUNT(*) FROM publication_skills WHERE publication_id = ${publicationId}), 0) > 0
      ORDER BY
        "matchScore" DESC, "matchCount" DESC
      LIMIT ${limit}
    `
    const mappedData = (recommendations as any[]).map((recommendation) => {
      return {
        id: recommendation.id,
        name: recommendation.name,
        email: recommendation.email,
        shortPresentation: recommendation.short_presentation,
        imageUrl: recommendation.image_url,
        createdAt: recommendation.created_at,
        matchCount: recommendation.matchCount ? Number(recommendation.matchCount.toString()) : null,
        totalStudentSkills: recommendation.totalStudentSkills ? Number(recommendation.totalStudentSkills.toString()) : null,
        matchScore: recommendation.matchScore ? Number(recommendation.matchScore.toString()) : null
      }
    })
    return mappedData
  }
}
