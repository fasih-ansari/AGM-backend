# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilize Docker cache to save re-installing dependencies if unchanged
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN yarn prisma generate

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run the app
CMD ["yarn", "start:dev"]
