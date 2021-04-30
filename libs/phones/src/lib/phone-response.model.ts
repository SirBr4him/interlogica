import { ApiProperty } from '@nestjs/swagger';

export class PhonesResponse {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  original: string;

  @ApiProperty({ type: String })
  number: string;

  @ApiProperty({ type: Boolean })
  valid: boolean;
}

export class UploadCsvResponse {
  @ApiProperty({ type: String })
  originalname: string;

  @ApiProperty({ type: String })
  filename: string;
}
