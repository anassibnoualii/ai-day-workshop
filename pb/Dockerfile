FROM alpine:3.20

ARG PB_VERSION=0.25.9

RUN apk add --no-cache ca-certificates unzip wget

ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb && rm /tmp/pb.zip && chmod +x /pb/pocketbase

EXPOSE 8090

ENV PORT=8090
CMD /pb/pocketbase serve --http=0.0.0.0:${PORT} --dir=/pb/pb_data
