import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { SearchService } from './search.service';
import { ITask, Task } from '../tasks/tasks.entity';

import { AuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Search')
@ApiBearerAuth('token')
@Controller('/search/tasks')
@UseGuards(AuthGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, type: [Task] })
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<ITask[]> {
    return this.searchService.getAll();
  }
}
