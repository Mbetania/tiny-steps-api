# Utiliza una imagen base de Node.js
FROM node:latest

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de configuración y package.json al contenedor
COPY package*.json ./

# Instala las dependencias
RUN pnpm install

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Compila el proyecto NestJS
RUN pnpm run build

# Expone el puerto en el que se ejecutará tu aplicación NestJS
EXPOSE 4000

# Comando para iniciar tu aplicación NestJS
CMD ["pnpm", "run", "start:prod"]