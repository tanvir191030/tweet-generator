# How to Host Your Tweet & Thread Generator

Because this application uses **Advanced AI features** (API Routes for Google Gemini and YouTube fetching), it works best on professional Next.js hosting.

**You cannot just upload it to a static file host (like standard cPanel or GitHub Pages) because the "Brains" (API) need a server to run.**

## The Best (and Free) Way: **Vercel**

Vercel is the company that *made* Next.js, so it works perfectly.

### Step 1: Prepare the Code
1.  Make sure you have this folder ready on your computer.
2.  (Optional) Push this code to a GitHub repository if you know how.

### Step 2: Deploy
1.  Go to [Vercel.com](https://vercel.com/signup) and create a free account.
2.  Install the "Vercel CLI" (if you want to deploy from your computer):
    - Open your terminal in this folder.
    - Run: `npm i -g vercel`
    - Run: `vercel`
3.  **OR** (Easier): Connect your GitHub account to Vercel and import the repository.

### Step 3: Add Your Secrets
When deploying, Vercel will ask for "Environment Variables". You must add:
- **Name:** `GOOGLE_API_KEY`
- **Value:** `AIzaSyBSXiwvwPQTleh3FfSUkj8IDGbfYRq5Uy0` (Your working key)

That's it! Vercel will give you a live link like `tweet-gen-app.vercel.app` that works on any device properly.
