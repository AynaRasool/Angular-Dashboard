import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="header-left">
        <span class="page-title">Dashboard</span>
        <span class="breadcrumb">/ overview</span>
      </div>
      <div class="header-right">
        <div class="status-badge">
          <span class="dot"></span>
          All systems operational
        </div>
        <div class="time">{{ currentTime | date:'HH:mm:ss' }}</div>
        <div class="avatar">JD</div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2rem;
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border);
      min-height: 64px;
    }
    .page-title {
      font-family: var(--font-mono);
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--text-primary);
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .breadcrumb {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-left: 0.5rem;
    }
    .header-right {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    .status-badge {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.75rem;
      color: var(--accent-green);
      font-family: var(--font-mono);
    }
    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--accent-green);
      box-shadow: 0 0 8px var(--accent-green);
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    .time {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    .avatar {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      background: var(--accent);
      color: white;
      font-size: 0.7rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      letter-spacing: 0.05em;
    }
  `]
})
export class HeaderComponent {
  currentTime = new Date();

  constructor() {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }
}
