import { Controller, UseGuards } from '@nestjs/common';
import { SessionAuthGuard } from '../../guards/sessionAuth.guard';
import { BoardService } from './board.service';

@Controller('/board')
@UseGuards(SessionAuthGuard)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}
}
