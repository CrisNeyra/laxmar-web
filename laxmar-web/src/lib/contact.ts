export const CONTACT = {
  email: "contacto@laxmar.com.ar",
  phoneLabel: "4265-1842",
  phoneHref: "+541142651842",
  whatsappLabel: "11-6888-3430",
  whatsappNumber: "5491168883430",
  whatsappMessage:
    "Hola Laxmar, quiero cotizar un viaje. (También puedo hablar con el asistente: escribí hola)",
  city: "Buenos Aires, Argentina",
  instagramHandle: "@laxmar",
  instagramUrl: "https://instagram.com/laxmar",
  facebookHandle: "Laxmar",
  facebookUrl: "https://facebook.com/laxmar",
} as const;

export function whatsappLink(message: string = CONTACT.whatsappMessage) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${text}`;
}
