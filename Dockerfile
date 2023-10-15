FROM node:18-alpine

WORKDIR /prowler-ui/

COPY public/ /prowler-ui/public
COPY src/ /prowler-ui/src
COPY package.json /prowler-ui/

RUN npm install

CMD ["npm", "start"]

