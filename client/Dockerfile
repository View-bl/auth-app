# Базовий образ Node.js
FROM node:18

# Робоча директорія
WORKDIR /app

# Копіюємо package.json і package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо решту файлів (src, public і т.д.)
COPY . .

# Експортуємо порт CRA
EXPOSE 3000

# Hot reload для CRA у Docker
ENV CHOKIDAR_USEPOLLING=true

# Запуск dev-server
CMD ["npm", "start"]
