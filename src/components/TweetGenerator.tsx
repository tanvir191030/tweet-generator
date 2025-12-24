"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Copy, RefreshCw, Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Platform = "Twitter (X)" | "LinkedIn";
type Tone = "Educational" | "Bold" | "Storytelling" | "Professional";

interface GeneratedContent {
    viralPosts: string[];
    thread: string[];
}

export default function TweetGenerator() {
    const [content, setContent] = useState("");
    const [platform, setPlatform] = useState<Platform>("Twitter (X)");
    const [tone, setTone] = useState<Tone>("Professional");
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<GeneratedContent | null>(null);
    const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!content.trim()) return;

        setIsLoading(true);
        setResult(null);

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content, platform, tone }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            setResult(data);
        } catch (error) {
            console.error("Generation failed:", error);
            alert("Something went wrong. Please check your API key or try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(id);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto w-full space-y-8">
            {/* Input Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl p-6 md:p-8 space-y-6"
            >
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 ml-1">Source Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Paste your YouTube link, article URL, or raw text here..."
                        className="input-field min-h-[150px] resize-y"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-300 ml-1">Platform</label>
                        <div className="flex gap-2 p-1 bg-slate-800/50 rounded-lg border border-slate-700/50">
                            {(["Twitter (X)", "LinkedIn"] as Platform[]).map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPlatform(p)}
                                    className={cn(
                                        "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                                        platform === p
                                            ? "bg-violet-600 text-white shadow-lg"
                                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
                                    )}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-300 ml-1">Tone</label>
                        <div className="grid grid-cols-2 gap-2">
                            {(["Educational", "Bold", "Storytelling", "Professional"] as Tone[]).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTone(t)}
                                    className={cn(
                                        "py-2 px-3 rounded-lg text-xs font-medium border transition-all",
                                        tone === t
                                            ? "border-violet-500 bg-violet-500/10 text-violet-200"
                                            : "border-slate-700 bg-slate-800/30 text-slate-400 hover:border-slate-600"
                                    )}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading || !content.trim()}
                        className="btn-primary w-full md:w-auto min-w-[160px]"
                    >
                        {isLoading ? (
                            <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                        ) : (
                            <Sparkles className="w-5 h-5 mr-2" />
                        )}
                        {isLoading ? "Generating..." : "Generate Magic"}
                    </button>
                </div>
            </motion.div>

            {/* Results Section */}
            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        {/* Viral Posts */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-rose-400">Viral Posts</span>
                                <span className="text-xs font-normal text-slate-500 bg-slate-800/50 px-2 py-1 rounded-full">Standalone</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {result.viralPosts.map((post, i) => (
                                    <div key={i} className="glass-card p-5 rounded-xl border-l-4 border-l-pink-500 hover:border-l-pink-400 transition-all group">
                                        <div className="flex justify-between items-start gap-4 mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center text-xs font-bold text-slate-400">
                                                    {i + 1}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(post, `post-${i}`)}
                                                className="text-slate-500 hover:text-white transition-colors"
                                            >
                                                {copiedIndex === `post-${i}` ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        <p className="text-slate-200 whitespace-pre-wrap text-sm leading-relaxed">{post}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Thread */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">Deep Dive Thread</span>
                                <span className="text-xs font-normal text-slate-500 bg-slate-800/50 px-2 py-1 rounded-full">{result.thread.length} Tweets</span>
                            </h3>

                            <div className="relative pl-8 space-y-6 before:absolute before:left-[15px] before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-700/50">
                                {result.thread.map((tweet, i) => (
                                    <div key={i} className="relative glass-card p-5 rounded-xl group hover:bg-slate-800/80 transition-all">
                                        {/* Connector Dot */}
                                        <div className="absolute -left-[29px] top-6 w-7 h-7 rounded-full bg-slate-900 border-2 border-slate-700 group-hover:border-cyan-500 z-10 flex items-center justify-center text-[10px] text-slate-500 transition-colors">
                                            {i + 1}
                                        </div>

                                        <div className="flex justify-between items-start gap-4 mb-2">
                                            <div />
                                            <button
                                                onClick={() => copyToClipboard(tweet, `thread-${i}`)}
                                                className="text-slate-500 hover:text-white transition-colors"
                                            >
                                                {copiedIndex === `thread-${i}` ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        <p className="text-slate-200 whitespace-pre-wrap text-sm leading-relaxed">{tweet}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
