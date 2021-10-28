# First Stage
FROM node:lts-alpine AS build

# create .npmrc file with npm auth token then download dependencies
# then delete credential file
COPY package.json package.json

# creates production build of product
COPY src/ src/
COPY public/ public/
RUN npm install
RUN npm run build

# Second Stage
# adds only production build into fresh docker image and serve image
FROM node:10-alpine
RUN yarn global add serve
WORKDIR /usr/src/app
COPY --from=build /build/ .
ENV PORT 800
EXPOSE ${PORT}
CMD serve -p  $PORT -s .
