"use client"

import { ArrowRight, Sparkles, Code2, Cpu, Layers, Framer, Zap, ChevronDown } from "lucide-react"
import { useEffect, useState, useRef } from "react"

const ICONS = [
    { component: <Code2 size={40} />, size: 90 },
    { component: <Framer size={45} />, size: 100 },
    { component: <Cpu size={40} />, size: 95 },
    { component: <Layers size={35} />, size: 85 },
    { component: <Zap size={30} />, size: 80 },
];

export function HeroSection() {
    const [hasMounted, setHasMounted] = useState(false);
    const [theme, setTheme] = useState('light');
    const iconsRef = useRef<any[]>([]);
    const physicsRef = useRef<any[]>([]);
    const mouseRef = useRef({ x: 50, y: 50 });
    const dragRef = useRef<{ id: number | null; x: number; y: number; vx: number; vy: number }>({
        id: null, x: 0, y: 0, vx: 0, vy: 0
    });

    useEffect(() => {
        setHasMounted(true);
        const initialTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        setTheme(initialTheme);

        const observer = new MutationObserver(() => {
            setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        physicsRef.current = ICONS.map(() => ({
            x: Math.random() * 80 + 10,
            y: Math.random() * 60 + 20,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.15,
        }));

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleMove = (e: any) => {
            const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
            const cx = (x / window.innerWidth) * 100;
            const cy = (y / window.innerHeight) * 100;
            mouseRef.current = { x: cx, y: cy };

            if (dragRef.current.id !== null) {
                dragRef.current.vx = cx - dragRef.current.x;
                dragRef.current.vy = cy - dragRef.current.y;
                dragRef.current.x = cx; dragRef.current.y = cy;
            }
        };

        const handleUp = () => { dragRef.current.id = null; };
        window.addEventListener("mousemove", handleMove);
        window.addEventListener("touchmove", handleMove, { passive: false });
        window.addEventListener("mouseup", handleUp);
        window.addEventListener("touchend", handleUp);

        let frame: number;
        const update = () => {
            physicsRef.current.forEach((p, i) => {
                const el = iconsRef.current[i];
                if (!el) return;

                if (dragRef.current.id === i) {
                    p.x += (dragRef.current.x - p.x) * 0.25;
                    p.y += (dragRef.current.y - p.y) * 0.25;
                } else {
                    p.x += p.vx; p.y += p.vy;
                    const dx = mouseRef.current.x - p.x;
                    const dy = mouseRef.current.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 18) {
                        p.vx -= dx * 0.004;
                        p.vy -= dy * 0.004;
                    }
                    if (p.x < 6 || p.x > 94) p.vx *= -0.8;
                    if (p.y < 12 || p.y > 90) p.vy *= -0.8;
                    p.vx *= 0.992; p.vy *= 0.992;
                }
                el.style.transform = `translate3d(${p.x}vw, ${p.y}vh, 0) translate(-50%, -50%)`;
            });
            frame = requestAnimationFrame(update);
        };
        frame = requestAnimationFrame(update);
        return () => cancelAnimationFrame(frame);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20 px-6">
            
            {/* GRID 2px */}
            <div className="absolute inset-0 z-0 pointer-events-none" 
                style={{ 
                    backgroundImage: `linear-gradient(var(--primary) 2px, transparent 2px), linear-gradient(90deg, var(--primary) 2px, transparent 2px)`, 
                    backgroundSize: '100px 100px',
                    opacity: theme === 'dark' ? 0.12 : 0.25,
                    maskImage: 'radial-gradient(circle at center, black, transparent 90%)'
                }} 
            />

            {/* RADIAL GLOW */}
            <div className="absolute inset-0 z-0 opacity-40 transition-all duration-1000 pointer-events-none"
                style={{ background: `radial-gradient(800px circle at ${mouseRef.current.x}% ${mouseRef.current.y}%, ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(99,63,38,0.12)'}, transparent 60%)` }}
            />

            {/* PHYSICS ICONS */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {ICONS.map((icon, i) => (
                    <div
                        key={i}
                        ref={el => { iconsRef.current[i] = el; }}
                        onMouseDown={(e) => {
                            dragRef.current = { id: i, x: (e.clientX/window.innerWidth)*100, y: (e.clientY/window.innerHeight)*100, vx: 0, vy: 0 };
                        }}
                        className="absolute pointer-events-auto cursor-grab active:cursor-grabbing flex items-center justify-center rounded-[2.5rem] border-2 border-primary/20 bg-background/60 backdrop-blur-xl shadow-2xl transition-colors"
                        style={{ width: icon.size, height: icon.size, left: 0, top: 0, touchAction: 'none' }}
                    >
                        <div className="text-primary pointer-events-none">{icon.component}</div>
                    </div>
                ))}
            </div>

            {/* CONTENT - FIXED TYPOGRAPHY */}
            <div className="container mx-auto text-center relative z-20 max-w-5xl pointer-events-none">
                <div className={hasMounted ? "" : "opacity-0"}>
                    
                    <div className="mb-8 pointer-events-auto transition-transform hover:scale-105">
                        <button 
                            onClick={scrollToTop}
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/5 border-2 border-primary/20 text-foreground text-xs md:text-sm font-black tracking-[0.2em] uppercase shadow-lg"
                        >
                            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                            UI/UX expert & React dev
                        </button>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[0.95] tracking-tighter text-foreground pointer-events-auto mb-10">
                        Together we transform<br />
                        <span className="italic font-light text-primary">your vision</span> into<br />
                        <span className="relative inline-block">
                            excellent product.
                            <div className="absolute -bottom-2 left-0 right-0 h-1.5 bg-primary/30 rounded-full" />
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-16 font-light leading-relaxed pointer-events-auto">
                        Engineering <span className="text-foreground font-semibold">bespoke digital systems</span> where <span className="text-foreground italic">art</span> meets logic.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pointer-events-auto">
                        <button 
                            onClick={() => document.getElementById("works")?.scrollIntoView({ behavior: "smooth" })} 
                            className="group px-10 py-5 bg-foreground text-background rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4 font-bold text-lg shadow-2xl"
                        >
                            View Portfolio <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-2 transition-transform" />
                        </button>
                        <button 
                            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} 
                            className="px-10 py-5 border-2 border-primary/20 rounded-2xl font-bold text-lg backdrop-blur-md hover:bg-foreground hover:text-background transition-all active:scale-95 text-foreground"
                        >
                            Let's Talk
                        </button>
                    </div>
                </div>
            </div>

            {/* SCROLL INDICATOR */}
            
        </section>
    )
}