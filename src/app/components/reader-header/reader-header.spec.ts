import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReaderHeader } from './reader-header';

describe('ReaderHeader', () => {
  let component: ReaderHeader;
  let fixture: ComponentFixture<ReaderHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReaderHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(ReaderHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
