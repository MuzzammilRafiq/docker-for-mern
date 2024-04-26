FROM node:14-slim

WORKDIR /usr/src/app

COPY package*.json /.
COPY pnpm-lock.yaml /.

RUN npm install -g pnpm
RUN pnpm install

COPY . .

EXPOSE 3001

CMD [ "pnpm","start" ]

