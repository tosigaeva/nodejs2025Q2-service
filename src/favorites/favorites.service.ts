import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../client/prisma.service';
import { Album, Artist, Track } from '@prisma/client';

@Injectable()
export class FavoritesService {
  constructor(private storage: PrismaService) {}

  async getAll(): Promise<{
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
  }> {
    return {
      artists: await this.storage.favoriteArtist.findMany().then((items) => {
        return this.storage.artist.findMany({
          where: { id: { in: items.map((item) => item.artistId) } },
        });
      }),
      albums: await this.storage.favoriteAlbum.findMany().then((items) => {
        return this.storage.album.findMany({
          where: { id: { in: items.map((item) => item.albumId) } },
        });
      }),
      tracks: await this.storage.favoriteTrack.findMany().then((items) => {
        return this.storage.track.findMany({
          where: { id: { in: items.map((item) => item.trackId) } },
        });
      }),
    };
  }

  async addTrack(id: string) {
    const track = await this.storage.track.findUnique({
      where: { id },
    });
    if (!track) throw new UnprocessableEntityException('Track does not exist');
    await this.storage.favoriteTrack.create({ data: { trackId: id } });
  }

  async removeTrack(id: string) {
    try {
      await this.storage.favoriteTrack.delete({ where: { trackId: id } });
    } catch {
      throw new NotFoundException('Track is not in favorites');
    }
  }

  async addAlbum(id: string) {
    const album = await this.storage.album.findUnique({
      where: { id },
    });
    if (!album) throw new UnprocessableEntityException('Album does not exist');
    await this.storage.favoriteAlbum.create({ data: { albumId: id } });
  }

  async removeAlbum(id: string) {
    try {
      await this.storage.favoriteAlbum.delete({ where: { albumId: id } });
    } catch {
      throw new NotFoundException('Album is not in favorites');
    }
  }

  async addArtist(id: string) {
    const album = await this.storage.artist.findUnique({
      where: { id },
    });
    if (!album) throw new UnprocessableEntityException('Artist does not exist');
    await this.storage.favoriteArtist.create({ data: { artistId: id } });
  }

  async removeArtist(id: string) {
    try {
      await this.storage.favoriteArtist.delete({ where: { artistId: id } });
    } catch {
      throw new NotFoundException('Artist is not in favorites');
    }
  }
}
