import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake'
import { BufferOptions, type TDocumentDefinitions } from 'pdfmake/interfaces'

const fonts = {
  Roboto: {
    normal: 'src/global/fonts/Roboto-Regular.ttf',
    bold: 'src/global/fonts/Roboto-Bold.ttf',
  }
}

@Injectable()
export class PrinterService {
  private printer = new PdfPrinter(fonts)

  createFaa199FormPdf(
    documentDefinition: TDocumentDefinitions,
    options: BufferOptions = {}
  ): PDFKit.PDFDocument {
    return this.printer.createPdfKitDocument(documentDefinition, options)
  }
}
