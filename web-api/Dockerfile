# use the full-fat environment for building the node_modules...
FROM balenalib/generic-armv7ahf-debian-node:12-stretch-build as builder

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# build the slimmer container without all the build environment reqs...
FROM balenalib/generic-armv7ahf-debian-node:12-stretch-run

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .

COPY . /usr/src/app

EXPOSE 80
CMD [ "npm", "start" ]
