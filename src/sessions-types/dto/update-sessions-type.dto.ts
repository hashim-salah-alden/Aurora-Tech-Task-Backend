import { PartialType } from '@nestjs/mapped-types';
import { CreateSessionsTypeDto } from './create-sessions-type.dto';

export class UpdateSessionsTypeDto extends PartialType(CreateSessionsTypeDto) {}
