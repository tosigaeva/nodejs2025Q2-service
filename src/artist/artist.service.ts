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

  async getAll(): Promise<Artist[]> {
    return this.artistRepository.findAll();
  }

  async getById(id: string) {
    return await this.artistRepository.findById(id);
  }

  async create(name: string, grammy: boolean): Promise<Artist> {
    if (!name?.trim()) {
      throw new BadRequestException('Name is required');
    }
    return await this.artistRepository.create(name, grammy);
  }

  async update(id: string, data: Partial<Artist>): Promise<Artist> {
    return await this.artistRepository.update(id, data);
  }

  async delete(id: string) {
    try {
      await this.artistRepository.delete(id);
    } catch {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    this.albumService.removeArtist(id);
    // this.trackService.removeArtist(id);
    // this.favoritesService.cleanArtist(id);
  }
}
