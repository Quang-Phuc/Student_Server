import { UtilsService } from './utils.service';
import hummus from 'hummus';

export class PdfService {
  slipPdf({startPage, endPage}) {
    const pdfReader = hummus.createReader('aws-certified-solutions-architect-official-study-guide.pdf')
    if (endPage > pdfReader.getPagesCount() + 1) {
      return false
    }
    const pdfWriter = hummus.createWriter('output' + '.pdf')
    const copyingContext = pdfWriter.createPDFCopyingContext(pdfReader);

    for (let index = startPage; index < endPage; index++) {
      copyingContext.appendPDFPageFromPDF(index);
    }

    pdfWriter.end();
    return true;
  }
}

new PdfService().slipPdf({startPage: 1, endPage: 50})
