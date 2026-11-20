/* AllerSafe | SCRUM-16 (US-09): buscar productos y consultar su ficha */
(function () {
  const $ = (s) => document.querySelector(s);
  const vistaBusqueda = $("#vista-busqueda");
  const vistaFicha = $("#vista-ficha");
  const inputQ = $("#q");
  const selectCat = $("#categoria");
  const lista = $("#resultados");
  const contador = $("#contador");
  const vacio = $("#sin-resultados");

  const NO_DISPONIBLE = '<span class="no-disp">No disponible</span>';

  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const normalizar = (t) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

  function formatearFecha(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
  }

  // Imagen de muestra mientras no existan fotos reales en /img
  function etiquetaEjemplo(nombre) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="240" viewBox="0 0 360 240">
      <rect width="360" height="240" fill="#EEF3F2"/><rect x="16" y="16" width="328" height="208" fill="#fff" stroke="#9DB5B2"/>
      <text x="32" y="52" font-family="sans-serif" font-size="16" font-weight="700" fill="#1B2B2E">${esc(nombre)}</text>
      <rect x="32" y="72" width="296" height="8" fill="#D5E0DE"/><rect x="32" y="92" width="240" height="8" fill="#D5E0DE"/>
      <rect x="32" y="112" width="280" height="8" fill="#D5E0DE"/><rect x="32" y="132" width="200" height="8" fill="#D5E0DE"/>
      <text x="32" y="196" font-family="sans-serif" font-size="13" fill="#5B6F6C">Imagen de muestra del etiquetado</text></svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  // ---- Búsqueda ----
  function cargarCategorias() {
    const cats = [...new Set(PRODUCTOS.map((p) => p.categoria))].sort((a, b) => a.localeCompare(b, "es"));
    cats.forEach((c) => selectCat.insertAdjacentHTML("beforeend", `<option value="${esc(c)}">${esc(c)}</option>`));
  }

  function buscar() {
    const q = normalizar(inputQ.value);
    const cat = selectCat.value;
    const encontrados = PRODUCTOS.filter((p) => {
      const coincideTexto = !q || normalizar(p.nombre).includes(q) || normalizar(p.marca).includes(q);
      return coincideTexto && (!cat || p.categoria === cat);
    });
    pintarResultados(encontrados);
  }

  function pintarResultados(items) {
    lista.innerHTML = items.map((p) => `
      <li><a class="resultado" href="#/producto/${p.id}">
        <span class="r-nombre">${esc(p.nombre)}</span>
        <span class="r-marca">${esc(p.marca)}</span>
        <span class="r-categoria">${esc(p.categoria)}</span>
      </a></li>`).join("");
    vacio.hidden = items.length > 0;
    contador.textContent = items.length
      ? `${items.length} ${items.length === 1 ? "producto encontrado" : "productos encontrados"}`
      : "";
  }

  function limpiar() {
    inputQ.value = "";
    selectCat.value = "";
    buscar();
    inputQ.focus();
  }

  // ---- Ficha ----
  function listaChips(items, clase, vacioTexto) {
    if (!items.length) return vacioTexto;
    return `<ul class="chips ${clase}">${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
  }

  function pintarFicha(p) {
    const completa = p.informacion_completa;
    const ingredientes = p.ingredientes.length ? esc(p.ingredientes.join(", ")) : NO_DISPONIBLE;
    // Una lista vacía solo se muestra como "ninguno" si la ficha está completa:
    // la ausencia de datos nunca se presenta como garantía.
    const sinDatos = completa ? '<p class="nota">Ninguno declarado en la fuente consultada.</p>' : NO_DISPONIBLE;
    const fotos = p.fotos.length
      ? p.fotos.map((f) => {
          const src = f === "etiqueta-ejemplo" ? etiquetaEjemplo(p.nombre) : esc(f);
          return `<img class="foto" src="${src}" alt="Fotografía del etiquetado de ${esc(p.nombre)}">`;
        }).join("")
      : NO_DISPONIBLE;

    vistaFicha.innerHTML = `
      <a class="volver" href="#/">Volver a la búsqueda</a>
      <article class="ficha">
        <h1 tabindex="-1" id="titulo-ficha">${esc(p.nombre)}</h1>
        <p class="ficha-sub">${p.marca ? esc(p.marca) : NO_DISPONIBLE} &middot; ${esc(p.categoria)}</p>

        <h2>Ingredientes</h2>
        <p>${ingredientes}</p>

        <h2>Alérgenos declarados</h2>
        ${listaChips(p.alergenos, "chips-alergeno", sinDatos)}

        <h2>Advertencias de trazas</h2>
        ${listaChips(p.trazas, "chips-traza", sinDatos)}

        <h2>Fotografías del etiquetado</h2>
        <div class="fotos">${fotos}</div>

        <h2>Origen de la información</h2>
        <dl class="datos">
          <dt>Fuente</dt><dd>${p.fuente_informacion ? esc(p.fuente_informacion) : NO_DISPONIBLE}</dd>
          <dt>Última actualización</dt><dd>${p.fecha_ultima_actualizacion ? formatearFecha(p.fecha_ultima_actualizacion) : NO_DISPONIBLE}</dd>
          <dt>Código de barras</dt><dd>${p.codigo_barras ? esc(p.codigo_barras) : NO_DISPONIBLE}</dd>
        </dl>
      </article>`;
  }

  // ---- Navegación por hash ----
  function enrutar() {
    const m = location.hash.match(/^#\/producto\/(\d+)$/);
    const producto = m && PRODUCTOS.find((p) => p.id === Number(m[1]));
    if (producto) {
      pintarFicha(producto);
      vistaBusqueda.hidden = true;
      vistaFicha.hidden = false;
      window.scrollTo(0, 0);
      $("#titulo-ficha").focus();
    } else {
      vistaFicha.hidden = true;
      vistaBusqueda.hidden = false;
    }
  }

  $("#form-busqueda").addEventListener("submit", (e) => { e.preventDefault(); buscar(); });
  inputQ.addEventListener("input", buscar);
  selectCat.addEventListener("change", buscar);
  $("#limpiar").addEventListener("click", limpiar);
  $("#limpiar-vacio").addEventListener("click", limpiar);
  window.addEventListener("hashchange", enrutar);

  cargarCategorias();
  buscar();
  enrutar();
})();
