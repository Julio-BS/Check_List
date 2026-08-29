// ==========================================
// BOTONES PRINCIPALES DE ESTADO
// ==========================================

const botonesEstado =
    document.querySelectorAll(".boton-estado");



botonesEstado.forEach((boton) => {

    boton.addEventListener("click", function (evento) {

        // Evita que el clic llegue al documento
        evento.stopPropagation();


        // Buscamos la tarea a la que pertenece
        const tarea =
            boton.closest(".tarea");


        // Buscamos su menú
        const menu =
            tarea.querySelector(".menu-estado");



        // ======================================
        // CERRAR OTROS MENÚS
        // ======================================

        document
            .querySelectorAll(".menu-estado")
            .forEach((otroMenu) => {

                if (otroMenu !== menu) {

                    otroMenu.classList.remove("activo");

                }

            });



        // ======================================
        // ABRIR / CERRAR EL MENÚ ACTUAL
        // ======================================

        menu.classList.toggle("activo");

    });

});





// ==========================================
// OPCIONES F / P / C
// ==========================================

const opcionesEstado =
    document.querySelectorAll(
        ".menu-estado button"
    );



opcionesEstado.forEach((opcion) => {

    opcion.addEventListener("click", function (evento) {

        evento.stopPropagation();



        // ======================================
        // OBTENER EL NUEVO ESTADO
        // ======================================

        const nuevoEstado =
            opcion.dataset.estado;



        // ======================================
        // BUSCAR LOS ELEMENTOS DE LA TAREA
        // ======================================

        const tarea =
            opcion.closest(".tarea");


        const botonEstado =
            tarea.querySelector(
                ".boton-estado"
            );


        const nombreTarea =
            tarea.querySelector(
                ".nombre-tarea"
            );


        const menu =
            tarea.querySelector(
                ".menu-estado"
            );



        // ======================================
        // QUITAR ESTADO ANTERIOR
        // ======================================

        tarea.classList.remove(
            "sin-completar",
            "en-proceso",
            "completado"
        );



        // ======================================
        // COLOCAR NUEVO ESTADO
        // ======================================

        tarea.classList.add(
            nuevoEstado
        );



        // ======================================
        // CAMBIAR LA LETRA DEL BOTÓN
        // ======================================

        if (
            nuevoEstado ===
            "sin-completar"
        ) {

            botonEstado.textContent = "F";

        }


        else if (
            nuevoEstado ===
            "en-proceso"
        ) {

            botonEstado.textContent = "P";

        }


        else if (
            nuevoEstado ===
            "completado"
        ) {

            botonEstado.textContent = "C";

        }



        // ======================================
        // CERRAR EL MENÚ
        // ======================================

        menu.classList.remove(
            "activo"
        );



        // ======================================
        // TRANSFORMACIÓN ESPECIAL
        //
        // ADAS
        // DMS
        // GEOCERCA
        // ======================================

        if (
            nuevoEstado === "completado" &&
            tarea.dataset.transformar === "true"
        ) {

            /*
                Esperamos medio segundo.

                Así primero se puede visualizar
                que la tarea llegó a completado.
            */

            setTimeout(function () {


                // Obtener el nombre nuevo

                const nuevoNombre =
                    tarea.dataset.nuevoNombre;



                // ==================================
                // CAMBIAR EL NOMBRE
                // ==================================

                nombreTarea.textContent =
                    nuevoNombre;



                // ==================================
                // EVITAR OTRA TRANSFORMACIÓN
                // ==================================

                tarea.dataset.transformar =
                    "false";



                // ==================================
                // LA NUEVA TAREA VUELVE A FALTA
                // ==================================

                tarea.classList.remove(
                    "completado",
                    "en-proceso"
                );


                tarea.classList.add(
                    "sin-completar"
                );



                // ==================================
                // BOTÓN NUEVAMENTE EN F
                // ==================================

                botonEstado.textContent =
                    "F";


            }, 500);

        }

    });

});





// ==========================================
// CERRAR MENÚ SI HACEMOS CLIC FUERA
// ==========================================

document.addEventListener(
    "click",
    function () {

        document
            .querySelectorAll(
                ".menu-estado"
            )
            .forEach((menu) => {

                menu.classList.remove(
                    "activo"
                );

            });

    }
    
);

// ==========================================
// SECCIÓN 2 - DOWNLOAD
// ==========================================


