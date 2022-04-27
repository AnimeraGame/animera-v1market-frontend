FROM node:14-alpine
RUN apk add --no-cache git
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 5000
CMD ["npm", "run", "start"]
