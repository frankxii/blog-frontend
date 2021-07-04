# build
FROM node:14.17-alpine as build-stage
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install --frozen-lockfile
copy ./ /app/
RUN yarn build

# deploy
FROM nginx:alpine
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
