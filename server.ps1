# Simple PowerShell HTTP Server for Portfolio Development
param(
    [int]$Port = 3000
)

Write-Host "Starting Portfolio Development Server on port $Port..." -ForegroundColor Green

$http = [System.Net.HttpListener]::new()
$http.Prefixes.Add("http://localhost:$Port/")
$http.Start()

Write-Host "Portfolio server running at: http://localhost:$Port" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow

while ($http.IsListening) {
    try {
        $context = $http.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $path = $request.Url.LocalPath
        
        if ($path -eq "/") {
            $path = "/index.html"
        }
        
        $filePath = Join-Path $PSScriptRoot $path.TrimStart('/')
        
        if (Test-Path $filePath -PathType Leaf) {
            $extension = [System.IO.Path]::GetExtension($filePath).ToLower()
            
            $contentType = switch ($extension) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".ico"  { "image/x-icon" }
                ".pdf"  { "application/pdf" }
                default { "application/octet-stream" }
            }
            
            $response.ContentType = $contentType
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
            
            Write-Host "Served: $path" -ForegroundColor Green
        } else {
            $response.StatusCode = 404
            $errorContent = "<h1>404 - File Not Found</h1>"
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($errorContent)
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            
            Write-Host "404: $path" -ForegroundColor Red
        }
        
        $response.Close()
    }
    catch {
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
        if ($response) {
            $response.Close()
        }
    }
}

$http.Stop()
Write-Host "Server stopped." -ForegroundColor Yellow