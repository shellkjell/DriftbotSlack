FROM node:carbon-alpine

WORKDIR /usr/src

# Copy needed files
COPY app/ ./app/
COPY bootstrap-app.sh ./
COPY .env ./
COPY package*.json ./

# Latest npm and install all deps
RUN npm i npm@latest -g
RUN npm i

# Run our bootstrap
RUN ./bootstrap-app.sh

CMD ["npm", "start"]