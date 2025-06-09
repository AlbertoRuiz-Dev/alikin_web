import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PostService } from './post.service';
import { environment } from '../../enviroments/enviroment';
import { Router } from '@angular/router';
import { Song } from '../songs/song.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit, OnDestroy {
  @Input() communityId?: number;
  imagePreviewUrl?: string;

  postForm!: FormGroup;
  songs: Song[] = [];
  isLoadingSongs = false;
  isSubmitting = false;
  noSongsAvailable = false;
  selectedImageFile?: File;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      content: ['', Validators.required],
      songId: [''],

    });

    this.loadSongs();
    document.body.style.backgroundImage = "url('/assets/bgi/bgposts.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundColor = "#121212";
  }

  ngOnDestroy(): void {
    if (this.imagePreviewUrl) {
      URL.revokeObjectURL(this.imagePreviewUrl);
    }

    document.body.style.backgroundImage = '';
    document.body.style.backgroundSize = '';
    document.body.style.backgroundPosition = '';
    document.body.style.backgroundRepeat = '';
    document.body.style.backgroundAttachment = '';
    document.body.style.backgroundColor = '';
  }

  loadSongs(): void {
    this.isLoadingSongs = true;
    this.error = null;

    this.http.get<any>(`${environment.apiUrl}/songs`).subscribe({
      next: (response) => {
        const songsData = response.content || response || [];
        if (!Array.isArray(songsData)) {
          this.songs = [];
          this.error = 'Formato de canciones inválido.';
          this.noSongsAvailable = true;
        } else {
          this.songs = songsData;
          this.noSongsAvailable = songsData.length === 0;
        }
        this.isLoadingSongs = false;
      },
      error: (err) => {
        console.error('Error loading songs:', err);
        this.noSongsAvailable = true;
        this.isLoadingSongs = false;
        this.error = 'No se pudieron cargar las canciones.';
      }
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImageFile = input.files[0];


      if (this.imagePreviewUrl) {
        URL.revokeObjectURL(this.imagePreviewUrl);
      }
      this.imagePreviewUrl = URL.createObjectURL(this.selectedImageFile);
    } else {
      this.selectedImageFile = undefined;
      if (this.imagePreviewUrl) {
        URL.revokeObjectURL(this.imagePreviewUrl);
        this.imagePreviewUrl = undefined;
      }
    }
  }

  public navigateToHome(): void {
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      this.error = 'Por favor, completa el contenido del post.';
      return;
    }

    this.isSubmitting = true;
    this.error = null;

    const formData = new FormData();
    formData.append('content', this.postForm.value.content);


    if (this.communityId) {
      formData.append('communityId', this.communityId.toString());
    }

    if (this.postForm.value.songId) {
      formData.append('songId', this.postForm.value.songId.toString());
    }

    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile, this.selectedImageFile.name);
    }


    this.postService.createGeneralPostWithFormData(formData).subscribe({ //
      next: (res) => {
        this.isSubmitting = false;
        this.postForm.reset();
        this.selectedImageFile = undefined;
        this.imagePreviewUrl = undefined;
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error al crear el post:', err);
        this.isSubmitting = false;
        this.error = err.error?.message || 'No se pudo crear el post. Intenta de nuevo.';
      }
    });
  }
}
