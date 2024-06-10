# Utilize an ubuntu image as base
FROM node:20-alpine

# Update the package indexes and installs dependencies
RUN apk update && \
    apk add bind-tools

# Make the workspace within /app
WORKDIR /app

# Copy all the application files (including package.json, package-lock.json and .env)
COPY . .

# Install the application dependencies
RUN npm install

# Expose the port where the application will be executed
EXPOSE 3000

# Command to start the application
CMD ["node", "dist/main.js"]