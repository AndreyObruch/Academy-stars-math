# Amvera: сборка Node-приложения Академии (Express + статика + /api/leads)
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
ENV NODE_ENV=production
# Порт инжектит Amvera через env PORT; EXPOSE декларативен
EXPOSE 8080
CMD ["npm", "start"]