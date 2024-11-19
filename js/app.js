document.addEventListener('DOMContentLoaded', function () {
    const map = L.map('map').setView([39.4699, -0.3763], 13);
    const themeToggle = document.getElementById('theme-toggle');
    const languageButton = document.getElementById('language-toggle');
    const languageIcon = document.getElementById('language-icon');

    const currentTheme = localStorage.getItem('theme') || 'light';
    let currentLanguage = localStorage.getItem('idioma') || (navigator.language.startsWith('es') ? 'es' : 'en');

    // Establecer tema inicial
    document.body.setAttribute('data-theme', currentTheme);
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

    // Cambiar tema
    themeToggle.addEventListener('click', function () {
        const newTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });

    // Cambiar idioma
    function toggleLanguage() {
        currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
        localStorage.setItem('idioma', currentLanguage);
        languageIcon.src = currentLanguage === 'en' ? 'img/es.png' : 'img/en.png';
        cargarLugaresYTextos(currentLanguage);
    }

    languageButton.addEventListener('click', toggleLanguage);

    // Configurar ícono inicial según idioma
    languageIcon.src = currentLanguage === 'en' ? 'img/es.png' : 'img/en.png';

    // Cargar mapa 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    function manejarErroresDeUbicacion() {
        alert(idiomaInicial === 'es'
            ? 'No se pudo obtener tu ubicación. Asegúrate de tener el GPS habilitado.'
            : 'Could not get your location. Make sure GPS is enabled.');
    }

    // Centrar en ubicación actual
    function centrarMapaEnUbicacion() {
        map.locate({ setView: true, maxZoom: 16 });

        map.once('locationfound', function (e) {
            const radius = e.accuracy / 2;
            L.marker(e.latlng)
                .addTo(map)
                .bindPopup(currentLanguage === 'es'
                    ? `Estás a aproximadamente ${Math.round(radius)} metros de aquí.`
                    : `You are approximately ${Math.round(radius)} meters from here.`)
                .openPopup();
            L.circle(e.latlng, radius).addTo(map);
        });

        map.once('locationerror', manejarErroresDeUbicacion);
    }

    document.getElementById('mi-ubicacion').addEventListener('click', centrarMapaEnUbicacion);

    // Cargar lugares y textos
    function cargarLugaresYTextos(idioma) {
        fetch(`./translations/${idioma}.json`)
            .then((response) => {
                if (!response.ok) throw new Error(`Error al cargar el archivo ${idioma}.json`);
                return response.json();
            })
            .then((data) => {
                // Actualizar textos estáticos
                const staticText = data.staticText;
                if (staticText) {
                    document.getElementById('descripcion').textContent = staticText.descripcion;
                    document.getElementById('mi-ubicacion').textContent = staticText.btnUbicacion;
                    document.getElementById('faq-t').textContent = staticText.faqTitulo;
                    document.getElementById('faq-s').textContent = staticText.faqDescripcion;
                }

                // Mostrar lugares
                const lugares = data.lugares;
                if (!Array.isArray(lugares)) throw new Error('El JSON cargado no contiene un array de lugares');

                const placeList = document.querySelector('#place-list ul');
                placeList.innerHTML = '';

                lugares.forEach((lugar) => {
                    let busLinesHTML = '';
                    if (lugar.autobuses && lugar.autobuses.length > 0) {
                        busLinesHTML = `
                            <div class="bus-lines">
                                ${lugar.autobuses.map((bus) => `<span class="bus-circle">${bus}</span>`).join('')}
                            </div>
                        `;
                    }
                    const popupContent = `
                        <h3>${lugar.nombre}</h3>
                        ${lugar.imagen ? `<img src="${lugar.imagen}" alt="${lugar.nombre}" style="width: 100%; height: auto; border-radius: 5px;">` : ''}
                        <p>${lugar.descripcion}</p>
                        <p><strong> Dirección </strong><br> 🚌 ${lugar.direccion}</p>
                        ${busLinesHTML}
                    `;

                    const marker = L.marker(lugar.coordenadas).addTo(map);
                    marker.bindPopup(popupContent);

                    const listItem = document.createElement('li');
                    listItem.className = 'list-group-item';
                    listItem.textContent = lugar.nombre;

                    listItem.addEventListener('click', () => {
                        marker.openPopup();
                        setTimeout(() => {
                            const popup = marker.getPopup();
                            const popupElement = popup.getElement();
                            if (popupElement) {
                                const popupHeight = popupElement.offsetHeight;
                                const markerPosition = map.latLngToContainerPoint(marker.getLatLng());

                                if (markerPosition.y - popupHeight < 0) {
                                    map.panBy([0, -(popupHeight / 2)]);
                                }
                            }
                        }, 300);
                        map.setView(lugar.coordenadas, 15);
                    });

                    placeList.appendChild(listItem);
                });
            })
            .catch((error) => {
                console.error('Error al cargar el archivo JSON:', error);
                alert(idioma === 'es'
                    ? 'Hubo un problema al cargar los datos. Intenta nuevamente más tarde.'
                    : 'There was a problem loading the data. Please try again later.');
            });
    }

    cargarLugaresYTextos(currentLanguage);
});
