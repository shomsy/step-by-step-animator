# Review Notes

Canonical review findings and follow-up observations.

## Rules

- keep one finding per item
- findings must include severity and risk
- findings must include `captured_at` and `updated_at`
- move confirmed defects into `management/BUGS.md`
- move actionable implementation follow-up into `management/TODO.md`
- log closed outcomes in `management/evidence/CHANGELOG.md`

## Current Items

### Lesson 09 Preview Bug Fix

**Status**: Resolved  
**Severity**: Medium  
**Risk**: Lesson usability impaired  
**Captured At**: 2026-04-03  
**Updated At**: 2026-04-03  

**Issue**: In lesson 09 (09-human-first-script-demo), step 5/10 (host-styling) and step 6/10 (shadow-styling) had missing visual preview because they lacked `Show Code: html` blocks, causing the preview system to not update the DOM for those steps.

**Root Cause**: Preview compilation relies on incremental `Show Code` blocks per artifact. Steps without HTML updates weren't triggering preview refreshes.

**Fix Applied**: Added identical `Show Code: html` blocks to steps 5 and 6, ensuring preview continuity.

**Validation**: Run `npm test` to confirm smoke tests pass, then manually verify lesson playback shows previews for all steps.

**Follow-up**: Monitor for similar issues in other lessons.

No active review findings.
