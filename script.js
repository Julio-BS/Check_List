// =====================================================
// CHECKLIST
// =====================================================


// =====================================================
// 1. MATRICES
// =====================================================

function iniciarMatrices() {

    const botones =
        document.querySelectorAll(
            ".seccion-matrices .boton-estado"
        );


    botones.forEach((boton) => {

        boton.addEventListener(
            "click",
            function (evento) {

                evento.stopPropagation();

                const tarea =
                    boton.closest(".tarea");

                const menu =
                    tarea.querySelector(
                        ".menu-estado"
                    );


                document
                    .querySelectorAll(".menu-estado")
                    .forEach((otroMenu) => {

                        if (otroMenu !== menu) {

                            otroMenu.classList.remove(
                                "activo"
                            );

                        }

                    });


                menu.classList.toggle("activo");

            }
        );

    });



    const opciones =
        document.querySelectorAll(
            ".seccion-matrices .menu-estado button"
        );


    opciones.forEach((opcion) => {

        opcion.addEventListener(
            "click",
            function (evento) {

                evento.stopPropagation();


                const estado =
                    opcion.dataset.estado;


                const tarea =
                    opcion.closest(".tarea");


                const boton =
                    tarea.querySelector(
                        ".boton-estado"
                    );


                const nombre =
                    tarea.querySelector(
                        ".nombre-tarea"
                    );


                tarea.classList.remove(
                    "sin-completar",
                    "en-proceso",
                    "completado"
                );


                tarea.classList.add(estado);


                if (estado === "sin-completar") {

                    boton.textContent = "F";

                }

                else if (estado === "en-proceso") {

                    boton.textContent = "P";

                }

                else {

                    boton.textContent = "C";

                }


                tarea
                    .querySelector(".menu-estado")
                    .classList.remove("activo");



                // Transformaciones especiales

                if (
                    estado === "completado" &&
                    tarea.dataset.transformar === "true"
                ) {

                    setTimeout(() => {

                        nombre.textContent =
                            tarea.dataset.nuevoNombre;


                        tarea.dataset.transformar =
                            "false";


                        tarea.classList.remove(
                            "completado",
                            "en-proceso"
                        );


                        tarea.classList.add(
                            "sin-completar"
                        );


                        boton.textContent = "F";

                    }, 500);

                }

            }
        );

    });



    document.addEventListener(
        "click",
        function () {

            document
                .querySelectorAll(".menu-estado")
                .forEach((menu) => {

                    menu.classList.remove(
                        "activo"
                    );

                });

        }
    );

}



// =====================================================
// 2. DOWNLOAD
// =====================================================

function iniciarDownload() {

    const unidades = obtenerUnidades();


    document
        .querySelectorAll(".download-categoria")
        .forEach((categoria) => {


            const boton =
                categoria.querySelector(
                    ".btn-seleccionar-unidades"
                );


            const selector =
                categoria.querySelector(
                    ".selector-unidades"
                );


            const contenedor =
                categoria.querySelector(
                    ".unidades-seleccionadas"
                );


            boton.addEventListener(
                "click",
                function () {


                    if (
                        selector.classList.contains(
                            "activo"
                        )
                    ) {

                        selector.classList.remove(
                            "activo"
                        );

                        return;

                    }


                    selector.innerHTML = "";


                    const grid =
                        document.createElement("div");


                    grid.classList.add(
                        "grid-unidades"
                    );


                    unidades.forEach((numero) => {

                        const label =
                            document.createElement("label");


                        label.classList.add(
                            "unidad-check"
                        );


                        const check =
                            document.createElement("input");


                        check.type = "checkbox";

                        check.value = numero;


                        const texto =
                            document.createElement("span");


                        texto.textContent = numero;


                        label.appendChild(check);

                        label.appendChild(texto);

                        grid.appendChild(label);

                    });


                    selector.appendChild(grid);



                    const confirmar =
                        document.createElement("button");


                    confirmar.type = "button";

                    confirmar.textContent =
                        "Confirmar";


                    confirmar.classList.add(
                        "btn-confirmar-unidades"
                    );


                    selector.appendChild(confirmar);

                    selector.classList.add("activo");



                    confirmar.addEventListener(
                        "click",
                        function () {


                            const seleccionadas =
                                selector.querySelectorAll(
                                    'input[type="checkbox"]:checked'
                                );


                            if (
                                seleccionadas.length === 0
                            ) {

                                alert(
                                    "Selecciona al menos una unidad."
                                );

                                return;

                            }


                            contenedor.innerHTML = "";


                            seleccionadas.forEach(
                                (check) => {

                                    crearUnidadDownload(
                                        check.value,
                                        contenedor
                                    );

                                }
                            );


                            selector.classList.remove(
                                "activo"
                            );


                            boton.style.display =
                                "none";

                        }
                    );

                }
            );

        });

}



