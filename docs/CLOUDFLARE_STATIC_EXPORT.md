# 🚀 Cloudflare Pages Deployment Guide - STATIC EXPORT

## ✅ **FINAL SOLUTION - Static Export Working**

### 🔧 **Cloudflare Pages Settings (COPY EXACTLY):**
```
Framework preset: Next.js (Static HTML Export)
Build command: npm run build
Build output directory: out
Root directory: (leave empty)

❌ REMOVE THESE IF PRESENT:
Deploy command: (leave empty - remove "npx wrangler deploy")
Non-production branch deploy command: (leave empty)
```

### ⚠️ **CRITICAL FIX FOR WRANGLER ERROR:**
If you see "wrangler deploy" in Cloudflare Pages settings:
1. **Edit Build Configuration** in Cloudflare Pages
2. **Clear "Deploy command"** field completely  
3. **Clear "Non-production branch deploy command"** field
4. **Keep only "Build command": npm run build**
5. **Framework preset**: Next.js (Static HTML Export)

### 🌍 **Environment Variables:**
```
NODE_VERSION=18
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NPM_CONFIG_PRODUCTION=false
NEXT_PUBLIC_SITE_URL=https://your-site.pages.dev
RESEND_API_KEY=YOUR_NEW_RESEND_API_KEY_HERE
```

### 🚨 **SECURITY WARNING:**
**API Key đã bị exposed trên GitHub! Cần thực hiện ngay:**
1. Revoke old Resend API key tại: https://resend.com/api-keys
2. Tạo new API key mới
3. Thêm vào Environment Variables trên Cloudflare Pages
4. **KHÔNG BAO GIỜ** commit API keys vào code

---

## 🎯 **Deploy Steps:**

### 🚨 **CRITICAL: You MUST Clear Deploy Commands in Cloudflare**

**Your current Cloudflare Pages settings still have:**
- Deploy command: `npx wrangler deploy` ❌ 
- Non-production deploy: `npx wrangler versions upload` ❌

**THIS IS CAUSING THE WRANGLER ERROR!**

### **Fix Steps:**
1. **Vào**: https://dash.cloudflare.com
2. **Pages** → Your project → **Settings**
3. **Build & deployments** → **Edit Configuration**
4. **CLEAR these fields completely:**
   - Deploy command: `(delete everything - leave empty)`
   - Non-production branch deploy command: `(delete everything - leave empty)`
5. **Keep only:**
   - Build command: `npm run build`
   - Build output directory: `out`
   - Framework preset: `Next.js (Static HTML Export)`

### **Screenshot Reference:**
Based on your screenshot, you have:
- Build command: `npm run build` ✅ (correct)
- Deploy command: `npx wrangler deploy` ❌ (REMOVE THIS)
- Non-production: `npx wrangler versions upload` ❌ (REMOVE THIS)

**Just clear/delete the Deploy command fields!**

---

## ✅ **What Works Now:**
- ✅ **Static Export**: Website được export thành static HTML
- ✅ **Multi-language**: All locales (vi, en, ja, ko, zh) 
- ✅ **PWA**: Service worker hoạt động
- ✅ **Image optimization**: Unoptimized cho static export
- ✅ **Build success**: 15 pages generated successfully

## ❌ **What's Disabled (For Static Export):**
- ❌ **API Routes**: Contact form email sending không hoạt động
- ❌ **Server-side features**: Middleware limited 
- ❌ **Dynamic headers/redirects**: Phải config trong Cloudflare

---

## 📧 **Contact Form Alternative:**

Với static export, email sending cần external service:

### **Option 1: Formspree**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="email" name="email">
  <textarea name="message"></textarea>
  <button type="submit">Send</button>
</form>
```

### **Option 2: Netlify Forms**
```html
<form netlify>
  <input type="email" name="email">
  <textarea name="message"></textarea>
  <button type="submit">Send</button>
</form>
```

### **Option 3: EmailJS**
```javascript
emailjs.send('service_id', 'template_id', {
  to_email: 'locdx@locdo.tech',
  from_email: form.email,
  message: form.message
});
```

---

## 🚀 **Final Status:**

**✅ READY TO DEPLOY:**
- Build command: `npm run build` 
- Output directory: `out`
- Framework: Next.js (Static HTML Export)
- Node.js: 18
- All pages working
- PWA enabled

**🎊 Deploy ngay với settings trên!** 

Static export sẽ work 100% trên Cloudflare Pages và load cực nhanh với Global CDN! 🚀
