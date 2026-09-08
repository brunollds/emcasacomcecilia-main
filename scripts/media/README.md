# Media library scripts

## Current delivery batches

The initial opt-in migration activated 304 exact references, not all uploaded
objects. The delivery map grows only through explicit, verified appends. The frozen
selections are `data/media-delivery-review-batch.json` and
`data/media-delivery-site-batch.json`; the latter preserves all prior migration
entries. They are historical audit inputs, not automatic content scanners in the
build or a fixed limit for future media.
Existing and newly retained original media stay in Git. External staging is
optional for NEW media; after verified upload, retain the exact bytes in the
canonical `public/` path before append. Editorial paths remain logical local URLs.
After append, run `node scripts/media/phase5-export.mjs --write`, then `--check`
before committing. `staged: true` is provenance, not permission to omit the file.
The gate allows growth, verifies each identity, and protects the Git HEAD baseline
against removal/remapping. It no longer requires fixed counts or total bytes.

Run `npx tsx scripts/media/test-delivery-integration.ts` for the combined map,
source-byte and schema checks. After a production build, run
`node scripts/media/test-review-delivery-html.mjs` for actual rendered image tags.
Client-only recipe/review listings also require a hydrated browser check.

Use `inventory --merge` for updates; plain inventory regeneration resets verification evidence.
New media delivery still requires explicit selection after upload and HTTPS checks;
upload alone never activates an object. Historical pilot examples below describe
their original scope and must not replace the current map without preserving later batches.

Inventory commands are local-only. The opt-in FTPS uploader below writes only new
objects and its own temporary files/lock; it never deletes local media or changes
editorial references. The URL contract is the separate HTTPS origin
`https://cdn.emcasacomcecilia.com`; infrastructure lifecycle, cache, root isolation, and upload
gates are outside this directory.

## Upload and verify one new asset

Place new optimized media in an absolute external staging directory, with paths
such as `images/reviews/brand/hero-v2.webp`. Keep that external recovery copy until
backup coverage is verified; never delete legacy Git originals. Python requires the
existing `python-dotenv` package; credentials stay in ignored `.env.local` under
`FTP_CDNUPLOAD`, never in commands or reports.

```powershell
$staging = 'C:\Users\Bruno\Downloads\Midias-Editorial'
node scripts/media/inventory.mjs --merge --staging-root "$staging" --out data/media-manifest.json
python scripts/media/upload-ftps.py --staging-root "$staging" --asset public/images/YOUR-FILE.webp
python scripts/media/upload-ftps.py --staging-root "$staging" --asset public/images/YOUR-FILE.webp --execute --report "$staging/upload-result.json"
node scripts/media/verify-remote.mjs --asset public/images/YOUR-FILE.webp --write
node scripts/media/retain-original.mjs --staging-root "$staging" --asset public/images/YOUR-FILE.webp
node scripts/media/retain-original.mjs --staging-root "$staging" --asset public/images/YOUR-FILE.webp --write
node scripts/media/prepare-delivery.mjs --append --asset public/images/YOUR-FILE.webp
node scripts/media/prepare-delivery.mjs --append --asset public/images/YOUR-FILE.webp --write
node scripts/media/phase5-export.mjs --write
node scripts/media/phase5-export.mjs --check
```

`public/images/YOUR-FILE.webp` is the canonical file path. Staging files are
marked `staged: true` in the manifest without recording machine paths. `retain-original`
copies verified exact bytes only to a missing canonical destination and never
overwrites. If the original is already in `public/`, omit `--staging-root` from
the uploader and omit retention. Commit the original plus metadata/map and exact
allowlist paths; no automatic upload, cleanup, build, commit or deploy occurs.
`phase5-export` requires every mapped original locally and the deploy guard checks
the target-SHA Git blob before excluding it from the archive. Unmapped new bytes
still fail archive preparation; `legacy-archive-media.json` is not expandable.

Replace the example path with the actual file. `--asset` is repeatable; `--all`
selects only images/videos directories and rejects the batch if any selected asset
fails preflight. Merge preserves evidence only for unchanged identities. Reverify new
or changed objects before activation. Append validates existing and selected entries,
preserves the map, and rejects remapping conflicts; use a new versioned local filename.
Append requires an existing valid map and local originals. Plain preparation is
replacement, not append. Stage originals and metadata by explicit paths only.
Run only one local operator at a time: atomic file writes are not a multi-writer lock.
Existing identical remote objects
are skipped after digest comparison; different bytes abort without overwrite.
The lock coordinates this uploader only, not other FTP clients; do not run other
writers concurrently. An interrupted run can leave `.editorial-upload-lock`:
inspect the failed run before an operator removes that exact lock, never auto-break it.

`uploaded` in the transfer report is NOT HTTP verification or publication. Only
after the verifier succeeds may an editor use `remote_url` from the manifest.
Video URL consumers/schema still require coordinated integration and validation;
do not blindly replace MP4 URLs. No deploy is performed by these commands.

Pilot receipts: `data/media-upload-pilot.json` and
`data/media-upload-pilot-repeat.json`. Current HTTP policy is no-store/no-transform,
accepted without requiring long cache. Range advertisement is checked on full GET;
206 responses must provide exact Content-Range and bytes, not repeat Accept-Ranges.

## Inventory

Run from the repository root:

```text
node scripts/media/inventory.mjs --merge --stdout
node scripts/media/inventory.mjs --merge --out data/media-manifest.json
```

