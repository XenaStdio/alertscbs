# Proses moo.png mentah -> assets/moo.png transparan + ter-crop + ter-resize
# Jalankan ulang setiap ganti file foto (mis. MOO.png baru)
param(
    [string]$Src = "C:\Users\Asus\Downloads\MOO (2).png",
    [int]$MaxWork = 520,   # sisi panjang saat bekerja (flood-fill & bbox)
    [int]$TargetHeight = 420
)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$dstDir = Join-Path $root 'assets'
New-Item -ItemType Directory -Force -Path $dstDir | Out-Null
$out = Join-Path $dstDir 'moo.png'

# 1) resize kerja
$img = [System.Drawing.Bitmap]::FromFile($Src)
$scale = [Math]::Min([double]$MaxWork / $img.Width, [double]$MaxWork / $img.Height)
$w = [int]($img.Width * $scale); $h = [int]($img.Height * $scale)
$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = 'HighQuality'
$g.DrawImage($img, 0, 0, $w, $h)
$g.Dispose(); $img.Dispose()

# 2) flood-fill putih terhubung tepi -> alpha 0
$rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
$bd = $bmp.LockBits($rect, 'ReadWrite', 'Format32bppArgb')
$stride = $bd.Stride
$pix = New-Object 'byte[]' ($stride * $h)
[System.Runtime.InteropServices.Marshal]::Copy($bd.Scan0, $pix, 0, $pix.Length)
$bmp.UnlockBits($bd)

$seen = New-Object 'byte[]' ($w * $h)
$q = New-Object 'System.Collections.Generic.Queue[int]'
for ($x = 0; $x -lt $w; $x++) { $q.Enqueue($x); $q.Enqueue($w * ($h - 1) + $x) }
for ($y = 0; $y -lt $h; $y++) { $q.Enqueue($y * $w); $q.Enqueue($y * $w + $w - 1) }
$minA = 246
while ($q.Count) {
    $i = $q.Dequeue()
    if ($i -lt 0 -or $i -ge ($w * $h) -or $seen[$i]) { continue }
    $seen[$i] = 1
    $o = $i * 4
    if ($pix[$o+3] -eq 0 -or ($pix[$o+2] -ge $minA -and $pix[$o+1] -ge $minA -and $pix[$o] -ge $minA)) {
        $pix[$o+3] = 0
        $q.Enqueue($i - 1); $q.Enqueue($i + 1); $q.Enqueue($i - $w); $q.Enqueue($i + $w)
    }
}

$bd = $bmp.LockBits($rect, 'ReadWrite', 'Format32bppArgb')
[System.Runtime.InteropServices.Marshal]::Copy($pix, 0, $bd.Scan0, $pix.Length)
$bmp.UnlockBits($bd)

# 3) bbox alpha
$minX = $w; $minY = $h; $maxX = 0; $maxY = 0
for ($y = 0; $y -lt $h; $y++) {
    $base = $y * $w
    for ($x = 0; $x -lt $w; $x++) {
        if ($pix[4 * ($base + $x) + 3] -gt 8) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

# 4) crop + resize final (+ bingkai transparan agar indeks transparan GIF aktif)
$bw = $maxX - $minX + 1; $bh = $maxY - $minY + 1
$TH = [Math]::Min($TargetHeight, $bh)
$TW = [int][Math]::Round($bw * $TH / $bh)
$pad = 6
$final = New-Object System.Drawing.Bitmap($($TW + 2 * $pad), $($TH + 2 * $pad))
$g2 = [System.Drawing.Graphics]::FromImage($final)
$g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g2.PixelOffsetMode = 'HighQuality'
$g2.DrawImage($bmp, (New-Object System.Drawing.Rectangle($pad, $pad, $TW, $TH)),
    (New-Object System.Drawing.Rectangle($minX, $minY, $bw, $bh)), 'Pixel')
$g2.Dispose(); $bmp.Dispose()
$final.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$gif = Join-Path $dstDir 'moo.gif'
$final.Save($gif, [System.Drawing.Imaging.ImageFormat]::Gif)  # versi embedded alert
# verifikasi: GIF harus transparan di pojok atas-kiri
$check = [System.Drawing.Bitmap]::FromFile($gif)
$alphaCheck = $check.GetPixel(1, 1).A
$check.Dispose()
if ($alphaCheck -ne 0) { Write-Warning "GIF masih opaque di ujung (alpha=$alphaCheck) - cek konversi" }
$final.Dispose()
"OK {0}x{1}px png={2}B gif={3}B gifAlpha={4} ; kotak:{5}x{6}" -f ($TW + 12), ($TH + 12), (Get-Item $out).Length, (Get-Item $gif).Length, $alphaCheck, $bw, $bh
