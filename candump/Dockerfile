FROM balenalib/generic-armv7ahf-debian:stretch

RUN apt update && \
    apt install -y can-utils && \
    rm -rf /var/lib/apt/lists/*

CMD [ "candump", "can0" ]
