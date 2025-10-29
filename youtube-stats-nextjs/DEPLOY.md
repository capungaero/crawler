# Deploy YouTube Stats ke Vercel

## 🚀 Langkah-langkah Deploy:

### 1. Login ke Vercel
```bash
cd /workspaces/crawler/youtube-stats-nextjs
vercel login
```
Pilih method login (email atau GitHub)

### 2. Deploy ke Vercel
```bash
vercel
```

Jawab pertanyaan setup:
- **Set up and deploy?** → Yes
- **Which scope?** → Pilih account Anda
- **Link to existing project?** → No
- **Project name?** → youtube-stats-nextjs (atau custom)
- **Directory?** → ./ (tekan Enter)
- **Override settings?** → No

### 3. Set Environment Variable
Setelah deploy, tambahkan YouTube API Key:

**Option A: Via CLI**
```bash
vercel env add YOUTUBE_API_KEY
```
Paste: `AIzaSyACAf_WaYhDTUqNkzoVHhwCvtQ-DgpnFpI`
Select: Production, Preview, Development

**Option B: Via Dashboard**
1. Buka https://vercel.com/dashboard
2. Pilih project `youtube-stats-nextjs`
3. Settings → Environment Variables
4. Add:
   - Name: `YOUTUBE_API_KEY`
   - Value: `AIzaSyACAf_WaYhDTUqNkzoVHhwCvtQ-DgpnFpI`
   - Environments: Production, Preview, Development

### 4. Redeploy (setelah add env)
```bash
vercel --prod
```

## 🌐 URL Deployment

Setelah berhasil, aplikasi akan tersedia di:
- **Production**: `https://youtube-stats-nextjs.vercel.app`
- **Preview**: URL unik untuk setiap commit

## ✅ Fitur yang Berfungsi di Vercel:

✅ API Routes (`/api/zai/youtube`)
✅ Server-side rendering
✅ Image optimization
✅ Automatic HTTPS
✅ Global CDN
✅ Auto deploy on git push

## 🔗 Integration dengan GitHub (Opsional)

Untuk auto-deploy setiap push:

1. Di Vercel Dashboard → Project Settings
2. Git → Connect Git Repository
3. Pilih `capungaero/crawler`
4. Root Directory: `youtube-stats-nextjs`
5. Save

Setelah itu setiap push ke GitHub akan otomatis deploy!

---

## 📝 Quick Commands

```bash
# Deploy ke production
vercel --prod

# Deploy preview
vercel

# Check deployment status
vercel ls

# View logs
vercel logs

# Remove deployment
vercel rm youtube-stats-nextjs
```