The first command prints only; the second writes the merged manifest. Both require an existing
manifest and scan all supported image, video, and audio extensions below `public`,
including `images/drafts`. Records contain SHA-256, content-detected MIME, local-to-URL mapping,
owners, and literal references from JSON strings, Markdown, components, CSS, generated indexes,
and `localVideoMetadata` keys.

Fresh inventory (without `--merge`, reserved for initial setup) resets verification evidence.
Merge preserves `staged: true` provenance and upload/verification fields for unchanged identities;
editorial status
remains candidate. A missing reference is
`reference_status: "unknown"`, not an orphan decision. Draft ownership is recorded only when a
referencing owner JSON explicitly has `draft: true`; a `drafts` directory name does not change
asset status. Generated references are marked with `authority: "generated"` and are not treated as
editorial source authority.

Dimensions, duration, and codecs are best-effort local metadata. Missing values are `null` with
explicit `metadata_pending` entries; they are never invented and do not block SHA/MIME/owner
inventory. Legacy extension/content mismatches are retained with `mime_extension_match: false`
and a validation issue. A JPEG mislabeled as WebP uses an explicit `storage_filename` ending in
`.jpg`; original bytes, `source_path`, and `original_filename` stay unchanged. The uploader and
verifier validate that correction against MIME and SHA-256, rather than uploading a false suffix.

## Full media batch

```text
python scripts/media/upload-ftps.py --all --report data/media-upload-all-dryrun.json
python scripts/media/upload-ftps.py --all --execute --report data/media-upload-all.json
node scripts/media/verify-remote.mjs --scope media --report data/media-verify-all.json --write
```

`--all` / `--scope media` select only `public/images/` and `public/videos/`, including videos
stored below images. The current inventory has 333 files in that scope and five root SVGs outside
it. Upload receipts are atomically checkpointed after each successful object. Resume with a new
report filename: existing identical objects are read and skipped; divergent objects fail closed.
Do not run two upload processes or remove a live upload lock. The public verifier uses query-free
URLs and checkpoints results; `--write` only marks the manifest after the entire selection passes.
Neither command edits article references, removes originals, excludes archive contents, or deploys
the Node app. The separate Phase 5 export allowlist was deployed in 132571e
under Bruno's exception to waiting for native backup/restore. That exception
does not authorize deleting originals. Native backup proof remains pending.

## Delivery pilot

After the full scoped inventory is verified, `prepare-delivery.mjs --asset SOURCE_PATH` validates
an explicit selection without writing. Add `--write` to replace the small generated delivery map.
The selection is the complete desired map, not an append operation. Local source paths, metadata
keys and original bytes remain intact; only delivery consumers resolve selected URLs remotely.
An empty map restores local delivery, but that is not a production rollback until deployed.

The historical batch A delivery map had 19 entries: the three Genio S Touch pilot assets plus batch A's 16
local-video/poster references. Batch A covers the Damie loops and posters, Dolce Gusto loop-2,
Mini Me and table loops/posters, I Wanna Sleep MP4/WebM/poster, Poltrona and Samsung loop assets.
Run `npx tsx scripts/media/test-delivery-integration.ts` for the contract; `node
scripts/media/smoke-local.mjs` additionally requires the local production server on port 3100.
Editorial JSON, `localVideoMetadata` keys, and all non-video/poster assets remain local.

## Remote verification

The verifier is standalone and does not upload. It is intentionally not required for local tests:

```text
node scripts/media/verify-remote.mjs --help
node scripts/media/verify-remote.mjs --manifest data/media-manifest.json --asset public/videos/reviews/dolcegusto/genio-s-touch-loop-1.mp4
```

It accepts only the exact HTTPS origin and key path in the manifest, rejects redirects, applies a
timeout and a maximum full-response size, then checks GET status, MIME, byte count, SHA-256, and
bounded exact `Range` responses for video/audio. A failed response is cancelled without reading an
unbounded body. `--write` is intentionally not a publication step: it records only
`verification_status: "verified"` after successful GET/range checks and never changes the
editorial `status` to `published`.

## Tests

```text
node --test scripts/media/media.test.mjs
```

The native Node suite uses temporary files and an injected local test transport. It covers
determinism, draft-owner separation, unknown references, generated-reference classification,
path traversal, immutable-key collisions, GET digest/MIME, and exact media ranges. It does not
require DNS, CDN, Hostinger, an addon root, upload credentials, or infrastructure changes.

## Local CDN checker

```text
node scripts/media/monitor-cdn.mjs
node --test scripts/media/monitor-cdn.test.mjs
```

The checker is local and read-only. It uses the fixed HTTPS CDN hostname and fixture URL, default
TLS trust, a bounded response body, no redirects, exact status/MIME/bytes/SHA-256 checks, and the
peer certificate's remaining days with a 30-day threshold. The test suite injects offline
transports for success, expiring certificates, divergent hashes, timeout, redirects/status errors,
and oversized bodies. It is not an active monitor, does not schedule jobs, and does not send email
or create alerts; Bruno and `brunollds@icloud.com` remain the designated owner/contact for a future
operational integration.
Antes de commitar um lote de midia ja staged por allowlist explicita, execute
`node scripts/media/candidate-proof.mjs`. O comando monta a arvore exata do indice Git e
prova mapa, manifesto, atributos, archive e blobs; nao valida apenas o working tree.
Ative o hook versionado uma vez por clone com `node scripts/git/install-hooks.mjs`.
O hook usa os validadores contidos na propria arvore staged. Durante desenvolvimento
local desses validadores, faz apenas a prova do delta staged e emite aviso; o CI
repete `phase5-export --check` global numa arvore commitada sem skew de versao.
