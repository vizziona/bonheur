# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json from the root directory to /app in the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code from the frontend directory to /app in the container
COPY frontend/ .

# Set the default command to run the app
CMD ["npm", "start"]

# Expose the port the app runs on (adjust if needed for React Native)
EXPOSE 19000
