import review1 from "../assets/review-1.jpg";
import review2 from "../assets/review-2.jpg";
import review3 from "../assets/review-3.jpg";
import review4 from "../assets/review-4.jpg";

export const heroHud = {
  location: "Lima / PE",
};

export const funcionalidades = [
  {
    id: "pedidos",
    badge: "Pedido recibido · hace 3s",
    title: "Pedidos y cocina en tiempo real",
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
    title: "Caja, gastos y clientes",
    desc: "Cierres que cuadran, gastos bajo control y clientes que vuelven: la plata clara, todos los días.",
    checks: [
      "Cierres de caja por turno y sucursal",
      "Registro de gastos al día",
      "Base de clientes frecuentes",
    ],
  },
  {
    id: "asistencia",
    badge: "Asistencia registrada · 8:00 a. m.",
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
    title: "Roles y permisos",
    desc: "Cada puesto ve solo lo que le toca: tú creas los roles de Admin, Cocina y Mesero, y el sistema hace el resto.",
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
    image: review1,
    alt: "Foto de Carlos Mendoza",
    quote:
      "Antes cerrábamos caja con cuaderno y calculadora hasta la medianoche. Ahora los pedidos caen directo a cocina y el cierre sale solo. Fogonería nos ordenó la casa.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sofía Arévalo",
    restaurant: "Café & Brasa",
    image: review2,
    alt: "Foto de Sofía Arévalo",
    quote:
      "No sé nada de sistemas, pero en una tarde ya tomábamos pedidos con Fogonería. El equipo nos acompañó en cada paso.",
    rating: 5,
  },
  {
    id: 3,
    name: "Martín Cárdenas",
    restaurant: "Pizzería La Nonna",
    image: review3,
    alt: "Foto de Martín Cárdenas",
    quote:
      "Las mermas bajaron desde el primer mes porque por fin vemos qué sale y qué se pierde. La inversión se pagó sola.",
    rating: 5,
  },
  {
    id: 4,
    name: "Lucía Fernández",
    restaurant: "Bistro 22",
    image: review4,
    alt: "Foto de Lucía Fernández",
    quote:
      "Con dos locales, necesitaba ver todo sin estar en todo. Desde mi celular reviso ventas, stock y cierres en tiempo real.",
    rating: 5,
  },
];
