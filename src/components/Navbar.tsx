import { NavLink } from "@/components/NavLink";
import { Activity, Brain, GitCompare } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">CloudOptim AI</h1>
              <p className="text-xs text-muted-foreground">Predictive Analytics</p>
            </div>
          </div>
          
          <div className="flex space-x-1">
            <NavLink
              to="/"
              end
              className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              activeClassName="text-primary bg-primary/10"
            >
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>Dashboard</span>
              </div>
            </NavLink>
            
            <NavLink
              to="/explainability"
              className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              activeClassName="text-primary bg-primary/10"
            >
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4" />
                <span>Explainability</span>
              </div>
            </NavLink>
            
            <NavLink
              to="/comparison"
              className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              activeClassName="text-primary bg-primary/10"
            >
              <div className="flex items-center space-x-2">
                <GitCompare className="w-4 h-4" />
                <span>Comparison</span>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
