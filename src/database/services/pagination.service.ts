import { PaginationQueryDto } from '@/global/dtos/pagination-query.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  async paginate(
    entity: any,
    params: PaginationQueryDto
  ) {
    let total: number = 0;
    if (params.filterField && params.filterValue) {
      total = await entity.count({
        where: {
          [params.filterField]: params.filterValue
        }
      })
    } else {
      total = await entity.count()
    }

    const data = await entity.findMany({
      skip: params.offset,
      take: params.limit
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
}
