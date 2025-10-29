# Deploy YouTube Stats ke Vercel

## 🚀 Deploy via Vercel Dashboard (RECOMMENDED)

### Langkah-langkah:

1. **Buka Vercel Dashboard**: https://vercel.com/
2. **Import Project** atau buka project yang sudah ada
3. **PENTING - Project Settings**:
   - Klik **Settings** (gear icon)
   - Scroll ke **Root Directory**
   - Klik **Edit**
   - Set: `youtube-stats-nextjs`
   - Klik **Save**

4. **Environment Variables**:
   - Settings → Environment Variables
   - Add New:
     - **Name**: `YOUTUBE_API_KEY`
     - **Value**: `AIzaSyACAf_WaYhDTUqNkzoVHhwCvtQ-DgpnFpI`
     - **Environments**: Production, Preview, Development
   - Klik **Save**

5. **Redeploy**:
   - Kembali ke **Deployments** tab
   - Klik **⋮** (3 dots) pada deployment terakhir
   - Klik **Redeploy**

## ✅ Verifikasi Deployment

Setelah redeploy selesai, test API endpoint:

```bash
curl -X POST https://your-project.vercel.app/api/zai/youtube \
  -H "Content-Type: application/json" \
  -d '{"url": "https://youtube.com/@MrBeast"}'
```

Response yang benar:
```json
{
  "channelId": "UCX6OQ3DkcsbYNE6H8uQQuVA",
  "channelTitle": "MrBeast",
  "subscribers": 123456789,
  "totalViews": 987654321,
  "totalVideos": 500,
  "recaps": {
    "7d": { "videos": 2, "views": 50000000 },
    "30d": { "videos": 8, "views": 200000000 },
    "90d": { "videos": 20, "views": 500000000 },
    "365d": { "videos": 100, "views": 2000000000 }
  }
}
```

## 🔧 Troubleshooting

### Error: 404 NOT_FOUND

**Penyebab**: Root Directory tidak di-set ke `youtube-stats-nextjs`

**Solusi**:
1. Vercel Dashboard → Settings → General
2. Root Directory → Edit → Set: `youtube-stats-nextjs`
3. Deployments → Redeploy

### Error: Build Failed

**Penyebab**: Missing dependencies atau environment variables

**Solusi**:
1. Check Build Logs di Vercel Dashboard
2. Pastikan `YOUTUBE_API_KEY` sudah ditambahkan
3. Redeploy

### Error: API Returns 500

**Penyebab**: YouTube API Key tidak valid atau quota habis

**Solusi**:
1. Verify API key di Google Cloud Console
2. Check quota: https://console.cloud.google.com/apis/api/youtube.googleapis.com/quotas
3. Pastikan YouTube Data API v3 enabled

## 🌐 URLs

- **Production**: `https://youtube-stats-nextjs.vercel.app`
- **Preview**: Auto-generated untuk setiap commit
- **Dashboard**: https://vercel.com/dashboard

## 📝 Auto Deploy

Setelah GitHub integration aktif:
- Setiap push ke `main` → auto deploy ke Production
- Setiap PR → auto deploy Preview URL
- Comment di PR dengan preview link otomatis

---

## 🚀 Langkah Deploy via CLI (Alternative)

```bash
cd /workspaces/crawler/youtube-stats-nextjs

# 1. Login
vercel login

# 2. Deploy
vercel

# 3. Add env variable
vercel env add YOUTUBE_API_KEY

# 4. Deploy to production
vercel --prod
```
