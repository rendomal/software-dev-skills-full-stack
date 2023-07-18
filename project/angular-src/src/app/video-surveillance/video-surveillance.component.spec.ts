import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSurveillanceComponent } from './video-surveillance.component';

describe('VideoSurveillanceComponent', () => {
  let component: VideoSurveillanceComponent;
  let fixture: ComponentFixture<VideoSurveillanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoSurveillanceComponent]
    });
    fixture = TestBed.createComponent(VideoSurveillanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
