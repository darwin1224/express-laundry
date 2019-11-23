FROM node:12.13.0

WORKDIR /var/www/html

RUN yarn cache clean -f

COPY . .

EXPOSE ${NODE_PORT}

CMD [ "./wait-for-it.sh", "database:3306", "--", "yarn", "dev" ]