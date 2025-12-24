# How to Host on Firebase (Correctly)

Since your app has an **API (The Brain)**, you cannot just drag-and-drop files. You must deploy it using the Firebase tools so it can set up the backend for you.

### Step 1: Install Firebase Tools
Open your terminal (cmd/powershell) and run:
```bash
npm install -g firebase-tools
```

### Step 2: Login
```bash
firebase login
```

### Step 3: Initialize (One time only)
In this folder (`tweet-gen`), run:
```bash
firebase init hosting
```
- It will ask: "Do you want to use your public directory?" -> Type `No` (or let it detect Next.js)
- **CRITICAL**: If it asks "Detected an existing Next.js codebase. Does this look correct?", say **YES**.
- Select "Use an existing project" and pick your project from the list.

### Step 4: Deploy
Run this command to send it live:
```bash
firebase deploy
```

### Important: Setting the API Key
Once deployed, go to the **Firebase Console** -> **Functions** -> **Secrets** (or Environment Variables) and ensure `GOOGLE_API_KEY` is set there, otherwise the live app won't be able to generate tweets!

## ⚠️ Troubleshooting: Deployment Failed?
**Error:** `Your project X must be on the Blaze (pay-as-you-go) plan`

**Reason:** This app uses Next.js API Routes, which run as **Cloud Functions**. Google requires the **Blaze Plan** to use Cloud Functions.

**Solution:**
1. Go to Firebase Console > **Usage and Billing**.
2. Switch from "Spark" (Free) to **"Blaze"** (Pay as you go).
3. *Note: You likely won't be charged anything (the free tier is huge), but you must add a card.*
