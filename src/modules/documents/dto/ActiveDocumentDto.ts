import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export enum Status {
  Active = 1,
  Reject = 2
}

export class ActiveDocumentDto {
  @IsEnum(Status)
  @ApiProperty({enum: Status})
  readonly status: number;
}
