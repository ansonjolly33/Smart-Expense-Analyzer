"use client";

import { useStore } from "@/lib/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useStore();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated && pathname !== '/login') {
      router.push('/login');
    }
  }, [isAuthenticated, pathname, router, mounted]);

  // Avoid hydration mismatch by not rendering until mounted
  if (!mounted) return null;

  if (!isAuthenticated && pathname !== '/login') {
    return <div className="min-h-screen flex items-center justify-center">Redirecting to login...</div>;
  }

  return <>{children}</>;
}
