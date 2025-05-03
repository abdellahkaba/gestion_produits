FROM node:22 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build --prod

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80

