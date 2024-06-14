FROM node:20
WORKDIR /src
ENV PORT 3000
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "start"]