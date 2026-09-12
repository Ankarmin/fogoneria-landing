import demoCriolla from "../assets/demo-criolla.jpg";
import demoPostres from "../assets/demo-postres.jpg";
import demoCafe from "../assets/demo-cafe.jpg";
import review1 from "../assets/review-1.jpg";
import review2 from "../assets/review-2.jpg";
import review3 from "../assets/review-3.jpg";
import review4 from "../assets/review-4.jpg";
import { ORIGIN_URLS } from "./site";

export const demos = [
  {
    id: 1,
    title: "Sentimiento Peruano",
    category: "Restaurante de comida criolla",
    image: demoCriolla,
    alt: "Demo de Sentimiento Peruano",
    tags: ["Reservas", "Carta QR"],
    link: ORIGIN_URLS.demo("criolla"),
  },
  {
    id: 2,
    title: "Tu postre a la limeña",
    category: "Repostería artesanal",
    image: demoPostres,
    alt: "Demo de Tu postre a la limeña",
    tags: ["Catálogo", "Pedidos"],
    link: ORIGIN_URLS.demo("postres"),
  },
  {
    id: 3,
    title: "Café Express",
    category: "Cafetería y desayunos",
    image: demoCafe,
    alt: "Demo de Café Express",
    tags: ["Menú Digital", "Delivery"],
    link: ORIGIN_URLS.demo("cafe"),
  },
];

export const reviews = [
  {
    id: 1,
    name: "Carlos Mendoza",
    restaurant: "Cevichería El Muelle",
    image: review1,
    alt: "Foto de Carlos Mendoza",
    quote:
      "Antes perdíamos mucho tiempo enviando el menú por WhatsApp en PDF. Ahora los clientes escanean el QR en la mesa y piden directo. Fogoneria nos salvó la temporada.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sofía Arévalo",
    restaurant: "Café & Brasa",
    image: review2,
    alt: "Foto de Sofía Arévalo",
    quote:
      "No sé nada de programación, pero configurar mi carta me tomó literalmente 15 minutos. El diseño es hermoso y el soporte es súper rápido.",
    rating: 5,
  },
  {
    id: 3,
    name: "Martín Cárdenas",
    restaurant: "Pizzería La Nonna",
    image: review3,
    alt: "Foto de Martín Cárdenas",
    quote:
      "Dudaba si pagar una mensualidad valía la pena, pero la imagen profesional que da tener mi propio dominio (.com) ha hecho que mis pedidos a domicilio aumenten un 30%.",
    rating: 5,
  },
  {
    id: 4,
    name: "Lucía Fernández",
    restaurant: "Bistro 22",
    image: review4,
    alt: "Foto de Lucía Fernández",
    quote:
      "Tener el control total para cambiar precios o esconder platos que se agotaron en tiempo real desde mi celular es increíble. 100% recomendado.",
    rating: 5,
  },
];
