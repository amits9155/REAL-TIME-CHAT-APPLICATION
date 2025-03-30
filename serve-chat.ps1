$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:9000/')
$listener.Start()

Write-Host "Server started at http://localhost:9000/"
Write-Host "Press Ctrl+C to stop the server."

$staticPath = Join-Path -Path (Get-Location) -ChildPath "static-chat"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $requestUrl = $request.Url.LocalPath
        if ($requestUrl -eq "/") {
            $requestUrl = "/index.html"
        }
        
        $filePath = Join-Path -Path $staticPath -ChildPath $requestUrl.TrimStart('/')
        
        if (Test-Path $filePath -PathType Leaf) {
            $content = Get-Content -Path $filePath -Raw -Encoding Byte
            $response.ContentType = "text/html"
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
        } else {
            $response.StatusCode = 404
            $notFoundMessage = "File not found: $requestUrl"
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($notFoundMessage)
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
        
        $response.Close()
    }
} finally {
    $listener.Stop()
} 