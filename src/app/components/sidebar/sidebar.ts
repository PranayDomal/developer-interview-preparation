import { Component, output, signal } from '@angular/core';
import { Topic } from '../../models/topic.model';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  // Temporary data. Will come from topics.json via QuestionService later.
  topics: Topic[] = [
    { id: 'csharp-fundamentals', name: 'C# Fundamentals', slug: 'fundamentals', description: 'Basic C# and .NET concepts', questionFile: 'fundamentals.json', questionCount: 12 },
    { id: 'data-types', name: 'Data Types and Variables', slug: 'data-types', description: 'Value types, reference types, casting', questionFile: 'data-types.json', questionCount: 12 },
    { id: 'oop', name: 'Object-Oriented Programming (OOP)', slug: 'oop', description: 'Classes, inheritance, polymorphism', questionFile: 'oop.json', questionCount: 19 },
    { id: 'exception-handling', name: 'Exception Handling', slug: 'exception-handling', description: 'try, catch, finally, custom exceptions', questionFile: 'exception-handling.json', questionCount: 10 },
    { id: 'collections', name: 'Collections and Generics', slug: 'collections', description: 'List, Dictionary, generics', questionFile: 'collections.json', questionCount: 14 },
    { id: 'linq', name: 'LINQ', slug: 'linq', description: 'Querying data with LINQ', questionFile: 'linq.json', questionCount: 14 },
    { id: 'memory-management', name: 'Memory Management', slug: 'memory-management', description: 'GC, IDisposable, stack vs heap', questionFile: 'memory-management.json', questionCount: 12 },
    { id: 'advanced-csharp', name: 'Advanced C# Concepts', slug: 'advanced-csharp', description: 'Delegates, async/await, reflection', questionFile: 'advanced-csharp.json', questionCount: 18 },
  ];

  selectedTopicId = signal(this.topics[0].id);
  isOpen = signal(false); // mobile drawer state

  topicSelected = output<Topic>();

  selectTopic(topic: Topic) {
    this.selectedTopicId.set(topic.id);
    this.topicSelected.emit(topic);
    this.isOpen.set(false); // close drawer after choosing on mobile
  }

  toggle() {
    this.isOpen.update((open) => !open);
  }

  close() {
    this.isOpen.set(false);
  }
}