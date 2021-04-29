import { Injectable } from '@nestjs/common';

import { promises as fs } from 'fs';
import * as csvParse from 'csv-parse/lib/sync';
import { PhoneNumber, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type CsvContentModel = {
  id: string;
  sms_phone: string;
};

@Injectable()
export class PhonesService {
  async parseFile(filePath: string): Promise<CsvContentModel[]> {
    const content = await fs.readFile(filePath);
    const entities: CsvContentModel[] = await csvParse(content, {
      columns: true,
      bom: true,
    });
    return entities;
  }

  async setPhoneNumber(number: PhoneNumber) {
    await prisma.phoneNumber.create({ data: number });
  }

  getPhoneNumbers(): Promise<PhoneNumber[]> {
    return prisma.phoneNumber.findMany();
  }
}
