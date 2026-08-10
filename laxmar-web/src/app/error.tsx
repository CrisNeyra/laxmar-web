"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-bold text-foreground">
        Algo salió mal
      </h1>
      <p className="max-w-md text-muted-foreground">
        Ocurrió un error inesperado. Podés intentar de nuevo o contactarnos
        directamente por WhatsApp.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset}>Reintentar</Button>
        <Button variant="outline" asChild>
          <Link href="/#contacto">Ir a contacto</Link>
        </Button>
      </div>
    </div>
  );
}
