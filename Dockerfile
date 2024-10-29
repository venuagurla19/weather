FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY index.html .
COPY style.css .
COPY script.js .
COPY /images ./images/

EXPOSE 8080

CMD [ "nginx", "-g", "daemon off;" ]
