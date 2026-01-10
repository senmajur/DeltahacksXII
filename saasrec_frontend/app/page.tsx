"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { apiService, type Plan } from "@/lib/api"

export default function LandingPage() {
  const [backendStatus, setBackendStatus] = useState<string>('Checking...');
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [activeFooterSection, setActiveFooterSection] = useState<'none' | 'about' | 'contact' | 'privacy'>('none');
  const sectionsWrapperRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      const y = window.scrollY;
      const p = Math.min(Math.max(y / (vh * 0.20), 0), 1);
      setScrollProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const testBackendConnection = async () => {
      try {
        const healthResponse = await apiService.checkHealth();
        if (healthResponse.error) {
          setBackendStatus(`Error: ${healthResponse.error}`);
          return;
        }

        const helloResponse = await apiService.getHello();
        if (helloResponse.error) {
          setBackendStatus(`Error: ${helloResponse.error}`);
          return;
        }

        const plansResponse = await apiService.getPlans();
        if (plansResponse.error) {
          setBackendStatus(`Backend connected, but plans error: ${plansResponse.error}`);
        } else {
          setBackendStatus(`✅ Backend connected! Message: ${helloResponse.data?.message}`);
          setPlans(plansResponse.data || []);
        }
      } catch (error) {
        setBackendStatus(`Connection failed: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    testBackendConnection();
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setContactMessage('');

    try {
      const response = await apiService.sendContactEmail({
        name: contactForm.name,
        email: contactForm.email,
        message: contactForm.message,
      });

      if (response.error) {
        setContactMessage(`Error: ${response.error}`);
      } else {
        setContactMessage('Message sent successfully! We\'ll get back to you soon.');
        setContactForm({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setContactMessage(`Failed to send message: ${error}`);
    } finally {
      setContactLoading(false);
    }
  };

  return (
    <div className="relative text-white" style={{ background: 'radial-gradient(ellipse at bottom, #FDBF57 0%, #7A003C 25%, #5E6A71 50%, #33001a 75%, #0f172a 100%)' }}>
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at bottom, #FDBF57 0%, #7A003C 25%, #5E6A71 50%, #33001a 75%, #0f172a 100%)' }} />
      
        <header className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-300">
          <div className="bg-black/20 backdrop-blur-xl rounded-full px-6 py-3 flex items-center justify-between w-[95%] max-w-[1800px] pointer-events-auto">
            <div className="flex items-center gap-3 pl-2">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <h1 className="text-lg font-bold text-white tracking-tight">ClubConnect</h1>
            </div>
          </div>
        </header>

      <div
        ref={heroRef}
        className="relative xl:fixed inset-0 z-0 flex flex-col pointer-events-none pt-24 min-h-screen xl:min-h-0"
        style={{
          opacity: 1 - scrollProgress,
          transition: 'opacity 0.3s linear'
        }}
      >

        <main className="flex-1 flex items-center">
          <div className="container mx-auto px-6 py-16">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
              <div className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-[2.25rem] lg:text-[2.5rem] font-bold leading-[1.1] tracking-tight text-white">
                    “Plans are worthless, but planning is everything.”
                    <span className="block text-lg md:text-xl font-normal mt-4 text-white/80">– by Dwight D. Eisenhower</span>
                  </h2>
                  <p className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed max-w-2xl">
                    Unite our communities through a <span className="text-[#ffd6f0] font-bold">single, powerful platform</span> that streamlines registration, amplifies engagement, and brings every resident into a habit of active life.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start gap-4 pt-4 pointer-events-auto">
                  <a href="/clubs/signin" className="w-full sm:w-auto">
                    <Button 
                      size="lg" 
                      className="w-full sm:w-48 h-14 text-lg font-semibold bg-gradient-to-br from-white/30 to-white/10 text-white hover:from-white/40 hover:to-white/20 shadow-2xl backdrop-blur-2xl border-0 transition-all duration-300 hover:scale-105 rounded-xl"
                    >
                      CLUBS
                    </Button>
                  </a>
                  <a href="/users/signin" className="w-full sm:w-auto">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="w-full sm:w-48 h-14 text-lg font-semibold bg-gradient-to-br from-white/20 to-white/5 text-white hover:from-white/30 hover:to-white/15 backdrop-blur-2xl border-0 shadow-2xl transition-all duration-300 hover:scale-105 rounded-xl"
                    >
                      MEMBERS
                    </Button>
                  </a>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div className="relative w-full h-[600px]">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[500px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 transform rotate-2">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="text-xl font-bold text-primary">Club Dashboard</h3>
                          <p className="text-sm text-primary">Manage your community</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl"></div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="h-4 bg-gradient-to-r from-purple-200 to-purple-100 rounded-full w-3/4"></div>
                        <div className="h-4 bg-gradient-to-r from-purple-200 to-purple-100 rounded-full w-1/2"></div>
                        <div className="h-4 bg-gradient-to-r from-purple-200 to-purple-100 rounded-full w-2/3"></div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-6">
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-2xl">
                          <div className="text-3xl font-bold text-primary">150+</div>
                          <div className="text-sm text-primary">Members</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-2xl">
                          <div className="text-3xl font-bold text-primary">24</div>
                          <div className="text-sm text-primary">Events</div>
                        </div>
                      </div>

                      <div className="pt-4 space-y-3">
                        <div className="flex items-center gap-3 bg-accent p-3 rounded-xl">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"></div>
                          <div className="flex-1">
                            <div className="h-3 bg-accent rounded-full w-24 mb-1"></div>
                            <div className="h-2 bg-accent rounded-full w-32"></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-accent p-3 rounded-xl">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full"></div>
                          <div className="flex-1">
                            <div className="h-3 bg-accent rounded-full w-20 mb-1"></div>
                            <div className="h-2 bg-accent rounded-full w-28"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-8 right-8 bg-gradient-to-br from-green-400 to-emerald-500 text-white px-6 py-3 rounded-full shadow-2xl font-semibold text-sm animate-bounce border-2 border-white/50 backdrop-blur-sm">
                    + 10 New Members
                  </div>

                  <div className="absolute top-32 -left-8 bg-white/90 backdrop-blur-xl px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/30 animate-pulse">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full border-2 border-white"></div>
                    <span className="font-semibold text-primary text-sm">Sarah</span>
                  </div>

                  <div className="absolute bottom-24 -right-4 bg-white/90 backdrop-blur-xl px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/30 animate-pulse" style={{ animationDelay: '1s' }}>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full border-2 border-white"></div>
                    <span className="font-semibold text-primary text-sm">Alex</span>
                  </div>

                  <div className="absolute -top-12 left-12 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-pink-400/20 rounded-full blur-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 animate-bounce pointer-events-auto cursor-pointer" onClick={() => window.scrollTo({ top: window.innerHeight * 0.20, behavior: 'smooth' })}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 h-[20vh] pointer-events-none hidden xl:block" />

      <div
        ref={sectionsWrapperRef}
        className="will-change-transform relative z-20"
        style={{
          transform: typeof window !== 'undefined' && window.innerWidth >= 1280 
            ? `translateY(${Math.max(0, (1 - scrollProgress) * 100)}vh)` 
            : 'none',
          opacity: 1,
          transition: 'transform 0.2s linear'
        }}
      >
        {/* Section 1: Club Management (White, Rounded Top & Bottom) */}
        <div className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] relative z-20 mx-auto w-[90%] max-w-[1700px]">
          <section className="relative py-24 px-6">
            <div className="container mx-auto max-w-7xl relative z-10">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <div className="rounded-2xl overflow-hidden shadow-xl bg-white border border-slate-100">
                    <img 
                      src="/club-dashboard.jpg"
                      alt="Club Dashboard Preview" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                <div className="order-1 lg:order-2 space-y-8">
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">Club Management</h2>
                  <ul className="space-y-5 text-slate-600 text-lg">
                    <li className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                      <span>Unified City-Wide Club Registration</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                      <span>Resident Engagement & Outreach Tools</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                      <span>Centralized Activity & Event Management</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                      <span>Team Organization & Roster Development</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                      <span>Targeted Email & In-App Announcements</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                      <span>Automated Financial & Performance Reports</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                      <span>Member Progress Tracking & Insights</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Section 2: Member Experience (Dark, Tucked Behind) */}
        <div className="bg-[#1a1b2e] text-white -mt-20 pt-32 pb-32 px-6 relative z-10 mx-auto w-[90%] max-w-[1700px] rounded-[2.5rem] md:rounded-[3.5rem]">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Member Experience</h2>
                <ul className="space-y-5 text-slate-300 text-lg">
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span>Personalized Member Dashboards</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span>Easy Club Discovery & Registration</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span>Real-Time Activity Calendar</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span>Membership Management & Renewals</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span>Event Registration & Check-In</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span>Direct Communication with Club Leaders</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span>Progress Tracking & Achievement Badges</span>
                  </li>
                </ul>
              </div>

              <div>
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-white/5 border border-white/10">
                  <img 
                    src="/member-dashboard.jpg"
                    alt="Member Dashboard Preview" 
                    className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Footer Interaction Area (White, Rounded Top, Pokes into Dark) */}
        <div 
          ref={section3Ref}
          className="bg-white text-slate-900 rounded-t-[2.5rem] md:rounded-t-[3.5rem] -mt-20 relative z-30 overflow-hidden shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.2)] pt-24 px-6 flex flex-col transition-all duration-500 mx-auto w-[90%] max-w-[1700px]"
        >
          <div className="container mx-auto max-w-6xl flex-1">
            
            {/* Dynamic Content Area */}
            <div className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${activeFooterSection !== 'none' ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <div className={`${activeFooterSection !== 'none' ? 'py-12' : 'py-0'} transition-[padding] duration-500`}>
                  {activeFooterSection === 'about' && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-4xl mx-auto text-left">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold mb-4 text-slate-900 text-center">About Us</h2>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Navigating recreational and learning opportunities for children and families can often be time-consuming, confusing, and fragmented across multiple platforms. Recreation Lethbridge was established to simplify that experience. Our Mission To strengthen community connections by providing streamlined access to recreation, learning, and engagement opportunities. Through a centralized, user-friendly digital hub, we empower residents to easily discover, register for, and stay informed about programs and events across the city. We believe that when families can more readily connect with opportunities, they are better equipped to thrive— individually, socially, and collectively as a community.
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-2xl font-bold mb-3 text-slate-900">Our Vision</h3>
                                <p className="text-slate-600 text-lg leading-relaxed mb-4">
                                    We imagine a vibrant and connected Lethbridge where every child, family, and resident—whether Senior, Adult, or Young Adult—enjoys equitable access to meaningful opportunities that inspire lifelong wellness, curiosity, and belonging. At every stage of life, our commitment is to ensure growth, engagement, and community connection remain inclusive and accessible.
                                </p>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Our vision is to build a technology-enabled community ecosystem that fosters collaboration among local organizations, families, and residents. By embracing accessible tools, modern communication channels, and shared resources, we strive to create a more active, informed, and interconnected city—one where all residents can participate fully, confidently, and with a true sense of belonging.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold mb-3 text-slate-900">About Us</h3>
                                <p className="text-slate-600 text-lg leading-relaxed mb-4">
                                    Recreation Lethbridge was built on the belief that meaningful connections are the foundation of stronger, healthier communities. Rooted in the values of care, collaboration, and accessibility, our team created a digital platform designed to bridge families with the diverse recreational, educational, and community services available across the city.
                                </p>
                                <p className="text-slate-600 text-lg leading-relaxed mb-4">
                                    As a community-focused Software as a Service (SaaS) platform, Recreation Lethbridge offers a secure, streamlined registration system that connects residents to programs supporting physical, cognitive, and social growth. By blending technological innovation with local insight, we make engagement more efficient, inclusive, and rewarding for families and organizations alike.
                                </p>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Our mission is simple yet powerful: to ensure every child—and every family—has the opportunity to explore, learn, and thrive through accessible, meaningful community experiences. We also emphasize clear and timely registration awareness, keeping residents informed the moment opportunities open and supporting them throughout the process.
                                </p>
                            </div>
                        </div>
                    </div>
                  )}

                  {activeFooterSection === 'contact' && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-2xl mx-auto">
                      <h2 className="text-3xl font-bold mb-6 text-slate-900 text-center">Contact Us</h2>
                      <form onSubmit={handleContactSubmit} className="space-y-5 bg-background p-8 rounded-2xl border border-slate-100">
                        <div className="grid md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                            <input
                              type="text"
                              placeholder="John Doe"
                              value={contactForm.name}
                              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                              required
                              className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-primary/20 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <input
                              type="email"
                              placeholder="john@example.com"
                              value={contactForm.email}
                              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                              required
                              className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-primary/20 transition-all"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                          <textarea
                            placeholder="How can we help you?"
                            rows={4}
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-primary/20 transition-all resize-none"
                          ></textarea>
                        </div>
                        <Button 
                          type="submit"
                          disabled={contactLoading}
                          className="w-full bg-primary text-white hover:bg-primary font-semibold py-4 text-lg rounded-lg transition-all duration-300 disabled:opacity-50 shadow-lg shadow-blue-600/20"
                        >
                          {contactLoading ? 'Sending...' : 'Send Message'}
                        </Button>
                        {contactMessage && (
                          <div className={`text-sm text-center p-3 rounded-lg font-medium ${contactMessage.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-secondary/20 text-primary'}`}>
                            {contactMessage}
                          </div>
                        )}
                      </form>
                    </div>
                  )}

                  {false && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-4xl mx-auto text-left">
                      <h2 className="text-3xl font-bold mb-6 text-slate-900 text-center">Privacy Policy</h2>
                      <div className="prose prose-slate max-w-none text-slate-600">
                        <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">INTRODUCTION</h3>
                        <p className="mb-4">
                          [Applied Optimal Inc.] (the “Company”) respects your (“You” and “Your”) privacy. This “Privacy Policy” describes how the Company collects, uses, maintains, discloses, and protects Personal Information (defined below), as well as the rights and choices You have regarding Your Personal Information, including how You can access and update Your Personal Information. This Privacy Policy was last amended [Dec. 31, 2025].
                        </p>
                        <p className="mb-4">
                          “Personal Information” is information that identifies You or could be combined by the Company or the Company’s services providers or affiliates with other information to identify You. By accessing or using the Company’s website located at [square.rabbithop.ca] (the “Website”) or any content on or through the Website, You signify Your consent to the terms of this Privacy Policy and Your intent to be legally bound by them. If You do not agree with any terms of this Privacy Policy, please do not access or use the Website or any content on or through the Website, or otherwise submit any Personal Information to the Company.
                        </p>

                        <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">TYPES OF PERSONAL INFORMATION COLLECTED</h3>
                        <p className="mb-4">
                          The Personal Information the Company collects about You will depend on the manner in which You access or use the Website or any content on or through the Website and may include:
                        </p>
                        <ul className="list-disc pl-5 mb-4 space-y-2">
                            <li>Your name, or contact information, such as Your mailing address, telephone number, or email address, or other similar information associated with You;</li>
                            <li>Your location, time-zone setting, network information, device type, browser type and version, browser plug-in types and version, operating system and platform, language, standard web log data, and IP address used to connect Your computer to the Internet or other similar identifier, or the equipment You use to access or use the Website and usage details;</li>
                            <li>data on the pages, services, or content You access or use on or through the Website, including the amount of time You spend on certain pages, products or services You viewed or searched for, clickstreams to, through, and from the Website, page response times, downloads and download errors, page interactions, or methods used to browse away from the Website;</li>
                            <li>billing or account information, if applicable; and</li>
                            <li>any other Personal Information that You choose to submit to us.</li>
                        </ul>
                        <p className="mb-4">
                          The Website and any content provided on or through the Website is not directed to any person who is not the legal age of majority under applicable law. The Company will not knowingly collect Personal Information from any person who is not the legal age of majority under applicable law.
                        </p>

                        <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">METHODS FOR COLLECTING PERSONAL INFORMATION</h3>
                        <p className="mb-4">
                          The Company takes steps to ensure that any Personal Information we collect about You is adequate for, relevant to, and not excessive for the uses of such Personal Information, as described by this Privacy Policy.
                        </p>
                        
                        <h4 className="text-lg font-semibold text-slate-900 mt-4 mb-2">Information Provided to the Company by You</h4>
                        <p className="mb-4">
                          Personal Information the Company collects from You on or through the Website and as a result of Your access to or use of the Website or any content on or through the Website may include Personal Information You provide the Company directly, for example by:
                        </p>
                        <ul className="list-disc pl-5 mb-4 space-y-2">
                            <li>submitting, posting, publishing, displaying, or otherwise transmitting user generated content;</li>
                            <li>filling in forms, making search queries, or corresponding with the Company on or through the Website, or otherwise communicating with the Company by any means including by phone, email, or other electronic messaging; or</li>
                            <li>if applicable or available through or on the Website: creating or registering for an account; subscribing, purchasing, or requesting information on a service or product; entering a contest or promotion; or otherwise engaging with the Company through interaction points that might exist from time-to-time between You and the Company.</li>
                        </ul>

                        <h4 className="text-lg font-semibold text-slate-900 mt-4 mb-2">Information Collected by the Company Through Technological Means</h4>
                        <p className="mb-4">
                          The Company may also use cookies or other technological collection methods to collect information, some of which may be Personal Information, about:
                        </p>
                        <ul className="list-disc pl-5 mb-4 space-y-2">
                            <li>the device or equipment You use, including information about Your computer or mobile device, internet connection, IP address, operating system, and browser type; or</li>
                            <li>Your browsing activities and patterns, including information about Your visits to the Website such as traffic data, location data, logs, and other similar communication data.</li>
                        </ul>
                        <p className="mb-4">
                          This information helps the Company improve the Website and the content available on or through the Website and otherwise improve the services of the Company by:
                        </p>
                        <ul className="list-disc pl-5 mb-4 space-y-2">
                            <li>helping the Company understand audience sizes and usage patterns on the Website;</li>
                            <li>allowing the Company to tailor the Website to Your preferences and interests; and</li>
                            <li>recognizing You when You visit the Website multiple times.</li>
                        </ul>
                        <p className="mb-4">
                          The technologies used by the Company to automatically collect the information described above may include cookies, which are small files placed on the hard drive of Your computer. You can turn off cookies using Your internet browser but doing so may limit or remove certain parts of the Website, certain content on the Website, or the functionality of the Website.
                        </p>

                        <h4 className="text-lg font-semibold text-slate-900 mt-4 mb-2">Third-Party Features</h4>
                        <p className="mb-4">
                          The Website may include, integrate, or rely on links, plug-ins, services, social networks, content, or applications of third parties. Your access or use of such links, plug-ins, services, social networks, content, or applications may allow the third-party provider to collect or share information about You, some of which may be Personal Information. The Company does not control such third parties’ use of cookies or similar technologies – if You would like to know more about how these third parties use such technologies, You should contact the responsible provider directly. The Company does not accept any responsibility or liability for the privacy policies of any such third parties or their compliance or non-compliance with such privacy policies.
                        </p>

                        <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">USING AND DISCLOSING PERSONAL INFORMATION</h3>
                        <h4 className="text-lg font-semibold text-slate-900 mt-4 mb-2">Use of Personal Information by the Company</h4>
                        <p className="mb-4">
                          The Company collects Personal Information to provide You with a secure, smooth, efficient, and customized experience through or on the Website or any content on the Website. The Company may use Your Personal Information to:
                        </p>
                        <ul className="list-disc pl-5 mb-4 space-y-2">
                            <li>provide You with content, services, or products on or though the Website;</li>
                            <li>customize, measure, and improve the Website or content provided on or through the Website, or otherwise analyze or manage the Company’s business operations or Website performance;</li>
                            <li>prevent prohibited or illegal activities, loss, or fraud, enforce the Company’s Terms of Use, or otherwise protect the security or integrity of the Website or the Company’s business;</li>
                            <li>deliver targeted marketing, service update notices, or promotional offers based on Your communication preferences;</li>
                            <li>send You things in the mail or through other channels, such as products or services that You have requested;</li>
                            <li>register You for, or authenticate You when You sign into, an account or online services or when You purchase a product or service, or to provide You with notices about such accounts, subscriptions, or purchases;</li>
                            <li>provide You notice about changes to the Website, this Privacy Policy, or the Company’s Terms of Use;</li>
                            <li>otherwise fulfill the purposes for which You have provided Personal Information or that were described when such Personal Information was collected; or</li>
                            <li>carry out other purposes that are disclosed to You and to which You consent, or which are otherwise permitted or required by law.</li>
                        </ul>
                        <p className="mb-4">
                          The Company may combine all the Personal Information the Company collects, including Yours, in order to analyze and understand aggregate trends.
                        </p>

                        <h4 className="text-lg font-semibold text-slate-900 mt-4 mb-2">Other Disclosures of Personal Information</h4>
                        <p className="mb-4">
                          The Company may disclose Your Personal Information if necessary to collect a debt from You or where the Company has reason to believe that such Personal Information is relevant to the investigation or decision to investigate a breach of the laws of Canada, a province or territory of Canada, or a foreign jurisdiction, and the Company is legally permitted or required to do so, or to otherwise comply with any court order, law, or legal process, including in response to any government or regulatory request or process, in accordance with applicable law. The Company may also disclose Your Personal Information, if necessary, to enforce this Privacy Policy or the Company’s Terms of Use, or if the disclosure is necessary to protect the rights, property, or safety of the Company, the Website, users of the Website, or third parties. The Company may transfer information about You, including Personal Information, in connection with a merger or sale (including any transfers made as part of an insolvency of bankruptcy proceedings) involving all or part of the Company’s business or as part of a corporate reorganization or stock sale or other changes in corporate control.
                        </p>

                        <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">DATA SECURITY</h3>
                        <p className="mb-4">
                          The security of Your Personal Information is important to the Company. The Company protects Your Personal Information by maintaining physical, organizational, and technological safeguards against unauthorized access, unauthorized disclosure, theft, or misuse appropriate to the sensitivity of such Personal Information. Personal Information collected by the Company may only be accessed by persons within the Company who require access to provide You with access to, use of, or content, services, or products provided on or through the Website. The Personal Information the Company collects is maintained at [AWS/Supabase/Stripe]
                        </p>
                        <p className="mb-4">
                          Although the Company takes measures to protect against data breaches and unauthorized access to Your Personal Information, no company can completely mitigate the risks of such breaches or unauthorized access and no website is fully secure. The Company cannot guarantee that hacking, data loss, breaches, or other unsanctioned access of the Company’s security systems will never occur. Accordingly, You should not submit or otherwise provide Personal Information to the Company by any means if You consider that Personal Information to be sensitive.
                        </p>
                        <p className="mb-4">
                          Except as otherwise permitted or required by applicable law or regulation, the Company retains Personal Information only for as long as necessary for the purposes for which such Personal Information was collected. The Company reserves the right to use anonymous and deidentified information, including anonymized or otherwise de-identified Personal Information, for any legitimate business purpose without further notice to You and without Your Consent.
                        </p>

                        <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">CHANGES TO THE PRIVACY POLICY</h3>
                        <p className="mb-4">
                          The Company reserves the right to amend this Privacy Policy for any or no reason, at any time, and from time to time in accordance with the terms of this Privacy Policy. The Company will reflect any such amendments on the Website. Your continued access to or use of the Website or any content on or though the Website after any such amendment constitutes Your acceptance of the Privacy Policy as then amended. The Company includes the date this Privacy Policy was last amended at the top of this page.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <footer className="border-t border-slate-100 py-12 mt-auto">
            <div className="container mx-auto max-w-6xl">
              <div className="flex flex-col items-center justify-center space-y-6 mb-8">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
                  <div className="w-8 h-8 bg-slate-900 rounded-sm"></div>
                </div>
                <p className="text-slate-500 text-sm">
                  ©2025 Leadpages (US), Inc. All Rights Reserved.
                </p>
              </div>

              <div className="flex items-center justify-center gap-6 text-sm font-medium">
                <button 
                  onClick={() => {
                    setActiveFooterSection(activeFooterSection === 'about' ? 'none' : 'about');
                    section3Ref.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`transition-colors ${activeFooterSection === 'about' ? 'text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  About Us
                </button>
                <span className="text-slate-300">|</span>
                <button 
                  onClick={() => {
                    setActiveFooterSection(activeFooterSection === 'contact' ? 'none' : 'contact');
                    section3Ref.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`transition-colors ${activeFooterSection === 'contact' ? 'text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  Contact Us
                </button>
                <span className="text-slate-300">|</span>
                <a 
                  href="/privacy"
                  className="text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
