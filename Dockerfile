# Use Node.js 20.14.0 as specified in package.json
FROM node:20.14.0-alpine AS base

# Install pnpm
RUN npm install -g pnpm@9.15.2

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
FROM base AS dependencies
RUN pnpm install --frozen-lockfile

# Build stage
FROM base AS build
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
# Build admin panel
RUN pnpm run build
# Compile TypeScript to JavaScript
RUN ./node_modules/.bin/tsc

# Production stage
FROM base AS production
ENV NODE_ENV=production

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/.strapi ./.strapi
COPY --from=build /app/dist/ ./
COPY package.json ./
COPY public ./public

# Expose port 3002
EXPOSE 3002

# Start the application
CMD ["pnpm", "start"]
