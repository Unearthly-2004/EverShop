FROM node:18-alpine
WORKDIR /app
RUN npm install -g npm@9
COPY package*.json .
COPY packages ./packages
COPY themes ./themes
COPY extensions ./extensions
COPY public ./public
COPY media ./media
COPY config ./config
COPY translations ./translations
RUN npm install
RUN npm run build

EXPOSE 80
CMD ["npm", "run", "start"]
// Refine prepublish script at 2024-10-12 16:03:44
// Update Docker setup at 2024-10-14 10:31:19
// Fix typo in config at 2024-10-15 09:31:36
// Update nodemon config at 2024-10-25 17:34:51
// Fix typo in config at 2024-11-15 14:03:00
// Update README at 2024-11-22 11:45:40
