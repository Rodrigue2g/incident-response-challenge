FROM --platform=linux/amd64 alpine:3.22 AS builder
RUN apk add --no-cache build-base
WORKDIR /build
COPY pwn/challenge.c .
RUN cc -O0 -fno-stack-protector -fno-omit-frame-pointer -no-pie \
    -Wl,-z,norelro -o challenge challenge.c

FROM --platform=linux/amd64 alpine:3.22
RUN apk add --no-cache curl socat \
    && addgroup -g 10001 challenge \
    && adduser -D -H -u 10001 -G challenge challenge \
    && mkdir -p /challenge \
    && chown challenge:challenge /challenge
COPY --from=builder --chown=challenge:challenge /build/challenge /challenge/challenge
COPY --chown=challenge:challenge pwn/cleanup /usr/local/bin/cleanup
RUN chmod 0555 /challenge/challenge /usr/local/bin/cleanup
USER 10001:10001
WORKDIR /challenge
EXPOSE 31337
CMD ["socat", "TCP-LISTEN:31337,reuseaddr,fork", "EXEC:/challenge/challenge,pty,stderr,setsid,sigint,rawer"]
