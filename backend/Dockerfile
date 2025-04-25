FROM node:16
RUN apt-get update && apt-get install -y netcat
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY wait-for-mysql.sh /wait-for-mysql.sh
RUN chmod +x /wait-for-mysql.sh
EXPOSE 5000
CMD ["/wait-for-mysql.sh", "node", "server.js"]
