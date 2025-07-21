#!/bin/bash

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting PettresSystem setup...${NC}"

# Verificar se o Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker is running${NC}"

# Verificar se as portas estão disponíveis
ports=(3000 3001 5432)
for port in "${ports[@]}"; do
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${RED}❌ Port $port is already in use. Please free this port first.${NC}"
        exit 1
    fi
done

echo -e "${GREEN}✅ All required ports are available${NC}"

# Parar e remover containers existentes
echo -e "${YELLOW}🧹 Cleaning up existing containers...${NC}"
docker-compose down -v

# Construir e iniciar os containers
echo -e "${YELLOW}🏗️ Building and starting containers...${NC}"
docker-compose up --build -d

# Aguardar o banco de dados ficar pronto
echo -e "${YELLOW}⏳ Waiting for database to be ready...${NC}"
sleep 10

echo -e "${CYAN}
✨ Setup complete! ✨

Your system is running at:
📱 Frontend: http://localhost:3000
🔌 Backend API: http://localhost:3001

To stop the system:
- Run 'docker-compose down' in this directory

To view logs:
- Run 'docker-compose logs -f' to see all logs
- Run 'docker-compose logs -f app' to see only application logs
- Run 'docker-compose logs -f db' to see only database logs

To restart:
- Just run this script again: './setup.sh'
${NC}"