function crearUnidadDownload(
    numero,
    contenedor
) {

    const fila =
        document.createElement("div");


    fila.classList.add(
        "download-unidad",
        "sin-completar"
    );


    const boton =
        document.createElement("button");


    boton.type = "button";

    boton.classList.add(
        "download-boton-estado"
    );

    boton.textContent = "F";


    const texto =
        document.createElement("span");


    texto.classList.add(
        "download-numero"
    );

    texto.textContent = numero;


    fila.appendChild(boton);

    fila.appendChild(texto);

    contenedor.appendChild(fila);



    boton.addEventListener(
        "click",
        function () {

            if (
                fila.classList.contains(
                    "sin-completar"
                )
            ) {

                fila.classList.remove(
                    "sin-completar"
                );

                fila.classList.add(
                    "completado"
                );

                boton.textContent = "C";

            }

            else {

                fila.classList.remove(
                    "completado"
                );

                fila.classList.add(
                    "sin-completar"
                );

                boton.textContent = "F";

            }

        }
    );

}



// =====================================================
// 3. TURNO
// =====================================================

function iniciarTurno() {

    const selector =
        document.querySelector(
            "#selector-turno"
        );


    const dia =
        document.querySelector(
            "#turno-dia"
        );


    const noche =
        document.querySelector(
            "#turno-noche"
        );



    // Día / Noche

    function actualizarTurno() {

        if (selector.value === "dia") {

            dia.classList.remove("oculto");

            noche.classList.add("oculto");

        }

        else {

            dia.classList.add("oculto");

            noche.classList.remove("oculto");

        }

    }


    selector.addEventListener(
        "change",
        actualizarTurno
    );


    actualizarTurno();



    // F/C simples

    document
        .querySelectorAll(
            ".seccion-turno .turno-boton-fc"
        )
        .forEach((boton) => {


            boton.addEventListener(
                "click",
                function () {


                    const fila =
                        boton.closest(
                            ".turno-fila"
                        );


                    cambiarEstadoFC(
                        fila,
                        boton
                    );


                    const crear =
                        fila.closest(
                            ".bloque-crear"
                        );


                    if (crear) {

                        actualizarCrear(crear);

                    }

                }
            );

        });



    // Orden de conductores

    document
        .querySelectorAll(
            ".bloque-orden-conductores"
        )
        .forEach((bloque) => {

            iniciarOrdenConductores(
                bloque
            );

        });



    // Eddy

    document
        .querySelectorAll(".bloque-eddy")
        .forEach((bloque) => {

            iniciarEddy(bloque);

        });



    // Reloj

    const reloj =
        document.querySelector(
            ".bloque-reloj"
        );


    if (reloj) {

        iniciarReloj(reloj);

    }

}



// =====================================================
// F / C
// =====================================================

function cambiarEstadoFC(
    fila,
    boton
) {

    if (
        fila.classList.contains(
            "turno-faltante"
        )
    ) {

        fila.classList.remove(
            "turno-faltante"
        );

        fila.classList.add(
            "turno-completado"
        );

        boton.textContent = "C";

    }

    else {

        fila.classList.remove(
            "turno-completado"
        );

        fila.classList.add(
            "turno-faltante"
        );

        boton.textContent = "F";

    }

}



// =====================================================
// ORDEN DE CONDUCTORES
// =====================================================

