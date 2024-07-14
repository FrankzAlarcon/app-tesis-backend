import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from '@/global/dtos/pagination-query.dto';

@Injectable()
export class PublicationsRepositoryService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  async getRecommendations(studentId: string, params: PaginationQueryDto) {
    const studentSkills = await this.prismaService.projectSkill.findMany({
      where: {
        project: {
          studentId
        }
      },
      select: {
        skillId: true
      }
    })

    const studentSkillIds = studentSkills.map(skill => skill.skillId);

    if (studentSkillIds.length === 0) {
      return {
        total: 0,
        totalPages: 1,
        data: []
      };
    }

    const total = await this.prismaService.publication.count();
    let totalPages = 1
    if (params.limit) {
      totalPages = Math.ceil(total / params.limit);
    }

    let limit = 10
    let offset = 0

    if (params.limit !== undefined && params.offset !== undefined) {
      limit = params.limit
      offset = params.offset
    }

    const recommendations = await this.prismaService.$queryRaw`
      SELECT
        p.id,
        p.title,
        p.description,
        p.modality,
        p."entry_time",
        p."departure_time",
        p.benefits,
        p.requirements,
        p."imageUrl",
        p.remuneration,
        p."is_available",
        p."business_id",
        p."created_at",
        p."updated_at",
        b.id as "businessId",
        b.name as "businessName",
        b."image_url" as "businessImageUrl",
      COUNT(ps.skill_id) as "matchCount",
        (SELECT COUNT(*) FROM "publication_skills" WHERE "publication_id" = p.id) as "totalSkillsCount",
        COUNT(ps.skill_id)::decimal / NULLIF((SELECT COUNT(*) FROM "publication_skills" WHERE "publication_id" = p.id), 0) as "matchScore"
      FROM
        "publications" p
      LEFT JOIN
        "publication_skills" ps ON p.id = ps."publication_id" AND ps."skill_id" IN (${Prisma.join(studentSkillIds)})
      LEFT JOIN
        "businesses" b ON p."business_id" = b.id
      GROUP BY
        p.id, b.id
      ORDER BY
        "matchScore" DESC, "matchCount" desc 
      LIMIT ${limit} OFFSET ${offset}
    `;
    const mappedData = (recommendations as any).map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        description: rec.description,
        modality: rec.modality,
        entryTime: rec.entry_time,
        departureTime: rec.departure_time,
        benefits: rec.benefits,
        requirements: rec.requirements,
        imageUrl: rec.imageUrl,
        remuneration: rec.remuneration ? rec.remuneration.toString() : null,
        isAvailable: rec.is_available,
        createdAt: rec.created_at,
        updatedAt: rec.updated_at,
        matchScore: rec.matchScore ? Number(rec.matchScore.toString()) : null,
        matchCount: rec.matchCount ? Number(rec.matchCount.toString()) : null,
        totalSkillsCount: rec.totalSkillsCount ? Number(rec.totalSkillsCount.toString()) : null,
        business: {
          id: rec.businessId,
          name: rec.businessName,
          imageUrl: rec.businessImageUrl
        }
    }})

    return {
      total,
      totalPages,
      data: mappedData
    };
  }
}
