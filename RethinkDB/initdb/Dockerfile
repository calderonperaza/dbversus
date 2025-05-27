FROM node:20-slim

WORKDIR /app

# Instalar cliente RethinkDB
COPY package.json .
RUN npm install

# Copiar script de inicialización
COPY script.js .

# Ejecutar script al iniciar
CMD ["node", "script.js"]
