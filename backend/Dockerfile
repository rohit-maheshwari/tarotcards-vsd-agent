# Use Node.js base image
FROM node:18

# Set correct working directory
WORKDIR /app

# Copy package.json first (leverage Docker caching)
COPY package.json ./

# Install dependencies inside Docker container
RUN npm install --legacy-peer-deps

# Copy the rest of the backend files
COPY . .

# Expose backend port
EXPOSE 8000

# Start backend service
CMD ["node", "server.js"]
