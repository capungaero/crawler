# 🔧 TROUBLESHOOTING - Error 404 pada Vercel

## ✅ Solusi Lengkap untuk Error 404

### 1. **Set Root Directory** (PALING PENTING!)

Di Vercel Dashboard:
1. Buka project Anda
2. **Settings** → **General**
3. Cari **Root Directory**
4. Klik **Edit**
5. Isi dengan: `youtube-stats-nextjs`
6. Klik **Save**

### 2. **Verifikasi Environment Variables**

Di Vercel Dashboard:
1. **Settings** → **Environment Variables**
2. Pastikan ada: `YOUTUBE_API_KEY`
3. Value: `AIzaSyACAf_WaYhDTUqNkzoVHhwCvtQ-DgpnFpI`
4. Environments: ✅ Production, ✅ Preview, ✅ Development

Jika belum ada, klik **Add New**:
- Name: `YOUTUBE_API_KEY`
- Value: `AIzaSyACAf_WaYhDTUqNkzoVHhwCvtQ-DgpnFpI`
- Pilih semua environments
- Save

### 3. **Redeploy**

Setelah code baru di-push (sudah dilakukan), klik:
1. **Deployments** tab
2. Deployment terakhir akan otomatis rebuild
3. ATAU klik **⋮** (3 dots) → **Redeploy**

### 4. **Test API**

Setelah deployment selesai (status "Ready"), test:

```bash
curl -X POST https://YOUR-PROJECT.vercel.app/api/zai/youtube \
  -H "Content-Type: application/json" \
  -d '{"url": "https://youtube.com/@MrBeast"}'
```

Response yang benar:
```json
{
  "channelId": "UCX6OQ3DkcsbYNE6H8uQQuVA",
  "channelTitle": "MrBeast",
  "channelThumbnail": "https://...",
  "subscribers": 123456789,
  "totalViews": 987654321,
  "totalVideos": 500,
  "recaps": {
    "7d": {"videos": 2, "views": 50000000},
    "30d": {"videos": 8, "views": 200000000},
    "90d": {"videos": 20, "views": 500000000},
    "365d": {"videos": 100, "views": 2000000000}
  }
}
```

## 🎯 Perubahan yang Sudah Dilakukan

✅ Fixed API route build errors (module-level error throwing)
✅ Updated package.json dengan dependencies yang benar
✅ Removed experimental flags dari next.config.js
✅ API_KEY sekarang di-check di runtime, bukan module load time
✅ Simplified vercel.json

## 📝 Checklist Vercel Settings

- [ ] Root Directory = `youtube-stats-nextjs`
- [ ] Environment Variable `YOUTUBE_API_KEY` exists
- [ ] Build Command = (auto-detect) `npm run build`
- [ ] Output Directory = (auto-detect) `.next`
- [ ] Install Command = (auto-detect) `npm install`
- [ ] Framework Preset = Next.js

## 🔍 Cara Cek Build Logs

Jika masih error:
1. Vercel Dashboard → **Deployments**
2. Klik deployment yang gagal
3. Lihat **Build Logs**
4. Screenshot error dan tunjukkan ke saya

## 🚀 Next Steps

Setelah API berfungsi, kita bisa lanjut membuat:
- [ ] Frontend UI components
- [ ] Channel statistics display
- [ ] Video recap charts
- [ ] Responsive design
- [ ] Loading states & error handling
