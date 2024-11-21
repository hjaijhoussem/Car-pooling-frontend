FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm config set fetch-retries 5 && npm config set fetch-timeout 60000 && npm install
COPY . .
RUN npm run build 

FROM nginx:mainline-alpine3.20-slim
COPY --from=build ./app/build/ /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
