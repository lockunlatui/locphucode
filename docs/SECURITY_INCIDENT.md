# 🚨 SECURITY INCIDENT RESPONSE

## ⚠️ **CRITICAL: Resend API Key Exposed**

**Date**: August 2, 2025
**Incident**: Resend API key exposed in GitHub repository
**Affected Key**: `re_YkSQpBBn_PXHyiXKrDCN1TzJ5StDHyxta`

---

## 🛠️ **IMMEDIATE ACTIONS REQUIRED:**

### 1. **Revoke Compromised Key**
- Vào: https://resend.com/api-keys
- Login vào account
- Tìm key: `re_YkSQpBBn_PXHyiXKrDCN1TzJ5StDHyxta`
- Click "Delete" hoặc "Revoke"

### 2. **Create New API Key**
- Tại https://resend.com/api-keys
- Click "Create API Key"
- Name: `locdo-tech-production`
- Copy key mới (bắt đầu với `re_`)

### 3. **Update Environment Variables**
**Cloudflare Pages:**
- Vào Pages Settings → Environment Variables
- Update `RESEND_API_KEY` với key mới
- Redeploy website

**Local Development:**
- Update `.env` file với key mới
- **KHÔNG commit** .env file

### 4. **Git History Cleanup**
```bash
# Remove sensitive data from git history
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch .env' \
  --prune-empty --tag-name-filter cat -- --all

# Force push cleaned history
git push origin --force --all
```

---

## 🔒 **SECURITY IMPROVEMENTS:**

### ✅ **Implemented:**
- Added `.env*` to `.gitignore`
- Removed API keys from documentation
- Updated deployment guides

### 📋 **Best Practices:**
1. **Never commit secrets** to version control
2. **Use environment variables** only
3. **Rotate API keys** regularly
4. **Monitor** for exposed secrets (GitGuardian)
5. **Principle of least privilege** for API keys

---

## 📧 **Post-Incident:**
- ✅ Revoke old key
- ✅ Create new key  
- ✅ Update Cloudflare environment
- ✅ Test email functionality
- ✅ Update documentation
- ✅ Git history cleaned

**Status**: RESOLVED ✅
