"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "./utils";

const Dialog = React.forwardRef<any, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>>(
  function Dialog({ children, ...props }, ref) {
    return (
      <DialogPrimitive.Root data-slot="dialog" {...props}>
        {children}
      </DialogPrimitive.Root>
    );
  },
);

const DialogTrigger = React.forwardRef<any, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>>(
  function DialogTrigger({ children, ...props }, ref) {
    return (
      <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props}>
        {children}
      </DialogPrimitive.Trigger>
    );
  },
);

const DialogPortal = React.forwardRef<any, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>>(
  function DialogPortal({ children, ...props }, ref) {
    return (
      <DialogPrimitive.Portal data-slot="dialog-portal" {...props}>
        {children}
      </DialogPrimitive.Portal>
    );
  },
);

const DialogClose = React.forwardRef<any, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>>(
  function DialogClose({ children, ...props }, ref) {
    return (
      <DialogPrimitive.Close data-slot="dialog-close" {...props}>
        {children}
      </DialogPrimitive.Close>
    );
  },
);

const DialogOverlay = React.forwardRef<any, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>>(
  function DialogOverlay({ className, ...props }, ref) {
    return (
      <DialogPrimitive.Overlay
        data-slot="dialog-overlay"
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
          className,
        )}
        {...props}
      />
    );
  },
);

const DialogContent = React.forwardRef<any, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>>(
  function DialogContent({ className, children, ...props }, ref) {
    return (
      <DialogPortal data-slot="dialog-portal">
        <DialogOverlay />
        <DialogPrimitive.Content
          data-slot="dialog-content"
          className={cn(
            "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
            className,
          )}
          {...props}
        >
          {children}
          <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    );
  },
);

const DialogHeader = React.forwardRef<any, React.ComponentPropsWithoutRef<"div">>(
  function DialogHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="dialog-header"
        className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
        {...props}
      />
    );
  },
);

const DialogFooter = React.forwardRef<any, React.ComponentPropsWithoutRef<"div">>(
  function DialogFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="dialog-footer"
        className={cn(
          "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
          className,
        )}
        {...props}
      />
    );
  },
);

const DialogTitle = React.forwardRef<any, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>>(
  function DialogTitle({ className, ...props }, ref) {
    return (
      <DialogPrimitive.Title
        data-slot="dialog-title"
        className={cn("text-lg leading-none font-semibold", className)}
        {...props}
      />
    );
  },
);

const DialogDescription = React.forwardRef<any, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>>(
  function DialogDescription({ className, ...props }, ref) {
    return (
      <DialogPrimitive.Description
        data-slot="dialog-description"
        className={cn("text-muted-foreground text-sm", className)}
        {...props}
      />
    );
  },
);

Dialog.displayName = "Dialog";
DialogTrigger.displayName = "DialogTrigger";
DialogPortal.displayName = "DialogPortal";
DialogClose.displayName = "DialogClose";
DialogOverlay.displayName = "DialogOverlay";
DialogContent.displayName = "DialogContent";
DialogHeader.displayName = "DialogHeader";
DialogFooter.displayName = "DialogFooter";
DialogTitle.displayName = "DialogTitle";
DialogDescription.displayName = "DialogDescription";

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
