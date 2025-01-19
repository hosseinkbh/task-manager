import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { WorkspaceEntity } from '../../entities/workspace.entity';
import { EpicEntity } from '../../entities/epic.entity';
import { TaskEntity } from '../../entities/task.entity';

@Injectable()
export class DatabaseService {
  constructor(@InjectRepository(entity) repo: Repository<entity>) {}
}
