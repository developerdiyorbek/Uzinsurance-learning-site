"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Info, CheckCircle2, XCircle } from "lucide-react";
import React from "react";

type AlertType = "error" | "warn" | "info" | "success";

interface AlertsProps {
  type?: AlertType;
  title: string;
  description: string;
}

export function Alerts({ type = "info", title, description }: AlertsProps) {
  const variants = {
    error: {
      icon: <XCircle className="h-5 w-5 text-red-600" />,
      className: "border-red-400/70 bg-red-50 text-red-900",
      titleColor: "text-red-800",
      descColor: "text-red-700",
    },
    warn: {
      icon: <Info className="h-5 w-5 text-yellow-600" />,
      className: "border-yellow-400/70 bg-yellow-50 text-yellow-900",
      titleColor: "text-yellow-800",
      descColor: "text-yellow-700",
    },
    info: {
      icon: <AlertCircle className="h-5 w-5 text-blue-600" />,
      className: "border-blue-400/70 bg-blue-50 text-blue-900",
      titleColor: "text-blue-800",
      descColor: "text-blue-700",
    },
    success: {
      icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
      className: "border-green-400/70 bg-green-50 text-green-900",
      titleColor: "text-green-800",
      descColor: "text-green-700",
    },
  };

  const current = variants[type];

  return (
    <div className="w-full p-6">
      <Alert className={current.className}>
        {current.icon}
        <div>
          <AlertTitle className={`font-semibold ${current.titleColor}`}>
            {title}
          </AlertTitle>
          <AlertDescription className={current.descColor}>
            {description}
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
}
