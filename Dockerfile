FROM node:11.15-alpine
RUN apk add curl py-pip
RUN apk add python-dev libffi-dev openssl-dev gcc libc-dev make
RUN pip install docker-compose
RUN pip install ansible
COPY . /code
WORKDIR /code/server
RUN npm install
CMD [ "node", "server.js"]
