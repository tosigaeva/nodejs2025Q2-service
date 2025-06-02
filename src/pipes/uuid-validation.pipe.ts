import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class UuidValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!isUUID(value, 4)) {
      throw new BadRequestException(
        `Invalid UUID v4 format for ${metadata.data}`,
      );
    }
    return value;
  }
}
