import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Stat {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
  color: string;
}

export interface ActivityItem {
  id: number;
  action: string;
  user: string;
  time: string;
  status: 'success' | 'pending' | 'failed';
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  getStats(): Observable<Stat[]> {
    return of([
      {
        label: 'Total Users',
        value: '24,521',
        change: 12.5,
        changeLabel: 'vs last month',
        icon: '👥',
        color: 'var(--accent)'
      },
      {
        label: 'Revenue',
        value: '$84,320',
        change: 8.2,
        changeLabel: 'vs last month',
        icon: '💰',
        color: 'var(--accent-green)'
      },
      {
        label: 'Active Sessions',
        value: '1,893',
        change: -3.1,
        changeLabel: 'vs last hour',
        icon: '⚡',
        color: 'var(--accent-orange)'
      },
      {
        label: 'Error Rate',
        value: '0.42%',
        change: -18.7,
        changeLabel: 'vs last week',
        icon: '🛡️',
        color: 'var(--accent-red)'
      }
    ]);
  }

  getRecentActivity(): Observable<ActivityItem[]> {
    return of([
      { id: 1, action: 'Deployment #482 succeeded', user: 'CI/CD Pipeline', time: '2m ago', status: 'success' },
      { id: 2, action: 'New user registered', user: 'john.doe@example.com', time: '5m ago', status: 'success' },
      { id: 3, action: 'Build #481 running', user: 'CI/CD Pipeline', time: '10m ago', status: 'pending' },
      { id: 4, action: 'API rate limit hit', user: 'service-worker-3', time: '15m ago', status: 'failed' },
      { id: 5, action: 'Database backup completed', user: 'Scheduler', time: '30m ago', status: 'success' },
    ]);
  }
}
