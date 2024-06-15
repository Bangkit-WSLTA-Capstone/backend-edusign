FROM node:20
WORKDIR /app
ENV HOST 0.0.0.0
ENV PORT 3000
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "start"]
