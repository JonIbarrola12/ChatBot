# Etapa 1: Construcción de la aplicación
FROM node:22
WORKDIR /app
COPY . /app

# Instala Angular CLI y dependencias
RUN npm install -g @angular/cli
RUN npm install

# Expone el nuevo puertow
EXPOSE 4300

# Sirve la aplicación en el puerto 4300
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4300", "--disable-host-check"]
