import { Component, input, output, signal } from '@angular/core';
import { Topic } from '../../models/content.models';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  topics = input.required<Topic[]>();
  counts = input<Record<string, number>>({});
  selectedId = input<string | null>(null);

  topicSelected = output<Topic>();
  isOpen = signal(false); // mobile drawer

  selectTopic(topic: Topic) {
    this.topicSelected.emit(topic);
    this.isOpen.set(false);
  }

  toggle() {
    this.isOpen.update((open) => !open);
  }

  close() {
    this.isOpen.set(false);
  }
}