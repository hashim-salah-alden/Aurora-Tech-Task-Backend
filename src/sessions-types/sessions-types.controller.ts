import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SessionsTypesService } from './sessions-types.service';
import { CreateSessionsTypeDto } from './dto/create-sessions-type.dto';
import { UpdateSessionsTypeDto } from './dto/update-sessions-type.dto';

@Controller('sessions-types')
export class SessionsTypesController {
  constructor(private readonly sessionsTypesService: SessionsTypesService) {}

  // @Post()
  // create(@Body() createSessionsTypeDto: CreateSessionsTypeDto) {
  //   return this.sessionsTypesService.create(createSessionsTypeDto);
  // }

  @Get()
  findAll() {
    return this.sessionsTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionsTypesService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSessionsTypeDto: UpdateSessionsTypeDto) {
  //   return this.sessionsTypesService.update(+id, updateSessionsTypeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.sessionsTypesService.remove(+id);
  // }
}
