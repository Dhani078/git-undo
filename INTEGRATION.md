INTEGRATION GUIDE: git-undo

1. Adding git-undo to Package Scripts
Add git-undo to your package.json scripts for instant team accessibility:

```json
{
  "scripts": {
    "git:undo": "npx git-undo last",
    "git:scan": "npx git-undo scan"
  }
}
```

2. Git Alias Configuration
Configure git-undo as a native Git sub-command in your git configuration:

```bash
git config --global alias.undo "!npx git-undo last"
git config --global alias.undolist "!npx git-undo scan"
```

Now you can invoke recovery natively:
```bash
git undo
git undolist
```

3. Integration with Local Git Hooks
Before executing risky automation scripts, trigger git-undo scan to verify baseline:

```bash
npx git-undo scan --limit 3
```

4. Automated Pipeline Recovery
In continuous integration environments or runner cleanup workflows:

```bash
git rebase origin/main || (git rebase --abort && npx git-undo last --force)
```
