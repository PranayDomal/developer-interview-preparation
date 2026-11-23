import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionNavigation } from './question-navigation';

describe('QuestionNavigation', () => {
  let component: QuestionNavigation;
  let fixture: ComponentFixture<QuestionNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionNavigation],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionNavigation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
