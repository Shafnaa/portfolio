import React from 'react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
}

export const Navbar = React.memo(({ className }: NavbarProps) => {
  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-4 md:px-6 bg-background/80 backdrop-blur-md border-b border-border',
        className
      )}
    >
      <div className="font-medium text-lg">
        Saujana Shafi
      </div>
      <div className="flex items-center gap-4">
        {/* Links will be added here later */}
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';
