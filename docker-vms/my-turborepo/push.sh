#!/bin/bash
# push.sh — Automate git add, commit, pull, and push

# Exit immediately if a command exits with a non-zero status
set -e

# Step 1: Add all changes
git add .

# Step 2: Commit with a message (use current date/time if no message provided)
if [ -z "$1" ]; then
  COMMIT_MSG="update: $(date '+%Y-%m-%d %H:%M:%S')"
else
  COMMIT_MSG="$1"
fi
git commit -m "$COMMIT_MSG"

# Step 3: Pull latest changes before pushing (avoid conflicts)
git pull --rebase origin main

# Step 4: Push to main branch
git push origin main

echo "✅ Successfully pushed to GitHub with message: '$COMMIT_MSG'"
