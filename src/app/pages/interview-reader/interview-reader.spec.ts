import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterviewReader } from './interview-reader';

describe('InterviewReader', () => {
  let component: InterviewReader;
  let fixture: ComponentFixture<InterviewReader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewReader],
    }).compileComponents();

    fixture = TestBed.createComponent(InterviewReader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
