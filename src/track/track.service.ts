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

  getAll(): Track[] {
    return this.trackRepository.findAll();
  }

  getById(id: string): Track {
    return this.trackRepository.findById(id);
  }

  create(
    name: string,
    duration: number,
    artistId?: string | null,
    albumId?: string | null,
  ): Track {
    return this.trackRepository.create({
      name,
      duration,
      artistId: artistId ?? null,
      albumId: albumId ?? null,
    });
  }

  update(id: string, update: Partial<Track>): Track {
    return this.trackRepository.update(id, update);
  }

  delete(id: string): void {
    this.trackRepository.delete(id);
    this.favoritesService.cleanTrack(id);
  }

  removeArtist(artistId: string) {
    this.trackRepository.removeArtist(artistId);
  }

  removeAlbum(albumId: string) {
    this.trackRepository.removeAlbum(albumId);
  }
}
