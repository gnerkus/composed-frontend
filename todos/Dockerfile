FROM node:8.2.1

LABEL authors="ifeanyioraelosi@gmail.com"

# Define environment variables
ENV NODE_ENV production
ENV APP_PORT 1447

# Our app runs on port 1447. Expose it.
EXPOSE 1447

# Set the new directory as our working directory
WORKDIR /src

# Copy all the content to the working directory
COPY . /src

RUN npm config set registry http://registry.npmjs.org/ && yarn install

# Serve the application
CMD ["npm", "run", "serve:production"]