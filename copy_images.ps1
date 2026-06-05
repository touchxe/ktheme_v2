$targetDir = $env:KTHEME_IMAGE_TARGET_DIR
if (-not $targetDir) {
    throw "KTHEME_IMAGE_TARGET_DIR is required."
}
if (-not (Test-Path -Path $targetDir)) {
    New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
}

$sourceDir = "C:\Users\CEO\.gemini\antigravity\brain\b36bf816-68d0-4017-93de-145f01debe49"
Copy-Item -Path "$sourceDir\church_hero_worship_1777944951235.png" -Destination "$targetDir\church_hero_worship.png" -Force
Copy-Item -Path "$sourceDir\church_pastor_sermon_1777944965867.png" -Destination "$targetDir\church_pastor_sermon.png" -Force
Copy-Item -Path "$sourceDir\church_small_group_1777944983403.png" -Destination "$targetDir\church_small_group.png" -Force
Copy-Item -Path "$sourceDir\church_welcome_lobby_1777944997047.png" -Destination "$targetDir\church_welcome_lobby.png" -Force

Write-Host "Files copied successfully."
