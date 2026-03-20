# VHS Cafe 📼
**Jim Slay's VHS & Betamax Market Search Tool**

Search eBay sold comps, active listings, Whatnot, and box art — or scan a tape photo to auto-identify it.

---

## Deploy to Vercel

### 1. Push to GitHub
Create a new repo and push this folder to it.

### 2. Import to Vercel
- Go to [vercel.com](https://vercel.com) → Add New Project
- Import your GitHub repo
- Framework: **Vite** (auto-detected)

### 3. Add Environment Variable
In Vercel project settings → Environment Variables, add:

| Name | Value |
|------|-------|
| `VITE_ANTHROPIC_API_KEY` | your Anthropic API key |

Get your API key at [console.anthropic.com](https://console.anthropic.com)

### 4. Deploy
Hit Deploy. Done.

---

## Local Development

```bash
npm install
cp .env.example .env          # add your API key to .env
npm run dev
```

---

## Features
- 🔍 Search eBay sold comps & active listings side by side
- 📦 Whatnot search
- 🖼 Google Images box art search
- 📷 Scan a tape photo — Claude reads the title & format automatically
- 🕓 Recent search history with one-click relaunch
