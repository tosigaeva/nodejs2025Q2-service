import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException, UnprocessableEntityException,
} from '@nestjs/common';
import { Favorites } from './entities/favorites.entity';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';

@Injectable()
export class FavoritesService {
  private favorites: { artists: string[]; albums: string[]; tracks: string[] } =
    {
      artists: [],
      albums: [],
      tracks: [],
    };

  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
  ) {}

  getAll(): Favorites {
    return {
      artists: this.favorites.artists.map((id) =>
        this.artistService.getById(id),
      ),
      albums: this.favorites.albums.map((id) => this.albumService.getById(id)),
      tracks: this.favorites.tracks.map((id) => this.trackService.getById(id)),
    };
  }

  addTrack(id: string): void {
    try {
      this.trackService.getById(id);
    } catch {
      throw new UnprocessableEntityException('Track does not exist');
    }
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
    try {
      this.albumService.getById(id);
    } catch {
      throw new UnprocessableEntityException('Album does not exist');
    }
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
    try {
      this.artistService.getById(id);
    } catch {
      throw new UnprocessableEntityException('Artist does not exist');
    }
    if (!this.favorites.artists.includes(id)) {
      this.favorites.artists.push(id);
    }
  }

  removeArtist(id: string): void {
    const index = this.favorites.artists.indexOf(id);
    if (index === -1) throw new NotFoundException('Artist is not in favorites');
    this.favorites.artists.splice(index, 1);
  }

  cleanArtist(artistId: string) {
    this.favorites.artists = this.favorites.artists.filter(
      (id) => id !== artistId,
    );
  }

  cleanAlbum(albumId: string) {
    this.favorites.albums = this.favorites.albums.filter(
      (id) => id !== albumId,
    );
  }

  cleanTrack(trackId: string) {
    this.favorites.tracks = this.favorites.tracks.filter(
      (id) => id !== trackId,
    );
  }
}
