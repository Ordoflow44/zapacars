# ZapaCars - Instrukcje dla Claude

## WAŻNE: Przed rozpoczęciem pracy

**ZAWSZE na początku każdej sesji wykonaj:**

```bash
cd /root/zapacars
git fetch origin
git status
```

Jeśli są zmiany na remote (GitHub):
```bash
git pull origin main
```

**Przed edycją jakiegokolwiek pliku:**
1. Sprawdź czy plik nie był zmieniony na GitHub: `git diff origin/main -- <ścieżka_do_pliku>`
2. Jeśli są konflikty - najpierw zsynchronizuj repo
3. Dopiero potem edytuj

**Po zakończeniu edycji:**
1. Sprawdź zmiany: `git diff`
2. Commit i push: `git add . && git commit -m "opis" && git push origin main`
3. Deploy przez Coolify API

---

## Przegląd projektu

ZapaCars to strona internetowa dla warsztatu samochodowego, składająca się z:

- **Frontend**: Next.js (React) - `/root/zapacars/frontend`
- **CMS**: Payload CMS - `/root/zapacars/payload-cms`
- **Automatyzacja**: n8n workflows - `/root/zapacars/n8n`
- **Baza danych**: PostgreSQL (Supabase)

## Infrastruktura

Wszystko działa na serwerze `31.97.36.209` zarządzanym przez Coolify.

### Kontenery Docker

| Serwis | Container Name | URL |
|--------|---------------|-----|
| Frontend | jsk4sw84skcggoc840k8wkwg | https://jsk4sw84skcggoc840k8wkwg.31.97.36.209.sslip.io |
| Payload CMS | vsc00ko8cw0ogogg4o0s4wko-* | https://cms-zapacars.31.97.36.209.sslip.io |
| PostgreSQL | ac08ggs4gsckk8ccckgocko8 | (internal) |
| n8n | n8n-n8n-1 | https://n8n.srv1287530.hstgr.cloud |

### Coolify UUIDs

- Frontend: `jsk4sw84skcggoc840k8wkwg`
- Payload CMS: `vsc00ko8cw0ogogg4o0s4wko`

## Jak deployować zmiany

### 1. Commit i push do GitHub

```bash
cd /root/zapacars
git add <pliki>
git commit -m "Opis zmian"
git push origin main
```

### 2. Deploy przez Coolify API

```bash
# Deploy Payload CMS
curl -s -X POST "http://31.97.36.209:8000/api/v1/deploy" \
  -H "Authorization: Bearer $COOLIFY_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"uuid": "vsc00ko8cw0ogogg4o0s4wko"}'

# Deploy Frontend
curl -s -X POST "http://31.97.36.209:8000/api/v1/deploy" \
  -H "Authorization: Bearer $COOLIFY_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"uuid": "jsk4sw84skcggoc840k8wkwg"}'
```

### 3. Sprawdzenie statusu deploymentu

```bash
curl -s "http://31.97.36.209:8000/api/v1/deployments/<deployment_uuid>" \
  -H "Authorization: Bearer $COOLIFY_API_TOKEN"
```

### 4. Restart kontenera (bez przebudowy)

```bash
curl -s -X GET "http://31.97.36.209:8000/api/v1/applications/<uuid>/restart" \
  -H "Authorization: Bearer $COOLIFY_API_TOKEN"
```

## Struktura projektu

```
/root/zapacars/
├── frontend/                 # Next.js frontend
│   ├── app/                  # App router pages
│   ├── components/           # React components
│   ├── lib/                  # Utilities (payload.ts, etc.)
│   └── public/               # Static assets
├── payload-cms/              # Payload CMS
│   └── src/
│       ├── collections/      # Blog, Services, Gallery, Media, Users
│       ├── globals/          # SiteSettings
│       └── payload.config.ts # Main config
├── n8n/
│   └── workflows/            # n8n workflow JSONs
├── .credentials              # DANE DOSTĘPOWE (nie commitować!)
└── CLAUDE_INSTRUCTIONS.md    # Ten plik
```

## Kolekcje Payload CMS

| Kolekcja | Slug | Opis |
|----------|------|------|
| Blog | `blog` | Artykuły bloga |
| Services | `services` | Usługi warsztatu |
| Gallery | `gallery` | Galeria zdjęć |
| Media | `media` | Pliki mediów |
| Users | `users` | Użytkownicy (API Key auth) |

## n8n Workflows

### Zarządzanie przez API

```bash
# Lista wszystkich workflows
curl -s "https://n8n.srv1287530.hstgr.cloud/api/v1/workflows" \
  -H "X-N8N-API-KEY: $N8N_API_KEY"

# Utwórz workflow z pliku JSON
curl -s -X POST "https://n8n.srv1287530.hstgr.cloud/api/v1/workflows" \
  -H "X-N8N-API-KEY: $N8N_API_KEY" \
  -H "Content-Type: application/json" \
  -d @/root/zapacars/n8n/workflows/ai-article-generator.json

# Aktywuj workflow
curl -s -X PATCH "https://n8n.srv1287530.hstgr.cloud/api/v1/workflows/<id>" \
  -H "X-N8N-API-KEY: $N8N_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"active": true}'
```

### Lokalne workflow (do zaimportowania)

1. **AI Article Generator** (`ai-article-generator.json`)
   - Webhook: POST `/generate-article`
   - Generuje artykuły SEO przez Gemini AI
   - Zapisuje jako draft w Payload CMS

2. **Scheduled Publisher** (`scheduled-publisher.json`)
   - Cron: sobota 10:00
   - Publikuje najstarszy draft

### Wymagane credentials w n8n (dodaj ręcznie w UI):
- **Header Auth** (Payload CMS):
  - Header Name: `Authorization`
  - Header Value: `users API-Key 46a1f6cab4230490acccd07144a602d7cec3dbfb852f8adc`
  - (API Key nie wygasa - idealny do automatyzacji)
- **Google Gemini API**: klucz z https://aistudio.google.com/apikey

## Typowe zadania

### Dodanie nowej strony
1. Utwórz plik w `frontend/app/<nazwa>/page.tsx`
2. Commit, push, deploy frontend

### Dodanie nowej kolekcji w CMS
1. Utwórz plik w `payload-cms/src/collections/<Nazwa>.ts`
2. Dodaj do `payload-cms/src/payload.config.ts`
3. Commit, push, deploy CMS

### Debugowanie CMS
```bash
# Logi
docker logs vsc00ko8cw0ogogg4o0s4wko-* --tail 50

# Restart
docker restart vsc00ko8cw0ogogg4o0s4wko-*

# Status
docker ps | grep vsc00ko8cw0ogogg4o0s4wko
```

## Ważne uwagi

- Zmiany w kodzie wymagają przebudowy przez Coolify (nie tylko restart)
- CMS używa PostgreSQL z Supabase (kontener ac08ggs4gsckk8ccckgocko8)
- Frontend pobiera dane z CMS przez REST API
- Domena docelowa: zapacars.pl (aktualnie na sslip.io)
