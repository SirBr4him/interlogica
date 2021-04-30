import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  HttpStatus,
  UploadedFile,
  HttpException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PhoneNumber } from '@prisma/client';

import { CsvContentModel, PhonesService } from './phones.service';
import { csvFileFilter, editFileName } from './utils';
import { PhonesResponse, UploadCsvResponse } from './phone-response.model';

@ApiTags('interlogica')
@Controller('phones')
export class PhonesController {
  constructor(private phonesService: PhonesService) {}

  private validateCsvEntity({ id, sms_phone }: CsvContentModel): PhoneNumber {
    let number: string;
    let valid: boolean;

    if (sms_phone.match(/^27([0-9]{9})$/)) {
      number = sms_phone;
      valid = true;
    } else if (sms_phone.match(/^[0-9]{9}$/)) {
      number = `27${sms_phone}`;
      valid = true;
    } else {
      number = '';
      valid = false;
    }

    return { id, original: sms_phone, number, valid };
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    isArray: true,
    type: PhonesResponse,
    description: 'Return phone numbers list',
  })
  async getPhones() {
    try {
      const numbers = await this.phonesService.getPhoneNumbers();
      return numbers;
    } catch (error) {
      return {
        message: `Error on getting data!`,
        error,
      };
    }
  }

  @Post('upload-csv')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'phone numbers csv file',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UploadCsvResponse,
    description: 'Return uploaded file name',
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `${__dirname}/uploads`,
        filename: editFileName,
      }),
      fileFilter: csvFileFilter,
    })
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      const { originalname, filename } = file;
      const csvContent = await this.phonesService.parseFile(
        `${__dirname}/uploads/${filename}`
      );

      for (const entity of csvContent) {
        const number = this.validateCsvEntity(entity);
        await this.phonesService.setPhoneNumber(number);
      }

      return {
        originalname,
        filename,
      };
    } catch (err) {
      return new HttpException(
        `Errore on creating data!`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
