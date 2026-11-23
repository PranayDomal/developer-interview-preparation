import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { ReaderHeader } from './components/reader-header/reader-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReaderHeader, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}