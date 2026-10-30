# Source: https://cuongmeai.com/tai-lieu/markitdown-tiet-kiem-token


Mỗi lần tải một file PDF lên Claude, chi phí thực tế cao hơn nhiều so với lượng chữ có trong tài liệu. Nguyên nhân nằm ở cách Claude xử lý PDF, và đã có một công cụ miễn phí giải quyết được việc này.

Tài liệu trình bày rõ chi phí phát sinh từ đâu, hướng dẫn cài đặt từng bước, các lệnh dùng hằng ngày, cách thiết lập để Claude tự động chuyển đổi file, cùng những trường hợp không nên dùng MarkItDown.

Người đọc không cần biết lập trình. Toàn bộ thao tác chỉ gồm sao chép và dán một dòng lệnh.

- Giải thích các thuật ngữ trong tài liệu
- Vì sao mỗi trang PDF bị tính hai lần
- MarkItDown là gì và giải quyết được vấn đề gì
- Cài MarkItDown trong 5 phút
- Những lệnh bạn sẽ dùng hằng ngày
- Cài MCP server: Để Claude tự chuyển file
- Bộ file tải về: Script và prompt dùng ngay
- Khi nào MarkItDown không phù hợp
- Thói quen giúp tiết kiệm lượt dùng lâu dài
- Câu hỏi thường gặp
- Tóm tắt nhanh

## 1. Giải thích các thuật ngữ trong tài liệu

Tài liệu có một số thuật ngữ chuyên môn. Bấm vào thuật ngữ nào chưa rõ để mở phần giải thích, chỗ nào đã biết thì bỏ qua.

Đơn vị đếm mà AI dùng để tính lượng chữ phải đọc. Một token tương đương khoảng ba phần tư một từ tiếng Anh, có thể hiểu là số ký tự mà người dùng phải trả tiền. Càng nhiều token thì chi phí càng cao (với người dùng API) hoặc càng nhanh hết lượt (với người dùng gói Claude theo tháng).

Một định dạng file chữ thuần, đuôi .md , dùng vài ký hiệu đơn giản để đánh dấu tiêu đề và bảng. File mở bằng Notepad vẫn đọc được bình thường. AI xử lý định dạng này rất hiệu quả vì nội dung không có phần thừa.

Cửa sổ dùng để gõ lệnh cho máy tính thay vì thao tác bằng chuột. Mac: Mở app Terminal (bấm Cmd + Space rồi gõ “terminal”). Windows: Mở Command Prompt hoặc PowerShell (bấm nút Windows rồi gõ “cmd”).

Python là một ngôn ngữ lập trình phổ biến. Người dùng không cần học Python, nhưng nhiều công cụ, trong đó có MarkItDown, được viết bằng ngôn ngữ này nên máy tính cần cài sẵn. pip đóng vai trò như kho ứng dụng của Python: Chỉ cần một dòng lệnh là công cụ được tải và cài tự động.

Công nghệ nhận dạng chữ trong ảnh. Cần đến OCR khi file PDF là bản scan, tức ảnh chụp trang giấy chứ không phải chữ thật.

Viết tắt của Model Context Protocol, là chuẩn kết nối để gắn thêm công cụ cho Claude, tương tự việc cắm USB vào máy tính. Sau khi kết nối, Claude tự động sử dụng công cụ đó khi cần.

Viết tắt của repository, là thư mục dự án công khai trên GitHub, nơi đặt mã nguồn của công cụ để bất kỳ ai cũng xem và tải được.

Người dùng gói Claude theo tháng không nhìn thấy con số chi phí, nhưng token vẫn được đếm và quyết định thời điểm hết lượt sử dụng. Vì vậy việc tiết kiệm token quan trọng với cả người dùng gói tháng lẫn người dùng API.

## 2. Vì sao mỗi trang PDF bị tính hai lần

Đây là thông tin ít người biết, dù được ghi rõ trong tài liệu chính thức của Anthropic (công ty phát triển Claude). [1]

Khi nhận một file PDF, Claude không chỉ đọc phần chữ. Quy trình thực tế gồm ba bước:

- Claude biến từng trang PDF thành một tấm ảnh .
- Claude rút chữ của từng trang ra.
- Claude nhận cả hai , ảnh và chữ, cùng lúc cho mỗi trang.

Nguyên văn tài liệu của Anthropic ghi rằng hệ thống chuyển mỗi trang của tài liệu thành một ảnh, rồi phần chữ của trang đó được rút ra và đưa kèm theo ảnh. Tức là tài liệu được nạp vào dưới dạng chữ cộng ảnh. [1]

