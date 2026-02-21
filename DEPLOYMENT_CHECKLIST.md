# Frontend Deployment Checklist

Checklist before deploying React frontend to Vercel.

## ✅ Pre-Deployment Checks

### 1. Configuration Files

- [x] `package.json` - Updated with proper build command
- [x] `vite.config.js` - Configured with proper base path and build settings
- [x] `index.html` - Title updated to "CarbonChain Pro"
- [x] `.env.production` - Backend API URL configured
- [x] `vercel.json` - Frontend deployment config added
- [x] `.gitignore` - Includes .env files and .vercel

### 2. Dependencies

```bash
# Run this before deploying
npm run build

# Should complete without errors and create dist/ folder
```

### 3. Git Setup

```bash
# Verify you've initialized git and pushed to GitHub
git status
git log

# Should show commits
```

### 4. GitHub Repository

- [ ] Frontend repo created: `CarbonChain_frontend`
- [ ] Files pushed to GitHub
- [ ] Default branch set to `main`

## 🚀 Deployment Steps

### Step 1: Go to Vercel Dashboard

https://vercel.com/dashboard

### Step 2: Create New Project

Click **"New Project"** → **"Import Git Repository"**

### Step 3: Select Repository

Find and select `CarbonChain_frontend` repository

### Step 4: Configure Project

**Project Settings:**
- Project Name: `carbonchain-frontend` (or your preference)
- Framework Preset: `Vite`
- Root Directory: `./` (dot - root folder)

**Build Settings (should auto-detect):**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install --legacy-peer-deps`

### Step 5: Environment Variables

Add before deploying:

```
VITE_API_BASE_URL = https://carbonchain-backend.vercel.app/api
```

(Update this URL after you deploy the backend)

### Step 6: Deploy

Click **"Deploy"** button

Wait 2-5 minutes for build to complete.

### Step 7: Get Frontend URL

Once deployed successfully:
```
✅ https://carbonchain-frontend.vercel.app
```

### Step 8: Update Environment Variable

After backend is deployed, update:

1. Go to Vercel Project Settings
2. Environment Variables
3. Edit `VITE_API_BASE_URL`
4. Change to: `https://your-actual-backend-url.vercel.app/api`
5. Redeploy from Deployments tab

## 📋 Files Changed

| File | Change |
|------|--------|
| `vite.config.js` | Added build optimization and dev proxy |
| `index.html` | Updated page title |
| `.gitignore` | Added .env.local, .vercel |
| `.env.production` | Added backend URL |
| `vercel.json` | Created for static deployment |
| `src/services/api.js` | Already configured for env vars ✓ |
| `package.json` | No changes needed ✓ |

## 🧪 Local Testing Before Deploy

```bash
cd frontend

# Test production build locally
npm run build
npm run preview

# Should see: "> vite preview"
# Visit http://localhost:4173 to test

# Check that dist/ was created
dir dist

# Should show: index.html, assets/, etc.
```

## ✅ Deployment Checklist

Before clicking "Deploy" in Vercel:

- [ ] Git repository pushed to GitHub
- [ ] `npm run build` completes without errors locally
- [ ] `dist/` folder created successfully
- [ ] `vercel.json` exists
- [ ] `.env.production` has backend URL (can be placeholder initially)
- [ ] All dependencies installed (`node_modules` exists)

## 🆘 Common Issues

### Issue: Build fails with "Command not found"

**Solution:**
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install --legacy-peer-deps
npm run build
```

### Issue: "Module not found" errors

**Solution:**
```bash
# Ensure all dependencies are installed
npm install --legacy-peer-deps

# Check package.json has all imports
```

### Issue: Page loads but no styling

**Solution:**
- Check Tailwind CSS is processing correctly
- Verify `index.css` is imported in `main.jsx`
- Check build output in Vercel logs

### Issue: API calls fail in production

**Solution:**
1. Check `VITE_API_BASE_URL` in Vercel environment variables
2. Verify backend URL is correct and deployed
3. Check browser console for full error
4. Verify CORS is enabled on backend

## 📊 After Deployment

### Test Frontend

```
https://carbonchain-frontend.vercel.app
```

Should show:
- [ ] Dashboard loads
- [ ] Navigation works
- [ ] Styling applied correctly
- [ ] No 404 errors in console

### Test API Connection

Open browser console (F12) and:

```javascript
// Test if can reach backend
fetch('https://carbonchain-backend.vercel.app/api/health')
  .then(r => r.json())
  .then(d => console.log(d))
```

Should return:
```json
{
  "success": true,
  "message": "CarbonChain Pro Server is Running"
}
```

## 🔄 Future Deployments

After initial setup, deployments are automatic:

```bash
# Make changes
# git add .
# git commit -m "Update"
# git push origin main

# Vercel automatically redeploys!
```

To manually redeploy:

1. Vercel Dashboard → Your Project
2. Deployments tab
3. Click "..." on latest deployment
4. Select "Redeploy"

## 📚 Environment Variables Explained

### For Local Development (`src/services/api.js`)

```javascript
// Uses VITE_API_BASE_URL from .env or defaults to localhost
const API_BASE_URL = 
  import.meta.env.VITE_API_BASE_URL ||
  (localhost ? 'http://localhost:5000/api' : '/api');
```

### For Production (Vercel)

The `VITE_API_BASE_URL` env var from Vercel Project Settings is used.

### For Local Testing

Create `.env.local`:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🎯 Success Indicators

✅ Frontend deploys without errors
✅ Page loads at your Vercel URL
✅ Styling and layout correct
✅ Can navigate between pages
✅ (After backend deploy) API calls work

---

**You're ready to deploy!** 🚀

Last updated: February 22, 2026