function iniciarDownload() {


    // ======================================
    // UNIDADES DISPONIBLES
    // ======================================

    const unidadesDisponibles = [

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



    // ======================================
    // OBTENER LAS 3 CATEGORÍAS
    // ======================================

    const categorias =
        document.querySelectorAll(
            ".download-categoria"
        );



    categorias.forEach((categoria) => {


        const botonSeleccionar =
            categoria.querySelector(
                ".btn-seleccionar-unidades"
            );


        const selector =
            categoria.querySelector(
                ".selector-unidades"
            );


        const listaSeleccionadas =
            categoria.querySelector(
                ".unidades-seleccionadas"
            );



        // ==================================
        // BOTÓN SELECCIONAR
        // ==================================

        botonSeleccionar.addEventListener(
            "click",
            function () {


                // Si el selector ya está abierto,
                // lo cerramos.

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



                // ==================================
                // CREAR LOS CHECKBOXES
                // ==================================

                selector.innerHTML = "";


                const grid =
                    document.createElement("div");


                grid.classList.add(
                    "grid-unidades"
                );



                unidadesDisponibles.forEach(
                    (numero) => {


                        const label =
                            document.createElement(
                                "label"
                            );


                        label.classList.add(
                            "unidad-check"
                        );



                        const checkbox =
                            document.createElement(
                                "input"
                            );


                        checkbox.type =
                            "checkbox";


                        checkbox.value =
                            numero;



                        const texto =
                            document.createElement(
                                "span"
                            );


                        texto.textContent =
                            numero;



                        label.appendChild(
                            checkbox
                        );


                        label.appendChild(
                            texto
                        );


                        grid.appendChild(
                            label
                        );

                    }
                );



                selector.appendChild(
                    grid
                );



                // ==================================
                // CREAR BOTÓN CONFIRMAR
                // ==================================

                const botonConfirmar =
                    document.createElement(
                        "button"
                    );


                botonConfirmar.type =
                    "button";


                botonConfirmar.classList.add(
                    "btn-confirmar-unidades"
                );


                botonConfirmar.textContent =
                    "Confirmar";



                selector.appendChild(
                    botonConfirmar
                );


                selector.classList.add(
                    "activo"
                );



                // ==================================
                // CONFIRMAR UNIDADES
                // ==================================

                botonConfirmar.addEventListener(
                    "click",
                    function () {


                        const seleccionadas =
                            selector.querySelectorAll(
                                'input[type="checkbox"]:checked'
                            );



                        // Si no seleccionó ninguna

                        if (
                            seleccionadas.length === 0
                        ) {

                            alert(
                                "Selecciona al menos una unidad."
                            );

                            return;

                        }



                        // ==================================
                        // LIMPIAR LA LISTA
                        // ==================================

                        listaSeleccionadas.innerHTML =
                            "";



                        // ==================================
                        // CREAR SOLO LAS SELECCIONADAS
                        // ==================================

                        seleccionadas.forEach(
                            (checkbox) => {


                                const numero =
                                    checkbox.value;



                                crearUnidadDownload(
                                    numero,
                                    listaSeleccionadas
                                );

                            }
                        );



                        // ==================================
                        // OCULTAR SELECCIÓN
                        // ==================================

                        selector.classList.remove(
                            "activo"
                        );


                        selector.innerHTML =
                            "";



                        // Ya no necesitamos seleccionar
                        // nuevamente en esta prueba.

                        botonSeleccionar.style.display =
                            "none";

                    }
                );

            }
        );

    });

}



/* =========================================
   CREAR UNA UNIDAD DE DOWNLOAD
   ========================================= */


function crearUnidadDownload(
    numero,
    contenedor
) {


    // Crear fila

    const unidad =
        document.createElement("div");


    unidad.classList.add(
        "download-unidad",
        "sin-completar"
    );



    // ======================================
    // BOTÓN F / C
    // ======================================

    const botonEstado =
        document.createElement("button");


    botonEstado.type =
        "button";


    botonEstado.classList.add(
        "download-boton-estado"
    );


    botonEstado.textContent =
        "F";



    // ======================================
    // NÚMERO
    // ======================================

    const numeroUnidad =
        document.createElement("span");


    numeroUnidad.classList.add(
        "download-numero"
    );


    numeroUnidad.textContent =
        numero;



    // ======================================
    // AGREGAR ELEMENTOS
    // ======================================

    unidad.appendChild(
        botonEstado
    );


    unidad.appendChild(
        numeroUnidad
    );


    contenedor.appendChild(
        unidad
    );



    // ======================================
    // CAMBIAR F ↔ C
    // ======================================

    botonEstado.addEventListener(
        "click",
        function () {


            // Si actualmente está F

            if (
                unidad.classList.contains(
                    "sin-completar"
                )
            ) {


                unidad.classList.remove(
                    "sin-completar"
                );


                unidad.classList.add(
                    "completado"
                );


                botonEstado.textContent =
                    "C";

            }


            // Si actualmente está C

            else {


                unidad.classList.remove(
                    "completado"
                );


                unidad.classList.add(
                    "sin-completar"
                );


                botonEstado.textContent =
                    "F";

            }

        }
    );

}



/* =========================================
   INICIAR DOWNLOAD
   ========================================= */

iniciarDownload();