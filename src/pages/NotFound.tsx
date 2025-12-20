import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search, AlertTriangle, Compass, Star, Zap } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    setAnimate(true);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-sky-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-rose-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-gradient-to-br from-sky-300/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-20 left-1/4 w-72 h-72 bg-gradient-to-br from-pink-300/25 to-rose-300/25 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 bg-gradient-to-br from-rose-400 to-sky-400 rounded-full opacity-20 animate-bounce`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <Header transparent={false} />
      
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-4xl relative">
          
          {/* Animated 404 */}
          <div className={`mb-12 transition-all duration-1000 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative inline-block">
              <h1 className="text-[12rem] md:text-[16rem] font-bold bg-gradient-to-br from-rose-400 via-sky-400 to-pink-400 bg-clip-text text-transparent leading-none animate-pulse">
                404
              </h1>
              <div className="absolute inset-0 text-[12rem] md:text-[16rem] font-bold text-rose-200/30 animate-ping" style={{animationDelay: '0.5s'}}>
                404
              </div>
            </div>
          </div>
          
          {/* Error Icon */}
          <div className={`mb-8 transition-all duration-1000 delay-300 ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-500 to-sky-500 rounded-full shadow-lg mb-6 animate-bounce" style={{animationDelay: '1s'}}>
              <AlertTriangle className="w-10 h-10 text-white" />
            </div>
          </div>
          
          {/* Main Content */}
          <div className={`transition-all duration-1000 delay-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-800 via-rose-700 to-sky-700 bg-clip-text text-transparent">
                Oops! Page Not Found
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-4 leading-relaxed max-w-3xl mx-auto">
              We couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
            </p>
            
            <div className="mb-12">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/60 backdrop-blur-sm border border-rose-200/50 shadow-lg">
                <Search className="w-5 h-5 text-rose-600 mr-3" />
                <span className="text-slate-700 font-medium">Looking for: </span>
                <code className="ml-2 px-2 py-1 bg-slate-100 rounded text-sm text-slate-800 font-mono">
                  {location.pathname}
                </code>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className={`flex flex-wrap gap-6 justify-center transition-all duration-1000 delay-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button 
              onClick={() => navigate(-1)}
              size="lg"
              className="group bg-white/80 backdrop-blur-sm hover:bg-white border-2 border-rose-200 hover:border-rose-300 text-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4"
            >
              <ArrowLeft className="mr-3 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Go Back</span>
            </Button>
            
            <Button 
              onClick={() => navigate('/')}
              size="lg"
              className="group bg-gradient-to-r from-rose-500 via-sky-500 to-pink-500 hover:from-rose-600 hover:via-sky-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4"
            >
              <Home className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Return Home</span>
            </Button>
          </div>
          
          {/* Helpful Links */}
          <div className={`mt-16 transition-all duration-1000 delay-900 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-rose-200/50 shadow-lg">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center justify-center">
                <Compass className="w-6 h-6 mr-2 text-sky-600" />
                Quick Navigation
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => navigate('/')}
                  className="group p-4 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 hover:from-rose-200 hover:to-pink-200 border border-rose-200 hover:border-rose-300 transition-all duration-300 hover:scale-105"
                >
                  <Star className="w-6 h-6 text-rose-600 mx-auto mb-2 group-hover:rotate-12 transition-transform" />
                  <div className="font-semibold text-slate-800 mb-1">Landing Page</div>
                  <div className="text-sm text-slate-600">Main portal selection</div>
                </button>
                
                <button
                  onClick={() => navigate('/internal')}
                  className="group p-4 rounded-xl bg-gradient-to-br from-sky-100 to-cyan-100 hover:from-sky-200 hover:to-cyan-200 border border-sky-200 hover:border-sky-300 transition-all duration-300 hover:scale-105"
                >
                  <Zap className="w-6 h-6 text-sky-600 mx-auto mb-2 group-hover:rotate-12 transition-transform" />
                  <div className="font-semibold text-slate-800 mb-1">Internal Portal</div>
                  <div className="text-sm text-slate-600">Admin access</div>
                </button>
                
                <button
                  onClick={() => navigate('/vendor')}
                  className="group p-4 rounded-xl bg-gradient-to-br from-pink-100 to-rose-100 hover:from-pink-200 hover:to-rose-200 border border-pink-200 hover:border-pink-300 transition-all duration-300 hover:scale-105"
                >
                  <Search className="w-6 h-6 text-pink-600 mx-auto mb-2 group-hover:rotate-12 transition-transform" />
                  <div className="font-semibold text-slate-800 mb-1">Vendor Portal</div>
                  <div className="text-sm text-slate-600">External access</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
