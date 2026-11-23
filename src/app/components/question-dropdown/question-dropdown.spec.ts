import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionDropdown } from './question-dropdown';

describe('QuestionDropdown', () => {
  let component: QuestionDropdown;
  let fixture: ComponentFixture<QuestionDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionDropdown],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionDropdown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
