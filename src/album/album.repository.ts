import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from './entities/album.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class AlbumRepository {
  private albums = new Map<string, Album>();

  findAll(): Album[] {
    return Array.from(this.albums.values());
  }

  findById(id: string): Album {
    const album = this.albums.get(id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return album;
  }

  create(name: string, year: number, artistId: string | null): Album {
    const album: Album = {
      id: randomUUID(),
      name,
      year,
      artistId: artistId ?? null,
    };
    this.albums.set(album.id, album);
    return album;
  }

  update(id: string, update: Partial<Album>): Album {
    const existing = this.findById(id);
    const updated = { ...existing, ...update };
    this.albums.set(id, updated);
    return updated;
  }

  delete(id: string): void {
    if (!this.albums.delete(id)) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
  }

  removeArtist(artistId: string) {
    this.albums.forEach((album) => {
      if (album.artistId === artistId) album.artistId = null;
    });
  }
}
