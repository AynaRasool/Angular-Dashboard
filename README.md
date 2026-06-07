# Angular Dashboard — DevOps Practice Project

A DevOps-focused Angular dashboard app with a complete GitHub Actions CI pipeline for practice.

---

## 🚀 Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/angular-dashboard.git
cd angular-dashboard

# 2. Install dependencies
npm install

# 3. Run dev server
npm start
# → http://localhost:4200
```

---

## 🧪 Testing

```bash
# Run unit tests (watch mode)
npm test

# Run tests for CI (headless + coverage)
npm run test:ci
```

---

## 🏗️ Build

```bash
# Development build
npm run build

# Production build
npm run build:prod
```

---

## ⚙️ GitHub Actions CI Pipeline

The workflow file is at: `.github/workflows/ci.yml`

### Pipeline Flow

```
push / pull_request
        │
        ▼
  📦 install         ← installs & caches node_modules
        │
   ┌────┴────┐
   ▼         ▼
🔍 lint   🧪 test    ← run in parallel
   └────┬────┘
        ▼
   🏗️ build          ← only runs if lint + test pass
        │
        ▼
   📢 summary        ← reports pass/fail
```

### Triggers

| Event | Branches |
|-------|----------|
| `push` | `main`, `feat/**`, `fix/**`, `release/**` |
| `pull_request` | `main` |

### Jobs Explained

| Job | What it does |
|-----|-------------|
| `install` | Installs npm deps, caches `node_modules` |
| `lint` | Runs `ng lint` to check code quality |
| `test` | Runs unit tests headless + uploads coverage artifact |
| `build` | Runs production build, uploads dist artifact |
| `notify` | Prints pipeline summary (pass/fail) |

---

## 📁 Project Structure

```
angular-dashboard/
├── .github/
│   └── workflows/
│       └── ci.yml              ← GitHub Actions pipeline
├── src/
│   └── app/
│       ├── components/
│       │   ├── header/         ← Top bar with live clock
│       │   ├── sidebar/        ← Navigation
│       │   └── dashboard/      ← Main dashboard view
│       └── services/
│           └── stats.service.ts ← Data service (with tests)
├── angular.json
├── package.json
└── tsconfig.json
```

---

## 🔧 Practicing DevOps

Once pushed to GitHub, try these exercises:

1. **Break a test** → push → watch the pipeline fail at the `test` job
2. **Fix it** → push → watch it go green again
3. **Open a PR** from `feat/my-feature` → pipeline triggers on PR
4. **Check artifacts** → download the coverage report & dist from the Actions tab
5. **Add a new job** → try adding a Docker build step next!

---

## 📦 Tech Stack

- Angular 17 (Standalone Components)
- Karma + Jasmine (Unit Testing)
- GitHub Actions (CI/CD)
