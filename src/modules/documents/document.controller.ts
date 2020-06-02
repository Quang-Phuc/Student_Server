import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Put,
  Param,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { ApiTags, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { DocumentCreateDto } from './dto/DocumentCreateDto';
import { ActiveDocumentDto } from './dto/ActiveDocumentDto';

@ApiTags('Documents')
@ApiBearerAuth()
@Controller()
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  async uploadFile(@Body() documentParams: DocumentCreateDto) {
    const result = await this.documentService.uploadImage(documentParams.file);
    return result;
  }

  @Put('/active/:id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: 'number' })
  async activeDocument(@Param() params,
    @Body() body: ActiveDocumentDto) {
    const document = await this.documentService.activeDocument(params.id, body);
    return document;
  }
}
