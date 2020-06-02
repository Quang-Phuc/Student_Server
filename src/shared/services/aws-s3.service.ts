import * as AWS from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { GeneratorService } from './generator.service';
import contants from '../../constants';
import { isNullOrUndefined } from 'util';
import { ManagedUpload } from 'aws-sdk/clients/s3';

const DATA_URI_PATTEN = contants.regex.dataUriPattern;

@Injectable()
export class AwsS3Service {
  private readonly _s3: AWS.S3;
  private readonly bucketName: string;

  constructor(private readonly generatorService: GeneratorService) {
    const awsS3Config = ConfigService.getAwsS3Config();
    const options: AWS.S3.Types.ClientConfiguration = {
      // apiVersion: '2010-12-01',
      region: awsS3Config.region,
    };

    if (awsS3Config.accessKeyId && awsS3Config.secretAccessKey) {
      options.credentials = awsS3Config;
    }
    this.bucketName = awsS3Config.bucketName;
    this._s3 = new AWS.S3(options);
  }

  uploadImage(uri: string, destination = ''): Promise<ManagedUpload.SendData> {
    const matchesData = uri.match(DATA_URI_PATTEN);

    if (isNullOrUndefined(matchesData)) {
      throw new Error('Invalid data uri');
    }
    const [, , data] = matchesData;
    const decode = new Buffer(data, 'base64');
    const fileName = this.generatorService.uuid();
    const key = destination + 'images/' + fileName;
    return this._s3
      .upload({
        Bucket: this.bucketName,
        Body: decode,
        ACL: 'public-read',
        Key: key,
      })
      .promise();
  }
}
