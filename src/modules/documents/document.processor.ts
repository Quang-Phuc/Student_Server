import { Process, Processor, OnQueueActive } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import _ from 'lodash';

@Processor('documentProcessor')
export class DocumentProcessor {
  private readonly logger = new Logger(DocumentProcessor.name);


}
