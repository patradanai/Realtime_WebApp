# # build environment
# FROM node:12.2.0-alpine as build
# WORKDIR /usr/src/app
# COPY . /usr/src/app
# ENV PATH /usr/src/app/node_modules/.bin:$PATH
# COPY package.json /usr/src/app
# RUN npm config set proxy http://163.50.57.130:8080
# RUN npm config set https-proxy http://163.50.57.130:8080
# RUN npm install
# RUN npm install react-scripts@3.0.1 -g
# RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY /build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]