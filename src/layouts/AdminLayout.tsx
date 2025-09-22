import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Admin Header */}
          <header className="h-16 border-b bg-white/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="flex items-center gap-2">
                <div className="bg-gradient-primary p-2 rounded-lg">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
              </div>
            </div>
            
            <Link to="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Site
              </Button>
            </Link>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 bg-gradient-to-br from-background via-background to-primary/5">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}