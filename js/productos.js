/*
  Datos DE EJEMPLO para la práctica simulada. Productos y marcas ficticios.
  Los campos siguen el DER de SCRUM-10:
  Producto(nombre, marca, codigo_barras, categoria, fuente_informacion,
  fecha_ultima_actualizacion, informacion_completa) +
  Producto_Ingrediente + Producto_Alergeno(es_traza).
  alergenos = declarados como ingrediente (es_traza = false)
  trazas    = advertencias de trazas      (es_traza = true)
  fotos     = rutas de imágenes del etiquetado ("etiqueta-ejemplo" dibuja una imagen de muestra).
  null o lista vacía = dato faltante: la ficha muestra "No disponible".
  Cuando exista la API, este archivo se reemplaza por fetch("/api/productos").
*/
const PRODUCTOS = [
  { id: 1, nombre: "Leche entera UHT 1 L", marca: "Lácteos La Sabana", codigo_barras: "7700000000011", categoria: "Lácteos",
    ingredientes: ["Leche entera"], alergenos: ["Leche"], trazas: [],
    fuente_informacion: "Etiqueta del fabricante", fecha_ultima_actualizacion: "2026-10-20", informacion_completa: true, fotos: ["etiqueta-ejemplo"] },
  { id: 2, nombre: "Yogur de fresa", marca: "Lácteos La Sabana", codigo_barras: "7700000000028", categoria: "Lácteos",
    ingredientes: ["Leche", "Azúcar", "Pulpa de fresa", "Almidón", "Fermentos lácticos"], alergenos: ["Leche"], trazas: ["Soya"],
    fuente_informacion: "Sitio web del fabricante", fecha_ultima_actualizacion: "2026-10-18", informacion_completa: true, fotos: ["etiqueta-ejemplo"] },
  { id: 3, nombre: "Queso campesino", marca: "Quesos Andinos", codigo_barras: "7700000000035", categoria: "Lácteos",
    ingredientes: ["Leche pasteurizada", "Sal", "Cuajo"], alergenos: ["Leche"], trazas: [],
    fuente_informacion: "Ficha enviada por el fabricante", fecha_ultima_actualizacion: "2026-10-05", informacion_completa: false, fotos: [] },
  { id: 4, nombre: "Pan tajado integral", marca: "Panadería Andina", codigo_barras: "7700000000042", categoria: "Panadería",
    ingredientes: ["Harina de trigo integral", "Agua", "Azúcar", "Levadura", "Aceite de soya", "Sal"], alergenos: ["Trigo", "Soya"], trazas: ["Leche", "Huevo"],
    fuente_informacion: "Etiqueta del fabricante", fecha_ultima_actualizacion: "2026-10-22", informacion_completa: true, fotos: ["etiqueta-ejemplo"] },
  { id: 5, nombre: "Galletas de avena y pasas", marca: "Dulces Monserrate", codigo_barras: "7700000000059", categoria: "Galletas y snacks",
    ingredientes: ["Avena", "Harina de trigo", "Pasas", "Azúcar", "Aceite de palma", "Huevo", "Sal"], alergenos: ["Trigo", "Huevo"], trazas: ["Maní", "Frutos secos"],
    fuente_informacion: "Etiqueta del fabricante", fecha_ultima_actualizacion: "2026-10-25", informacion_completa: true, fotos: ["etiqueta-ejemplo"] },
  { id: 6, nombre: "Galletas de limón sin gluten", marca: "Granos del Páramo", codigo_barras: "7700000000066", categoria: "Galletas y snacks",
    ingredientes: ["Harina de arroz", "Almidón de maíz", "Azúcar", "Mantequilla", "Saborizante de limón"], alergenos: ["Leche"], trazas: [],
    fuente_informacion: "Etiqueta del fabricante", fecha_ultima_actualizacion: "2026-10-27", informacion_completa: true, fotos: ["etiqueta-ejemplo"] },
  { id: 7, nombre: "Barra de cereal con maní", marca: "Granos del Páramo", codigo_barras: "7700000000073", categoria: "Galletas y snacks",
    ingredientes: ["Avena", "Maní", "Miel", "Azúcar", "Aceite de palma"], alergenos: ["Maní"], trazas: ["Frutos secos", "Leche"],
    fuente_informacion: "Etiqueta del fabricante", fecha_ultima_actualizacion: null, informacion_completa: false, fotos: ["etiqueta-ejemplo"] },
  { id: 8, nombre: "Bebida de almendras", marca: "Verde Sabana", codigo_barras: "7700000000080", categoria: "Bebidas",
    ingredientes: ["Agua", "Almendras (2,3 %)", "Azúcar", "Sal"], alergenos: ["Frutos secos (almendra)"], trazas: [],
    fuente_informacion: "Etiqueta del fabricante", fecha_ultima_actualizacion: "2026-10-14", informacion_completa: true, fotos: ["etiqueta-ejemplo"] },
  { id: 9, nombre: "Jugo de naranja", marca: "Verde Sabana", codigo_barras: "7700000000097", categoria: "Bebidas",
    ingredientes: ["Jugo de naranja", "Agua"], alergenos: [], trazas: [],
    fuente_informacion: null, fecha_ultima_actualizacion: null, informacion_completa: false, fotos: [] },
  { id: 10, nombre: "Chocolatina con leche", marca: "Dulces Monserrate", codigo_barras: "7700000000103", categoria: "Chocolates y dulces",
    ingredientes: ["Azúcar", "Manteca de cacao", "Leche en polvo", "Pasta de cacao", "Lecitina de soya"], alergenos: ["Leche", "Soya"], trazas: ["Maní", "Avellana"],
    fuente_informacion: "Etiqueta del fabricante", fecha_ultima_actualizacion: "2026-10-30", informacion_completa: true, fotos: ["etiqueta-ejemplo"] },
  { id: 11, nombre: "Mermelada de mora", marca: "Dulces Monserrate", codigo_barras: "7700000000110", categoria: "Chocolates y dulces",
    ingredientes: [], alergenos: [], trazas: [],
    fuente_informacion: null, fecha_ultima_actualizacion: null, informacion_completa: false, fotos: [] },
  { id: 12, nombre: "Hojuelas de maíz", marca: "Granos del Páramo", codigo_barras: "7700000000127", categoria: "Cereales",
    ingredientes: ["Maíz", "Azúcar", "Sal", "Malta de cebada"], alergenos: ["Gluten (cebada)"], trazas: [],
    fuente_informacion: "Etiqueta del fabricante", fecha_ultima_actualizacion: "2026-10-12", informacion_completa: true, fotos: ["etiqueta-ejemplo"] }
];
