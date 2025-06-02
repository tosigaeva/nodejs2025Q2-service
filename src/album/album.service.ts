import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumRepository } from './album.repository';
import { Album } from './entities/album.entity';
import { TrackService } from '../track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly trackService: TrackService,
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
  }

  removeArtist(artistId: string) {
    this.albumRepository.removeArtist(artistId);
  }
}
