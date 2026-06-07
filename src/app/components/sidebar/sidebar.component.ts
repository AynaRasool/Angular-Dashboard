import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <div class="logo">
        <span class="logo-icon">◈</span>
        <span class="logo-text">DEVOPS<br><small>DASHBOARD</small></span>
      </div>
      <nav class="nav">
        <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">▦</span>
          <span>Overview</span>
        </a>
        <a href="#" class="nav-item">
          <span class="nav-icon">⬡</span>
          <span>Pipelines</span>
        </a>
        <a href="#" class="nav-item">
          <span class="nav-icon">◎</span>
          <span>Deployments</span>
        </a>
        <a href="#" class="nav-item">
          <span class="nav-icon">△</span>
          <span>Monitoring</span>
        </a>
        <a href="#" class="nav-item">
          <span class="nav-icon">⊞</span>
          <span>Logs</span>
        </a>
      </nav>
      <div class="sidebar-footer">
        <a href="#" class="nav-item">
          <span class="nav-icon">⚙</span>
          <span>Settings</span>
        </a>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 220px;
      min-width: 220px;
      background: var(--bg-secondary);
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      padding: 1.5rem 0;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0 1.5rem 2rem;
      border-bottom: 1px solid var(--border);
      margin-bottom: 1.5rem;
    }
    .logo-icon {
      font-size: 1.5rem;
      color: var(--accent);
      filter: drop-shadow(0 0 8px var(--accent));
    }
    .logo-text {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 700;
      color: var(--text-primary);
      letter-spacing: 0.1em;
      line-height: 1.4;
    }
    .logo-text small {
      color: var(--text-muted);
      font-size: 0.6rem;
    }
    .nav {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding: 0 0.75rem;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.65rem 0.75rem;
      border-radius: 8px;
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 500;
      transition: all 0.15s ease;
      cursor: pointer;
    }
    .nav-item:hover {
      background: var(--bg-card);
      color: var(--text-primary);
    }
    .nav-item.active {
      background: rgba(99, 102, 241, 0.15);
      color: var(--accent);
    }
    .nav-icon {
      font-size: 0.9rem;
      width: 18px;
      text-align: center;
    }
    .sidebar-footer {
      padding: 0 0.75rem;
      border-top: 1px solid var(--border);
      padding-top: 1rem;
      margin-top: 1rem;
    }
  `]
})
export class SidebarComponent {}
