import { Module, Global } from '@nestjs/common';
import { AwsS3Service } from './services/aws-s3.service';
import { GeneratorService } from './services/generator.service';

@Global()
@Module({
  providers: [AwsS3Service, GeneratorService],
  exports: [AwsS3Service, GeneratorService],
})
export class SharedModule {}
