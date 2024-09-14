# Use the official Node.js image.
FROM node:20

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) files.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of your application code.
COPY . .

# Generate Prisma Client.
RUN npx prisma generate

# Build the TypeScript application.
RUN npm run build

# Expose the application port.
EXPOSE 5000

# Start the application.
CMD ["npm", "start"]
