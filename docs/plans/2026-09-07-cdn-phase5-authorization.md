# Phase 5: revised authorization and recovery evidence

Bruno explicitly authorized continuing Phase 5 without waiting for the native
Hostinger snapshot on 2026-09-07. This decision supersedes the earlier requirement
to wait for a post-upload native backup and its isolated restore before export
exclusion. It does not establish that the native backup exists or was tested.

Decision attribution: Bruno made this exception as project owner. Claude did
not waive the backup/restore gate; his subsequent review raised no technical
objection to export-ignore-only deployment with the recovery risk acknowledged.
Deleting original files (including git rm) is NOT authorized by this exception.

Local working files and local Git objects share a machine/failure domain; they
are not independent backups. GitHub is a separate retained source only for
objects actually pushed. This operation excludes bytes from git archive, not
from Git tracking or history.

Recovery after CDN corruption can re-upload the original content-addressed
bytes and verify public hashes. A local-serving rollback requires restoring
both packaging AND delivery rules/map, because reverting export-ignore alone
does not disable direct CDN rendering. Any such managed redeploy still obeys
the archive size guard; its recovery time is not guaranteed.

Scope: exact verified media exclusions from the deployment export only. No
original files are deleted from disk or Git. Shared unrelated work remains out
of scope. Build, integrity, legacy URL compatibility and packaging checks remain
required. This document does not claim a new commit or deployment occurred.

## Recovery tested now

`node scripts/media/test-git-media-recovery.mjs` restored all 304 mapped assets
directly from Git revision f8f88a2f2529a645399fa3da0c4ee50186465e87 into:

`C:\Users\Bruno\AppData\Local\Temp\emcasa-media-git-recovery-Fzlmlq`

All 44,729,059 bytes matched manifest sizes and SHA-256, both before writing and
after reading the restored files. The script uses Git blobs rather than
`git archive`, deliberately bypassing export-ignore for recovery.

This is a tested local Git recovery path, NOT an independent native backup.
The additional restored copy shares the local machine's failure domain. Keep
the source repository and original media; native backup verification remains an
operational follow-up, not falsely marked complete.

## Remaining checks

- Exact export allowlist, with no broad public-directory exclusion.
- Packaged build with excluded files genuinely absent, and required video
  verification manifest/helpers retained.
- Legacy raw image, image optimizer and video Range regression on that build.
- Report compressed rehearsal bytes separately from the attested deployment
  archive. Only deploy:prepare can produce the authoritative release archive.
