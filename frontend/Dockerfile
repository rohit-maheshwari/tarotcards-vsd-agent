# Use Node.js base image
FROM node:19-slim

# Set working directory
WORKDIR /app

# Copy all files in the current directory into the container
COPY . .

# Set the environment variable for the application's port
# (Be sure to replace '3000' with your application's specific port number if different)
ENV PORT=3000

# Install 'serve', a static file serving package globally in the container
RUN npm install -g serve

# Install all the node modules required by the React app
RUN npm install
# Build the React app
RUN npm run build

# Serve the 'build' directory on port 3000 using 'serve'
CMD ["serve", "-s", "-l", "3000", "./build"]