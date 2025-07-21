# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

# Expose ports
EXPOSE 3000
EXPOSE 3001

# Start command
CMD ["sh", "-c", "npx prisma db push && npm run dev & npx ts-node server/index.ts"]
