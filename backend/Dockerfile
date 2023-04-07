# Build stage
FROM node:14-alpine as build

WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install --only=production

# Bundle app source
COPY . .

# Production stage
FROM node:14-alpine

WORKDIR /app

COPY --from=build /app/package*.json ./

RUN npm install --only=production

CMD ["npm", "run", "devStart"]
