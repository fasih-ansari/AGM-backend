# Use an official Node runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN yarn prisma generate

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["yarn", "start:prod"]
