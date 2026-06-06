# Laxmar | Traslados de pasajeros

Página web oficial de **Laxmar**, una empresa argentina de traslados de pasajeros que ofrece servicios turísticos, corporativos y para eventos con cobertura a nivel nacional e internacional (Uruguay).

El sitio web está diseñado con altos estándares de UX/UI, optimizado para ser rápido, accesible y atractivo, con el objetivo de convertir visitantes en clientes a través de una excelente percepción visual de calidad.

## 🚀 Tecnologías utilizadas

El proyecto está desarrollado con las últimas tecnologías del ecosistema moderno de desarrollo web:

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
- **Iconografía:** [Lucide React](https://lucide.dev/)
- **Formularios / Leads:** [Formspree](https://formspree.io/) (Sin backend)
- **Tipografía:** Geist Sans & Geist Mono (Optimizadas vía `next/font`)
- **Despliegue:** [Vercel](https://vercel.com/)

## ✨ Características principales

- **Diseño sofisticado:** Interfaz moderna con imágenes satelitales, overlays sutiles, transiciones y gradientes para una experiencia inmersiva.
- **Videos Hero:** Fondo de pantalla principal con videos de la flota en ruta que rotan con *crossfade* continuo.
- **Responsive:** Adaptable 100% a dispositivos móviles, tablets y escritorio.
- **Tema Oscuro/Claro:** Soporte nativo y automático para modo claro y oscuro con transiciones fluidas.
- **Formulario Integrado:** Captura de *leads* de clientes directamente al correo mediante la API de Formspree, sin necesidad de mantener un backend propio.
- **Botón Flotante de WhatsApp:** Integración con WhatsApp para un contacto ágil y directo.

## 📦 Configuración y desarrollo local

1. **Clonar el repositorio:**

   ```bash
   git clone <url-del-repositorio>
   cd laxmar-web
   ```

2. **Instalar las dependencias:**

   ```bash
   npm install
   ```

3. **Variables de entorno:**

   Renombra o crea el archivo `.env.local` en la raíz del proyecto y añade el ID de tu formulario de Formspree para habilitar la recepción de correos desde la sección Contacto:

   ```bash
   NEXT_PUBLIC_FORMSPREE_ID=tu_form_id_aqui
   ```

4. **Ejecutar el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

5. Abrir [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## 🚢 Despliegue (Deploy)

El proyecto está configurado para un despliegue automático en **Vercel**. Cualquier *commit* que se realice y se suba a la rama `main` en GitHub, disparará automáticamente una nueva construcción y actualización del sitio en producción.

---

*Diseñado y desarrollado para Laxmar - Seguridad y comodidad a cualquier punto del país.*