#!/bin/bash

# file.sh - Auto-commit script modifying only root-level files

# Target total commits
commit_target=80
commit_count=0

# Date range
start_date="2024-10-01"
end_date="2024-11-30"
start_sec=$(date -d "$start_date" +%s)
end_sec=$(date -d "$end_date" +%s)

# Realistic commit messages
messages=(
  "Update dependencies"
  "Fix typo in config"
  "Update Docker setup"
  "Adjust test configuration"
  "Improve documentation"
  "Tweak ESLint settings"
  "Update nodemon config"
  "Refine prepublish script"
  "Update README"
  "Minor fix"
)

# Only root-level files (NO folder paths)
files=(
  "package.json"
  "package-lock.json"
  "Dockerfile"
  "docker-compose.yml"
  "jest.config.js"
  "babel.config.js"
  "README.md"
  ".gitignore"
  ".eslintrc.json"
  "nodemon.json"
  "LICENSE"
)

# Ensure files exist
for file in "${files[@]}"; do
  touch "$file"
done

# Loop over date range
for ((current=$start_sec; current<=$end_sec; current+=86400)); do
  date_str=$(date -d "@$current" +%Y-%m-%d)
  day_of_week=$(date -d "$date_str" +%u)

  # Skip some days randomly (esp. weekends)
  chance=$((day_of_week >= 6 ? 30 : 65))
  if (( RANDOM % 100 < chance )); then
    commits_today=$(( (RANDOM % 2) + 1 ))  # 1–2 commits per selected day
    for ((i=0; i<commits_today; i++)); do
      if (( commit_count >= commit_target )); then
        echo "✅ Reached $commit_target commits."
        exit 0
      fi

      # Generate random time (within 9 AM to 5 PM)
      hour=$((RANDOM % 9 + 9))
      minute=$((RANDOM % 60))
      second=$((RANDOM % 60))
      time_str=$(printf "%02d:%02d:%02d" "$hour" "$minute" "$second")
      datetime="$date_str $time_str"

      # Pick file and message
      file="${files[$RANDOM % ${#files[@]}]}"
      message="${messages[$RANDOM % ${#messages[@]}]}"

      # Modify file (append harmless comment)
      echo "// $message at $datetime" >> "$file"

      # Stage and commit with fake timestamp
      GIT_AUTHOR_DATE="$datetime" GIT_COMMITTER_DATE="$datetime" \
      git add "$file" && git commit -m "$message"

      ((commit_count++))
    done
  fi
done

echo "✅ Done. Total commits: $commit_count"
