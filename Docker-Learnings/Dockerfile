FROM node:22-alpine
# base image
WORKDIR /app


COPY . .

RUN npm install

# RUN npm run build 

EXPOSE 3000

CMD ["node","index.js"]


# docker build -t hello . to build the image 
# docker run -p 3000:3000 hello to run the container
# docker ps to see the running containers
# docker stop <container_id> to stop the container
# docker rm <container_id> to remove the container
# docker rmi <image_id> to remove the image
# docker images to see the images
# docker build -t hello . to build the image
# docker run -p 3000:3000 hello to run the container