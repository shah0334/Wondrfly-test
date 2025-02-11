import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProvidersComponent } from './category-providers.component';

describe('CategoryProvidersComponent', () => {
  let component: CategoryProvidersComponent;
  let fixture: ComponentFixture<CategoryProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryProvidersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
