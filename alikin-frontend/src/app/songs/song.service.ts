import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from './song.model';
import { environment } from "../../enviroments/enviroment";

import { Page } from '../shared/models/page.model';


.
export interface PageableSongRequest {
  page?: number;
  size?: number;
  sort?: string;
  genre?: string;
  artist?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private apiUrl = `${environment.apiUrl}/songs`;

  constructor(private http: HttpClient) {
  }

  /**
   * Obtiene una lista paginada de canciones disponibles.
   * Tu backend en GET /api/songs debe soportar estos parámetros de paginación.
   */
  getAvailableSongs(pageable: PageableSongRequest = {page: 0, size: 20, sort: 'title,asc'}): Observable<Page<Song>> {
    let params = new HttpParams();
    if (pageable.page !== undefined) {
      params = params.set('page', pageable.page.toString());
    }
    if (pageable.size !== undefined) {
      params = params.set('size', pageable.size.toString());
    }
    if (pageable.sort) {
      params = params.set('sort', pageable.sort);
    }

    return this.http.get<Page<Song>>(this.apiUrl, {params});
  }

  /**
   * Sube una nueva canción con sus metadatos y archivos.
   * Llama al endpoint POST /api/songs/upload (o el que hayas definido para esto).
   * Tu backend debe estar preparado para recibir multipart/form-data con 'songData' (JSON),
   * 'audioFile' (archivo de audio) y 'coverImageFile' (archivo de imagen opcional).
   */
  uploadSong(formData: FormData): Observable<Song> {
    return this.http.post<Song>(`${this.apiUrl}`, formData);
  }
}
