FROM node:11.15-alpine
RUN apk add curl py-pip
RUN apk add python-dev libffi-dev openssl-dev gcc libc-dev make g++ openldap-dev
RUN pip install docker-compose
RUN pip install ansible
COPY . /code
WORKDIR /code
RUN npm install
RUN npm install node-ansible
RUN npm install ldap-client
CMD [ "node", "app.js"]
