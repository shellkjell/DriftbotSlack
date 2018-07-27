FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i npm@latest -g
RUN npm i

# Copy contents of this dir to new app dir
COPY . .

RUN ./bootstrap-app.sh

CMD ["npm", "start"]