function iniciarOrdenConductores(
    bloque
) {

    const botonSeleccionar =
        bloque.querySelector(
            ".btn-seleccionar-conductores"
        );


    const selector =
        bloque.querySelector(
            ".selector-conductores"
        );


    const contenedor =
        bloque.querySelector(
            ".conductores-seleccionados"
        );


    /*
        Guarda:

        {
            2501: "F",
            2503: "C"
        }
    */

    let estados = {};



    botonSeleccionar.addEventListener(
        "click",
        function () {


            if (
                selector.classList.contains(
                    "activo"
                )
            ) {

                selector.classList.remove(
                    "activo"
                );

                return;

            }



            selector.innerHTML = "";


            const grid =
                document.createElement("div");


            grid.classList.add(
                "grid-conductores"
            );



            obtenerUnidades().forEach(
                (numero) => {


                    const label =
                        document.createElement(
                            "label"
                        );


                    label.classList.add(
                        "conductor-check"
                    );


                    const check =
                        document.createElement(
                            "input"
                        );


                    check.type = "checkbox";

                    check.value = numero;



                    // Si ya estaba seleccionado,
                    // vuelve marcado

                    if (
                        estados[numero] !== undefined
                    ) {

                        check.checked = true;

                    }



                    const texto =
                        document.createElement(
                            "span"
                        );


                    texto.textContent = numero;


                    label.appendChild(check);

                    label.appendChild(texto);

                    grid.appendChild(label);

                }
            );


            selector.appendChild(grid);



            const confirmar =
                document.createElement(
                    "button"
                );


            confirmar.type = "button";

            confirmar.textContent =
                "Confirmar";


            confirmar.classList.add(
                "btn-confirmar-conductores"
            );


            selector.appendChild(confirmar);

            selector.classList.add("activo");



            confirmar.addEventListener(
                "click",
                function () {


                    const checks =
                        selector.querySelectorAll(
                            'input[type="checkbox"]:checked'
                        );


                    if (
                        checks.length === 0
                    ) {

                        alert(
                            "Selecciona al menos una unidad."
                        );

                        return;

                    }



                    const nuevosEstados = {};


                    checks.forEach((check) => {

                        const numero =
                            check.value;


                        /*
                            Si ya existía,
                            conserva su estado.

                            Si es nuevo,
                            empieza F.
                        */

                        nuevosEstados[numero] =
                            estados[numero] || "F";

                    });


                    estados =
                        nuevosEstados;


                    reconstruirConductores(
                        contenedor,
                        estados,
                        bloque
                    );


                    botonSeleccionar.textContent =
                        "Editar unidades";


                    selector.classList.remove(
                        "activo"
                    );


                    actualizarOrdenGeneral(
                        bloque
                    );

                }
            );

        }
    );



    // Guardamos referencia para actualizar
    // los estados desde las filas

    bloque._estadosConductores =
        () => estados;


    bloque._actualizarEstadoConductor =
        function (
            numero,
            estado
        ) {

            estados[numero] =
                estado;

        };

}



// =====================================================
// RECONSTRUIR CONDUCTORES
// =====================================================

function reconstruirConductores(
    contenedor,
    estados,
    bloque
) {

    contenedor.innerHTML = "";


    Object
        .keys(estados)
        .sort()
        .forEach((numero) => {


            const fila =
                document.createElement(
                    "div"
                );


            const estado =
                estados[numero];


            fila.classList.add(
                "turno-unidad",
                estado === "C"
                    ? "completado"
                    : "faltante"
            );



            const boton =
                document.createElement(
                    "button"
                );


            boton.type = "button";

            boton.textContent =
                estado;



            const texto =
                document.createElement(
                    "span"
                );


            texto.textContent =
                numero;



            fila.appendChild(boton);

            fila.appendChild(texto);

            contenedor.appendChild(fila);



            boton.addEventListener(
                "click",
                function () {


                    const nuevoEstado =
                        boton.textContent === "F"
                            ? "C"
                            : "F";


                    bloque
                        ._actualizarEstadoConductor(
                            numero,
                            nuevoEstado
                        );


                    fila.classList.remove(
                        "faltante",
                        "completado"
                    );


                    if (
                        nuevoEstado === "C"
                    ) {

                        fila.classList.add(
                            "completado"
                        );

                    }

                    else {

                        fila.classList.add(
                            "faltante"
                        );

                    }


                    boton.textContent =
                        nuevoEstado;


                    actualizarOrdenGeneral(
                        bloque
                    );

                }
            );

        });

}



