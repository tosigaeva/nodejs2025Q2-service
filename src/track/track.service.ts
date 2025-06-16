import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TrackRepository } from './track.repository';
import { Track } from './entities/track.entity';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => TrackRepository))
    private readonly trackRepository: TrackRepository,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  async getAll() {
    return await this.trackRepository.findAll();
  }

  async getById(id: string) {
    return await this.trackRepository.findById(id);
  }

  async create(
    name: string,
    duration: number,
    artistId?: string | null,
    albumId?: string | null,
  ) {
    return await this.trackRepository.create({
      name,
      duration,
      artistId: artistId ?? null,
      albumId: albumId ?? null,
    });
  }

  async update(id: string, update: Partial<Track>) {
    return await this.trackRepository.update(id, update);
  }

  async delete(id: string) {
    await this.trackRepository.delete(id);
  }

  // removeArtist(artistId: string) {
  //   this.trackRepository.removeArtist(artistId);
  // }
  //
  // removeAlbum(albumId: string) {
  //   this.trackRepository.removeAlbum(albumId);
  // }
}
