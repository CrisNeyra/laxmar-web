# Laxmar Web

Sitio web oficial de **Laxmar**, empresa argentina de traslados de pasajeros con cobertura provincial y nacional. Pensado para generar confianza, mostrar la flota y convertir visitas en consultas por formulario o WhatsApp.

**Sitio en producción:** [laxmar-web.vercel.app](https://laxmar-web.vercel.app)

**Repositorio:** [github.com/CrisNeyra/laxmar-web](https://github.com/CrisNeyra/laxmar-web)

---

## Contenido del sitio

La home incluye las siguientes secciones:

| Sección | Descripción |
|--------|-------------|
| **Hero** | Video en loop de la flota con mensaje principal y CTA |
| **Destinos** | Rutas y tipos de viaje |
| **Flota** | Unidades y capacidad |
| **Cómo trabajamos** | Proceso en 3 pasos (cotizar → coordinar → viajar) |
| **Testimonios** | Reseñas de clientes |
| **Cobertura** | Mapa / alcance geográfico |
| **Misión** | Llamado a la acción |
| **Contacto** | Formulario de cotización + datos de contacto |

Además: navbar fija, footer, modo claro/oscuro, botón flotante de WhatsApp y analytics de visitas.

---

## Stack tecnológico

| Área | Tecnología |
|------|------------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Lenguaje | [TypeScript](https://www.typescriptlang.org/) |
| Estilos | [Tailwind CSS v4](https://tailwindcss.com/) |
| Animaciones | [Framer Motion](https://www.framer.com/motion/) |
| Iconos | [Lucide React](https://lucide.dev/) |
| Formulario | [Formspree](https://formspree.io/) |
| Analytics | [Vercel Analytics](https://vercel.com/analytics) |
| Hosting | [Vercel](https://vercel.com/) |

No hay backend propio: el sitio es estático con integraciones externas para formulario y métricas.

---

## Estructura del proyecto

```
laxmar-web/
├── public/
│   ├── images/          # Fotos del sitio (flota, contacto, logo, etc.)
│   └── videos/          # Videos del hero
├── src/
│   ├── app/
│   │   ├── layout.tsx   # Metadata SEO, favicon, analytics
│   │   ├── page.tsx     # Página principal
│   │   └── globals.css  # Estilos globales y tokens de color
│   ├── components/
│   │   ├── layout/      # Navbar, footer, WhatsApp, tema
│   │   ├── sections/    # Secciones de la home
│   │   └── ui/          # Botones, inputs, cards
│   └── lib/
│       ├── contact.ts   # Teléfonos, email, redes, link WhatsApp
│       └── utils.ts
├── .env.local           # Variables locales (no se sube a Git)
└── package.json
```

---

## Requisitos

- **Node.js** 18.18 o superior
- **npm** 9 o superior

---

## Desarrollo local

### 1. Clonar e instalar

```bash
git clone https://github.com/CrisNeyra/laxmar-web.git
cd laxmar-web
npm install
```

### 2. Variables de entorno

Crear el archivo `.env.local` en la raíz de `laxmar-web`:

```env
NEXT_PUBLIC_FORMSPREE_ID=mvznqggp
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_FORMSPREE_ID` | ID del formulario en Formspree. Sin esto, el formulario abre el cliente de correo (`mailto:`). |
| `NEXT_PUBLIC_SITE_URL` | URL base para metadatos SEO en desarrollo. En producción Vercel usa el dominio real. |

### 3. Levantar el servidor

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) (si el puerto está ocupado, Next.js usará el 3001).

### 4. Otros comandos

```bash
npm run build   # Build de producción
npm run start   # Servidor de producción (después del build)
npm run lint    # Revisión de código con ESLint
```

---

## Editar contenido frecuente

### Datos de contacto

Archivo: `src/lib/contact.ts`

```ts
export const CONTACT = {
  email: "contacto@laxmar.com.ar",
  phoneLabel: "4265-1842",
  phoneHref: "+541142651842",
  whatsappLabel: "11-6888-3430",
  whatsappNumber: "5491168883430",
  // ...
};
```

Los cambios se reflejan en el footer, sección de contacto y botón flotante de WhatsApp.

### SEO y favicon

Archivo: `src/app/layout.tsx` — título, descripción, keywords, Open Graph (tarjeta al compartir en WhatsApp) e icono de pestaña.

### Imágenes y videos

- Fotos: `public/images/`
- Videos del hero: `public/videos/`

---

## Despliegue

El proyecto está publicado en **Vercel**.

### Deploy manual (desde la carpeta del proyecto)

```bash
npx vercel --prod
```

### Deploy automático con Git

Si Vercel está conectado a GitHub, cada `push` a la rama `main` dispara un nuevo deploy.

### Variables en Vercel

En el panel de Vercel → **Settings → Environment Variables**, configurar:

- `NEXT_PUBLIC_FORMSPREE_ID`
- `NEXT_PUBLIC_SITE_URL` → `https://laxmar-web.vercel.app`

### Analytics

El código de Vercel Analytics ya está integrado. Para ver métricas:

1. Entrar a [vercel.com](https://vercel.com)
2. Proyecto **laxmar-web** → pestaña **Analytics**
3. Activar **Enable Analytics** si aún no está habilitado

---

## Formulario de contacto

El formulario envía los datos a Formspree, que reenvía el mensaje al correo configurado en la cuenta.

Campos capturados: nombre, teléfono, email, origen/destino, fecha, pasajeros y mensaje.

Si Formspree no está configurado, el sitio usa un fallback con `mailto:`.

---

## Licencia

Proyecto privado. Todos los derechos reservados © Laxmar.

---

*Desarrollado para Laxmar — Traslados de pasajeros provinciales y nacionales.*
