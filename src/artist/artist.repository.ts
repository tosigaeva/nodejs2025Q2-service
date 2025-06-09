import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../client/prisma.service';
import { Artist } from '@prisma/client';

@Injectable()
export class ArtistRepository {
  constructor(private storage: PrismaService) {}

  async findAll(): Promise<Artist[]> {
    return this.storage.artist.findMany();
  }

  async findById(id: string): Promise<Artist> {
    const artist = await this.storage.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    return artist;
  }

  async create(name: string, grammy: boolean): Promise<Artist> {
    const newArtist: Artist = {
      id: randomUUID(),
      name,
      grammy,
    };
    return this.storage.artist.create({ data: newArtist });
  }

  async update(id: string, updates: Partial<Artist>): Promise<Artist> {
    const existing = this.findById(id);
    const updated = { ...existing, ...updates };
    return this.storage.artist.update({
      where: { id },
      data: updated,
    });
  }

  async delete(id: string): Promise<void> {
    await this.storage.artist.delete({ where: { id } });
  }
}
