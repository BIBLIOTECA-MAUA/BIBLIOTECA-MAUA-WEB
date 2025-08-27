# Teste de Login - PowerShell Script
Write-Host "🧪 Testando login com PowerShell..." -ForegroundColor Green

$headers = @{
    "Content-Type" = "application/json"
}

# Teste 1: Com campo 'identify'
$body1 = @{
    identify = "mariesimpsons"
    password = "100.000.000-22"
} | ConvertTo-Json

Write-Host "`n🔸 Teste 1: Campo 'identify'" -ForegroundColor Yellow
Write-Host "Body: $body1" -ForegroundColor Cyan

try {
    $response1 = Invoke-RestMethod -Uri "http://localhost:9494/auth/sign-in" -Method POST -Body $body1 -Headers $headers
    Write-Host "✅ Sucesso!" -ForegroundColor Green
    Write-Host ($response1 | ConvertTo-Json -Depth 10) -ForegroundColor White
} catch {
    Write-Host "❌ Erro: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $errorDetails = $_.Exception.Response | ConvertTo-Json -Depth 3
        Write-Host "Detalhes: $errorDetails" -ForegroundColor Gray
    }
}

# Teste 2: Com campo 'identifier'
$body2 = @{
    identifier = "mariesimpsons"
    password = "100.000.000-22"
} | ConvertTo-Json

Write-Host "`n🔸 Teste 2: Campo 'identifier'" -ForegroundColor Yellow
Write-Host "Body: $body2" -ForegroundColor Cyan

try {
    $response2 = Invoke-RestMethod -Uri "http://localhost:9494/auth/sign-in" -Method POST -Body $body2 -Headers $headers
    Write-Host "✅ Sucesso!" -ForegroundColor Green
    Write-Host ($response2 | ConvertTo-Json -Depth 10) -ForegroundColor White
} catch {
    Write-Host "❌ Erro: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $errorDetails = $_.Exception.Response | ConvertTo-Json -Depth 3
        Write-Host "Detalhes: $errorDetails" -ForegroundColor Gray
    }
}

Write-Host "`n🏁 Testes concluídos!" -ForegroundColor Green