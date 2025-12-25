import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';

export const AppHeader = () => {
  return (
    <header className="bg-background h-14 flex items-center gap-2 shrink-0 border-b px-4" >
      <SidebarTrigger />
    </header>
  );
};
