import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardEntity } from '../../entities/board.entity';
import { CreateBoardDto, listBoardQueryDto } from './board.dto';
import { UserEntity } from '../../entities/user.entity';
import { removeNulls } from '../../utils/removeNulls';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepo: Repository<BoardEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async createBoard(boardName: CreateBoardDto, userId: string) {
    const createdBy = await this.userRepo.findOne({ where: { id: userId } });
    if (!createdBy) {
      throw new NotFoundException(`creator credential does not exist`);
    }
    const validatedBody = new BoardEntity();
    validatedBody.name = boardName.name;
    validatedBody.owner = userId;
    await this.boardRepo.save(validatedBody);
  }

  async getBoard(boardId: string) {
    return this.boardRepo.findOne({ where: { id: boardId } });
  }

  async listBoards(query: listBoardQueryDto) {
    const validatedQuery = removeNulls<listBoardQueryDto>(query);
    return this.boardRepo.find({ where: validatedQuery });
  }
}
