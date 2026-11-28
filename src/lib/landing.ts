import type { ImageMetadata } from "astro";
import screenPedidos from "../assets/screen-pedidos.png";
import screenCarta from "../assets/screen-carta.png";
import screenInventario from "../assets/screen-inventario.png";
import screenCaja from "../assets/screen-caja.png";
import screenAsistencia from "../assets/screen-asistencia.png";
import screenRoles from "../assets/screen-roles.png";

export const heroHud = {
  location: "Lima / PE",
};

export interface Funcionalidad {
  id: string;
  badge: string;
  image: ImageMetadata;
  alt: string;
  title: string;
  desc: string;
  checks: string[];
  phone?: boolean;
  imagePosition?: "top" | "center";
}

export const funcionalidades: Funcionalidad[] = [
  {
    id: "pedidos",
    badge: "Pedido recibido · hace 3s",
    image: screenPedidos,
    alt: "Vista de órdenes y comandas en vivo en Fogonería",
    title: "Pedidos y comandas en tiempo real",
    desc: "Del salón a la cocina sin gritos ni papeles: el mesero manda la comanda y cocina la ve al instante, con estados que todos entienden.",
    checks: [
      "Comandas del mesero directo a cocina",
      "Estados en vivo: pendiente, en preparación, listo",
      "Pantalla de cocina (KDS) por prioridad",
    ],
  },
  {
    id: "carta",
    badge: "Carta actualizada · hace 1 min",
    image: screenCarta,
    alt: "Gestión de platos, categorías y carta virtual en Fogonería",
    title: "Platos, combos y promociones",
    desc: "Arma tu carta una vez y véndela por todos lados: platos con modificadores, combos y promos que se actualizan solas.",
    checks: [
      "Platos, categorías y modificadores",
      "Combos y promociones programadas",
      "Cambios de precio en segundos",
    ],
  },
  {
    id: "inventario",
    badge: "Stock actualizado · hace 2s",
    phone: true,
    image: screenInventario,
    alt: "Control de inventario y stock de insumos en tiempo real en Fogonería",
    title: "Inventario que se actualiza solo",
    desc: "Cada plato vendido descuenta sus insumos automáticamente. Te avisamos antes de que algo se agote.",
    checks: [
      "Descuento automático según receta",
      "Alertas de stock bajo",
      "Costo real de cada plato",
    ],
  },
  {
    id: "caja",
    badge: "Caja cuadrada · turno noche",
    image: screenCaja,
    alt: "Resumen diario de ventas, pedidos y reservas en Fogonería",
    title: "Ventas y operación diaria",
    desc: "Ventas, pedidos, ticket promedio y reservas en un solo panel. La caja y los gastos se cierran por turno, sin sorpresas.",
    checks: [
      "Cierres de caja por turno y sucursal",
      "Registro de gastos al día",
      "Base de clientes frecuentes",
    ],
  },
  {
    id: "asistencia",
    badge: "Asistencia registrada · 8:00 a. m.",
    image: screenAsistencia,
    alt: "Control de personal, turnos y asistencia semanal en Fogonería",
    title: "Asistencia del equipo",
    desc: "Olvídate del cuaderno: turnos, tardanzas y horas extras registrados solos, listos para planilla.",
    checks: [
      "Marcación de ingreso y salida",
      "Turnos y horarios por sucursal",
      "Reporte listo para planilla",
    ],
  },
  {
    id: "roles",
    badge: "Rol asignado · Mesero",
    image: screenRoles,
    alt: "Inicio de sesión y acceso por rol en Fogonería",
    imagePosition: "center",
    title: "Acceso seguro por rol",
    desc: "Cada persona entra con su cuenta y ve solo lo que le toca. Tú defines los roles de Admin, Cocina y Mesero.",
    checks: [
      "Roles de Admin, Cocina y Mesero",
      "Permisos limitados por sucursal",
      "Movimientos auditados por usuario",
    ],
  },
];

export const reviews = [
  {
    id: 1,
    name: "Carlos Mendoza",
    restaurant: "Cevichería El Muelle",
    quote:
      "Antes cerrábamos caja con cuaderno y calculadora hasta la medianoche. Ahora los pedidos caen directo a cocina y el cierre sale solo. Fogonería nos ordenó la casa.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sofía Arévalo",
    restaurant: "Café & Brasa",
    quote:
      "No sé nada de sistemas, pero en una tarde ya tomábamos pedidos con Fogonería. El equipo nos acompañó en cada paso.",
    rating: 5,
  },
  {
    id: 3,
    name: "Martín Cárdenas",
    restaurant: "Pizzería La Nonna",
    quote:
      "Las mermas bajaron desde el primer mes porque por fin vemos qué sale y qué se pierde. La inversión se pagó sola.",
    rating: 5,
  },
  {
    id: 4,
    name: "Lucía Fernández",
    restaurant: "Bistro 22",
    quote:
      "Con dos locales, necesitaba ver todo sin estar en todo. Desde mi celular reviso ventas, stock y cierres en tiempo real.",
    rating: 5,
  },
];

export const nosotrosFeatures = [
  {
    title: "Equipo peruano",
    description: "Gastronomía y tecnología, en el mismo equipo.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    title: "Implementación contigo",
    description: "Configuramos carta, turnos y sucursales a tu ritmo.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  },
  {
    title: "Soporte que responde",
    description: "Personas reales que conocen la hora punta.",
    icon: "M3 18v-6a9 9 0 0118 0v6M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z",
  },
  {
    title: "Datos protegidos",
    description: "Copias de seguridad y accesos por rol.",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  },
  {
    title: "Mejora continua",
    description: "Escuchamos a cada restaurante y ajustamos el sistema.",
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  },
];

export const faqs = [
  {
    q: "¿Qué es Fogonería?",
    a: "Un Business Management System para restaurantes: pedidos, cocina, inventario, caja y reportes en una sola plataforma.",
  },
  {
    q: "¿Necesito equipos especiales?",
    a: "No. Funciona en los equipos que ya tienes —PC, tablet o celular— con conexión a internet.",
  },
  {
    q: "¿Cuánto demora la puesta en marcha?",
    a: "La mayoría de restaurantes opera en la primera semana, con acompañamiento de nuestro equipo.",
  },
  {
    q: "¿Funciona con varias sucursales?",
    a: "Sí. Controla locales, stocks y cierres por sucursal desde un solo panel.",
  },
  {
    q: "¿Mis datos están seguros?",
    a: "Sí. Copias de seguridad automáticas y accesos por roles para tu equipo.",
  },
  {
    q: "¿La cotización tiene algún costo?",
    a: "No. Completa el formulario y te contactamos en menos de 24 horas, sin compromiso.",
  },
];
