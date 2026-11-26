import review1 from "../assets/review-1.jpg";
import review2 from "../assets/review-2.jpg";
import review3 from "../assets/review-3.jpg";
import review4 from "../assets/review-4.jpg";
import screenPedidos from "../assets/screen-pedidos.png";
import screenCarta from "../assets/screen-carta.png";
import screenInventario from "../assets/screen-inventario.png";
import screenCaja from "../assets/screen-caja.png";
import screenAsistencia from "../assets/screen-asistencia.png";
import screenRoles from "../assets/screen-roles.png";

export const heroHud = {
  location: "Lima / PE",
};

export const funcionalidades = [
  {
    id: "pedidos",
    badge: "Pedido recibido · hace 3s",
    image: screenPedidos,
    alt: "Vista de órdenes y comandas en vivo en Fogonería",
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
    imagePosition: "center" as const,
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
