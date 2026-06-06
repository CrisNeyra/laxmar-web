export const CONTACT = {
  email: "contacto@laxmar.com.ar",
  phoneLabel: "+54 9 11 0000-0000",
  phoneHref: "+5491100000000",
  whatsappNumber: "5491100000000",
  whatsappMessage: "Hola Laxmar, quiero cotizar un viaje",
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
