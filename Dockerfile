###############################################################################
# ETAPA 1 – build do frontend (Node)
###############################################################################
FROM node:20 AS builder

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci          # instala dependências do React com cache otimizado
COPY frontend/ .
RUN npm run build   # gera pasta dist/ otimizada

###############################################################################
# ETAPA 2 – imagem final (Python + FastAPI + artefatos do React)
###############################################################################

FROM python:3.11-slim AS runtime
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# dependências
COPY server/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# (1) Copia a pasta inteira mantendo o nome
COPY server ./server

# (2) Copia o build gerado pelo Vite para dentro de /server/dist
COPY --from=builder /app/frontend/dist ./server/dist

EXPOSE 8080
CMD ["uvicorn", "server.main:app", "--host", "0.0.0.0", "--port", "8080"]