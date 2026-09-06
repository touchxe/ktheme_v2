$targetDir = $env:MODUTHEME_IMAGE_TARGET_DIR
if (-not $targetDir) {
    throw "MODUTHEME_IMAGE_TARGET_DIR is required."
}
if (-not (Test-Path -Path $targetDir)) {
    New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
}

$sourceDir = "C:\Users\CEO\.gemini\antigravity\brain\b36bf816-68d0-4017-93de-145f01debe49"
Copy-Item -Path "$sourceDir\sermon_thumb_01_1777945246486.png" -Destination "$targetDir\sermon_thumb_01.png" -Force
Copy-Item -Path "$sourceDir\sermon_thumb_02_1777945261099.png" -Destination "$targetDir\sermon_thumb_02.png" -Force
Copy-Item -Path "$sourceDir\sermon_thumb_03_1777945275825.png" -Destination "$targetDir\sermon_thumb_03.png" -Force
Copy-Item -Path "$sourceDir\event_retreat_1777945291932.png" -Destination "$targetDir\event_retreat.png" -Force
Copy-Item -Path "$sourceDir\event_concert_1777945307820.png" -Destination "$targetDir\event_concert.png" -Force
Copy-Item -Path "$sourceDir\ministry_children_1777945323589.png" -Destination "$targetDir\ministry_children.png" -Force
Copy-Item -Path "$sourceDir\ministry_youth_1777945342727.png" -Destination "$targetDir\ministry_youth.png" -Force
Copy-Item -Path "$sourceDir\ministry_mission_1777945357857.png" -Destination "$targetDir\ministry_mission.png" -Force
Copy-Item -Path "$sourceDir\hero_church_exterior_1777945372597.png" -Destination "$targetDir\hero_church_exterior.png" -Force

Write-Host "Files copied successfully."
