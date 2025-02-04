# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json ./
RUN npm install --production

# Copy backend files
COPY . .

# Expose the backend port
EXPOSE 8000

# Start the backend
CMD ["node", "server.js"]