Cách xử lý này có lý do hợp lý: Nhờ có ảnh, Claude đọc được biểu đồ, sơ đồ, chữ ký và bảng vẽ phức tạp. Vấn đề nằm ở chỗ người dùng phải trả cho cả hai phần , kể cả khi tài liệu chỉ có chữ và phần ảnh không mang thêm thông tin nào.

### Minh hoạ bằng con số

Thành phần | Tốn bao nhiêu
Chữ của một trang | 1.500 đến 3.000 token, tuỳ mật độ chữ trên trang. Con số này lấy từ tài liệu Anthropic. [1]
Ảnh của một trang | Tính thêm ngoài phần chữ. Anthropic tính token ảnh theo kích thước ảnh, nên một trang A4 thường phát sinh thêm lượng token xấp xỉ phần chữ. [2]
Một tài liệu 20 trang | Riêng phần chữ đã là 30.000 đến 60.000 token. Cộng thêm ảnh của 20 trang, tổng số thường vượt 60.000 token trước khi người dùng đặt câu hỏi đầu tiên .

Với người xử lý tài liệu khách hàng hằng ngày (hợp đồng, báo cáo, hồ sơ, biên bản), đây là nguyên nhân chính khiến lượt dùng tiêu hao nhanh mà không rõ lý do. Tài liệu càng dày thì phần chi phí phát sinh từ ảnh càng lớn.

### Các giới hạn cần biết

Cũng theo tài liệu Anthropic, một yêu cầu gửi kèm PDF bị giới hạn 32 MB và tối đa 600 trang (chỉ 100 trang nếu bạn dùng model có cửa sổ ngữ cảnh nhỏ hơn 1 triệu token). Tài liệu cũng cảnh báo rằng PDF dày đặc, chữ nhỏ, bảng phức tạp, nhiều hình có thể làm tràn bộ nhớ ngữ cảnh trước khi chạm tới giới hạn số trang. [1]

Nói cách khác, không phải cứ dưới 600 trang là an toàn. Chuyển sang markdown là cách đơn giản nhất để nới rộng cả hai giới hạn này.

## 3. MarkItDown là gì và giải quyết được vấn đề gì

MarkItDown là công cụ mã nguồn mở, miễn phí, do Microsoft phát hành. Chức năng của công cụ gói gọn trong một câu: Nhận vào một file tài liệu và trả ra file markdown sạch để AI đọc. [3]

Repo của nó đang có hơn 180.000 sao trên GitHub (tính tới tháng 9/2026), thuộc nhóm những dự án được quan tâm nhất trong lĩnh vực xử lý tài liệu cho AI. [3]

Khi tài liệu đã ở dạng markdown, không còn trang nào để chuyển thành ảnh . Claude chỉ nhận phần chữ thuần, nên chi phí chỉ tính trên nội dung thật, không phát sinh thêm từ ảnh chụp lại chính nội dung đó.

### Các định dạng được hỗ trợ

Theo tài liệu của repo, MarkItDown xử lý được: PDF, Word, Excel, PowerPoint, ảnh (đọc thông tin EXIF và OCR), âm thanh (đọc EXIF và tạo bản ghi lời nói), HTML, các định dạng bảng biểu như CSV, JSON, XML, file ZIP, EPub, và cả link YouTube. [3]

- Tài liệu văn phòng: PDF, .docx , .xlsx , .pptx . Đây là nhóm định dạng được dùng nhiều nhất.
- Dữ liệu: CSV, JSON, XML. Bảng số liệu ra bảng markdown gọn gàng.
- Web và sách: HTML, EPub, và link YouTube (lấy phần transcript).
- File nén: Với một file ZIP, công cụ tự mở và chuyển đổi từng file bên trong.

### Quy trình tổng quan

Bước | Chuyện gì xảy ra
1. Tài liệu đầu vào | File PDF, Word hoặc Excel mà thông thường được kéo thẳng vào Claude.
2. MarkItDown chuyển nó | Một dòng lệnh biến nó thành markdown sạch. Tiêu đề, bảng, cấu trúc vẫn giữ nguyên.
3. Claude nhận chữ thuần | Không còn ảnh trang, không còn tính hai lần. Chỉ còn nội dung.
4. Chi phí giảm | Cùng tài liệu và cùng chất lượng câu trả lời, số token giảm rõ rệt.

## 4. Cài MarkItDown trong 5 phút

Phần này dành cho người chưa từng mở Terminal. Thực hiện lần lượt bốn bước dưới đây.

- Mở Terminal (Mac) hoặc Command Prompt (Windows).
- Dán dòng này rồi bấm Enter: pip install 'markitdown[all]'
- Dán dòng này để chuyển file đầu tiên: markitdown tailieu.pdf -o tailieu.md
- Kéo file .md vừa tạo vào Claude thay cho file PDF.

