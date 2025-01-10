// Crear corazones con animación
function createHeart() {
    const heart = document.createElement("img");
    heart.className = "heart";
    heart.src = "https://cdn.pixabay.com/photo/2012/04/18/15/46/heart-37384_1280.png"; // URL de la imagen

    // Tamaño aleatorio
    const size = Math.random() * 60 + 80; // Tamaños entre 70px y 130px
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;

    // Posición horizontal aleatoria, asegurando más espacio
    const leftPosition = Math.random() * 100; // Aleatorio en el eje X
    const bottomPosition = -size; // Comienza por debajo de la pantalla en el eje Y

    heart.style.left = `${leftPosition}vw`;
    heart.style.bottom = `${bottomPosition}px`; // Posición inicial debajo de la pantalla

    // Añadimos el corazón al DOM
    document.body.appendChild(heart);

    // Eliminación del corazón tras la animación
    heart.addEventListener('animationend', () => {
        heart.remove();  // Se elimina correctamente cuando termina la animación
    });
}

// Crear corazones de forma continua con un intervalo de tiempo controlado
function animateHearts() {
    const maxHearts = 50; // Limitar a 50 corazones visibles al mismo tiempo
    if (document.querySelectorAll('.heart').length < maxHearts) {
        createHeart();
    }

    setTimeout(animateHearts, 100); // Crear un corazón cada 100ms
}

// Iniciar la animación de corazones
animateHearts();

// CONTENEDOR LOCO XDDDDDD
let moveCount = 0; // Contador de intentos de movimiento
let isMoving = false; // Flag para controlar si el contenedor está en movimiento
let moveInterval; // Guardamos el intervalo para poder limpiarlo más tarde
let maxMoves = 5; // Número máximo de movimientos

// Función que mueve el contenedor
function moveContainer() {
    const container = document.querySelector(".container");

    // Si no se está moviendo, salimos
    if (!isMoving) return;

    // Asegura que el contenedor no se mueva fuera de los límites de la pantalla
    const randomX = Math.random() * 60 + 5; // 5% a 85% de la pantalla
    const randomY = Math.random() * 60 + 5; // 5% a 85% de la pantalla

    container.style.left = `${randomX}vw`;
    container.style.top = `${randomY}vh`;

    moveCount++;

    // Detiene el movimiento después de los intentos
    if (moveCount >= maxMoves) {
        isMoving = false; // No permitir más movimientos
    }
}

// Inicia el movimiento cuando el mouse pasa por encima del botón
const button = document.querySelector("button");
button.addEventListener("mouseenter", function() {
    if (!isMoving) {
        isMoving = true; // Inicia el movimiento
        moveInterval = setInterval(moveContainer, 500); // Mueve el contenedor cada 500ms
    }
});

// Detener el movimiento al hacer clic en el botón
button.addEventListener("click", function() {
    clearInterval(moveInterval); // Limpiar el intervalo de movimiento
    isMoving = false; // Cambiar el flag a falso para evitar que se mueva nuevamente
    moveCount = 0; // Resetear el contador de movimientos
    alert("¡Has detenido el movimiento!");
});

//GATOOOO XDDDDDDD

