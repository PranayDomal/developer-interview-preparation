import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReaderState } from '../../services/reader-state';

@Component({
  selector: 'app-reader-header',
  imports: [],
  templateUrl: './reader-header.html',
  styleUrl: './reader-header.css',
})
export class ReaderHeader {
  protected state = inject(ReaderState);
  private router = inject(Router);

  onSubjectChange(event: Event) {
    const id = (event.target as HTMLSelectElement).value;
    // The reader page fills in the first topic and question automatically
    this.router.navigate(['/', id]);
  }
}