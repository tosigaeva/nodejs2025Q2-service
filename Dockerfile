FROM node:22-alpine
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

COPY prisma ./prisma

EXPOSE 4000
CMD ["node", "dist/main.js"]