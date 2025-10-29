import React from 'react';
import { Toast as RadixToast, ToastProvider, ToastViewport, ToastTitle, ToastDescription, ToastClose } from '@radix-ui/react-toast';
import { CheckCircle, XCircle } from 'lucide-react';

interface ToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  type?: 'success' | 'error';
}

const Toast: React.FC<ToastProps> = ({ open, onOpenChange, title, description, type = 'success' }) => {
  return (
    <RadixToast open={open} onOpenChange={onOpenChange} className={`toast ${type}`}>
      <div className="flex items-center">
        {type === 'success' ? <CheckCircle className="mr-2" /> : <XCircle className="mr-2" />}
        <div>
          <ToastTitle>{title}</ToastTitle>
          {description && <ToastDescription>{description}</ToastDescription>}
        </div>
      </div>
      <ToastClose className="ml-auto">Close</ToastClose>
    </RadixToast>
  );
};

export const ToastContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ToastProvider>
      {children}
      <ToastViewport />
    </ToastProvider>
  );
};

export default Toast;