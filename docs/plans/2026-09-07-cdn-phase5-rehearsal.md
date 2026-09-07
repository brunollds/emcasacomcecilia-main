# Phase 5 implementation and packaged rehearsal

## Scope

Local implementation under Bruno's revised authorization. No commit, push,
deployment, source deletion, live restore or shared-worktree synchronization.
Production remains on the compatibility release b0bbe5369842c432db8548a89f2423d11815fde9.

`.gitattributes` gains 304 literal paths (294 images, 10 videos), not a wildcard.
The original files remain in Git and on disk. The export checker validates
local bytes and manifest/map/CDN identity before allowing the block.

## Isolated package

- Candidate source clone: `C:\Users\Bruno\Downloads\EmcasaCdnPhase5-20260907`.
- Rehearsal Git tree (not a commit): `49436bf3b3f83cd18eedda524af454e17c46470a`.
- Archive: `C:\Users\Bruno\Downloads\emcasa-phase5-rehearsal-20260907.tar.gz`.
- Compressed bytes: 4,749,194.
- SHA-256: `e4a47b26ca56ea218b18e7ce7da820e5c689d151bb443c05c420c9668d1fe633`.
- Extracted build root: `C:\Users\Bruno\Downloads\EmcasaCdnPhase5Packaged-20260907`.

An alternate Git index was used only in the isolated clone to stage explicit
candidate paths and generate the tree. No branch commit was created and the
shared repository index remains empty. Concurrent editorial JSON/vault changes
were not copied into this rehearsal. The build proof manifest is included, not
imported into the application runtime bundle.

Archive content verification: all 304 mapped media absent, all 36 public files
not excluded by attributes present, required build dependencies present.
This is NOT an attested deploy archive. A real release still uses deploy:prepare.

## Verification

- Exact allowlist check and 5 Phase 5 regression tests passed.
- 14 existing resolver/routing/video-proof tests passed.
- All 304 originals restored from Git with matching SHA-256 (see authorization).
- npm ci and typecheck passed in the extracted package.
- npm lint passed in the extracted package.
- Build validation chain passed through video, image-host and navigation checks.
- Full production build passed: 323/323 pages, including the HTML language suite.
- Ten generated HTML pages passed CDN delivery assertions (home, international
  hub, three reviews, about, three coupon pages and one recipe).
- Packaged Next server on localhost:3100 passed all 304 legacy HTTP routes,
  raw sample SHA-256 checks, two legacy image-optimizer requests, video redirect
  plus 206 Range, unchanged local SVG and missing-path 404. The mapped files
  were genuinely absent from this extracted package during these tests.

The HTTP test was updated to compare raw image bytes to the content-addressed
map digest rather than require the deliberately excluded local original.

Native Hostinger post-upload backup and native restore remain unproven; Bruno
accepted proceeding without waiting. npm ci reports 17 existing dependency
vulnerabilities; dependency versions were not changed by this work.