Phần bên dưới trình bày chi tiết từng bước và cách xử lý các lỗi thường gặp.

### Kiểm tra máy tính đã có Python chưa

Mở Terminal (Mac: Bấm Cmd + Space, gõ “terminal”, bấm Enter) hoặc Command Prompt (Windows: Bấm nút Windows, gõ “cmd”, bấm Enter). Dán dòng dưới đây vào rồi bấm Enter.

```
python3 --version
```

Nếu kết quả hiện ra một dòng dạng Python 3.12.1 , máy tính đã có sẵn Python, chuyển sang bước 2. Nếu hiện thông báo không tìm thấy lệnh, hãy truy cập python.org/downloads để tải bản mới nhất về cài. Trên Windows, khi cài cần tích vào ô “Add Python to PATH” ở màn hình đầu tiên, nếu bỏ qua thì bước sau sẽ báo lỗi.

Trên Windows, nếu lệnh python3 không chạy, hãy thử python --version .

### Cài MarkItDown bằng một dòng

Vẫn trong cửa sổ đó, dán dòng dưới đây rồi bấm Enter. Quá trình mất khoảng một phút và hiện ra nhiều dòng thông báo, đây là hiện tượng bình thường.

```
pip install 'markitdown[all]'
```

Trên Windows PowerShell, dấu nháy đơn không hoạt động, cần dùng dấu nháy kép:

```
pip install "markitdown[all]"
```

Phần [all] nghĩa là cài kèm mọi thành phần phụ để đọc được đủ loại file. Nếu chỉ cần một số định dạng nhất định, có thể chọn riêng để giảm dung lượng, ví dụ pip install 'markitdown[pdf, docx, pptx]' . Các nhóm có sẵn gồm pdf , docx , pptx , xlsx , xls , outlook , audio-transcription , youtube-transcription và vài nhóm cho dịch vụ Azure. [3]

Nếu xuất hiện thông báo lỗi chứa dòng externally-managed-environment , đây không phải sự cố của máy tính mà là cơ chế bảo vệ Python hệ thống của macOS. Cách xử lý đơn giản nhất là cài qua pipx , một công cụ chuyên dùng để cài ứng dụng Python an toàn. Chạy lần lượt hai lệnh brew install pipx và pipx install 'markitdown[all]' . Trường hợp máy chưa có Homebrew, xem hướng dẫn tại brew.sh .

### Chuyển file đầu tiên

Để không phải gõ đường dẫn dài: Gõ markitdown rồi một dấu cách, sau đó kéo file cần chuyển từ Finder hoặc File Explorer thả thẳng vào cửa sổ Terminal . Đường dẫn sẽ được điền tự động. Gõ tiếp -o và tên file kết quả.

```
markitdown tailieu.pdf -o tailieu.md
```

Dòng lệnh này có nghĩa: Lấy file tailieu.pdf và ghi kết quả ra file tailieu.md. Phần -o là viết tắt của output, chỉ nơi ghi kết quả.

Nếu không có thông báo lỗi nào, việc chuyển đổi đã thành công. File tailieu.md nằm cùng thư mục hiện tại và có thể mở bằng Notepad hoặc TextEdit để kiểm tra.

Cú pháp này không riêng cho PDF. Đổi đuôi file là chạy được với Word, Excel, PowerPoint, CSV, HTML và các định dạng khác trong danh sách phía trên, phần -o giữ nguyên.

```
markitdown baocao.xlsx -o baocao.md
markitdown ketoan.docx -o ketoan.md
```

### Kiểm tra kết quả trước khi sử dụng

Đây là bước thường bị bỏ qua nhưng rất cần thiết. Mở file .md vừa tạo và kiểm tra nhanh ba điểm sau:

- File có chữ hay không: Nếu file gần như trống, PDF gốc là bản scan. Cách xử lý được trình bày ở phần 8 .
- Bảng biểu có giữ được cấu trúc không: Bảng markdown hiển thị thành các dòng ngăn cách bằng dấu gạch dọc. Nếu số liệu bị gộp thành một khối, tài liệu gốc có bố cục phức tạp và nên cân nhắc cách xử lý khác.
- Tiếng Việt có đủ dấu không: Nếu chữ bị mất dấu hoặc hiện ký tự lạ, nguyên nhân nằm ở font trong PDF gốc chứ không phải lỗi của MarkItDown.

Chọn một tài liệu nhiều trang và thử hai lần trong hai cuộc trò chuyện riêng: Một lần kéo file PDF vào, một lần dán nội dung markdown vào, với cùng một câu hỏi. Tài liệu càng dày thì khác biệt càng rõ. Với người dùng API, Anthropic có sẵn công cụ đếm token để đo chính xác trước khi gửi. [4]

