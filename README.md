# Harmonica

A website for learning to play the harmonica.

Built with React 18 + Create React App (via [craco](https://craco.js.org/)), organised
with [Feature-Slice Design](https://feature-sliced.design/). See `AGENTS.md` for the
architecture overview.

## Local setup

The dev server is served at **https://harmonica.local** — not `localhost`. Two
one-time machine-level steps are needed before `npm start` will work; everything
else is already in the repo (`.env.development`).

### Why not localhost?

`@features/audio/soundRecorder` uses `navigator.mediaDevices.getDisplayMedia()`.
That API is only exposed in a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts).
Browsers grant `localhost` that status implicitly, but a custom hostname like
`harmonica.local` gets nothing for free — over plain HTTP `navigator.mediaDevices`
is `undefined` and recording silently dies. So the local server speaks real TLS,
which also makes dev match production.

### 1. Point harmonica.local at your machine

Run once in an **elevated** terminal (Administrator).

Windows — PowerShell:

```powershell
Add-Content -Path "$env:windir\System32\drivers\etc\hosts" -Value "`n127.0.0.1 harmonica.local"
```

macOS / Linux:

```bash
echo "127.0.0.1 harmonica.local" | sudo tee -a /etc/hosts
```

Verify: `ping harmonica.local` should answer from `127.0.0.1`.

### 2. Issue a locally-trusted certificate

[mkcert](https://github.com/FiloSottile/mkcert) runs a private certificate
authority that it registers in your OS (and Firefox) trust store, so the
certificates it signs are trusted with no browser warning. Nothing it generates
leaves your machine.

Install it once — Windows (Chocolatey, elevated terminal):

```powershell
choco install mkcert -y
```

macOS: `brew install mkcert nss` · Linux: see the mkcert README.

Then register the local CA — this is the step that needs Administrator/sudo:

```powershell
mkcert -install
```

Finally generate the certificate for this project, from the repository root (no
elevation needed):

```powershell
mkdir certs
mkcert -cert-file certs/harmonica.local.pem -key-file certs/harmonica.local-key.pem harmonica.local
```

`certs/` is gitignored — certificates are per-machine and must never be
committed. Re-run this last command on each new checkout or machine.

### 3. Start it

```bash
npm install
npm start
```

Opens https://harmonica.local. Port 443 needs no elevation on Windows; on
macOS/Linux either run the server with elevated rights or set `PORT=3443` in
`.env.local` (gitignored) and use https://harmonica.local:3443.

## Commands

| Command | Description |
|---------|-------------|
| `npm start` | Dev server at https://harmonica.local (hot reload) |
| `npm run build` | Production build into `build/` |
| `npm test` | Jest in watch mode |
| `npm test -- --watchAll=false` | Single test run (CI mode) |

Use `craco`, never `react-scripts` directly — the path aliases live in
`craco.config.js`.

## Troubleshooting

**`You specified SSL_CRT_FILE in your env, but the file ... can't be found`** —
step 2 has not been run in this checkout. Re-run the `mkcert -cert-file …` command.

**Browser warns the certificate is not trusted** — `mkcert -install` was skipped
or was run without elevation. Re-run it, then restart the browser completely.

**`EADDRINUSE` / `EACCES` on port 443** — something else holds the port
(`Get-NetTCPConnection -LocalPort 443` on Windows). Override with `PORT=3443` in
`.env.local`.

**Recording does nothing, console logs "Browser doesn't support audio
recording"** — the page is on `http://`, not `https://`. Check the address bar;
the secure-context requirement above is why.
