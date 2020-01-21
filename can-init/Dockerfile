FROM balenalib/generic-armv7ahf-debian:stretch

RUN apt update && \
    apt install -y iproute2 can-utils && \
    rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

WORKDIR /

ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "true" ]
