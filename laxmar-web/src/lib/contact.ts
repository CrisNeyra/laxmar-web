export const CONTACT = {
  email: "Laxmarviajes@gmail.com",
  phoneLabel: "4265-1842",
  phoneHref: "+541142651842",
  whatsappLabel: "223-581-5805",
  whatsappNumber: "5492235815805",
  whatsappMessage: "Hola Laxmar, quiero cotizar un viaje",
  city: "Mar del Plata, Argentina",
  instagramHandle: "@laxmar",
  instagramUrl: "https://instagram.com/laxmar",
  facebookHandle: "Laxmar",
  facebookUrl: "https://facebook.com/laxmar",
} as const;

export function whatsappLink(message: string = CONTACT.whatsappMessage) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${text}`;
}
