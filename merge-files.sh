#!/usr/bin/env bash
set -euo pipefail

# Canonical PolyMoly wrapper, adapted to run from this repository by delegating
# into the PolyMoly toolchain and passing an absolute target directory.
POLYMOLY_ROOT="${POLYMOLY_ROOT:-/home/shomsy/projects/polymoly}"

if [[ ! -d "$POLYMOLY_ROOT" ]]; then
  echo "PolyMoly repo not found at: $POLYMOLY_ROOT" >&2
  exit 1
fi

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <target-dir> [review-pack-options...]" >&2
  exit 1
fi

TARGET_DIR="$1"
shift

if [[ "$TARGET_DIR" != /* ]]; then
  TARGET_DIR="$(pwd)/$TARGET_DIR"
fi

TARGET_DIR="$(cd "$TARGET_DIR" && pwd)"

PACKAGE_NAME=""

if [[ -f "$TARGET_DIR/package.json" ]]; then
  PACKAGE_NAME="$(sed -n 's/^[[:space:]]*"name":[[:space:]]*"\([^"]*\)".*/\1/p' "$TARGET_DIR/package.json" | head -n 1)"
fi

TARGET_BASENAME="$(basename "$TARGET_DIR")"

(
  cd "$POLYMOLY_ROOT"
  env TMPDIR=/tmp GOTMPDIR=/tmp GOCACHE=/tmp/gocache \
    go run ./system/tools/poly/cmd/poly review pack "$TARGET_DIR" "$@"
)

if [[ -n "$PACKAGE_NAME" && "$PACKAGE_NAME" != "$TARGET_BASENAME" ]]; then
  ORIGINAL_OUTPUT="$TARGET_DIR/$TARGET_BASENAME.txt"
  RENAMED_OUTPUT="$TARGET_DIR/$PACKAGE_NAME.txt"

  if [[ -f "$ORIGINAL_OUTPUT" ]]; then
    mv -f "$ORIGINAL_OUTPUT" "$RENAMED_OUTPUT"
  fi
fi
