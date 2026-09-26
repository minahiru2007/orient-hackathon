# TaskFlow API — Setup Guide

> **Accuracy note.** The project `README.md` contains several inaccuracies that
> were found during the env-archaeologist scan. This guide reflects what the
> code *actually* does, not what the README claims. Discrepancies are called out
> explicitly.

---

## Prerequisites

| Tool | Minimum version | Why |
|------|-----------------|-----|
| Node.js | 18 LTS | Runtime |
| npm | 9 | Dependency install |
| PostgreSQL | 14 | Primary datastore |
| `openssl` (or any random-string generator) | any | Generating `JWT_SECRET` |

> **README discrepancy:** The README says the database is MongoDB. The code
> (and `DATABASE_URL` format validation in `db.js`) requires **PostgreSQL**.

---

## 1 — Clone and install dependencies

```bash
git clone <repo-url>
cd orient-hackathon/sample-app
npm install
```

---

## 2 — Create the database

Run this once against your local PostgreSQL instance:

```sql
CREATE DATABASE taskflow;
```

If you are running Postgres via Docker:

```bash
docker run --name taskflow-db \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=taskflow \
  -p 5432:5432 \
  -d postgres:16
```

---

## 3 — Set environment variables

Copy the example file and fill in the two **required** values:

```bash
cp ../onboarding-pack/.env.example .env
```

Open `.env` in your editor. The full variable reference is below.

### Required — app will not start without these

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection URL | `postgres://user:password@localhost:5432/taskflow` |
| `JWT_SECRET` | Secret for signing session tokens | *(see generation step below)* |

**Generate a secure `JWT_SECRET`:**

```bash
openssl rand -hex 32
```

Paste the output as the value of `JWT_SECRET` in `.env`.

### Optional — defaults applied when absent

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8080` | TCP port the server listens on |
| `SESSION_TTL_MINUTES` | `60` | Session lifetime in minutes |
| `LOG_LEVEL` | `info` | Verbosity: `debug` \| `info` \| `warn` \| `error` |

### Variable source map

| Variable | File | Line | Required? | Default |
|----------|------|------|-----------|---------|
| `DATABASE_URL` | `src/config.js` | 22 | **Yes** | — |
| `JWT_SECRET` | `src/config.js` | 25 | **Yes** | — |
| `PORT` | `src/config.js` | 18 | No | `8080` |
| `SESSION_TTL_MINUTES` | `src/config.js` | 28 | No | `60` |
| `LOG_LEVEL` | `src/config.js` | 31 | No | `"info"` |

> All environment variables are read exclusively in `src/config.js` and
> accessed via the `config` module everywhere else. No other source file
> calls `process.env` directly.

---

## 4 — Load the `.env` file

The app does **not** include `dotenv` as a dependency. You have two options:

**Option A — load at launch with Node's `--env-file` flag (Node 20+):**

```bash
node --env-file=.env src/index.js
```

**Option B — export manually (any Node version):**

```bash
export $(grep -v '^#' .env | xargs)
node src/index.js
```

**Option C — add `dotenv` yourself:**

```bash
npm install dotenv
```

Then add `require('dotenv').config();` as the first line of `src/index.js`.

---

## 5 — Start the server

```bash
npm start
```

Expected output:

```
TaskFlow API listening on port 8080
```

> **README discrepancy:** The README says `node app.js` and port `3000`. The
> real entry point is `src/index.js` (`npm start`) and the default port is
> **8080**.

---

## 6 — Verify the server is running

```bash
curl http://localhost:8080/health
# Expected: {"status":"ok"}
```

---

## 7 — Call a protected endpoint

The `JWT_SECRET` you set is the basis for session tokens. In the sample app,
a valid Bearer token is the literal string `session-<JWT_SECRET>`:

```bash
curl -H "Authorization: Bearer session-<your-JWT_SECRET>" \
     http://localhost:8080/tasks
# Expected: {"tasks":[...]}
```

> **README discrepancy:** The README says authentication uses the
> `legacy-auth` module (API keys via `x-api-key` header). That module
> (`src/auth/legacy-auth.js`) is dead code — it is not imported anywhere.
> The live auth is `src/auth/session.js`, which uses Bearer tokens.

---

## 8 — Run the tests

```bash
npm test
```

Expected output: **1 passing, 1 failing**.

The failing test (`returns the service version matching package.json`) is a
deliberate starter task for new developers — `GET /health` does not yet
return a `version` field. Implementing it in `src/routes/health.js` and
making the test pass is the intended first contribution.

---

## Known README inaccuracies (summary)

| README claim | Reality |
|---|---|
| Entry point is `app.js` | Entry point is `src/index.js` |
| Default port is `3000` | Default port is `8080` |
| Database is MongoDB | Database is **PostgreSQL** |
| Auth uses `legacy-auth` (API key) | Auth uses `session.js` (Bearer JWT) |
| `/health` returns name + version | `/health` only returns `{"status":"ok"}` |

---

## Troubleshooting

**`Missing required environment variable: DATABASE_URL`**
→ Your `.env` was not loaded, or the value is blank. Check step 4.

**`Missing required environment variable: JWT_SECRET`**
→ Same cause. Ensure `JWT_SECRET` is set and non-empty.

**`[db] DATABASE_URL does not look like a Postgres URL`**
→ The URL must start with `postgres://`. A `postgresql://` prefix is also
  rejected by the current check — use `postgres://` exactly.

**Port already in use**
→ Set `PORT` to a free port, e.g. `PORT=3001`.
