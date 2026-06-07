import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsService, Stat, ActivityItem } from '../../services/stats.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <div class="section-header">
        <h2 class="section-title">System Overview</h2>
        <span class="section-meta font-mono">Last updated: just now</span>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card" *ngFor="let stat of stats; let i = index"
             [style.animation-delay]="i * 0.1 + 's'">
          <div class="stat-icon" [style.color]="stat.color">{{ stat.icon }}</div>
          <div class="stat-info">
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-change" [class.positive]="stat.change > 0" [class.negative]="stat.change < 0">
              {{ stat.change > 0 ? '↑' : '↓' }} {{ stat.change | number:'1.1-1' }}% {{ stat.changeLabel }}
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Grid -->
      <div class="bottom-grid">

        <!-- Activity Feed -->
        <div class="card activity-card">
          <div class="card-header">
            <h3>Recent Activity</h3>
            <span class="badge">Live</span>
          </div>
          <div class="activity-list">
            <div class="activity-item" *ngFor="let item of activity">
              <div class="activity-status" [class]="item.status"></div>
              <div class="activity-content">
                <div class="activity-action">{{ item.action }}</div>
                <div class="activity-meta">{{ item.user }} · {{ item.time }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- CI/CD Status -->
        <div class="card pipeline-card">
          <div class="card-header">
            <h3>GitHub Actions</h3>
            <span class="badge success">3 passing</span>
          </div>
          <div class="pipeline-list">
            <div class="pipeline-item" *ngFor="let p of pipelines">
              <div class="pipeline-info">
                <span class="pipeline-name font-mono">{{ p.name }}</span>
                <span class="pipeline-branch">{{ p.branch }}</span>
              </div>
              <div class="pipeline-status" [class]="p.status">
                <span class="status-dot"></span>
                {{ p.status }}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      max-width: 1200px;
      animation: fadeIn 0.4s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .section-header {
      display: flex;
      align-items: baseline;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .section-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--text-primary);
    }
    .section-meta {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-family: var(--font-mono);
    }
    .font-mono { font-family: var(--font-mono); }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .stat-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.25rem;
      display: flex;
      gap: 1rem;
      align-items: flex-start;
      animation: slideUp 0.4s ease both;
      transition: border-color 0.2s, transform 0.2s;
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .stat-card:hover {
      border-color: var(--accent);
      transform: translateY(-2px);
    }
    .stat-icon { font-size: 1.5rem; }
    .stat-label {
      font-size: 0.72rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-family: var(--font-mono);
      margin-bottom: 0.35rem;
    }
    .stat-value {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-primary);
      line-height: 1;
      margin-bottom: 0.4rem;
      font-family: var(--font-mono);
    }
    .stat-change {
      font-size: 0.72rem;
      font-family: var(--font-mono);
      color: var(--text-muted);
    }
    .stat-change.positive { color: var(--accent-green); }
    .stat-change.negative { color: var(--accent-red); }

    /* Bottom Grid */
    .bottom-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    .card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.25rem;
    }
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.25rem;
    }
    .card-header h3 {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-primary);
      font-family: var(--font-mono);
    }
    .badge {
      font-size: 0.65rem;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      background: rgba(99,102,241,0.15);
      color: var(--accent);
      font-family: var(--font-mono);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .badge.success {
      background: rgba(34,211,160,0.15);
      color: var(--accent-green);
    }

    /* Activity */
    .activity-list { display: flex; flex-direction: column; gap: 0.85rem; }
    .activity-item { display: flex; gap: 0.75rem; align-items: flex-start; }
    .activity-status {
      width: 8px; height: 8px; border-radius: 50%;
      margin-top: 5px; flex-shrink: 0;
    }
    .activity-status.success { background: var(--accent-green); box-shadow: 0 0 6px var(--accent-green); }
    .activity-status.pending { background: var(--accent-orange); box-shadow: 0 0 6px var(--accent-orange); }
    .activity-status.failed { background: var(--accent-red); box-shadow: 0 0 6px var(--accent-red); }
    .activity-action { font-size: 0.82rem; color: var(--text-primary); margin-bottom: 0.15rem; }
    .activity-meta { font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono); }

    /* Pipelines */
    .pipeline-list { display: flex; flex-direction: column; gap: 0.85rem; }
    .pipeline-item {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0.65rem 0.75rem;
      background: var(--bg-secondary);
      border-radius: 8px;
      border: 1px solid var(--border);
    }
    .pipeline-name { font-size: 0.8rem; color: var(--text-primary); display: block; }
    .pipeline-branch { font-size: 0.68rem; color: var(--text-muted); }
    .pipeline-status {
      display: flex; align-items: center; gap: 0.4rem;
      font-size: 0.72rem; font-family: var(--font-mono); text-transform: capitalize;
    }
    .pipeline-status.success { color: var(--accent-green); }
    .pipeline-status.running { color: var(--accent-orange); }
    .pipeline-status.failed { color: var(--accent-red); }
    .status-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: currentColor;
    }
    .pipeline-status.running .status-dot { animation: pulse 1s infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  `]
})
export class DashboardComponent implements OnInit {
  stats: Stat[] = [];
  activity: ActivityItem[] = [];

  pipelines = [
    { name: 'ci-build-test.yml', branch: 'main', status: 'success' },
    { name: 'ci-build-test.yml', branch: 'feat/login', status: 'running' },
    { name: 'ci-build-test.yml', branch: 'fix/auth', status: 'success' },
  ];

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.statsService.getStats().subscribe(data => this.stats = data);
    this.statsService.getRecentActivity().subscribe(data => this.activity = data);
  }
}
