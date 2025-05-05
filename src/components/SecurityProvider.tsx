
import React, { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import DOMPurify from 'dompurify';

interface SecurityProviderProps {
  children: React.ReactNode;
}

export function SecurityProvider({ children }: SecurityProviderProps) {
  const { toast } = useToast();
  
  // Sanitize content with DOMPurify
  useEffect(() => {
    DOMPurify.sanitize(document.body);
  }, []);

  // Disable right-click
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      showSecurityAlert();
      return false;
    };

    // Disable keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+C (copy), Ctrl+X (cut), F12 (inspect)
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'x' || e.key === 'X')) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I')) || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && (e.key === 'j' || e.key === 'J')) || // Ctrl+Shift+J
        (e.ctrlKey && e.shiftKey && (e.key === 'c' || e.key === 'C')) || // Ctrl+Shift+C
        (e.ctrlKey && e.key === 'u' || e.key === 'U') // Ctrl+U
      ) {
        e.preventDefault();
        showSecurityAlert();
        return false;
      }
    };

    // Prevent copy event
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      showSecurityAlert();
      return false;
    };

    // Prevent selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Helper function to show security alert
    const showSecurityAlert = () => {
      toast({
        title: "Security Alert",
        description: "😈 Access Denied. This action is restricted.",
        variant: "destructive",
        duration: 3000,
      });
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('selectstart', handleSelectStart);

    // Add CSS to prevent selection
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    `;
    document.head.appendChild(style);

    // Clean up
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('selectstart', handleSelectStart);
      document.head.removeChild(style);
    };
  }, [toast]);

  return <>{children}</>;
}
