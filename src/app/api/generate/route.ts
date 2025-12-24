import { NextResponse } from "next/server";
import { YoutubeTranscript } from 'youtube-transcript'; // Keeping import for type safety if needed, though we use fetch now

export async function POST(req: Request) {
    try {
        let { content, platform, tone } = await req.json();
        content = content?.trim(); // Clean input
        const apiKey = process.env.GOOGLE_API_KEY?.trim();

        if (!content) {
            return NextResponse.json({ error: "Content is required" }, { status: 400 });
        }

        // --- SOURCE CONTENT PRE-PROCESSING ---
        // If content looks like a URL, try to fetch text
        if (content.startsWith("http")) {
            console.log("URL detected. Attempting to fetch content...");

            // YouTube Handling
            if (content.includes("youtube.com") || content.includes("youtu.be")) {
                try {
                    console.log("Fetching YouTube transcript via RapidAPI...");
                    const rapidApiKey = "e25acdcd9amsh5328bb2b8fe46fcp1312b0jsnb60e3045c521";
                    const rapidApiHost = "youtube-transcripts-transcribe-youtube-video-to-text.p.rapidapi.com";

                    const ytResponse = await fetch(`https://${rapidApiHost}/transcribe`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "X-RapidAPI-Key": rapidApiKey,
                            "X-RapidAPI-Host": rapidApiHost
                        },
                        body: JSON.stringify({ url: content })
                    });

                    if (ytResponse.ok) {
                        const json = await ytResponse.json();
                        // API returns { transcription: "text..." }
                        const transcriptText = json.transcription || "";

                        if (transcriptText.length > 0) {
                            content = `VIDEO TRANSCRIPT:\n${transcriptText.slice(0, 15000)}`; // limit chars
                            console.log("Transcript fetched successfully.");
                        } else {
                            console.warn("RapidAPI returned empty transcript.");
                        }
                    } else {
                        console.error("RapidAPI (YouTube) Error:", await ytResponse.text());
                    }
                } catch (err) {
                    console.error("Failed to fetch transcript:", err);
                }
            } else {
                // Article Handling
                try {
                    console.log("Article URL detected. Fetching text via RapidAPI...");
                    const rapidApiKey = "e25acdcd9amsh5328bb2b8fe46fcp1312b0jsnb60e3045c521";
                    const rapidApiHost = "article-extractor2.p.rapidapi.com";

                    const metaResponse = await fetch(`https://${rapidApiHost}/article/parse?url=${encodeURIComponent(content)}`, {
                        method: "GET",
                        headers: {
                            "X-RapidAPI-Key": rapidApiKey,
                            "X-RapidAPI-Host": rapidApiHost
                        }
                    });

                    if (metaResponse.ok) {
                        const json = await metaResponse.json();
                        const articleText = json.data?.content || "";
                        if (articleText) {
                            const cleanText = articleText.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
                            content = `ARTICLE CONTENT:\n${cleanText.slice(0, 15000)}`;
                            console.log("Article text fetched successfully.");
                        }
                    } else {
                        console.error("RapidAPI Error:", await metaResponse.text());
                    }
                } catch (err) {
                    console.error("Failed to fetch article:", err);
                }
            }
        }

        // --- MOCK RESPONSE FOR DEMO (If no API Key) ---
        if (!apiKey) {
            console.warn("No GOOGLE_API_KEY found. Returning mock data.");
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
            return NextResponse.json({
                viralPosts: [
                    "🚀 Stop overthinking your personal brand. Just start sharing what you know.\n\nConsistency > Perfection.\n\nHere’s why... (Mock generated post)",
                    "Most people get LinkedIn wrong.\n\nThey write for their boss, not their audience.\n\nFlip the script. ⚡️",
                    "5 tools that saved me 10+ hours this week:\n\n1. Notion\n2. ChatGPT\n3. This Tool\n4. Zapier\n5. Obsidian\n\nWhich one is your favorite? 👇",
                    "Unpopular opinion: You don't need a niche.\n\nYou need a unique perspective.\n\nAgree? 🤔",
                    "The best way to learn is to teach.\n\nDocument your journey. Share your failures.\n\nThat's how you build trust. 💯"
                ],
                thread: [
                    "1/ Everyone talks about 'building a brand' but no one tells you HOW.\n\nI spent 3 years figuring it out.\n\nHere is the exact framework I use: 🧵",
                    "2/ Authenticity is the currency of the internet.\n\nPeople spot fakes from a mile away.\n\nBe you. Unapologetically.",
                    "3/ Value > Virality.\n\nDon't chase likes. Chase impact.\n\nWhen you solve real problems, growth takes care of itself.",
                    "4/ Engagement is a two-way street.\n\nReply to comments. DM your followers.\n\nBuild a community, not just a following.",
                    "5/ Consistency is key.\n\nShow up every day. Even when you don't feel like it.\n\nThat's how you win.",
                    "6/ Don't be afraid to pivot.\n\nYour brand will evolve as you grow.\n\nEmbrace the change.",
                    "7/ Start today.\n\nYou're ready.\n\nFollow me for more tips on building your personal empire. 🚀"
                ]
            });
        }

        // --- REAL AI GENERATION ---
        const prompt = `
      You are a world-class personal branding expert.
      Task: Transform the SOURCE CONTENT into high-performing social media content.
      
      SOURCE CONTENT:
      ${content}
      
      PLATFORM: ${platform}
      TONE: ${tone}
      
      Create:
      1. 5 short, standalone viral posts (hooks + clear value).
      2. 1 thread (7-10 tweets) with a strong hook and logical flow.
      
      Strictly follow the JSON format below. No markdown outside the JSON.
      {
        "viralPosts": ["post1", "post2", "post3", "post4", "post5"],
        "thread": ["tweet1", "tweet2", "tweet3", "..."]
      }
    `;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: { response_mime_type: "application/json" }
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Gemini API Error details:", errorText);
            throw new Error(`Gemini API Error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        const generatedText = data.candidates[0].content.parts[0].text;
        const parsedData = JSON.parse(generatedText);

        return NextResponse.json(parsedData);

    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate content" },
            { status: 500 }
        );
    }
}
