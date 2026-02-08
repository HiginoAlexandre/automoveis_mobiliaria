Get-ChildItem -Recurse -File -Include *.html, *.css, *.js | ForEach-Object {
    Write-Host "===== $($_.FullName) ====="
    Get-Content $_
} > codigo.txt


Get-ChildItem -Recurse > estrutura.txt