// =====================================================
// ESTADO GENERAL ORDEN
// =====================================================

function actualizarOrdenGeneral(
    bloque
) {

    const general =
        bloque.querySelector(
            ".orden-general"
        );


    const indicador =
        general.querySelector(
            ".turno-indicador-general"
        );


    const estados =
        bloque._estadosConductores
            ? bloque._estadosConductores()
            : {};


    const valores =
        Object.values(estados);



    if (
        valores.length > 0 &&
        valores.every(
            (estado) =>
                estado === "C"
        )
    ) {

        general.classList.remove(
            "turno-faltante"
        );

        general.classList.add(
            "turno-completado"
        );

        indicador.textContent =
            "C";

    }

    else {

        general.classList.remove(
            "turno-completado"
        );

        general.classList.add(
            "turno-faltante"
        );

        indicador.textContent =
            "F";

    }

}



// =====================================================
// CREAR
// =====================================================

function actualizarCrear(
    bloque
) {

    const general =
        bloque.querySelector(
            ".crear-general"
        );


    const indicador =
        general.querySelector(
            ".turno-indicador-general"
        );


    const subtareas =
        bloque.querySelectorAll(
            ".crear-subtarea"
        );


    const completadas =
        Array.from(subtareas)
            .every(
                (fila) =>
                    fila.classList.contains(
                        "turno-completado"
                    )
            );


    if (completadas) {

        general.classList.remove(
            "turno-faltante"
        );

        general.classList.add(
            "turno-completado"
        );

        indicador.textContent =
            "C";

    }

    else {

        general.classList.remove(
            "turno-completado"
        );

        general.classList.add(
            "turno-faltante"
        );

        indicador.textContent =
            "F";

    }

}



// =====================================================
// PEDIDOS DE VELOCIDAD - EDDY
// =====================================================

function iniciarEddy(
    bloque
) {

    const etiqueta =
        bloque.querySelector(
            ".pregunta-etiqueta"
        );


    const preguntaPedido =
        bloque.querySelector(
            ".eddy-pregunta-pedido"
        );


    const preguntaRealizado =
        bloque.querySelector(
            ".eddy-pregunta-realizado"
        );


    const botonesPedido =
        preguntaPedido.querySelectorAll(
            ".opciones-si-no button"
        );


    const botonesRealizado =
        preguntaRealizado.querySelectorAll(
            ".opciones-si-no button"
        );


    const volver =
        preguntaRealizado.querySelector(
            ".btn-volver-pregunta"
        );



    // ¿Hay pedido?

    botonesPedido.forEach((boton) => {

        boton.addEventListener(
            "click",
            function () {


                marcarSeleccion(
                    botonesPedido,
                    boton
                );


                const respuesta =
                    boton.dataset.respuesta;



                // NO:
                // no existe trabajo pendiente

                if (
                    respuesta === "no"
                ) {

                    pintarVerdeTurno(
                        etiqueta
                    );


                    preguntaRealizado.classList.add(
                        "oculto"
                    );

                }


                // SÍ:
                // existe trabajo pendiente

                else {

                    pintarRojoTurno(
                        etiqueta
                    );


                    preguntaPedido.classList.add(
                        "oculto"
                    );


                    preguntaRealizado.classList.remove(
                        "oculto"
                    );

                }

            }
        );

    });



    // ¿Realizado?

    botonesRealizado.forEach(
        (boton) => {


            boton.addEventListener(
                "click",
                function () {


                    marcarSeleccion(
                        botonesRealizado,
                        boton
                    );


                    if (
                        boton.dataset.respuesta ===
                        "si"
                    ) {

                        pintarVerdeTurno(
                            etiqueta
                        );

                    }

                    else {

                        pintarRojoTurno(
                            etiqueta
                        );

                    }

                }
            );

        }
    );



    // Volver a ¿Hay pedido?

    volver.addEventListener(
        "click",
        function () {


            limpiarBotones(
                botonesRealizado
            );


            limpiarBotones(
                botonesPedido
            );


            preguntaRealizado.classList.add(
                "oculto"
            );


            preguntaPedido.classList.remove(
                "oculto"
            );


            pintarRojoTurno(
                etiqueta
            );

        }
    );

}