## 5. Những lệnh bạn sẽ dùng hằng ngày

Trong thực tế chỉ cần nhớ khoảng năm lệnh, tất cả đều có trong tài liệu chính thức của repo. [3]

### Ghi kết quả ra file

```
markitdown baocao.pdf -o baocao.md
markitdown baocao.pdf > baocao.md
```

Dòng thứ hai dùng dấu lớn hơn để ghi kết quả vào file. Cả hai cách cho kết quả như nhau.

### Xem nhanh mà không tạo file

Bỏ phần -o thì kết quả in thẳng ra màn hình. Cách này hữu ích khi chỉ cần kiểm tra nhanh xem file có đọc được hay không.

```
markitdown baocao.pdf
```

### Chuyển cả một thư mục trong một lần

Lệnh này hữu ích khi cần xử lý tài liệu theo lô. Nó duyệt qua mọi file PDF trong thư mục hiện tại và tạo file markdown tương ứng.

```
for f in *.pdf; do markitdown "$f" -o "${f%.pdf}.md"; done
```

Nếu không muốn gõ dòng lệnh trên, phần 7 có sẵn script thực hiện đúng việc này cho cả Mac và Windows, chỉ cần tải về và chạy.

### Bật OCR cho PDF scan

MarkItDown có thể sử dụng dịch vụ Azure Document Intelligence của Microsoft để đọc PDF scan. Dịch vụ này yêu cầu tài khoản Azure và có phí riêng, nên phần này dành cho người đã sử dụng Azure.

```
markitdown banscan.pdf -o banscan.md -d -e "<endpoint-cua-ban>"
```

### Xem các plugin đang có

MarkItDown cho phép cài thêm plugin, là các bản mở rộng do cộng đồng viết để hỗ trợ thêm những định dạng ít gặp.

```
markitdown --list-plugins
markitdown --use-plugins tailieu.pdf -o tailieu.md
```

MarkItDown cũng dùng được trong Python chỉ với ba dòng, phù hợp khi cần nhúng vào một quy trình tự động: from markitdown import MarkItDown , rồi md = MarkItDown() , rồi print(md.convert("baocao.xlsx").markdown) . [3]

## 6. Cài MCP server: Để Claude tự chuyển file

Phần này dành cho người dùng Claude Desktop hằng ngày. Microsoft phát hành một MCP server chính thức cho MarkItDown. Sau khi cài, Claude tự chuyển file sang markdown khi cần và người dùng không phải mở Terminal nữa. [5]

- Mở Terminal, dán pip install markitdown-mcp rồi bấm Enter.
- Mở Claude Desktop, vào Settings , chọn tab Developer , bấm Edit Config . Một file tên claude_desktop_config.json sẽ mở ra.
- Dán đoạn cấu hình bên dưới vào file đó rồi lưu lại (Cmd + S trên Mac, Ctrl + S trên Windows).
- Tắt hẳn Claude Desktop rồi mở lại. Bước này bắt buộc, không khởi động lại thì cấu hình chưa có tác dụng.
- Nhắn thử với Claude một câu như “Chuyển file này sang markdown” kèm đường dẫn file. Nếu Claude xin phép sử dụng công cụ, việc cài đặt đã thành công.

Vị trí file cấu hình nếu muốn mở trực tiếp: Mac nằm ở ~/Library/Application Support/Claude/ , Windows nằm ở %APPDATA%\Claude\ .

```
{
  "mcpServers": {
    "markitdown": {
      "command": "markitdown-mcp"
    }
  }
}
```

Không xoá nội dung cũ rồi dán đè. Nếu file đã có phần "mcpServers" với các công cụ khác, chỉ cần thêm khối "markitdown" vào bên trong và đặt dấu phẩy phân tách giữa các khối. Thiếu hoặc thừa một dấu phẩy sẽ khiến Claude không đọc được file, và thường không có thông báo lỗi rõ ràng.

### Chức năng của MCP server

MCP server cung cấp cho Claude đúng một công cụ tên convert_to_markdown , nhận vào một địa chỉ file và trả về markdown. Địa chỉ có thể là http: , https: , file: hoặc data: . [5] Nhờ đó Claude chuyển đổi được cả một trang web hoặc một file trên máy, không riêng PDF.

Sau khi cài MCP server, cần thay đổi thói quen thao tác. Thay vì kéo file PDF vào khung chat (khi đó Claude đã chuyển từng trang thành ảnh), hãy gửi đường dẫn file và yêu cầu Claude chuyển đổi trước. Kéo file trực tiếp sẽ quay lại đúng vấn đề cần tránh.

## 7. Script và prompt copy là dùng

