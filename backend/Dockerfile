# Set base image
FROM node:14

# Create and set the working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Expose the port on which the app runs
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
