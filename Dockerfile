# Utilize an ubuntu image as base
FROM ubuntu:24.04

# Update the package indexes and installs dependencies
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Make the workspace within /app
WORKDIR /app

# Copy all the application files (including package.json, package-lock.json and .env)
COPY . .

# Install the application dependencies
RUN npm install --production

# Expose the port where the application will be executed
EXPOSE 3000

# Command to start the application
CMD ["node", "dist/main.js"]
