# Fix broken UTF-8 characters in index.html
$path = "c:\vp project\portfo\index.html"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# Fix common mojibake sequences
$fixes = @{
    [char]0xC3 + [string][char]0xA2 + [char]0x80 + [char]0x94 = [string][char]0x2014  # em dash
    "GitHub " + [char]0x20AC + [string][char]0x201D = "GitHub " + [char]0x2014           # —
}

# Use regex replace for the garbled patterns
# â€" = em dash (U+2014)  encoded as windows-1252 read as utf-8 
$content = [System.Text.RegularExpressions.Regex]::Replace($content, "\xc3\xa2\xc2\x80\xc2\x94", [char]0x2014)

# Simpler approach: re-decode as latin1 then re-encode as utf8
$bytes = [System.Text.Encoding]::UTF8.GetBytes($content)
$latin1 = [System.Text.Encoding]::GetEncoding(1252).GetString($bytes)

# Check if it looks better
if ($latin1 -match "EXPERIENCE SECTION") {
    Write-Host "Latin1 decode worked, saving..."
    [System.IO.File]::WriteAllText($path, $latin1, [System.Text.Encoding]::UTF8)
} else {
    Write-Host "Content already looks OK, no change needed"
    Write-Host ($content | Select-String "EXPERIENCE SECTION" | Select-Object -First 1)
}
