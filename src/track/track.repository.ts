import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from './entities/track.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class TrackRepository {
  private tracks = new Map<string, Track>();

  findAll(): Track[] {
    return Array.from(this.tracks.values());
  }

  findById(id: string): Track {
    const track = this.tracks.get(id);
    if (!track) throw new NotFoundException(`Track with id ${id} not found`);
    return track;
  }

  create(data: Omit<Track, 'id'>): Track {
    const track: Track = {
      id: randomUUID(),
      ...data,
    };
    this.tracks.set(track.id, track);
    return track;
  }

  update(id: string, update: Partial<Track>): Track {
    const existing = this.findById(id);
    const updated = { ...existing, ...update };
    this.tracks.set(id, updated);
    return updated;
  }

  delete(id: string): void {
    if (!this.tracks.delete(id)) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
  }
}
