import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Task, ITask } from '../tasks/tasks.entity';

@Injectable()
export class SearchService {
  constructor(@InjectRepository(Task) private tasksRepository: Repository<Task>) {}

  async getAll(): Promise<ITask[]> {
    const resp = await this.tasksRepository
      .createQueryBuilder('tasks')
      .select([
        'tasks.id',
        'tasks.title',
        'tasks.order',
        'tasks.description',
        'tasks.done',
        'tasks.userId',
        'tasks.boardId',
        'tasks.columnId',
        'user.name',
      ])
      .leftJoin('tasks.user', 'user')
      .getMany();
    return resp;
  }
}
