FROM node:10

LABEL maintainer="Sumanth <xmlking@gmail.com>" \
      description="coord-angular api"

# App root
# /app
#    |- node_modules (dependencies)
#    |- apps (app sources)
#
WORKDIR /app

COPY package.json package-lock.json ./

ENV NODE_ENV production

RUN npm ci

COPY . .

RUN $(npm bin)/tsc -p ./apps/api/tsconfig.json

EXPOSE 3000

CMD node dist/apps/api/main.js


