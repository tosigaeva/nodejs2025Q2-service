import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumRepository } from './album.repository';
import { Album } from './entities/album.entity';
import { TrackService } from '../track/track.service';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => AlbumRepository))
    private readonly albumRepository: AlbumRepository,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  getAll(): Album[] {
    return this.albumRepository.findAll();
  }

  getById(id: string): Album {
    return this.albumRepository.findById(id);
  }

  create(name: string, year: number, artistId?: string | null): Album {
    return this.albumRepository.create(name, year, artistId ?? null);
  }

  update(id: string, update: Partial<Album>): Album {
    return this.albumRepository.update(id, update);
  }

  delete(id: string): void {
    if (!this.albumRepository.delete(id)) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    this.trackService.removeAlbum(id);
    this.favoritesService.cleanAlbum(id);
  }

  removeArtist(artistId: string) {
    this.albumRepository.removeArtist(artistId);
  }
}
