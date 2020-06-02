import { Injectable } from '@nestjs/common';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentEntity } from './document.entity';
import { DocumentRepository } from './document.repository';
import { DocumentCreateDto } from './dto/DocumentCreateDto';
import _ from 'lodash';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(DocumentEntity)
    private readonly documentRepository: DocumentRepository,
    private readonly awsService: AwsS3Service,
  ) {}

  uploadImage(file) {
    return this.awsService.uploadImage(file);
  }

  async createDocument(params: DocumentCreateDto) {
    try {
      const { file, ...documentAttribute } = params;
      const document = await this.documentRepository.create(
        this.newDocumentParams(documentAttribute),
      );
      const { Key: attachedFile } = await this.awsService.uploadImage(
        file,
        `documents/${document.id}`,
      );
      return this.documentRepository.save({ attachedFile, ...document });
    } catch (error) {
      throw error;
    }
  }

  async activeDocument(id, status) {
    try {
      const document = await this.documentRepository.findOneOrFail(id)
      document.status = status;
      return this.documentRepository.save(document);
    } catch (error) {
      throw error;
    }
  }

  async findOne(id) {
    return this.documentRepository.find(id)
  }

  private newDocumentParams(params) {
    if(_.isEmpty(params)) {
      return {};
    }

    return {
      type: _.get(params, 'type'),
      major: _.get(params, 'major'),
      subMajor: _.get(params, 'subMajor'),
      language: _.get(params, 'type'),
      university: _.get(params, 'university'),
      price: _.get(params, 'price'),
      startPagePreview: _.get(params, 'startPagePreview'),
      endPagePreview: _.get(params, 'endPagePreview'),
      isVip: _.get(params, 'isVip'),
      description: _.get(params, 'description'),
    };
  }
}
