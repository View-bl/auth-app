# Базовий образ Node.js
FROM node:18

# Робоча директорія
WORKDIR /app

# Копіюємо package.json і package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Встановлюємо змінну середовища для hot reload
ENV CHOKIDAR_USEPOLLING=true

# Експортуємо порт CRA
EXPOSE 3000

# Запуск dev-server
CMD ["npm", "start"]
