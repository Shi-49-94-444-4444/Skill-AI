# Skill-AI

Dashboard tĩnh cho workbook 'Skill AI.xlsx'. Mã nguồn chạy trên nhánh main; workbook được đồng bộ riêng trên nhánh skill-sheet.

## Luồng dữ liệu

index.html tải Skill AI.xlsx từ raw GitHub URL được tạo bởi dashboard-config.js. excel-data-loader.js nhận diện sheet 'Thư viện chính', ánh xạ sáu cột nguồn và tạo chỉ mục tìm kiếm trước khi giao cho giao diện.

Header nguồn được giữ nguyên:

| Nguồn Excel | Trường giao diện |
| --- | --- |
| Lệnh/Skill | Skill |
| Mô tả | Mô tả |
| Dùng khi | Dùng khi |
| Cách dùng | Cách dùng |
| Category | Category |
| Lĩnh vực | Lĩnh vực |

Tìm kiếm không dấu được trên Skill, Mô tả, Dùng khi. Các record trùng tên vẫn được giữ lại vì chúng là các biến thể theo nền tảng/category; khóa hiển thị dùng tên sheet và số dòng Excel.

## Chạy cục bộ

Đặt workbook cạnh index.html để test cục bộ. Workbook bị .gitignore để không vô tình đưa lên nhánh main. Có thể dùng một static server bất kỳ; không có bước build.

## Cập nhật dữ liệu

1. Giữ mã nguồn trên main.
2. Đặt Skill AI.xlsx trên nhánh skill-sheet.
3. Chạy 08 - Start Auto Sync Skill AI to GitHub.bat nếu muốn tự đồng bộ file workbook từ thư mục local.
4. Dừng bằng 09 - Stop Auto Sync Skill AI to GitHub.bat.

Nếu owner GitHub khác Shi-49-94-444-4444, sửa repositoryOwner trong dashboard-config.js và URL trong github_excel_sync.ps1.