Năm nội dung dưới đây copy thẳng từ trang này, khỏi phải gõ lại. Bấm Copy ở góc phải mỗi ô, dán vào đúng chỗ theo chú thích là xong.

### Bộ công cụ MarkItDown cho người mới

4 file Mac và Windows Không cần biết code

Gồm file cấu hình MCP dán thẳng vào Claude Desktop, hai script chuyển đổi cả thư mục (một cho Mac và Linux, một cho Windows), và một file hướng dẫn ngắn. Script tự tạo thư mục markdown bên trong thư mục nguồn và đặt kết quả vào đó, nên file gốc không bị thay đổi.

```
{
  "mcpServers": {
    "markitdown": {
      "command": "markitdown-mcp"
    }
  }
}
```

```
#!/usr/bin/env bash
# ------------------------------------------------------------
# Chuyen doi ca thu muc sang Markdown bang MarkItDown
# Danh cho Mac va Linux. Yeu cau: da cai markitdown truoc
#   pip install 'markitdown[all]'
#
# Cach dung trong Terminal:
#   bash chuyen-doi-ca-thu-muc.sh "/duong/dan/den/thu-muc"
# Bo trong duong dan thi script chay tren thu muc hien tai.
# Ket qua duoc dat trong thu muc con ten "markdown".
# File goc khong bi thay doi.
# ------------------------------------------------------------
set -uo pipefail

SRC="${1:-.}"

if [ ! -d "$SRC" ]; then
  echo "Khong tim thay thu muc: $SRC"
  exit 1
fi

OUT="$SRC/markdown"
mkdir -p "$OUT"

shopt -s nullglob nocaseglob

ok=0
fail=0

for f in "$SRC"/*.pdf "$SRC"/*.docx "$SRC"/*.pptx "$SRC"/*.xlsx "$SRC"/*.csv "$SRC"/*.html "$SRC"/*.epub; do
  base="$(basename "$f")"
  name="${base%.*}"
  echo "Dang chuyen: $base"
  if markitdown "$f" -o "$OUT/$name.md" 2>/dev/null; then
    ok=$((ok + 1))
  else
    echo "  Bo qua, khong doc duoc: $base"
    fail=$((fail + 1))
  fi
done

echo ""
echo "Xong. Thanh cong: $ok file. Bo qua: $fail file."
echo "Ket qua nam trong: $OUT"
echo "Luu y: File nao ra gan nhu trong thi ban goc la ban scan, can OCR."
```

```
@echo off
REM ------------------------------------------------------------
REM Chuyen doi ca thu muc sang Markdown bang MarkItDown
REM Danh cho Windows. Yeu cau: da cai markitdown truoc
REM   pip install "markitdown[all]"
REM
REM Cach dung de nhat: Keo-tha thu muc can chuyen vao file .bat nay.
REM Hoac chay trong Command Prompt:
REM   chuyen-doi-ca-thu-muc.bat "D:\Tai lieu\Hop dong"
REM
REM Ket qua duoc dat trong thu muc con ten "markdown".
REM File goc khong bi thay doi.
REM ------------------------------------------------------------
setlocal enabledelayedexpansion

set "SRC=%~1"
if "%SRC%"=="" set "SRC=%CD%"

if not exist "%SRC%\" (
  echo Khong tim thay thu muc: %SRC%
  pause
  exit /b 1
)

set "OUT=%SRC%\markdown"
if not exist "%OUT%" mkdir "%OUT%"

set /a OK=0
set /a FAIL=0

for %%E in (pdf docx pptx xlsx csv html epub) do (
  for %%F in ("%SRC%\*.%%E") do (
    echo Dang chuyen: %%~nxF
    markitdown "%%~fF" -o "%OUT%\%%~nF.md" 2>nul
    if errorlevel 1 (
      echo   Bo qua, khong doc duoc: %%~nxF
      set /a FAIL+=1
    ) else (
      set /a OK+=1
    )
  )
)

echo.
echo Xong. Thanh cong: !OK! file. Bo qua: !FAIL! file.
echo Ket qua nam trong: %OUT%
echo Luu y: File nao ra gan nhu trong thi ban goc la ban scan, can OCR.
pause
```

