import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-4xl font-bold text-foreground">404</h1>
      <p className="max-w-md text-muted-foreground">
        La página que buscás no existe. Volvé al inicio para conocer nuestros
        servicios de traslado.
      </p>
      <Button asChild>
        <Link href="/">Volver al inicio</Link>
      </Button>
    </div>
  );
}
