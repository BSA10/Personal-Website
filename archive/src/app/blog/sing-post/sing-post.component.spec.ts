import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingPostComponent } from './sing-post.component';

describe('SingPostComponent', () => {
  let component: SingPostComponent;
  let fixture: ComponentFixture<SingPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
