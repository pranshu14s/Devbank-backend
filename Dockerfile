# --- Base image ---
FROM node:18-alpine

# --- Set working directory inside the container ---
WORKDIR /app

# --- Copy dependency manifests first (better Docker layer caching) ---
COPY package*.json ./

# --- Install only production dependencies ---
RUN npm install --production

# --- Copy the rest of the source code ---
COPY . .

# --- The port our Express app listens on ---
EXPOSE 4000

# --- Start the app ---
CMD ["node", "server.js"]
