# Etapa de compilación
FROM node:18-alpine AS build
WORKDIR /app

# Copia package.json y package-lock.json (o npm-shrinkwrap.json)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Compila la aplicación para producción
# El comando "npm run build" usará la configuración de producción por defecto según tu angular.json
RUN npm run build

# Etapa de ejecución
FROM nginx:alpine

# Copia la configuración personalizada de Nginx (ver paso 2)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los artefactos de compilación de la etapa 'build' al directorio web de Nginx
# La salida de tu build es "dist/alikin-frontend"
COPY --from=build /app/dist/alikin-frontend /usr/share/nginx/html

# Expone el puerto 80 (el puerto por defecto de Nginx)
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]