// =====================================================
// PROGRAMACIÓN DE RELOJ
// =====================================================

function iniciarReloj(
    bloque
) {

    const general =
        bloque.querySelector(
            ".reloj-general"
        );


    const existe =
        bloque.querySelector(
            ".pregunta-existe"
        );


    const realizo =
        bloque.querySelector(
            ".pregunta-realizo"
        );


    const correo =
        bloque.querySelector(
            ".pregunta-correo"
        );



    configurarPregunta(
        existe,
        function (respuesta) {


            if (
                respuesta === "no"
            ) {

                pintarVerdeTurno(
                    general
                );

            }

            else {

                pintarRojoTurno(
                    general
                );


                existe.classList.add(
                    "oculto"
                );


                realizo.classList.remove(
                    "oculto"
                );

            }

        }
    );



    configurarPregunta(
        realizo,
        function (respuesta) {


            if (
                respuesta === "no"
            ) {

                pintarRojoTurno(
                    general
                );

            }

            else {

                pintarRojoTurno(
                    general
                );


                realizo.classList.add(
                    "oculto"
                );


                correo.classList.remove(
                    "oculto"
                );

            }

        }
    );



    configurarPregunta(
        correo,
        function (respuesta) {


            if (
                respuesta === "si"
            ) {

                pintarVerdeTurno(
                    general
                );

            }

            else {

                pintarRojoTurno(
                    general
                );

            }

        }
    );



    // Volver desde REALIZÓ

    realizo
        .querySelector(
            ".btn-volver-pregunta"
        )
        .addEventListener(
            "click",
            function () {


                limpiarPregunta(realizo);

                realizo.classList.add(
                    "oculto"
                );


                existe.classList.remove(
                    "oculto"
                );


                limpiarPregunta(existe);


                pintarRojoTurno(
                    general
                );

            }
        );



    // Volver desde CORREO

    correo
        .querySelector(
            ".btn-volver-pregunta"
        )
        .addEventListener(
            "click",
            function () {


                limpiarPregunta(correo);

                correo.classList.add(
                    "oculto"
                );


                realizo.classList.remove(
                    "oculto"
                );


                limpiarPregunta(realizo);


                pintarRojoTurno(
                    general
                );

            }
        );

}



// =====================================================
// UTILIDADES
// =====================================================

function configurarPregunta(
    pregunta,
    callback
) {

    const botones =
        pregunta.querySelectorAll(
            ".opciones-si-no button"
        );


    botones.forEach((boton) => {

        boton.addEventListener(
            "click",
            function () {


                marcarSeleccion(
                    botones,
                    boton
                );


                callback(
                    boton.dataset.respuesta
                );

            }
        );

    });

}



function marcarSeleccion(
    botones,
    seleccionado
) {

    botones.forEach((boton) => {

        boton.classList.remove(
            "seleccionado"
        );

    });


    seleccionado.classList.add(
        "seleccionado"
    );

}



function limpiarBotones(
    botones
) {

    botones.forEach((boton) => {

        boton.classList.remove(
            "seleccionado"
        );

    });

}



function limpiarPregunta(
    pregunta
) {

    limpiarBotones(
        pregunta.querySelectorAll(
            ".opciones-si-no button"
        )
    );

}



function pintarRojoTurno(
    elemento
) {

    elemento.classList.remove(
        "estado-verde"
    );


    elemento.classList.add(
        "estado-rojo"
    );

}



function pintarVerdeTurno(
    elemento
) {

    elemento.classList.remove(
        "estado-rojo"
    );


    elemento.classList.add(
        "estado-verde"
    );

}



function obtenerUnidades() {

    return [
        2501,
        2502,
        2503,
        2504,
        2505,
        2506,
        2507,
        2508,
        2509,
        2510
    ];

}



// =====================================================
// INICIAR CHECKLIST
// =====================================================

iniciarMatrices();

iniciarDownload();

iniciarTurno();