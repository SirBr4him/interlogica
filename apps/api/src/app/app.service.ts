import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as csvParse from 'csv-parse/lib/sync';
import { CsvContentModel } from './models/csv-content-model';
import { PhoneNumber, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to api!' };
  }

  async parseFile(filePath: string): Promise<CsvContentModel[]> {
    const content = await fs.readFile(filePath);
    const entities: CsvContentModel[] = await csvParse(content, {
      columns: true,
      bom: true,
    });
    return entities;
  }

  async setPhoneNumbers(numbers: PhoneNumber[]) {
    for (const item of numbers) {
      await prisma.phoneNumber.create({ data: item });
    }
  }

  getPhoneNumbers(): Promise<PhoneNumber[]> {
    return prisma.phoneNumber.findMany();
  }
}
