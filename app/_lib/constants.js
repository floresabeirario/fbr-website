// app/_lib/constants.js
// Fonte única de verdade para URLs e dados de contacto

export const SITE_URL = "https://floresabeirario.pt";

// Página de reserva de preservação
export const FORM_URL = "/reservar-preservacao";

// Formulário Monday.com — vale oferta
export const FORM_URL_VALE = "https://wkf.ms/4jUqeAR";

// WhatsApp
export const WA_NUMBER = "351934680300";

export const WA_URL = `https://wa.me/${WA_NUMBER}?text=` +
  encodeURIComponent("Olá! Gostaria de saber mais sobre a preservação das minhas flores.");

export const WA_URL_NOIVA = `https://wa.me/${WA_NUMBER}?text=` +
  encodeURIComponent("Olá! Vou casar em breve e gostaria de reservar a preservação do meu bouquet.");

export const WA_URL_RECRIACAO = `https://wa.me/${WA_NUMBER}?text=` +
  encodeURIComponent("Olá! Gostaria de saber mais sobre a recriação do meu bouquet.");

export const WA_URL_VALE = `https://wa.me/${WA_NUMBER}?text=` +
  encodeURIComponent("Olá! Gostaria de saber mais sobre o vale oferta de preservação de flores.");

export const WA_URL_LUTO = `https://wa.me/${WA_NUMBER}?text=` +
  encodeURIComponent("Olá! Gostaria de preservar flores de uma cerimónia de homenagem.");

// Tracking
export const TRACKING_URL = "https://status.floresabeirario.pt";

// Contacto
export const EMAIL = "info@floresabeirario.pt";
export const PHONE_DISPLAY = "+351 934 680 300";
export const PHONE = `+${WA_NUMBER}`; // Formato E.164 para JSON-LD

// Redes sociais
export const SOCIAL_INSTAGRAM = "https://www.instagram.com/floresabeirario/";
export const SOCIAL_FACEBOOK  = "https://www.facebook.com/floresabeirario/";
export const SOCIAL_TIKTOK    = "https://www.tiktok.com/@floresabeirario";
export const SOCIAL_CASAMENTOS = "https://www.casamentos.pt/ideias-criativas-para-casamentos/flores-a-beira-rio-preservacao-de-flores--e171385";
