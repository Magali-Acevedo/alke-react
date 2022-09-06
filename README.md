# PROYECTO
#####  Web de peliculas  :fa-film:
Estado: En proceso  :fa-refresh:

Realizamos un sitio web de peliculas donde podemos crear un usuario para ingresar a la lista de peliculas existentes podremos ver el detalle y agregar a la lista de favoritos.
Este proyecto se realizó con el curso de SkillUp brindado por Alkemy.org


Tecnologias: React.js - HTML 5 - CSS3


###### LOGIN

Se realizo la utentificación de usuario con validación de datos
Guardado de token en sessionStorage.


usuario: challenge@alkemy.org
contraseña: react

Rutas protegidas con Navegate sin token no ingresa. :fa-arrow-down:

###### LISTA DE PELICULAS

Se realiza consulta a la API por los datos de las peliculas el array de respuestas se renderiza mediante el metodo map.
En la parte superior se encuentra el componente buscador controlamos el ingreso de los datos los guardamos enviandolo por la URL y redireccionamos la busqueda con useNavigate().

###### RESULTADOS
Tomamos los datos enviados en la URL y realizamos la petición de datos a la API.
Igual que en la lista se realiza el renderizado del array de respuesta.
En el caso de no tener coincidencias avisa al usuario.

###### DETALLE DE PELICULAS
Con el ID pasado por la URL realizamos la consulta a la API para obtener la pelicula seleccionada.
La renderizamos en una nueva vista.

###### FAVORITOS
Con el evento click capturamos el ID si ya existe en nuestro array de favoritos lo elimina pero si no existe lo agrega.
