"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const startAudioAndEnter = () => {
    // Müziği başlat
    const audio = document.getElementById("bgm") as HTMLAudioElement;
    if (audio) {
      audio.volume = 0.4;
      audio.play().catch(err => console.log("Müzik çalma hatası:", err));
    }

    // Kısa bir süre sonra projeler sayfasına yönlendir (opsiyonel)
    // Eğer sadece müzik çalsın istiyorsan router.push kısmını silebilirsin.
    setTimeout(() => {
      router.push("/projects");
    }, 800); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-yellow-400 text-center font-sans px-4">
      
      {/* Batman Logosu veya İkonu (Opsiyonel) */}
      <div className="mb-6 animate-pulse">
         <span className="text-6xl">🦇</span>
      </div>

      <h1 className="text-5xl md:text-7xl font-black tracking-[0.2em] uppercase italic">
        BATCAVE
      </h1>
      <h2 className="text-2xl md:text-3xl font-light tracking-widest mt-2 text-white">
        AI ARCHIVE
      </h2>

      <div className="w-24 h-1 bg-yellow-400 my-6 shadow-[0_0_15px_rgba(250,204,21,0.8)]"></div>

      <p className="max-w-md text-gray-500 text-sm md:text-base mb-10 leading-relaxed">
        Kaggle Machine Learning Projects Dashboard. <br />
        Mastering data science in the shadows.
      </p>

      {/* Ana Buton */}
      <button
        onClick={startAudioAndEnter}
        className="px-10 py-4 bg-yellow-400 text-black font-black rounded-full hover:bg-yellow-500 hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(250,204,21,0.4)]"
      >
        ENTER THE BATCAVE
      </button>

      {/* Alternatif Alt Link */}
      <Link 
        href="/projects" 
        className="mt-8 text-gray-500 hover:text-yellow-400 transition-colors text-sm border-b border-transparent hover:border-yellow-400"
      >
        Access Database Directly →
      </Link>

      {/* Gizli Audio Etiketi */}
      <audio id="bgm" loop>
        <source src="/batman.mp3" type="audio/mpeg" />
        Tarayıcınız ses formatını desteklemiyor.
      </audio>

    </div>
  );
}