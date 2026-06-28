docker build -f Docker/Dockerfile.websocket -t websocket:latest .
docker build -f Docker/Dockerfile.backend -t backend:latest .
docker build -f Docker/Dockerfile.web -t web:latest .

docker compose up --build 