let lastPawTime = 0;
    const pawInterval = 30; // Intervalo en ms (ajustado para mayor fluidez)

    // Función que actualiza la posición y rotación de las huellas
    function createPaw(event) {
      const paw = document.createElement('div');
      paw.classList.add('paw');
      paw.style.left = `${event.pageX - 15}px`;
      paw.style.top = `${event.pageY - 15}px`;

      const deltaX = event.movementX;
      const deltaY = event.movementY;
      const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;

      paw.style.transform = `rotate(${angle}deg)`;

      document.body.appendChild(paw);

      setTimeout(() => {
        paw.remove();
      }, 1000); // Tiempo que tarda la huella en desaparecer
    }

    // Usamos requestAnimationFrame para una animación más fluida
    document.addEventListener("mousemove", function(event) {
      const currentTime = Date.now();
      
      if (currentTime - lastPawTime > pawInterval) {
        lastPawTime = currentTime;
        requestAnimationFrame(() => createPaw(event));  // Usamos requestAnimationFrame para mayor fluidez
      }
    });

    //JUEGOOOOOOOOOOOOOOOOOOOOOOOOO

    const dinosaur = document.getElementById('dinosaur');
        const enemy = document.querySelector('.enemy');
        const dinosaurImages = {
            idle: [
                'img/Idle (1).png',
                'img/Idle (2).png',
                'img/Idle (3).png',
                'img/Idle (4).png',
                'img/Idle (5).png',
                'img/Idle (6).png',
                'img/Idle (7).png',
                'img/Idle (8).png',
                'img/Idle (9).png',
                'img/Idle (10).png',
            ],
            walkRight: [
                'img/Walk (1).png',
                'img/Walk (2).png',
                'img/Walk (3).png',
                'img/Walk (4).png',
                'img/Walk (5).png',
                'img/Walk (6).png',
                'img/Walk (7).png',
                'img/Walk (8).png',
                'img/Walk (9).png',
                'img/Walk (10).png',
            ],
            walkLeft: [
                'img/WalkL (1).png',
                'img/WalkL (2).png',
                'img/WalkL (3).png',
                'img/WalkL (4).png',
                'img/WalkL (5).png',
                'img/WalkL (6).png',
                'img/WalkL (7).png',
                'img/WalkL (8).png',
                'img/WalkL (9).png',
                'img/WalkL (10).png',
            ],
            jump: [
                'img/Jump (1).png',
                'img/Jump (2).png',
                'img/Jump (3).png',
                'img/Jump (4).png',
                'img/Jump (5).png',
                'img/Jump (6).png',
                'img/Jump (7).png',
                'img/Jump (8).png',
                'img/Jump (9).png',
                'img/Jump (10).png',
                'img/Jump (11).png',
                'img/Jump (12).png',
            ],
            dead: [
                'img/Dead (1).png',
                'img/Dead (2).png',
                'img/Dead (3).png',
                'img/Dead (4).png',
                'img/Dead (5).png',
                'img/Dead (6).png',
                'img/Dead (7).png',
                'img/Dead (8).png',
            ],
        };

        let dinosaurPosition = 0; // Posición horizontal
        let dinosaurVerticalPosition = 50; // Posición vertical (inicialmente en el suelo)
        let isWalking = false;
        let isJumping = false; // Flag para evitar múltiples saltos
        let isDead = false; // Flag para la muerte
        let walkInterval;
        let idleInterval;
        let jumpInterval;
        let deadInterval;
        let facingLeft = false;
        let jumpHeight = 0; // Cuánto sube el dinosaurio
        let jumpMaxHeight = 100; // Máxima altura del salto
        let jumpSpeed = 10; // Velocidad del salto
        let isJumpingUp = true; // Flag para saber si está subiendo o cayendo
        let enemyPosition = window.innerWidth; // Inicializa el enemigo fuera de la pantalla a la derecha

        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                moveDinosaur('right');
            } else if (e.key === 'ArrowLeft') {
                moveDinosaur('left');
            } else if (e.key === ' ') {  // Salto
                if (!isJumping && !isDead) {
                    jumpDinosaur();
                }
            } else if (e.key === 'd' || e.key === 'D') {  // Muerte
                if (!isDead) {
                    die();
                }
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                stopWalking();
            }
        });

        function moveDinosaur(direction) {
            if (isDead) return; // Si está muerto, no puede moverse
            if (!isWalking) {
                clearInterval(idleInterval);
            }

            if (direction === 'right' && facingLeft) {
                facingLeft = false;
            } else if (direction === 'left' && !facingLeft) {
                facingLeft = true;
            }

            if (direction === 'right') {
                dinosaurPosition += 10;
                dinosaur.style.left = `${dinosaurPosition}px`; // Usa left en lugar de transform
                if (!isWalking) {
                    startWalking('right');
                }
            } else if (direction === 'left') {
                dinosaurPosition -= 10;
                dinosaur.style.left = `${dinosaurPosition}px`; // Usa left en lugar de transform
                if (!isWalking) {
                    startWalking('left');
                }
            }

            // Verificar si el dinosaurio toca al enemigo
            checkCollision();
        }

        function startWalking(direction) {
            isWalking = true;
            let currentIndex = 0;
            const walkImages = direction === 'right' ? dinosaurImages.walkRight : dinosaurImages.walkLeft;

            clearInterval(walkInterval);
            walkInterval = setInterval(() => {
                if (currentIndex >= walkImages.length) {
                    currentIndex = 0;
                }
                dinosaur.style.backgroundImage = `url('${walkImages[currentIndex]}')`;
                currentIndex++;
            }, 100);
        }

        function stopWalking() {
            if (isWalking) {
                isWalking = false;
                clearInterval(walkInterval);
                startIdle();
            }
        }

        function startIdle() {
            if (isDead) return; // Si está muerto, no vuelve al idle
            let currentIndex = 0;
            clearInterval(idleInterval);
            idleInterval = setInterval(() => {
                if (currentIndex >= dinosaurImages.idle.length) {
                    currentIndex = 0;
                }
                dinosaur.style.backgroundImage = `url('${dinosaurImages.idle[currentIndex]}')`;
                currentIndex++;
            }, 200);
        }

        function jumpDinosaur() {
            if (isDead) return; // Si está muerto, no puede saltar
            isJumping = true;
            let currentIndex = 0;
            jumpHeight = 0; // Inicia el salto desde el suelo
            isJumpingUp = true; // Empieza subiendo

            // Cambiar a la animación de salto
            clearInterval(jumpInterval);
            jumpInterval = setInterval(() => {
                if (currentIndex >= dinosaurImages.jump.length) {
                    currentIndex = 0;
                }
                dinosaur.style.backgroundImage = `url('${dinosaurImages.jump[currentIndex]}')`;
                currentIndex++;

                if (isJumpingUp) {
                    // Subir hasta la altura máxima
                    if (jumpHeight < jumpMaxHeight) {
                        dinosaurVerticalPosition += jumpSpeed;
                        jumpHeight += jumpSpeed;
                    } else {
                        isJumpingUp = false; // Empieza a caer
                    }
                } else {
                    // Luego caer de nuevo
                    if (jumpHeight > 0) {
                        dinosaurVerticalPosition -= jumpSpeed;
                        jumpHeight -= jumpSpeed;
                    } else {
                        // El salto terminó, volver al suelo
                        dinosaurVerticalPosition = 50;
                        isJumping = false;
                        clearInterval(jumpInterval);
                        startIdle();
                    }
                }

                dinosaur.style.bottom = `${dinosaurVerticalPosition}px`;
            }, 20);
        }

        function checkCollision() {
            const dinoRect = dinosaur.getBoundingClientRect();
            const enemyRect = enemy.getBoundingClientRect();

            // Verificar si el dinosaurio toca al enemigo
            if (dinoRect.left < enemyRect.right && dinoRect.right > enemyRect.left &&
                dinoRect.top < enemyRect.bottom && dinoRect.bottom > enemyRect.top) {
                die(); // Si hay colisión, el dinosaurio muere
            }
        }

        function die() {
            isDead = true;
            clearInterval(walkInterval);
            clearInterval(idleInterval);
            clearInterval(jumpInterval);
            clearInterval(deadInterval);

            let currentIndex = 0;
            deadInterval = setInterval(() => {
                if (currentIndex >= dinosaurImages.dead.length) {
                    currentIndex = 0;
                }
                dinosaur.style.backgroundImage = `url('${dinosaurImages.dead[currentIndex]}')`;
                currentIndex++;
            }, 200);

            dinosaur.style.left = `${dinosaurPosition}px`;
            dinosaur.style.bottom = `${dinosaurVerticalPosition}px`;
        }

        function moveEnemy() {
            if (isDead) return; // Si el dinosaurio está muerto, el enemigo no se mueve
            enemyPosition -= 5; // El enemigo se mueve hacia la izquierda

            enemy.style.left = `${enemyPosition}px`;

            // Reseteamos la posición del enemigo si se sale de la pantalla
            if (enemyPosition < -50) {
                enemyPosition = window.innerWidth; // Vuelve a la derecha
            }
        }

        setInterval(moveEnemy, 30); // Mueve el enemigo constantemente