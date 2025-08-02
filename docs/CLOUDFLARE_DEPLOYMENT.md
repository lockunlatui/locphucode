# 🚀 Cloudflare Pages Deployment Guide

## 📋 **Chuẩn Bị Deploy**

#### 2. **Kết nối Cloudflare Pages:**
   - Vào: https://dash.cloudflare.com
   - Pages → Create a project
   - Connect to Git → Select repository
   - Configure build settings:
     - Build command: `npm run build`
     - Build output: `.next`
     - Environment variables: Add từ list trên
     
### ⚠️ **QUAN TRỌNG - Cloudflare Pages Settings:**
```
Framework preset: Next.js (Static HTML Export)
Build command: npm run build  
Build output directory: .next
Root directory: (leave empty)
Node.js version: 18 (in Environment Variables)
```

### 🚨 **Nếu Cloudflare cố dùng Wrangler thay vì Next.js:**
- **Đảm bảo chọn Framework preset là "Next.js" KHÔNG PHẢI "None" hoặc "Static"**
- **Nếu vẫn lỗi, thử Framework preset: "Next.js (Static HTML Export)"**
- **Đảm bảo Build command là: `npm run build`**Build Settings cho Cloudflare Pages**
- **Framework preset**: Next.js
- **Build command**: `npm run build`
- **Build output directory**: `.next`
- **Root directory**: `/`
- **Node.js version**: `18.x`

### 2. **Environment Variables**
Thêm vào Cloudflare Pages Settings → Environment Variables:

```env
# Production Environment Variables
NODE_ENV=production
NODE_VERSION=18
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_SITE_URL=https://your-site.pages.dev

# Email Notifications
RESEND_API_KEY=YOUR_NEW_RESEND_API_KEY_HERE

# Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=123456789012345
```

---

## � **READY TO DEPLOY! Đã sửa xong Yarn conflicts**

### ✅ **Vấn đề đã được sửa:**
1. **Yarn lockfile conflicts** → Đã reinstall với Yarn 1.22.22
2. **Node.js version issues** → Đã thêm .nvmrc và engines config
3. **Build system compatibility** → Đã test build thành công
4. **Email notification system** → Working với locdo.tech domain

### 🔧 **Settings cho Cloudflare Pages:**

**Framework preset**: `Next.js`  
**Build command**: `yarn build`  
**Build output directory**: `.next`  
**Root directory**: `/` (để trống)

**Environment Variables** (QUAN TRỌNG):
```
NODE_VERSION=18
NEXT_TELEMETRY_DISABLED=1
RESEND_API_KEY=re_YkSQpBBn_PXHyiXKrDCN1TzJ5StDHyxta
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-site.pages.dev
```

---

## �🔧 **Deploy Steps**

### Method 1: GitHub Integration (Recommended)

1. **Push code lên GitHub:**
```bash
git add .
git commit -m "Ready for Cloudflare Pages deployment"
git push origin main
```

2. **Kết nối Cloudflare Pages:**
   - Vào: https://dash.cloudflare.com
   - Pages → Create a project
   - Connect to Git → Select repository
   - Configure build settings:
     - Build command: `yarn build`
     - Build output: `.next`
     - Environment variables: Add từ list trên

### Method 2: Direct Upload

1. **Build locally:**
```bash
yarn build
yarn export  # Nếu cần static export
```

2. **Upload folder `.next` hoặc `out`**

---

## ⚙️ **Tối Ưu cho Cloudflare**

### 1. **Update next.config.js cho Edge Runtime:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Existing config...
  
  // Cloudflare Pages optimization
  experimental: {
    runtime: 'edge', // Optional: for edge runtime
  },
  
  // Static export (nếu cần)
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // For static export
  },
}
```

### 2. **Tạo _redirects file:**
```
/api/* /api/:splat 200
/* /index.html 200
```

### 3. **Headers optimization:**
```
/api/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable
```

---

## 🚀 **Quick Deploy Commands**

```bash
# 1. Install dependencies
yarn install

# 2. Build for production  
yarn build

# 3. Test locally
yarn start

# 4. Push to GitHub (auto-deploy via Cloudflare)
git add .
git commit -m "Deploy to Cloudflare Pages"
git push origin main
```

---

## 📧 **Email System Trên Production**

### Đã Setup:
- ✅ API routes tương thích Cloudflare
- ✅ Environment variables ready
- ✅ Email notification system
- ✅ Domain locdo.tech verified

### Test sau deploy:
```javascript
// Test API endpoint
fetch('https://your-site.pages.dev/api/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: 'locdx@locdo.tech',
    subject: 'Test from Cloudflare',
    html: '<h1>Deploy successful!</h1>',
    priority: 'HIGH',
    lead_id: 'deploy-test'
  })
})
```

---

## 🎯 **Custom Domain Setup**

1. **Add domain tại Cloudflare Pages:**
   - Pages → Custom domains
   - Add `locdo.tech`

2. **Update DNS records:**
   - CNAME: `locdo.tech` → `your-site.pages.dev`
   - A: `@` → Cloudflare IP

3. **SSL/TLS:** Auto-enabled

---

## 📊 **Performance Monitoring**

Cloudflare tự động cung cấp:
- ✅ Global CDN
- ✅ Edge caching  
- ✅ Automatic HTTPS
- ✅ DDoS protection
- ✅ Analytics dashboard

---

Bạn muốn tôi setup cái nào trước?
1. 🔧 **Tối ưu config** cho Cloudflare
2. 🚀 **Push code lên GitHub** 
3. 📝 **Hướng dẫn setup** trên Cloudflare dashboard
