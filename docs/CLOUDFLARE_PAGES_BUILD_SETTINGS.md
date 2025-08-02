# Cloudflare Pages Build Settings

## Cấu hình Build cho Cloudflare Pages

### Framework preset
- Chọn: **Next.js (Static HTML Export)** hoặc **Next.js**

### Build settings
- **Build command**: `yarn build`
- **Build output directory**: `.next` 
- **Root directory**: `/` (để trống)

### Environment Variables
Thêm các biến môi trường sau vào Cloudflare Pages:

```
NODE_VERSION=18
NEXT_TELEMETRY_DISABLED=1
RESEND_API_KEY=re_xxxxxxxx (your Resend API key)
```

### Node.js Version
- Đảm bảo Node.js version được set là **18** hoặc **20** trong Environment Variables
- Cloudflare Pages mặc định dùng Node.js 16, cần upgrade lên

### Build Process
1. Cloudflare Pages sẽ chạy `yarn install` tự động
2. Sau đó chạy `yarn build` 
3. Deploy nội dung từ thư mục `.next`

### Troubleshooting
- Nếu không thấy Build output directory option, thử refresh trang hoặc đổi Framework preset
- Nếu build fail, check Node.js version trong Environment Variables
- Nếu API routes không hoạt động, đảm bảo đã chọn đúng Framework preset là Next.js (không phải Static HTML Export)

### Alternative Static Export (nếu cần)
Nếu muốn dùng static export:
1. Uncomment `output: 'export'` trong next.config.js
2. Set Build output directory thành `out`
3. Lưu ý: API routes sẽ không hoạt động với static export
