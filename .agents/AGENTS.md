# Custom Workspace Rules

## Git Restrictions
- **CRITICAL:** The agent is strictly forbidden from executing *any* Git command (`git add`, `git commit`, `git status`, `git diff`, etc.) without asking for your permission first.
- The agent must never run `git push` or suggest git pushes under any circumstances. Pushing to GitHub must ONLY be done by the user themselves.
