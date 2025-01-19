import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpicEntity } from '../../entities/epic.entity';
import { WorkspaceEntity } from '../../entities/workspace.entity';
import { UserEntity } from '../../entities/user.entity';
import { TaskEntity } from '../../entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EpicEntity,
      WorkspaceEntity,
      UserEntity,
      TaskEntity,
    ]),
  ],
  providers: [],
  exports: [],
})
export class UserModule {}
