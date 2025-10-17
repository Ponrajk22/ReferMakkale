# ReferMakkale - Branching Strategy

## Branch Structure

### 🏠 main (Production)
- **Purpose**: Production-ready code
- **Protection**: Protected branch
- **Deployment**: Auto-deploys to GitHub Pages
- **Access**: Only via Pull Requests from `test` branch

### 🧪 test (Staging/Testing)
- **Purpose**: Pre-production testing
- **Deployment**: Auto-deploys to test environment
- **Access**: Merge from `dev` for testing
- **Testing**: Final validation before production

### 💻 dev (Development)
- **Purpose**: Active development work
- **Testing**: Build and test validation only
- **Access**: Direct commits allowed for development

## Workflow

1. **Development**: Work on `dev` branch
   ```bash
   git checkout dev
   git pull origin dev
   # Make changes
   git add .
   git commit -m "feat: your changes"
   git push origin dev
   ```

2. **Testing**: Merge to `test` for staging
   ```bash
   git checkout test
   git pull origin test
   git merge dev
   git push origin test
   ```

3. **Production**: Create PR from `test` to `main`
   - Go to GitHub
   - Create Pull Request: test → main
   - Review and merge

## Commands

### Switch branches
```bash
git checkout dev    # Development
git checkout test   # Testing
git checkout main   # Production (read-only)
```

### Keep branches in sync
```bash
# Update dev with latest main
git checkout dev
git pull origin main

# Update test with latest dev
git checkout test
git pull origin dev
```

## Environment URLs
- **Production**: https://ponrajk22.github.io/ReferMakkale/
- **Test**: Will be configured via GitHub Pages environments
- **Dev**: Local development only (npm run dev)
