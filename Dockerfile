# Configure
ARG NODE_VERSION=20-alpine
FROM node:${NODE_VERSION} AS base

WORKDIR /app

# Build
FROM base AS build

COPY yarn.lock package.json ./

RUN yarn

COPY . .

RUN yarn build

# Start
FROM base

RUN npm i -g serve

COPY --from=build /app /app

EXPOSE 3000

CMD ["serve", "-s", "dist"]
