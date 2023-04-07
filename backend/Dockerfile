# Build stage
FROM node:14-alpine as build

WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install && \
    npx prisma generate

# Bundle app source
COPY . .

CMD ["npm","start"]
