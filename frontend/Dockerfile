# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the frontend
RUN npm build

# Expose frontend port
EXPOSE 3000

# Start the frontend server
CMD ["npm", "start"]
