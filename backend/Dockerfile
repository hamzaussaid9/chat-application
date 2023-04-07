FROM node:14.16-alpine
WORKDIR /backend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 1500
CMD ["npm", "start"]