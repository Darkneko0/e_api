import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Character {
  name: string;
  status: string;
  gender: string;
  image: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'e_api';
  characters: Character[] = [];
  page = 1;
  backgroundColor = '#979a9a';
  currentPage = 1;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCharacters();
  }

  toggleBackground() {
    this.backgroundColor =
      this.backgroundColor === '#979a9a' ? '#2e4053' : '#979a9a';
  }

  getCharacters() {
    this.http
      .get(`https://rickandmortyapi.com/api/character?page=${this.page}`)
      .subscribe({
        next: (data: any) => {
          this.characters = data.results;
        },
        error: (error) => {
          // Aquí se manejan los errores
        },
      });
  }

  getPage(page: number) {
    this.page = page;
    this.currentPage = page;
    this.getCharacters();
  }

  getPageNumbers() {
    return Array.from({ length: 1 }, (_, i) => i + 1);
  }
}
