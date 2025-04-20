document.addEventListener("DOMContentLoaded", () => {
    const cartas = document.querySelectorAll('.carta');
    const modal = document.querySelector('.modal');
    const mensaje = document.getElementById('mensaje');
    const imagenModal = document.querySelector('.modal-contenido img');
    const cerrarModal = document.querySelector('.cerrar');
    const flipSound = document.getElementById('flipSound');

    // Función para abrir/cerrar carta
    function toggleCarta(carta) {
        carta.classList.toggle('abierta');

        // Ajuste de opacidad si deseas algún efecto sutil (opcional)
        carta.style.transition = "opacity 0.4s ease-out";
        carta.style.opacity = carta.classList.contains('abierta') ? '0.92' : '1';

        // Reproduce el sonido si NO es la carta especial
        if (!carta.classList.contains('especial') && flipSound) {
            flipSound.currentTime = 0;
            flipSound.play();
        }
    }

    // Manejo de clics
    cartas.forEach(carta => {
        carta.addEventListener('click', () => {
            toggleCarta(carta);

            // Si es la carta especial, abre el modal siempre
            if (carta.classList.contains('especial')) {
                setTimeout(() => {
                    abrirModal();
                }, 400); // Espera a que termine la vuelta
            }
        });

        // Hover efecto de rebote para la especial
        carta.addEventListener('mouseover', () => {
            if (carta.classList.contains('especial')) {
                carta.style.transform = 'scale(1.1)';
                carta.style.transition = 'transform 0.3s ease-out';
            }
        });

        carta.addEventListener('mouseout', () => {
            if (carta.classList.contains('especial')) {
                carta.style.transform = 'scale(1)';
            }
        });
    });

    // Función para abrir modal
    function abrirModal() {
        modal.style.display = 'flex';
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.style.transition = "opacity 0.5s ease-out";
            mensaje.style.opacity = 1;
        }, 50);

        // Cambiar imagen del modal si deseas variar dinámicamente
        imagenModal.src = 'https://i.imgur.com/7rXgkLZ.jpg'; // Imagen motivacional
    }

    // Cerrar modal con la X
    cerrarModal.addEventListener('click', () => {
        cerrarModalFunc();
    });

    // Cerrar modal haciendo clic fuera del contenido
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModalFunc();
        }
    });

    // Función para cerrar modal con transición
    function cerrarModalFunc() {
        modal.style.transition = "opacity 0.5s ease-out";
        modal.style.opacity = 0;
        setTimeout(() => {
            modal.style.display = 'none';
            mensaje.style.opacity = 0;
        }, 500);
    }
});
