import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isLandingPage = location.pathname === '/';

  return (
    <nav className={cn(
      "w-full z-50 transition-all duration-300",
      transparent 
        ? "absolute top-0 left-0 right-0 bg-transparent" 
        : "relative bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm"
    )}>
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div 
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => navigate('/')}
        >
          {/* Seplat Logo */}
          <div className="flex items-center">
            <img 
              src="/SeplatLogoClear.png" 
              alt="Seplat Energy" 
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          {/* Divider */}
          <div className={cn(
            "h-8 w-px transition-colors",
            transparent ? "bg-white/30" : "bg-gray-300"
          )}></div>
          
          {/* CCMG Branding */}
          <div className="flex items-center gap-3">
            <div className={cn(
              "h-10 w-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105",
              transparent 
                ? "bg-white text-blue-600" 
                : "bg-gradient-to-br from-blue-600 to-blue-700 text-white"
            )}>
              <span className="text-xl font-bold">C</span>
            </div>
            <span className={cn(
              "text-xl font-bold transition-colors",
              transparent 
                ? "text-white" 
                : "text-gray-900"
            )}>
              CCMG
            </span>
          </div>
        </div>

        {/* Actions - Empty for now */}
        <div className="flex items-center gap-4">
        </div>
      </div>
    </nav>
  );
}