```
# Bộ công cụ MarkItDown cho người mới

Tài liệu kèm theo bài hướng dẫn của kênh Cường Mê AI.
Các file trong gói này do kênh soạn, không phải file gốc của Microsoft.
Bản gốc của MarkItDown: https://github.com/microsoft/markitdown

## Trong gói có gì

1. `claude-desktop/claude_desktop_config.json`
   Cấu hình để cắm MarkItDown vào Claude Desktop qua MCP.
2. `scripts/chuyen-doi-ca-thu-muc.sh`
   Script chuyển cả thư mục sang markdown, dùng cho Mac và Linux.
3. `scripts/chuyen-doi-ca-thu-muc.bat`
   Script tương tự, dùng cho Windows.
4. `prompt/doc-tai-lieu-markdown.txt`
   Prompt để nhờ Claude phân tích tài liệu sau khi đã chuyển đổi.

## Bước 1: Cài MarkItDown

Mở Terminal (Mac) hoặc Command Prompt (Windows), chạy:

    pip install 'markitdown[all]'

Trên Windows PowerShell dùng dấu nháy kép:

    pip install "markitdown[all]"

Nếu trên Mac báo lỗi externally-managed-environment, cài qua pipx:

    brew install pipx
    pipx install 'markitdown[all]'

## Bước 2: Chuyển thử một file

    markitdown tailieu.pdf -o tailieu.md

Mở file .md vừa tạo ra xem. Nếu gần như trống, file gốc là bản scan.

## Bước 3: Chuyển cả thư mục

Mac và Linux:

    bash scripts/chuyen-doi-ca-thu-muc.sh "/duong/dan/den/thu-muc"

Windows: Kéo thư mục cần chuyển thả vào file
`scripts/chuyen-doi-ca-thu-muc.bat`.

Kết quả nằm trong thư mục con tên `markdown`. File gốc không bị đụng tới.

## Bước 4: Cắm vào Claude Desktop (tuỳ chọn)

    pip install markitdown-mcp

Mở Claude Desktop, vào Settings, tab Developer, bấm Edit Config,
dán nội dung file `claude-desktop/claude_desktop_config.json` vào,
lưu lại, rồi tắt hẳn Claude Desktop và mở lại.

Nếu file cấu hình của bạn đã có mục mcpServers với công cụ khác,
chỉ thêm khối markitdown vào bên trong và nhớ dấu phẩy phân tách.

## Lưu ý quan trọng

- MarkItDown không tự đọc được PDF scan. Cần bật OCR qua Azure
  Document Intelligence, hoặc dùng cách khác cho nhóm file đó.
- Tài liệu mà thông tin nằm ở biểu đồ, sơ đồ, hình vẽ thì bản
  markdown sẽ mất phần đó. Trường hợp này nên giữ file gốc.
- Luôn mở file .md ra soát nhanh trước khi tin vào nội dung.
```

### Prompt đọc tài liệu sau khi chuyển đổi

1 prompt Dán là dùng

Prompt dành cho tài liệu dài sau khi đã chuyển đổi. Nội dung prompt buộc Claude trích dẫn đúng vị trí trong tài liệu và nêu rõ khi không tìm thấy thông tin, thay vì suy đoán.

```
Bạn là trợ lý đọc tài liệu. Dưới đây là một tài liệu đã được chuyển
sang markdown, nên phần chữ là chính xác nhưng hình ảnh, biểu đồ và
sơ đồ trong bản gốc đã không còn.

Hãy làm theo đúng thứ tự sau:

1. Tóm tắt tài liệu trong tối đa 8 gạch đầu dòng. Mỗi dòng một ý,
   viết bằng tiếng Việt đơn giản, không dùng từ chuyên môn nếu
   không cần thiết.

2. Liệt kê những con số, ngày tháng, tên riêng và điều khoản quan
   trọng. Với mỗi mục, ghi kèm tiêu đề của phần chứa nó trong tài
   liệu để tôi tra lại được.

3. Nêu tối đa 5 điểm cần chú ý: Chỗ nào có thể gây rủi ro, mâu
   thuẫn, hoặc diễn đạt mơ hồ.

4. Nêu những chỗ tài liệu nhắc tới hình ảnh, biểu đồ, bảng vẽ hoặc
   phụ lục mà nội dung không có trong phần chữ. Đây là những chỗ
   tôi cần mở lại bản gốc để xem.

Quy tắc bắt buộc:

- Chỉ dùng thông tin có trong tài liệu. Không suy đoán, không bổ
  sung kiến thức bên ngoài.
- Nếu tôi hỏi một điều mà tài liệu không nói, hãy trả lời thẳng:
  "Tài liệu không đề cập chuyện này."
- Khi trích một câu, trích nguyên văn và đặt trong ngoặc kép.
- Nếu phát hiện phần nội dung bị cắt hoặc lỗi định dạng, nói cho
  tôi biết ngay ở đầu câu trả lời.

Tài liệu bắt đầu từ đây:
```

Các file script và prompt ở trên do kênh Cường Mê AI biên soạn, không phải file gốc của Microsoft . Bản thân MarkItDown được cài bằng lệnh pip , tức lấy trực tiếp bản chính thức. Mã nguồn gốc luôn nằm tại kho mã nguồn trên GitHub , ai cũng xem được toàn bộ.

