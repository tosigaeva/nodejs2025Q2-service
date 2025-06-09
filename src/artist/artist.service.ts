import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { ArtistRepository } from './artist.repository';
import { Artist } from './entities/artist.entity';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
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
    this.albumService.removeArtist(id);
    this.trackService.removeArtist(id);
    this.favoritesService.cleanArtist(id);
  }
}
