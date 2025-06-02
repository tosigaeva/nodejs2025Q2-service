import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from './entities/artist.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class ArtistRepository {
  private artists = new Map<string, Artist>();

  findAll(): Artist[] {
    return Array.from(this.artists.values());
  }

  findById(id: string): Artist {
    const artist = this.artists.get(id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    return artist;
  }

  create(name: string, grammy: boolean): Artist {
    const newArtist: Artist = {
      id: randomUUID(),
      name,
      grammy,
    };
    this.artists.set(newArtist.id, newArtist);
    return newArtist;
  }

  update(id: string, updates: Partial<Artist>): Artist {
    const existing = this.findById(id);
    const updated = { ...existing, ...updates };
    this.artists.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.artists.delete(id);
  }
}
