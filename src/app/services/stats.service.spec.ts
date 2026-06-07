import { TestBed } from '@angular/core/testing';
import { StatsService } from './stats.service';

describe('StatsService', () => {
  let service: StatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 4 stats', (done) => {
    service.getStats().subscribe(stats => {
      expect(stats.length).toBe(4);
      done();
    });
  });

  it('should return stats with required fields', (done) => {
    service.getStats().subscribe(stats => {
      stats.forEach(stat => {
        expect(stat.label).toBeDefined();
        expect(stat.value).toBeDefined();
        expect(stat.change).toBeDefined();
        expect(stat.icon).toBeDefined();
      });
      done();
    });
  });

  it('should return recent activity items', (done) => {
    service.getRecentActivity().subscribe(items => {
      expect(items.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should return activity items with valid status', (done) => {
    service.getRecentActivity().subscribe(items => {
      const validStatuses = ['success', 'pending', 'failed'];
      items.forEach(item => {
        expect(validStatuses).toContain(item.status);
      });
      done();
    });
  });
});
