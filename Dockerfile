FROM node:14-slim
RUN apt update && apt install git python3 build-essential libudev-dev libusb-1.0-0-dev -y
WORKDIR /var/app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:stable-alpine
COPY --from=0 /var/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
