import { Module } from '@nestjs/common';
import { SessionsTypesService } from './sessions-types.service';
import { SessionsTypesController } from './sessions-types.controller';

@Module({
  controllers: [SessionsTypesController],
  providers: [SessionsTypesService],
})
export class SessionsTypesModule {}
