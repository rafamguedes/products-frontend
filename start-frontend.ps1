#!/usr/bin/env pwsh

Write-Host "==========================================" -ForegroundColor Green
Write-Host "    Sistema de Gestão de Produtos" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""

Write-Host "1. Verificando se a API Go está rodando..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/health" -Method Get -TimeoutSec 5
    Write-Host "   ✅ API Go está rodando!" -ForegroundColor Green
} catch {
    Write-Host "   ❌ API Go não está rodando. Inicie primeiro:" -ForegroundColor Red
    Write-Host "   cd ../apiRestGolang && go run main.go" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Pressione qualquer tecla para continuar mesmo assim..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

Write-Host ""
Write-Host "2. Iniciando o frontend..." -ForegroundColor Yellow
npm run dev
