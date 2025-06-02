import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { ArtistRepository } from './artist.repository';
import { Artist } from './entities/artist.entity';
import { AlbumRepository } from '../album/album.repository';
import { TrackRepository } from '../track/track.repository';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    @Inject(forwardRef(() => AlbumRepository))
    private readonly albumRepository: AlbumRepository,
    @Inject(forwardRef(() => TrackRepository))
    private readonly trackRepository: TrackRepository,
  ) {}

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
    if (!this.artistRepository.delete(id)) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    this.albumRepository.removeArtist(id);
    this.trackRepository.removeArtist(id);
  }
}
