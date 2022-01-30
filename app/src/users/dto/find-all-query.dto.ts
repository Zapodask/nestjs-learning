import { ApiPropertyOptional } from '@nestjs/swagger'

export class FindAllQueryDto {
  @ApiPropertyOptional()
  page: number

  @ApiPropertyOptional()
  perPage: number
}
