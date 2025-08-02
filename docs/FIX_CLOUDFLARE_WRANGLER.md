# 🔧 CLOUDFLARE PAGES CONFIGURATION FIX

## ✅ **SOLUTION: Use Correct Deploy Command for Pages**

**The problem**: Using **Workers** deploy command for **Pages** project!

### 🎯 **CORRECT Deploy Commands for Cloudflare Pages:**

#### **For Static Export (Recommended):**
```
Framework preset: Next.js (Static HTML Export)
Build command: npm run build
Deploy command: npx wrangler pages deploy out --project-name=locphucode
Build output directory: out
Root directory: (leave empty)
```

#### **Alternative Static Deploy (Auto-create):**
```
Framework preset: Static HTML
Build command: npm run build  
Deploy command: npx wrangler pages deploy out
Build output directory: out
```

### 📝 **Key Differences:**

**❌ WRONG (Workers command):**
- `npx wrangler deploy` ← For Workers
- `npx wrangler versions upload` ← For Workers

**✅ CORRECT (Pages command):**
- `npx wrangler pages deploy out --project-name=locphucode` ← For Pages
- `npx wrangler pages deploy out --project-name=YOUR_PROJECT_NAME` ← For Pages

### 🔧 **Updated Configuration:**

```
Framework preset: Next.js (Static HTML Export)
Build command: npm run build
Deploy command: npx wrangler pages deploy out --project-name=locphucode
Non-production branch deploy command: npx wrangler pages deploy out --project-name=locphucode
Build output directory: out
Root directory: (leave empty)
```

### 🌍 **Environment Variables:**
```
NODE_VERSION=18
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NPM_CONFIG_PRODUCTION=false
RESEND_API_KEY=YOUR_NEW_RESEND_API_KEY
```

### � **AUTHENTICATION ERROR FIX:**

**Problem**: API token `phattv@locdo.tech` không có quyền deploy project `locphucode`

**✅ Solution 1: Use Existing Project Name**
```bash
# Check existing projects first:
npx wrangler pages project list

# Then use existing project name:
npx wrangler pages deploy out --project-name=EXISTING_PROJECT_NAME
```

**✅ Solution 2: Create Project in Dashboard First**
1. Go to https://dash.cloudflare.com/a73218340da79866800b502998751cb9/pages
2. Click "Create application" → "Connect to Git"
3. Select repository: `lockunlatui/locphucode`
4. Project name: `locphucode` 
5. Framework: `Next.js (Static HTML Export)`
6. Build command: `npm run build`
7. Build output: `out`
8. Then use: `npx wrangler pages deploy out --project-name=locphucode`

**✅ Solution 3: Remove Project Name (Auto-create)**
```bash
# Let Wrangler auto-create project:
npx wrangler pages deploy out
# Follow prompts to create new project
```

### 📝 **Command Explanation:**

**`npx wrangler pages deploy out --project-name=locphucode`**:
- `pages deploy` = Deploy to Cloudflare Pages (not Workers)
- `out` = Deploy từ thư mục `out` (static export output)
- `--project-name=locphucode` = Specify project name (required)
- Automatically uploads static files to Pages hosting

**Why this works:**
- ✅ Deploys static HTML/CSS/JS files
- ✅ Works with Next.js static export
- ✅ No server-side features needed
- ✅ Global CDN distribution
- ✅ Fast loading times

### 🚀 **Expected Deployment Flow:**
```
1. npm run build → Creates static export in 'out/' folder
2. npx wrangler pages deploy out --project-name=locphucode → Uploads to Cloudflare Pages
3. Website live at locphucode.pages.dev
```

### 🎯 **If Framework Change Doesn't Work:**

**Alternative**: Create NEW Pages project
1. **Delete current project** (if framework won't change)
2. **Create new Pages project**
3. **Choose "Connect to Git"** 
4. **Select repository**: `lockunlatui/locphucode`
5. **Framework preset**: `Next.js (Static HTML Export)`
6. **Build command**: `npm run build`
7. **Build output**: `out`

**This will create proper Pages project, not Workers.**

### 🎯 **Save & Redeploy:**
1. Clear the deploy command fields
2. Save configuration  
3. Trigger new deployment
4. Should build with Next.js successfully

---

## ✅ **Expected Result:**
```
✓ npm run build
✓ Static export: 15 pages
✓ Output directory: out/
✓ No Wrangler errors
✓ Deployment success
```

**The key is removing ALL Wrangler deploy commands from Cloudflare Pages settings!**
