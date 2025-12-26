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
- **Name:** `OPENROUTER_API_KEY`
- **Value:** `YOUR_OPENROUTER_KEY_HERE` (The key you generated on OpenRouter)

### Step 4: Updating an Existing Deployment
Since your code is connected to GitHub, pushing changes (which we just did) automatically triggers a redeploy. **However, you MUST update the Environment Variable:**

1. Go to your Project Settings on Vercel.
2. Click **"Environment Variables"** on the left menu.
3. Add a new variable:
   - **Key:** `OPENROUTER_API_KEY`
   - **Value:** `YOUR_OPENROUTER_KEY_HERE`
4. (Optional) You can delete the old `GOOGLE_API_KEY`.
5. Go to the **"Deployments"** tab and redeploy the latest commit for changes to take effect.

That's it! Vercel will give you a live link like `tweet-gen-app.vercel.app` that works on any device properly.
