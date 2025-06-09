FROM node:22-alpine
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY . .
RUN npm run build

EXPOSE 4000
CMD ["node", "dist/main.js"]