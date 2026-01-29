# ZapaCars - Modern Workshop Website

## Stack
- **Payload CMS** - Headless CMS (backend)
- **Next.js 14** - Frontend (App Router)
- **PostgreSQL** - Database
- **n8n** - AI automation (Gemini API)
- **Coolify** - Deployment & orchestration

## Quick Start

### Development
```bash
docker-compose up -d
```

### Production (Coolify)
Deploy from GitHub - auto-build from Dockerfiles

## Structure
```
├── payload-cms/      # Backend CMS
├── frontend/         # Next.js website
├── n8n/             # AI workflows
└── docker-compose.yml
```

## Deploy Steps
1. Push to GitHub
2. Coolify webhook triggers
3. Auto-deploy!

---
Created: 2026-01-29
