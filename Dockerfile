# ---------- 1) Dependencies ----------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# ---------- 2) Build ----------
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---------- 3) Runtime ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# kopieer app-code en build-artifacts
COPY --from=builder /app ./
# alleen prod dependencies
RUN npm ci --omit=dev || npm install --omit=dev
EXPOSE 3000
CMD ["npm", "start"]
