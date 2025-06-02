import { Injectable, BadRequestException } from '@nestjs/common';
import { ArtistRepository } from './artist.repository';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  getAll(): Artist[] {
    return this.artistRepository.findAll();
  }

  getById(id: string): Artist {
    return this.artistRepository.findById(id);
  }

  create(name: string, grammy: boolean): Artist {
    if (!name?.trim()) {
      throw new BadRequestException('Name is required');
    }
    return this.artistRepository.create(name, grammy);
  }

  update(id: string, data: Partial<Artist>): Artist {
    return this.artistRepository.update(id, data);
  }

  delete(id: string): void {
    this.artistRepository.delete(id);
  }
}
