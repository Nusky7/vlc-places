document.addEventListener('DOMContentLoaded', function () {
    const map = L.map('map').setView([39.4699, -0.3763], 13);
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';


      document.body.setAttribute('data-theme', currentTheme);

    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', function () {
        const newTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    function manejarErroresDeUbicacion() {
        alert('No se pudo obtener tu ubicación. Asegúrate de tener el GPS habilitado.');
    }
     // Centrar en la ubicacion del usuario
     function centrarMapaEnUbicacion() {
        map.locate({ setView: true, maxZoom: 16 });

        // Evento al encontrar la ubicación
        map.once('locationfound', function (e) {
            const radius = e.accuracy / 2;
            L.marker(e.latlng)
                .addTo(map)
                .bindPopup(`Estás a aproximadamente ${Math.round(radius)} metros de aquí.`)
                .openPopup();
            // círculo alrededor de la ubicación
            L.circle(e.latlng, radius).addTo(map);
        });
        map.once('locationerror', manejarErroresDeUbicacion);
    }

    document.getElementById('mi-ubicacion').addEventListener('click', centrarMapaEnUbicacion);

    // Lugares de interés
    const lugares = [
        {
            nombre: "🔆 Ciudad de las Artes y las Ciencias",
            coordenadas: [39.4541, -0.3564],
            descripcion: "Un impresionante complejo arquitectónico con museo, acuario y más.",
            direccion: "Av. del Professor López Piñero, 7",
            imagen: "img/places/arts.jpg",
            autobuses: [10, 13, 23, 94, 95, 99]
        },
        {
            nombre: "⛪ Catedral de Valencia",
            coordenadas: [39.4751, -0.3753],
            descripcion: "Una majestuosa catedral con elementos góticos, románicos y barrocos.",
            direccion: "Plaza de la Reina, s/n",
            imagen: "img/places/catedral.jpg",
            autobuses: [4, 5, 9, 10, 70, 71, 80, 81]
        },
        {
            nombre: "🏺 Plaza de la Virgen",
            coordenadas: [39.4769, -0.3752],
            descripcion: "Uno de los lugares más icónicos del casco antiguo.",
            direccion: "Plaza de la Virgen, s/n",
            imagen: "img/places/virgen.jpg",
            autobuses: [25, 27, 62, 95]
        },
        {
            nombre: "🔔 Miguelete",
            coordenadas: [39.4751, -0.3753],
            descripcion: "El campanario de la Catedral de Valencia, con vistas espectaculares de la ciudad.",
            direccion: "Plaza de la Reina, s/n",
            imagen: "img/places/miquelet.jpg",
            autobuses: [26, 32, 4, 60, 70]
        },
        {
            nombre: "🕍 Lonja de la Seda",
            coordenadas: [39.4745, -0.3783],
            descripcion: "Un ejemplo destacado de arquitectura gótica, declarado Patrimonio de la Humanidad.",
            direccion: "C/ de la Llotja, 2, 46001",
            imagen: "img/places/lonja.jpg",
            autobuses: [4, 7, 27, 28, 60, 81]
        },
        {
            nombre: "🍊 Mercado Central",
            coordenadas: [39.4735, -0.3790],
            descripcion: "Un mercado histórico con una amplia oferta de productos frescos y locales.",
            direccion: "Plaza Ciudad de Brujas, s/n, 46001",
            imagen: "img/places/central.jpg",
            autobuses: [4, 7, 27, 28, 60, 81]
        },
        {
            nombre: "🌳 Jardín del Turia",
            coordenadas: [39.477239890854655, -0.3694770000319716],
            descripcion: "Un extenso jardín que cruza la ciudad, ideal para paseos y actividades al aire libre.",
            direccion: "Av. de Manuel de Falla, s/n",
            imagen: "img/places/turia.jpg",
            autobuses: [11, 28, 70, 95]
        },
        {
            nombre: "🏰 Torres de Serranos",
            coordenadas: [39.4785, -0.3732],
            descripcion: "Puerta de la antigua muralla medieval con vistas panorámicas.",
            direccion: "Plaza de los Fueros, s/n",
            imagen: "img/places/serranos.jpg",
            autobuses: [1, 4, 5, 19, 27, 80, 95]
        },
        {
            nombre: "🏰 Torres de Quart",
            coordenadas: [39.4764, -0.3838],
            descripcion: "Otra puerta de la muralla medieval, testigo de la historia de Valencia.",
            direccion: "C/ Guillem de Castro, 89",
            imagen: "img/places/quart.jpg",
            autobuses: [2, 5, 27, 60, 64, 79, 81]
        },
        {
            nombre: "🎨 Museo de Bellas Artes",
            coordenadas: [39.4791, -0.3711],
            descripcion: "Uno de los museos más importantes de España, con una extensa colección de arte.",
            direccion: "C/ de Sant Pius V, 9, 46010",
            imagen: "img/places/barts.jpg",
            autobuses: [1, 6, 11, 16, 19, 28, 64, 79, 80, 95]
        },
        {
            nombre: "🏛️ Plaza del Ayuntamiento",
            coordenadas: [39.4698, -0.3762],
            descripcion: "Un lugar céntrico rodeado de edificios históricos y ornamentales.",
            direccion: "Plaza del Ayuntamiento, s/n",
            imagen: "img/places/ayun.jpg",
            autobuses: [4, 6, 8, 9, 11, 16, 26, 28, 70, 71, 72, 81]
        },
        {
            nombre: "🏛️ Palacio del Marqués de Dos Aguas",
            coordenadas: [39.4719, -0.3749],
            descripcion: "Un impresionante palacio barroco, sede del Museo Nacional de Cerámica.",
            direccion: "C/ Poeta Querol, 2",
            imagen: "img/places/marques.jpg",
            autobuses: [4, 8, 9, 10, 11, 28, 31, 71 ]
        },
        {
            nombre: "🦁 Bioparc Valencia",
            coordenadas: [39.4781, -0.4136],
            descripcion: "Un parque zoológico innovador con hábitats inmersivos.",
            direccion: "Av. Pío Baroja, 3",
            imagen: "img/places/bioparc.jpg",
            autobuses: [2, 5, 67, 90, 95]
        },
        {
            nombre: "🐂 Plaza de Toros",
            coordenadas: [39.4658, -0.3758],
            descripcion: "Un lugar histórico que también alberga eventos culturales.",
            direccion: "C/ Xàtiva, 28",
            imagen: "img/places/toros.jpg",
            autobuses: [5, 8, 10, 19, 27, 32, 62, 81 ]
        },
        {
            nombre: "🏛️ IVAM",
            coordenadas: [39.4763, -0.3795],
            descripcion: "Museo de arte moderno y contemporáneo con exposiciones innovadoras.",
            direccion: "C/ de Guillem de Castro, 118",
            imagen: "img/places/ivam.jpg",
            autobuses: [1, 5, 19, 27, 79, 80, 95 ]
        },
        {
            nombre: "🎨 MUVIM",
            coordenadas: [39.4718, -0.3814],
            descripcion: "Museo Valenciano de la Ilustración y la Modernidad. Exposiciones relacionadas.",
            direccion: "C/ de Quevedo, 10",
            imagen: "img/places/muvim.jpg",
            autobuses: [2, 3, 5, 9, 10, 27, 60, 62, 71, 81]
        },
        {
            nombre: "🐟 Oceanogràfic",
            coordenadas: [39.4542, -0.3490],
            descripcion: "El mayor acuario de Europa, con hábitats de todo el mundo.",
            direccion: "Carrer d'Eduardo Primo Yúfera, 1B",
            imagen: "img/places/oceano.jpg",
            autobuses: [1, 2, 19, 35, 89, 95]
        },
        {
            nombre: "🚢 Puerto Valencia",
            coordenadas: [39.4597, -0.3255],
            descripcion: "El puerto principal de la ciudad, con vistas impresionantes y actividades recreativas.",
            direccion: "Av. del Puerto, s/n",
            imagen: "img/places/puerto.jpg",
            autobuses: [1, 2, 3, 4, 19, 32]
        },
        {
            nombre: "🏖️ Playa Malvarrosa",
            coordenadas: [39.4738, -0.3314],
            descripcion: "Una de las playas más famosas de Valencia.",
            direccion: "Playa de la Malvarrosa",
            imagen: "img/places/malva.jpg",
            autobuses: [31, 32, 93, 19, 92]
        },
        {
            nombre: "🎭 Teatro Rialto",
            coordenadas: [39.4715, -0.3763],
            descripcion: "Un teatro histórico en el centro de Valencia, conocido por su arquitectura y sus representaciones.",
            direccion: "Carrer de las Barcas, 15",
            imagen: "img/places/rialto.jpg",
            autobuses: [6, 8, 9, 10, 11, 13, 26, 31, 62, 70, 71, 81]
        },
        {
            nombre: "🏰 La Beneficencia",
            coordenadas: [39.4777, -0.3763],
            descripcion: "Un centro cultural que incluye varios museos y actividades.",
            direccion: "C/ de la Corona, 36",
            imagen: "img/places/beneficencia.jpg",
            autobuses: [1, 2, 3, 5, 9, 10, 79, 80, 95]
        },
        {
            nombre: "🏛️ Museo de Historia de Valencia",
            coordenadas: [39.4785, -0.4067],
            descripcion: "Un museo dedicado a la historia de Valencia desde sus orígenes.",
            direccion: "C/ de València, 42",
            imagen: "img/places/historia.jpg",
            autobuses: [2, 3, 29, 81, 90, 95]
        },
        {
            nombre: "🎼 Palau de la Música",
            coordenadas: [39.4642, -0.3553],
            descripcion: "Un importante auditorio con conciertos y eventos culturales.",
            direccion: "Passeig de l'Albereda, 30",
            imagen: "img/places/palau.jpg",
            autobuses: [1, 2, 3, 4, 10, 80, 95]
        },
        {
            nombre: "🏰 Museo de la Ciudad",
            coordenadas: [39.4723, -0.3739],
            descripcion: "Museo que cuenta la historia de Valencia desde su fundación.",
            direccion: "Plaza del Arzobispo, 3",
            imagen: "img/places/ciudad.jpg",
            autobuses: [4, 5, 9, 10, 71, 79, 81]
        }    
    ];

    lugares.forEach(lugar => {

        let busLinesHTML = '';
        if (lugar.autobuses && lugar.autobuses.length > 0) {
            busLinesHTML = `
                <div class="bus-lines">
                    ${lugar.autobuses.map(bus => `<span class="bus-circle">${bus}</span>`).join('')}
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

        const placeList = document.querySelector('#place-list ul');
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = lugar.nombre;

         
        listItem.addEventListener('click', () => {
            marker.openPopup();

            setTimeout(() => {
                const popup = marker.getPopup();
                const popupHeight = popup.getElement().offsetHeight; 
                const markerPosition = map.latLngToContainerPoint(marker.getLatLng());

                if (markerPosition.y - popupHeight < 0) {
                    map.panBy([0, -(popupHeight / 2)]);
                }
            }, 300);
            map.setView(lugar.coordenadas, 15); 
        });

        placeList.appendChild(listItem);
    });
});

