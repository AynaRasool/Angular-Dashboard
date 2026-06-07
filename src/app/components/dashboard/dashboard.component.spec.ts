import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { StatsService } from '../../services/stats.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockStatsService: jasmine.SpyObj<StatsService>;

  beforeEach(async () => {
    mockStatsService = jasmine.createSpyObj('StatsService', ['getStats', 'getRecentActivity']);
    mockStatsService.getStats.and.returnValue(of([]));
    mockStatsService.getRecentActivity.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [{ provide: StatsService, useValue: mockStatsService }]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load stats on init', () => {
    expect(mockStatsService.getStats).toHaveBeenCalled();
  });

  it('should load activity on init', () => {
    expect(mockStatsService.getRecentActivity).toHaveBeenCalled();
  });

  it('should have 3 pipelines', () => {
    expect(component.pipelines.length).toBe(3);
  });
});
