import { Injectable, NotFoundException } from '@nestjs/common';
import { Favorites } from './entities/favorites.entity';
import { TrackRepository } from '../track/track.repository';
import { AlbumRepository } from '../album/album.repository';
import { ArtistRepository } from '../artist/artist.repository';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    private readonly trackRepository: TrackRepository,
    private readonly albumRepository: AlbumRepository,
    private readonly artistRepository: ArtistRepository,
  ) {}

  getAll(): Favorites {
    return this.favorites;
  }

  addTrack(id: string): void {
    this.trackRepository.findById(id);
    if (!this.favorites.tracks.includes(id)) {
      this.favorites.tracks.push(id);
    }
  }

  removeTrack(id: string): void {
    const index = this.favorites.tracks.indexOf(id);
    if (index === -1) throw new NotFoundException('Track is not in favorites');
    this.favorites.tracks.splice(index, 1);
  }

  addAlbum(id: string): void {
    this.albumRepository.findById(id);
    if (!this.favorites.albums.includes(id)) {
      this.favorites.albums.push(id);
    }
  }

  removeAlbum(id: string): void {
    const index = this.favorites.albums.indexOf(id);
    if (index === -1) throw new NotFoundException('Album is not in favorites');
    this.favorites.albums.splice(index, 1);
  }

  addArtist(id: string): void {
    this.artistRepository.findById(id);
    if (!this.favorites.artists.includes(id)) {
      this.favorites.artists.push(id);
    }
  }

  removeArtist(id: string): void {
    const index = this.favorites.artists.indexOf(id);
    if (index === -1) throw new NotFoundException('Artist is not in favorites');
    this.favorites.artists.splice(index, 1);
  }
}