## 8. Khi nào MarkItDown không phù hợp

Phần này ít được đề cập nhưng rất quan trọng. Chuyển sang markdown là một sự đánh đổi: Bỏ phần hình ảnh để tiết kiệm token. Trong một số trường hợp, chính phần hình ảnh mới là thông tin cần thiết.

### Ba trường hợp nên giữ file gốc

- PDF là bản scan: Tức ảnh chụp hoặc bản quét của trang giấy. MarkItDown không có chữ để trích xuất nên file markdown gần như trống. Ngược lại, Claude đọc bản scan khá tốt chính vì nó xử lý được ảnh. Với nhóm file này, cần bổ sung OCR hoặc giữ nguyên bản gốc.
- Thông tin nằm ở biểu đồ, sơ đồ, hình vẽ: Báo cáo tài chính có đồ thị, bản vẽ kỹ thuật, sơ đồ quy trình. Phần chữ chỉ chứa một phần thông tin, phần còn lại nằm trong hình, và chuyển sang markdown sẽ mất phần hình.
- Bố cục quyết định ý nghĩa: Biểu mẫu nhiều ô, hoá đơn, bảng lồng bảng, tài liệu hai cột. Khi bố cục bị làm phẳng thành chữ, thứ tự đọc có thể lệch và số liệu dễ ghép sai chỗ.

Với tài liệu quan trọng (hợp đồng, hồ sơ pháp lý, báo cáo có số liệu), luôn mở file markdown kiểm tra trước khi đưa cho AI . Một phút kiểm tra tốt hơn một câu trả lời sai không rõ nguyên nhân. Dù chất lượng chuyển đổi tốt đến đâu, các quyết định quan trọng vẫn cần đối chiếu lại bản gốc.

### Phương án dung hoà

Không nhất thiết phải chọn một trong hai. Với tài liệu vừa nhiều chữ vừa có hình, có thể làm như sau:

- Chuyển sang markdown để Claude đọc toàn bộ phần chữ với chi phí thấp.
- Đặt câu hỏi và làm việc chủ yếu trên bản markdown.
- Khi cần đúng một biểu đồ hoặc một trang cụ thể, chỉ cắt riêng trang đó để gửi kèm. Chi phí khi đó chỉ tính cho một ảnh thay vì hai mươi ảnh.

## 9. Thói quen giúp tiết kiệm lượt dùng lâu dài

- Từ vài trang trở lên nên chuyển đổi: Với file một hai trang, khác biệt không đáng kể. Từ khoảng năm trang trở lên, chi phí phát sinh từ ảnh bắt đầu rõ rệt. Hợp đồng, báo cáo và hồ sơ dài là nhóm tiết kiệm được nhiều nhất.
- Đưa việc chuyển đổi thành bước cố định: Nếu công việc hằng ngày là xử lý tài liệu khách hàng, không nên chuyển từng file khi cần. Chạy script chuyển cả thư mục một lần vào đầu ngày.
- Giữ lại file markdown: File nhẹ, tìm kiếm được bằng công cụ tìm kiếm của máy tính và dùng lại cho những lần sau mà không phải chuyển đổi lại.
- Cắt bớt phần không cần thiết: File markdown là chữ thuần nên việc xoá vài chương không liên quan chỉ mất vài giây, điều không làm được với PDF. Đây là khoản tiết kiệm ít người để ý.
- Chia nhỏ tài liệu quá dài: Tài liệu của Anthropic cũng khuyến nghị chia tài liệu lớn thành từng phần thay vì nạp toàn bộ một lần. [1] Với markdown, việc chia theo chương rất dễ thực hiện.
- Dùng MCP server nếu làm việc thường xuyên trong Claude Desktop: Cài một lần và dùng lâu dài, chỉ cần nhớ gửi đường dẫn thay vì kéo file vào khung chat.

## 10. Câu hỏi thường gặp

Với tài liệu chủ yếu là chữ, kết quả thường tốt hơn. Tiêu đề và bảng giữ nguyên cấu trúc nên Claude nắm được mạch tài liệu rõ hơn so với phần chữ được trích xuất thiếu trật tự từ PDF.

Ngược lại, nếu thông tin cần tìm nằm ở biểu đồ hoặc hình vẽ thì câu trả lời sẽ kém hơn vì phần đó không còn trong bản markdown. Xem phần 8 để biết khi nào nên giữ bản gốc.

Có. MarkItDown là mã nguồn mở do Microsoft phát hành trên GitHub, hiện có hơn 180.000 sao. [3] Công cụ chạy trực tiếp trên máy tính và không gửi tài liệu đi đâu.

