import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessionsTypeDto } from './dto/create-sessions-type.dto';
import { UpdateSessionsTypeDto } from './dto/update-sessions-type.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessionsTypesService {
  constructor(private prisma: PrismaService) {}

  // create(createSessionsTypeDto: CreateSessionsTypeDto) {
  //   return 'This action adds a new sessionsType';
  // }

  async findAll() {
    const sessionsTypes = await this.prisma.sessionType.findMany();
    return sessionsTypes;
  }

  async findOne(id: string) {
    const sessionsTypes = await this.prisma.sessionType.findMany({
      where: { id },
    });
    if (!sessionsTypes) throw new NotFoundException();

    return sessionsTypes;
  }

  // update(id: number, updateSessionsTypeDto: UpdateSessionsTypeDto) {
  //   return `This action updates a #${id} sessionsType`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} sessionsType`;
  // }
}
