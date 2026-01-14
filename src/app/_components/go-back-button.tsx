"use client";

import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GoBackButton() {
  return (
    <Button
      variant="outline"
      className="px-8 py-3 border border-primary text-foreground font-semibold hover:bg-primary hover:text-primary-foreground transition-all bg-transparent"
      onClick={() => history.back()}
    >
      <ArrowLeftIcon className="w-4 h-4 mr-2" />
      Go Back
    </Button>
  );
}
