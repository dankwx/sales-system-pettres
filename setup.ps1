Write-Host "🚀 Starting PettresSystem setup..." -ForegroundColor Green

# Check if Docker is running
$dockerStatus = docker info 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker is not running. Please start Docker Desktop first." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Docker is running" -ForegroundColor Green

# Check if ports are available
$portsToCheck = @(3000, 3001, 5432)
foreach ($port in $portsToCheck) {
    $portInUse = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($portInUse) {
        Write-Host "❌ Port $port is already in use. Please free this port first." -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ All required ports are available" -ForegroundColor Green

# Stop and remove existing containers if they exist
Write-Host "🧹 Cleaning up existing containers..." -ForegroundColor Yellow
docker-compose down -v

# Build and start the containers
Write-Host "🏗️ Building and starting containers..." -ForegroundColor Yellow
docker-compose up --build -d

# Wait for the database to be ready
Write-Host "⏳ Waiting for database to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

Write-Host "
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
- Just run this script again: './setup.ps1'
" -ForegroundColor Cyan
