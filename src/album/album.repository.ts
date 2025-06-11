import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../client/prisma.service';
import { Album } from '@prisma/client';

@Injectable()
export class AlbumRepository {
  constructor(private storage: PrismaService) {}

  async findAll(): Promise<Album[]> {
    return this.storage.album.findMany();
  }

  async findById(id: string): Promise<Album> {
    const album = await this.storage.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return album;
  }

  async create(
    name: string,
    year: number,
    artistId: string | null,
  ): Promise<Album> {
    return this.storage.album.create({
      data: {
        name: name,
        year: year,
        artist: {
          connect: artistId ? { id: artistId } : undefined,
        },
      },
    });
  }

  async update(id: string, update: Partial<Album>): Promise<Album> {
    const existing = await this.findById(id);
    const updated = { ...existing, ...update };
    return this.storage.album.update({
      where: { id },
      data: {
        name: updated.name,
        year: updated.year,
        artist: {
          connect: updated.artistId ? { id: updated.artistId } : undefined,
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.storage.album.delete({ where: { id } });
  }

  async removeArtist(artistId: string): Promise<void> {
    const albums = await this.findAll();
    albums.forEach(async (album) => {
      // if (album.artistId === artistId) await this.storage.artist.;
    });
  }
}