Ngoại lệ duy nhất: Nếu bật tính năng OCR qua Azure Document Intelligence hoặc dùng AI để mô tả ảnh, các dịch vụ đó có phí riêng. Phần cơ bản trong tài liệu này hoàn toàn miễn phí.

Không. Việc chuyển đổi diễn ra hoàn toàn trên máy tính của người dùng. Đây cũng là một ưu điểm khi làm việc với tài liệu khách hàng: Có thể đọc bản markdown trước, lọc bỏ phần không muốn chia sẻ rồi mới đưa cho AI.

Ngoại lệ: Nếu chủ động bật OCR qua Azure hoặc dùng AI mô tả ảnh, khi đó dữ liệu mới được gửi tới dịch vụ tương ứng.

Không bắt buộc. Một dòng lệnh ở phần 4 là đủ dùng. MCP server chỉ giúp Claude Desktop tự thực hiện việc chuyển đổi, thuận tiện cho người dùng hằng ngày.

Thử lần lượt ba cách sau. Thứ nhất, đóng hẳn Terminal rồi mở lại, vì lệnh mới cài đôi khi cần một cửa sổ mới. Thứ hai, gọi qua Python bằng lệnh python3 -m markitdown tailieu.pdf -o tailieu.md . Thứ ba, trên Windows cần kiểm tra lại xem lúc cài Python đã tích ô “Add Python to PATH” chưa, nếu chưa thì cài lại và tích vào ô này.

Có, với điều kiện PDF gốc chứa chữ thật và dùng font chuẩn. Nếu bản markdown bị mất dấu hoặc hiện ký tự lạ, nguyên nhân gần như luôn nằm ở cách file PDF được tạo ra chứ không phải ở MarkItDown. Cách kiểm tra: Mở PDF gốc, bôi đen một đoạn rồi dán sang Notepad, nếu chữ dán ra cũng lỗi thì file gốc đã lỗi từ đầu.

Cách xử lý chữ kết hợp ảnh mà tài liệu Anthropic đề cập chỉ áp dụng cho tài liệu dạng PDF. [1] Dù vậy, chuyển Word hoặc Excel sang markdown vẫn có lợi: Bảng biểu gọn gàng hơn, dễ xoá phần không cần thiết và Claude đọc cấu trúc rõ hơn. Với file Excel nhiều sheet, markdown giúp nhận ra ngay phần nào cần gửi và phần nào nên bỏ.

## 11. Tóm tắt nhanh

Việc | Nội dung
Vấn đề | Claude chuyển mỗi trang PDF thành ảnh và trích xuất chữ, người dùng trả cho cả hai phần. Riêng phần chữ đã 1.500 đến 3.000 token mỗi trang. [1]
Cách gỡ | MarkItDown, miễn phí, của Microsoft, hơn 180.000 sao trên GitHub. [3]
Cài một dòng | pip install 'markitdown[all]' rồi markitdown file.pdf -o file.md
Tự động hoá | pip install markitdown-mcp cộng một khối cấu hình, Claude Desktop tự chuyển file. [5]
Lợi ích | Ảnh của trang không còn, cấu trúc tài liệu giữ nguyên, chi phí chỉ tính trên phần nội dung.
Lưu ý | PDF bản scan và tài liệu nhiều biểu đồ nên giữ bản gốc, hoặc gửi kèm riêng đúng trang cần dùng.

Việc kéo thẳng PDF vào Claude đồng nghĩa với trả thêm chi phí ảnh cho từng trang mà ít người để ý. Chỉ cần chuyển đổi một lần, một tài liệu 60.000 token giảm xuống còn một phần nhỏ của con số đó, với cùng tài liệu và cùng chất lượng câu trả lời.

Đăng ký sớm

## Khoá học AI của mình sắp mở

Để lại email, mình báo trước ngày mở đăng ký và giữ mức giảm 20% cho người đăng ký sớm.

Miễn phí · Không spam · Huỷ bất cứ lúc nào

Xong rồi, cảm ơn bạn. Mình sẽ báo ngay khi mở đăng ký.

- Anthropic, tài liệu chính thức: PDF support . Nguồn của cách xử lý chữ cộng ảnh, mức 1.500 đến 3.000 token mỗi trang, giới hạn 32 MB và 600 trang.
- Anthropic, tài liệu chính thức: Vision, cách tính token cho ảnh .
- Microsoft, repo gốc của MarkItDown trên GitHub, kho mã nguồn trên GitHub . Nguồn của số sao, danh sách định dạng, các lệnh và nhóm cài đặt.
- Anthropic, tài liệu chính thức: Token counting , công cụ đếm token trước khi gửi.
- Microsoft, gói MCP server chính thức, markitdown-mcp . Nguồn của lệnh cài MCP server, khối cấu hình Claude Desktop và công cụ convert_to_markdown.
