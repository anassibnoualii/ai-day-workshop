FROM node:22-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN VITE_PB_URL= npm run build

FROM alpine:3.20

ARG PB_VERSION=0.36.5

RUN apk add --no-cache ca-certificates unzip
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb && rm /tmp/pb.zip && chmod +x /pb/pocketbase

COPY pb/pb_migrations /pb/pb_migrations
COPY pb/guides /pb/guides
COPY pb/entrypoint.sh /pb/entrypoint.sh
RUN chmod +x /pb/entrypoint.sh

COPY --from=build /app/dist /pb/pb_public

ENTRYPOINT ["/pb/entrypoint.sh"]
