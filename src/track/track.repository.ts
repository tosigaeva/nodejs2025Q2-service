import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../client/prisma.service';
import { Track } from '@prisma/client';

@Injectable()
export class TrackRepository {
  constructor(private storage: PrismaService) {}

  async findAll(): Promise<Track[]> {
    return this.storage.track.findMany();
  }

  async findById(id: string): Promise<Track> {
    const track = await this.storage.track.findUnique({ where: { id } });
    if (!track) throw new NotFoundException(`Track with id ${id} not found`);
    return track;
  }

  async create(data: Omit<Track, 'id'>): Promise<Track> {
    const track: Track = {
      id: randomUUID(),
      ...data,
    };
    return this.storage.track.create({
      data: {
        name: track.name,
        duration: track.duration,
        artist: {
          connect: track.artistId ? { id: track.artistId } : undefined,
        },
        album: {
          connect: track.albumId ? { id: track.albumId } : undefined,
        },
      },
    });
  }

  async update(id: string, update: Partial<Track>): Promise<Track> {
    const existing = await this.findById(id);
    const updated = { ...existing, ...update };
    return this.storage.track.update({
      where: { id },
      data: {
        name: updated.name,
        duration: updated.duration,
        artist: {
          connect: updated.artistId ? { id: updated.artistId } : undefined,
        },
        album: {
          connect: updated.albumId ? { id: updated.albumId } : undefined,
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    try {
      await this.storage.track.delete({ where: { id } });
    } catch {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    await this.storage.favoriteTrack.deleteMany({ where: { trackId: id } });
  }
}
