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

  async getAll(): Promise<Album[]> {
    return await this.albumRepository.findAll();
  }

  async getById(id: string): Promise<Album> {
    return this.albumRepository.findById(id);
  }

  async create(
    name: string,
    year: number,
    artistId?: string | null,
  ): Promise<Album> {
    return this.albumRepository.create(name, year, artistId ?? null);
  }

  async update(id: string, update: Partial<Album>): Promise<Album> {
    return this.albumRepository.update(id, update);
  }

  async delete(id: string): Promise<void> {
    try {
      await this.albumRepository.delete(id);
    } catch {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    // this.trackService.removeAlbum(id);
    // this.favoritesService.cleanAlbum(id);
  }
}
