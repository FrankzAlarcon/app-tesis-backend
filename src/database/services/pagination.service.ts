import { PaginationQueryDto } from '@/global/dtos/pagination-query.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  async paginate(
    entity: any,
    params: PaginationQueryDto,
    where?: any,
    findParams: any = {}
  ) {
    let total: number = 0;
    if (params.filterField && params.filterValue) {
      where = {
        ...where,
        [params.filterField]: {
          contains: params.filterValue,
          mode: 'insensitive'
        }
      }
      total = await entity.count({
        where
      })
    } else {
      total = await entity.count({
        where
      })
    }

    if (params.orderField && params.orderDirection) {
      findParams.orderBy = {
        [params.orderField]: params.orderDirection
      }
    } else {
      findParams.orderBy = {
        createdAt: 'desc'
      }
    }

    const data = await entity.findMany({
      where,
      skip: params.offset,
      take: params.limit,
      ...findParams
    })

    let totalPages = 1

    if (params.limit) {
      totalPages = Math.ceil(total / params.limit)
    }

    // console.log('[pagination service] data', data)

    return {
      total,
      totalPages,
      data
    }
  }

  async paginateGroupBy(
    entity: any,
    groupBy: any,
    params: PaginationQueryDto,
    where?: any,
  ) {
    let total: number = 0;
    if (params.filterField && params.filterValue) {
      total = await entity.count({
        where: {
          ...where,
          [params.filterField]: params.filterValue
        }
      })
    } else {
      total = await entity.count({
        where
      })
    }

    const data = await entity.groupBy({
      ...groupBy,
      skip: params.offset,
      take: params.limit,
    })

    let totalPages = 1
    total = data.length
    if (params.limit) {
      totalPages = Math.ceil(total / params.limit)
    }

    // console.log('[pagination service] data', data)

    return {
      total,
      totalPages,
      data
    }
  }
}
