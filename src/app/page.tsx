import TweetGenerator from "@/components/TweetGenerator";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-violet-600/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="gradient-text">Personal Brand</span> <br className="md:hidden" />
            <span className="text-white">Accelerator</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Turn any content into viral <span className="text-violet-400 font-semibold">Threads</span> and high-performing <span className="text-pink-400 font-semibold">Posts</span> in seconds.
          </p>
        </div>

        <TweetGenerator />
      </div>
    </main>
  );
}
