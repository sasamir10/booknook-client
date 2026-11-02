"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export function DialogTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <DialogPrimitive.Title className={`font-display text-3xl font-bold ${className}`}>{children}</DialogPrimitive.Title>;
}

export function DialogDescription({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <DialogPrimitive.Description className={`text-sm leading-6 text-[#6e7c71] ${className}`}>{children}</DialogPrimitive.Description>;
}

export function DialogContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[#14211c]/45 backdrop-blur-sm" />
      <DialogPrimitive.Content className={`fixed left-1/2 top-1/2 z-[51] max-h-[90vh] w-[min(540px,calc(100%-28px))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-[#e6e8dc] bg-[#fffefa] p-6 shadow-2xl outline-none sm:p-8 ${className}`}>
        {children}
        <DialogPrimitive.Close className="absolute right-5 top-5 rounded-full p-2 text-[#68776d] transition hover:bg-[#f0f1e9]" aria-label="Close dialog"><X size={17} /></DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
