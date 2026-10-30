# Source: https://cuongmeai.com/tai-lieu/prompts-chat-kho-prompt-mien-phi


Ai mới dùng AI cũng gặp cảnh này: Mở ChatGPT hay Claude lên, nhìn ô chat trống, rồi không biết gõ gì cho ra kết quả tử tế. prompts.chat sinh ra để giải đúng chuyện đó. Đây là một thư viện câu lệnh mẫu khổng lồ, miễn phí, do cộng đồng góp vào suốt gần 4 năm.

Tài liệu này không chỉ giới thiệu trang web. Bạn sẽ biết: Cách tìm đúng prompt trong hơn 2.000 cái, cách sửa một prompt tiếng Anh thành câu lệnh tiếng Việt hợp với việc của mình, cách tải cả kho về máy, và cách nối thẳng prompts.chat vào Claude Code hay ứng dụng AI khác để khỏi phải mở trình duyệt mỗi lần cần.

## prompts.chat là gì?

prompts.chat là thư viện prompt mã nguồn mở lớn nhất hiện nay , do lập trình viên người Thổ Nhĩ Kỳ Fatih Kadir Akın (tài khoản GitHub f ) lập ra từ tháng 12/2022, khi đó mang tên Awesome ChatGPT Prompts . Sau này dự án đổi tên thành prompts.chat vì các prompt dùng được với mọi trợ lý AI, không riêng ChatGPT. [2]

Số prompt là số dòng trong file dữ liệu chính thức prompts.csv mình đếm ngày 02/10/2026; số sao lấy từ trang GitHub cùng ngày. [3]

### Vì sao nên biết tới nó

- Khỏi nghĩ từ con số không: Cần một trợ lý phỏng vấn, một người sửa văn, một chuyên gia Excel, bạn tìm thấy câu lệnh có sẵn và chỉnh lại trong 2 phút.
- Học cách viết prompt: Đọc vài chục prompt tốt là bạn tự thấy công thức, thay vì học lý thuyết suông.
- Giấy phép rộng rãi: Phần dữ liệu prompt theo giấy phép CC0 , tức là hiến cho cộng đồng, bạn copy, sửa, đưa vào sản phẩm bán tiền cũng được, không phải xin phép. Phần mã nguồn trang web theo giấy phép MIT. [2]
- Được giới công nghệ công nhận: Hai nhà đồng sáng lập OpenAI từng chia sẻ dự án này, repo nằm trong nhóm được GitHub giới thiệu, và được Harvard, Columbia dẫn lại trong tài liệu hướng dẫn dùng AI. [2]

### Trang web có những mục nào?

Mục trên thanh menu | Để làm gì
Prompts | Kho câu lệnh chính. Đây là nơi bạn sẽ ở lại lâu nhất.
Skills | Gói kỹ năng cho các công cụ lập trình AI, dạng nâng cao hơn một câu lệnh đơn lẻ.
Workflows | Chuỗi nhiều bước nối nhau, ví dụ nghiên cứu rồi viết bài rồi kiểm tra lại.
Categories và Tags | Lọc theo nhóm nghề hoặc theo nhãn (viết lách, lập trình, học tập, hình ảnh...).
Taste | Gợi ý prompt hợp gu bạn sau khi bạn thích hoặc lưu vài cái.
Promptmasters | Bảng vinh danh người đóng góp nhiều prompt hay.
For Kids | Trò chơi dạy trẻ 8 đến 14 tuổi cách ra lệnh cho AI.
Create Prompt | Nút đăng prompt của chính bạn (cần đăng nhập).

Bạn chỉ cần đăng nhập khi muốn lưu prompt yêu thích , tạo bộ sưu tập riêng, hoặc đăng prompt của mình . Việc đọc, tìm và copy thì mở ra là dùng ngay.

## Prompt là gì? Đọc một prompt sao cho hiểu

Prompt là câu lệnh bạn gõ cho AI. Hiểu nôm na: Nó giống tờ đề bài bạn giao cho một người thực tập rất giỏi nhưng chưa biết gì về bạn. Đề bài càng rõ, kết quả càng đúng ý.

Prompt trên prompts.chat hầu hết viết theo kiểu giao vai : Bạn bảo AI đóng vai một người có nghề, nói rõ nó phải làm gì và không được làm gì. Một prompt tốt thường có đủ 5 miếng ghép dưới đây.

Miếng ghép | Ý nghĩa | Ví dụ
Vai | AI đóng vai ai | "Bạn là biên tập viên tiếng Việt 10 năm kinh nghiệm"
Việc | Làm gì, với cái gì | "Sửa lại đoạn văn mình gửi cho gãy gọn hơn"
Bối cảnh | Cho ai đọc, dùng ở đâu | "Bài đăng Facebook cho chủ shop quần áo"
Khuôn kết quả | Dạng trả lời mong muốn | "Trả về 3 phương án, mỗi phương án dưới 60 chữ"
Giới hạn | Điều cấm hoặc bắt buộc | "Không dùng từ Hán Việt nặng nề, không thêm hashtag"

Đa số prompt mở đầu bằng "I want you to act as..." (mình muốn bạn đóng vai...). Bạn chỉ cần nhìn 2 chỗ: Vai là gì và câu đầu tiên bạn phải gửi kèm (thường nằm ở cuối, kiểu "My first request is..."). Hai chỗ đó quyết định kết quả, phần còn lại là mô tả thêm.

## Dùng trang web: Tìm, lọc, copy, thử

### Mở kho prompt và tìm theo việc bạn cần

Mở prompts.chat/prompts . Gõ vào ô tìm kiếm tên công việc bằng tiếng Anh , vì kho chủ yếu là tiếng Anh. Vài từ khoá hay dùng:

Bạn cần | Gõ thử từ khoá
Sửa và nâng cấp câu chữ | translator , editor , copywriter
Luyện phỏng vấn xin việc | interviewer , recruiter
Học tiếng Anh | english teacher , pronunciation
Việc văn phòng, Excel | excel , assistant
Lập trình | code review , developer , debug
Tạo ảnh | midjourney , image

Không biết gõ gì thì vào Categories hoặc Tags rồi bấm nhóm phù hợp, trang sẽ lọc sẵn danh sách cho bạn.

### Copy prompt bạn ưng

Bấm vào một prompt để mở trang chi tiết, rồi bấm nút copy trên thẻ prompt đó. Nội dung vào bộ nhớ tạm của máy, bạn dán thẳng vào ô chat của ChatGPT, Claude hay Gemini.

Mỗi prompt còn có nút mở thẳng sang công cụ AI để thử ngay. Tiện khi bạn muốn xem kết quả trước khi quyết định có dùng lâu dài không.

### Thử với một việc thật, đừng thử bằng câu hỏi chơi

Lần thử đầu tiên, hãy lấy một việc thật bạn đang phải làm : Một email khó viết, một đoạn mô tả sản phẩm, một bài tập của con. Prompt chỉ lộ ra hay hay dở khi gặp dữ liệu thật của bạn.

Ai cũng đăng prompt lên được, nên chất lượng không đều. Có prompt viết từ năm 2022, cách nói chuyện đã cũ so với các model bây giờ. Hãy xem prompt như bản nháp để sửa , không phải công thức thần thánh. Và tuyệt đối không dán dữ liệu nhạy cảm (số căn cước, thông tin khách hàng, mật khẩu) vào bất kỳ prompt nào.

## Sửa prompt cho đúng việc của bạn

Đây là phần nhiều người bỏ qua rồi chê "prompt trên mạng không hiệu quả". Chép nguyên si một prompt tiếng Anh về việc của người khác thì kết quả chung chung là đương nhiên. Làm theo 3 bước dưới đây.

### Dán prompt vào và nhờ chính AI dịch, chỉnh hộ

Cách nhanh nhất cho người không giỏi tiếng Anh: Dán prompt gốc vào ChatGPT hoặc Claude kèm câu dưới đây.

```
Đây là một prompt tiếng Anh mình lấy từ thư viện prompts.chat. Hãy dịch sang tiếng Việt tự nhiên, giữ nguyên ý, rồi chỉnh lại cho đúng việc của mình: [mô tả việc của bạn, ví dụ: Viết mô tả sản phẩm cho shop mỹ phẩm handmade, khách hàng là nữ 25 đến 35 tuổi]. Sau khi chỉnh xong, giải thích ngắn gọn bạn đã đổi những gì và vì sao.

[Dán prompt gốc vào đây]
```

### Thêm bối cảnh của riêng bạn

Ghép thêm 3 câu này vào cuối prompt, kết quả khác hẳn:

- Người đọc là ai: "Người đọc là chủ shop nhỏ, không rành kỹ thuật."
- Giọng văn: "Viết giọng thân mật, xưng mình và bạn, không dùng từ chuyên ngành."
- Khuôn kết quả: "Trả về đúng 3 phương án, mỗi phương án tối đa 60 chữ, không thêm lời dẫn."

### Lưu lại bản đã sửa thành bộ của riêng mình

Prompt chỉnh xong mà không lưu thì lần sau lại làm từ đầu. Ba cách lưu, chọn cái nào cũng được:

- Tạo một file ghi chú (Notes, Google Keep, Notion) tên "Prompt của mình", mỗi prompt một mục.
- Đăng nhập prompts.chat rồi bấm lưu để tạo bộ sưu tập ngay trên trang.
- Nếu dùng Claude, nhắn: "Nhớ giúp mình prompt này để lần sau mình gọi lại nhé."

Thêm một câu vào cuối prompt: "Trước khi bắt đầu, hãy hỏi mình tối đa 3 câu để làm rõ yêu cầu." Chỉ một dòng này thôi mà kết quả sát ý hơn hẳn, vì AI không phải đoán mò.

## Lấy cả kho prompt về máy

Bạn không bắt buộc phải mở trình duyệt mỗi lần cần prompt. Dự án phát hành toàn bộ dữ liệu công khai, có 4 đường lấy.

Cách lấy | Hợp với ai | Lấy ở đâu
File CSV (mở được bằng Excel, Google Sheets) | Người thích lọc, sắp xếp, lưu trữ | prompts.csv trên GitHub
File PROMPTS.md (một trang chữ dài) | Người muốn đọc lướt hoặc tìm bằng Ctrl+F | PROMPTS.md
Bộ dữ liệu Hugging Face | Người làm kỹ thuật, muốn nạp vào chương trình | Dataset fka/prompts.chat
Công cụ dòng lệnh (CLI) | Người quen dùng Terminal | Gõ npx prompts.chat
- Mở trang file prompts.csv .
- Bấm nút Download raw file (biểu tượng mũi tên tải xuống, góc trên bên phải khung file).
- Mở file vừa tải bằng Excel hoặc Google Sheets. Mỗi dòng là một prompt, cột act là tên vai, cột prompt là nội dung.
- Nếu mở ra bị lỗi chữ tiếng Anh dính nhau, trong Excel chọn Data → From Text/CSV rồi chọn mã hoá UTF-8 .

File nặng khoảng 5,7 MB và có hơn 2.000 dòng, mở trên điện thoại sẽ chậm. Nên mở trên máy tính.

- Cài Node.js bản LTS nếu máy chưa có. Node.js là nền chạy cho nhiều công cụ dòng lệnh, cài một lần rồi thôi.
- Mở Terminal (máy Mac) hoặc PowerShell (máy Windows).
- Gõ lệnh dưới đây rồi Enter, công cụ sẽ hiện giao diện tìm prompt ngay trong cửa sổ dòng lệnh.

```
npx prompts.chat
```

## Cài plugin prompts.chat cho Claude Code

Nếu bạn dùng Claude Code (phiên bản Claude chuyên để lập trình, chạy trong cửa sổ dòng lệnh), dự án có sẵn một plugin chính thức. Plugin là gói cài thêm, giống cài app cho điện thoại. Cài xong, bạn tìm prompt ngay trong lúc làm việc, khỏi mở trình duyệt. [4]

- Mở Claude Code (gõ claude trong Terminal).
- Dán lệnh thứ nhất để thêm "chợ" plugin, Enter.
- Dán lệnh thứ hai để cài plugin, Enter.
- Thoát hẳn Claude Code ( /exit ) rồi mở lại, vì plugin chỉ nạp lúc khởi động.

```
/plugin marketplace add f/prompts.chat
/plugin install
[email protected]
```

### Cài xong thì gõ gì?

Lệnh | Tác dụng
/prompts.chat:prompts code review | Tìm prompt về rà soát code
/prompts.chat:prompts writing assistant --category writing | Tìm prompt viết lách, lọc theo nhóm
/prompts.chat:prompts midjourney --type IMAGE | Chỉ lấy prompt tạo ảnh
/prompts.chat:skills testing automation | Tìm gói kỹ năng về kiểm thử tự động

Phần sau dấu -- là bộ lọc thêm: --category theo nhóm, --tag theo nhãn, --type theo loại (chữ hay ảnh). Nguồn: Tài liệu plugin chính thức. [4]

## Nối prompts.chat vào app AI qua MCP

MCP là chuẩn kết nối giúp một ứng dụng AI gọi được dữ liệu hoặc công cụ bên ngoài. Hiểu nôm na: Giống cổng USB, cắm vào là app AI của bạn "nhìn thấy" cả kho prompt và tự tìm giúp bạn, không cần bạn copy thủ công nữa.

- Mở phần cài đặt kết nối MCP của ứng dụng bạn dùng (Claude Desktop, Cursor, Windsurf... mỗi app một chỗ, thường nằm trong Settings, mục MCP hoặc Connectors).
- Dán đoạn cấu hình bên dưới vào. Đây là bản từ xa , không cần cài gì thêm vào máy.
- Lưu lại rồi khởi động lại ứng dụng.
- Thử nhắn: "Tìm giúp mình prompt viết email xin việc trên prompts.chat."

```
{
  "mcpServers": {
    "prompts.chat": {
      "url": "https://prompts.chat/api/mcp"
    }
  }
}
```

Muốn chạy ngay trên máy mình (không gọi ra mạng mỗi lần) thì thay phần url bằng "command": "npx", "args": ["-y", "prompts.chat", "mcp"] . Cách này cần Node.js. [5]

Mỗi kết nối MCP bật thêm đều chiếm chỗ trong "bộ nhớ ngắn hạn" của AI, khiến nó chậm và tốn lượt dùng hơn. Bật cái nào bạn thật sự xài, chưa cần thì tắt đi.

## Bộ prompt khởi động tiếng Việt

Kho gốc gần như toàn tiếng Anh và viết cho người dùng nước ngoài. Mình soạn sẵn một bộ prompt tiếng Việt theo đúng công thức 5 miếng ghép ở phần 2, viết chi tiết như prompt chuyên nghiệp trong kho gốc (trung bình mỗi prompt ở đó dài khoảng 2.500 ký tự, chia rõ phần việc, khuôn kết quả và giới hạn), nhưng đặt trong bối cảnh công việc ở Việt Nam.

Mỗi prompt đều có sẵn chỗ [ngoặc vuông] để bạn điền thông tin, và đều kết bằng dòng "hãy hỏi mình tối đa 3 câu" để AI làm rõ trước khi làm. Bảng dưới đây giúp bạn chọn nhanh prompt cần dùng.

Prompt | Dùng khi nào | Bạn cần điền | Nhận lại được gì
1. Biên tập câu chữ | Viết xong một đoạn thấy lủng củng, dài dòng | Nơi đăng, người đọc, mục tiêu của đoạn văn | Bản gọn nhất, bản giữ giọng gốc, bảng 5 câu sửa nhiều nhất, 3 lỗi bạn hay mắc
2. Email công việc | Email khó: Xin lùi hạn, từ chối, đòi nợ, xin lỗi khách | Quan hệ với người nhận, mục đích, thông tin bắt buộc, điều muốn tránh | Hai bản (trang trọng và thân mật) kèm gợi ý nên chọn bản nào
3. Bài đăng mạng xã hội | Cần nội dung cho Facebook, TikTok, Threads | Ngành hàng, khách hàng, chủ đề, mục tiêu, điều không được nói | Ba bài theo ba hướng khác nhau, mỗi bài có câu mở, lời mời hành động, gợi ý hình ảnh
4. Tóm tắt tài liệu dài | Nhận hợp đồng, báo cáo, nghiên cứu dài | Loại tài liệu, bạn đọc để quyết định việc gì, điều bạn lo nhất | Tóm tắt 5 dòng, số liệu quan trọng kèm vị trí, câu nên hỏi lại, điều tài liệu né tránh
5. Học tiếng Anh qua việc thật | Vừa cần hiểu tài liệu tiếng Anh vừa muốn học được từ | Trình độ, nghề của bạn, mục tiêu học | Bản dịch, 5 từ đáng học đặt trong tình huống nghề bạn, 2 cấu trúc câu, và 3 câu hỏi để bạn tập trả lời
6. Lên kế hoạch công việc | Có mục tiêu nhưng chưa biết bắt đầu từ đâu | Mục tiêu, hạn chót, nguồn lực, ràng buộc | Mục tiêu viết lại cho đo đếm được, các mốc theo tuần, việc nên làm trong 30 phút tới, 3 rủi ro, 2 việc nên bỏ
7. Phản biện ý tưởng | Trước khi dồn tiền và thời gian vào một ý tưởng | Mô tả ý tưởng, khách hàng nhắm tới, thứ bạn sẽ bỏ ra | Giả định chưa kiểm chứng kèm cách kiểm chứng rẻ, 5 điểm yếu, 3 câu hỏi khó, và thử nghiệm nhỏ nhất nên làm
8. Biến prompt tiếng Anh thành của mình | Lấy một prompt bất kỳ trên prompts.chat về dùng | Việc bạn cần làm, công cụ đang dùng, độ dài kết quả mong muốn | Prompt tiếng Việt viết lại đủ 5 phần, bảng giải thích đã sửa gì, và dữ liệu mẫu để chạy thử

Dưới đây là 8 prompt tiếng Việt viết đầy đủ theo khuôn 5 phần (vai trò, bối cảnh, việc cần làm, khuôn kết quả, giới hạn), mỗi prompt có sẵn chỗ điền thông tin của bạn. Bên dưới là đoạn mcp.json để nối prompts.chat vào ứng dụng AI. Bấm nút Copy ở từng ô rồi dán thẳng vào chỗ cần dùng.

```
BỘ 8 PROMPT TIẾNG VIỆT (Cường Mê AI)
Dùng cho ChatGPT, Claude, Gemini và hầu hết trợ lý AI.
Phiên bản 2, cập nhật 02/10/2026.

CÁCH DÙNG
1. Copy nguyên một khối (từ dòng "VAI TRÒ" tới hết khối đó).
2. Dán vào ô chat.
3. Thay mọi chỗ trong [ngoặc vuông] bằng thông tin của bạn.
   Chỗ nào không có thông tin thì ghi "chưa có", AI sẽ hỏi lại.
4. Gửi. Nếu AI hỏi lại, cứ trả lời ngắn gọn rồi bảo nó làm tiếp.

MẸO CHUNG
- Mỗi prompt là một "đề bài", không phải câu hỏi. Càng rõ càng tốt.
- Muốn đổi giọng văn, sửa thẳng ở mục GIỌNG VÀ GIỚI HẠN.
- Muốn kết quả ngắn hơn, sửa con số ở mục KHUÔN KẾT QUẢ.
- Prompt nào cũng có dòng "hỏi lại tối đa 3 câu". Đừng xoá dòng đó,
  nó là thứ giúp kết quả sát ý bạn nhất.

==========================================================
PROMPT 1. BIÊN TẬP CÂU CHỮ TIẾNG VIỆT
Dùng khi: Viết xong một đoạn mà thấy lủng củng, dài dòng.
==========================================================
VAI TRÒ
Bạn là biên tập viên tiếng Việt 10 năm kinh nghiệm, quen biên tập
cho người đọc phổ thông. Bạn trọng sự rõ ràng hơn sự hoa mỹ.

BỐI CẢNH
- Đoạn văn này sẽ đăng ở: [ví dụ: Bài blog công ty / email gửi khách
  / caption Facebook / báo cáo nội bộ]
- Người đọc: [ví dụ: Chủ shop nhỏ, không rành kỹ thuật]
- Mục tiêu của đoạn văn: [ví dụ: Thuyết phục khách đăng ký dùng thử]

VIỆC CẦN LÀM
1. Đọc đoạn văn mình gửi ở cuối.
2. Sửa lại theo nguyên tắc: Giữ nguyên ý, bỏ từ thừa, tách câu dài
   quá 25 chữ, đổi câu bị động thành câu chủ động, thay từ Hán Việt
   nặng nề bằng từ đời thường.
3. Không thêm ý mới. Nếu thấy chỗ nào thiếu thông tin quan trọng,
   ghi chú ở cuối chứ đừng tự bịa ra.

KHUÔN KẾT QUẢ
Trả về đúng 4 phần, theo thứ tự:
A. BẢN GỌN: Bản sửa ngắn nhất có thể mà vẫn đủ ý.
B. BẢN GIỮ GIỌNG: Bản sửa nhẹ tay hơn, giữ cách nói của mình.
C. BẢNG SO SÁNH: 5 câu bị sửa nhiều nhất, mỗi dòng ghi "câu gốc →
   câu mới → lý do sửa" trong một dòng ngắn.
D. LỖI LẶP LẠI: 3 lỗi mình hay mắc nhất và cách tự sửa lần sau.

GIỌNG VÀ GIỚI HẠN
- Xưng hô giữ nguyên như bản gốc.
- Không thêm lời khen, không mở đầu bằng "Chắc chắn rồi".
- Không dùng dấu gạch dài, không chèn emoji.

Trước khi làm, nếu thiếu thông tin thì hỏi mình tối đa 3 câu.

ĐOẠN VĂN CỦA MÌNH:
[Dán vào đây]

==========================================================
PROMPT 2. VIẾT EMAIL CÔNG VIỆC
Dùng khi: Cần gửi một email khó, sợ viết hớ hoặc viết dài.
==========================================================
VAI TRÒ
Bạn là trợ lý hành chính nhiều kinh nghiệm, soạn email tiếng Việt
chuẩn mực cho môi trường công sở Việt Nam.

BỐI CẢNH
- Người gửi: [tên, chức danh của bạn]
- Người nhận: [chức danh và quan hệ, ví dụ: Sếp trực tiếp / khách
  hàng lâu năm / đối tác mới gặp một lần]
- Mục đích email: [ví dụ: Xin lùi hạn bàn giao 3 ngày]
- Những thông tin bắt buộc phải có: [liệt kê, ví dụ: Lý do, ngày
  mới, phương án bù đắp]
- Điều mình muốn tránh: [ví dụ: Không muốn nghe như đang đổ lỗi]

VIỆC CẦN LÀM
Viết email hoàn chỉnh, có tiêu đề. Mở đầu đi thẳng vào việc trong
2 câu đầu. Thân email chia đoạn ngắn, mỗi đoạn một ý. Kết bằng một
đề nghị cụ thể (mốc thời gian, việc người nhận cần làm).

KHUÔN KẾT QUẢ
Trả về 2 phương án:
- PHƯƠNG ÁN A: Trang trọng, hợp với sếp hoặc khách mới.
- PHƯƠNG ÁN B: Thân mật vừa phải, hợp với đồng nghiệp quen.
Sau 2 phương án, thêm mục "NÊN CHỌN": 2 dòng nói phương án nào hợp
hơn trong tình huống này và vì sao.

GIỌNG VÀ GIỚI HẠN
- Tối đa 150 chữ mỗi email.
- Không dùng từ sáo rỗng kiểu "trân trọng kính mong quý công ty".
- Không hứa điều mình chưa xác nhận được.

Trước khi viết, nếu thiếu thông tin thì hỏi mình tối đa 3 câu.

==========================================================
PROMPT 3. BÀI ĐĂNG MẠNG XÃ HỘI
Dùng khi: Cần nội dung cho Facebook, TikTok, Threads.
==========================================================
VAI TRÒ
Bạn là người viết nội dung cho thương hiệu nhỏ ở Việt Nam, viết
kiểu nói chuyện, không sáo.

BỐI CẢNH
- Thương hiệu: [tên và ngành, ví dụ: Quán cà phê nhỏ ở Đà Nẵng]
- Khách hàng: [tuổi, nghề, điều họ quan tâm nhất]
- Chủ đề bài đăng: [ví dụ: Giới thiệu món mới cho mùa mưa]
- Mục tiêu: [chọn một: Bán hàng / tăng tương tác / xây hình ảnh]
- Điều KHÔNG được nói: [ví dụ: Không so sánh với quán khác]

VIỆC CẦN LÀM
Viết 3 bài đăng khác hướng nhau:
- Bài 1: Kể một tình huống đời thường mà khách thấy mình trong đó.
- Bài 2: Nói thẳng lợi ích, có một con số hoặc chi tiết cụ thể.
- Bài 3: Đặt một câu hỏi mời khách trả lời trong phần bình luận.

KHUÔN KẾT QUẢ
Mỗi bài trình bày theo mẫu:
[Tên bài] (ví dụ: Bài 1. Kể chuyện)
Câu mở: ...
Nội dung: tối đa 80 chữ
Lời mời hành động: một câu
Gợi ý hình ảnh đi kèm: một dòng mô tả
Sau 3 bài, thêm mục "CHỌN BÀI NÀO": Nói bài nào hợp mục tiêu đã
nêu và lý do, trong 3 dòng.

GIỌNG VÀ GIỚI HẠN
- Xưng "mình" và "bạn" hoặc theo cách xưng hô mình đang dùng.
- Không hashtag, không emoji, không viết hoa cả cụm để gây chú ý.
- Không hứa hẹn quá mức, không dùng từ tuyệt đối như "tốt nhất".

Trước khi viết, nếu thiếu thông tin thì hỏi mình tối đa 3 câu.

==========================================================
PROMPT 4. TÓM TẮT TÀI LIỆU DÀI
Dùng khi: Nhận một báo cáo, hợp đồng, bài nghiên cứu dài.
==========================================================
VAI TRÒ
Bạn là trợ lý nghiên cứu cẩn thận. Bạn thà nói "không chắc" còn
hơn đoán bừa.

BỐI CẢNH
- Loại tài liệu: [ví dụ: Hợp đồng thuê mặt bằng / báo cáo tài chính]
- Mình đọc tài liệu này để: [ví dụ: Quyết định có ký hay không]
- Điều mình lo nhất: [ví dụ: Các khoản phí ẩn]

VIỆC CẦN LÀM
Đọc tài liệu mình gửi rồi trả về theo đúng khuôn bên dưới. Mọi ý
đều phải bám vào nội dung tài liệu, có ghi rõ nằm ở mục nào hoặc
trang nào. Chỗ nào tài liệu nói mơ hồ, ghi rõ là mơ hồ.

KHUÔN KẾT QUẢ
1. TÓM TẮT NHANH: 5 gạch đầu dòng, mỗi dòng dưới 25 chữ.
2. SỐ LIỆU QUAN TRỌNG: 3 đến 5 con số đáng chú ý, kèm vị trí.
3. ĐIỀU LIÊN QUAN TỚI MỐI LO CỦA MÌNH: Trả lời thẳng vào điều mình
   lo đã nêu ở phần bối cảnh.
4. ĐIỂM CẦN HỎI LẠI: 3 câu hỏi mình nên hỏi người gửi tài liệu.
5. TÀI LIỆU KHÔNG TRẢ LỜI ĐƯỢC: 2 điều quan trọng mà tài liệu
   không hề nhắc tới.

GIỌNG VÀ GIỚI HẠN
- Viết cho người không chuyên ngành, giải thích thuật ngữ ngay khi
  dùng lần đầu.
- Không thêm nhận định cá nhân ngoài nội dung tài liệu.
- Nếu tài liệu quá dài, xử lý từng phần và báo mình biết đang ở
  phần nào.

TÀI LIỆU:
[Dán nội dung hoặc đính kèm file]

==========================================================
PROMPT 5. HỌC TIẾNG ANH QUA VIỆC THẬT
Dùng khi: Muốn vừa hiểu tài liệu tiếng Anh vừa học được từ mới.
==========================================================
VAI TRÒ
Bạn là giáo viên tiếng Anh dạy người đi làm, dạy theo kiểu thực
dụng: Học từ nào dùng được ngay từ đó.

BỐI CẢNH
- Trình độ của mình: [ví dụ: Đọc hiểu khá, nghe nói kém]
- Nghề của mình: [ví dụ: Nhân viên kinh doanh ngành nội thất]
- Mục tiêu: [ví dụ: Trả lời email khách nước ngoài tự tin hơn]

VIỆC CẦN LÀM
Với đoạn tiếng Anh mình gửi, làm lần lượt 4 việc:
1. Dịch sang tiếng Việt tự nhiên, không dịch máy móc.
2. Chọn 5 từ hoặc cụm đáng học nhất với nghề của mình. Mỗi từ ghi:
   Nghĩa ngắn gọn, phiên âm đơn giản theo cách đọc của người Việt,
   và một câu ví dụ đặt trong đúng tình huống nghề của mình.
3. Chỉ ra 2 cấu trúc câu hay, giải thích khi nào nên dùng.
4. Ra cho mình 3 câu hỏi bằng tiếng Anh về nội dung đoạn này, độ
   khó vừa trình độ của mình. Sau đó DỪNG LẠI chờ mình trả lời.

Khi mình trả lời, hãy sửa theo cách: Khen đúng chỗ nào trước, rồi
viết lại câu cho tự nhiên hơn, cuối cùng chỉ ra một lỗi ngữ pháp
đáng nhớ nhất, không liệt kê hết mọi lỗi.

GIỌNG VÀ GIỚI HẠN
- Giải thích bằng tiếng Việt, ví dụ bằng tiếng Anh.
- Không dùng thuật ngữ ngữ pháp rắc rối. Nếu buộc phải dùng thì
  giải thích bằng một câu đời thường.

ĐOẠN TIẾNG ANH:
[Dán vào đây]

==========================================================
PROMPT 6. LÊN KẾ HOẠCH CÔNG VIỆC
Dùng khi: Có mục tiêu nhưng chưa biết chia nhỏ từ đâu.
==========================================================
VAI TRÒ
Bạn là người quản lý dự án thực tế, ghét kế hoạch viển vông. Bạn
luôn hỏi "ai làm, bao giờ xong, lấy gì đo".

BỐI CẢNH
- Mục tiêu: [mô tả rõ, kèm con số nếu có]
- Thời gian: [bao lâu, hạn chót là ngày nào]
- Nguồn lực đang có: [người, tiền, công cụ, thời gian rảnh mỗi tuần]
- Ràng buộc: [ví dụ: Chỉ làm được buổi tối, ngân sách dưới 5 triệu]
- Mình đã thử gì rồi: [nếu có]

VIỆC CẦN LÀM
Trước khi lập kế hoạch, hỏi mình tối đa 3 câu để làm rõ. Sau khi
mình trả lời mới lập kế hoạch.

KHUÔN KẾT QUẢ
1. MỤC TIÊU VIẾT LẠI: Một câu đo đếm được (có số và mốc thời gian).
2. CÁC MỐC CHÍNH: Chia theo tuần. Mỗi mốc ghi: Kết quả phải có,
   việc cần làm, mất bao lâu, cần ai hoặc cái gì.
3. VIỆC LÀM ĐẦU TIÊN: Đúng một việc mình nên làm trong 30 phút tới.
4. BA RỦI RO: Mỗi rủi ro ghi dấu hiệu nhận biết sớm và cách xử lý.
5. ĐIỀU NÊN BỎ: 2 việc nghe hay nhưng không nên làm lúc này, kèm
   lý do, để mình khỏi phân tâm.

GIỌNG VÀ GIỚI HẠN
- Nói thẳng, không động viên sáo rỗng.
- Nếu mục tiêu không khả thi với nguồn lực mình có, nói rõ ngay ở
  đầu và đề xuất mục tiêu nhỏ hơn.
- Không dùng thuật ngữ quản trị nếu không giải thích.

==========================================================
PROMPT 7. PHẢN BIỆN Ý TƯỞNG
Dùng khi: Trước khi dồn tiền và thời gian vào một ý tưởng.
==========================================================
VAI TRÒ
Bạn là người phản biện thẳng thắn, từng đầu tư và từng thất bại.
Bạn không nịnh, nhưng cũng không chê cho sướng miệng: Mọi chỗ chê
đều phải kèm lý do và cách kiểm chứng.

BỐI CẢNH
- Ý tưởng: [mô tả trong 5 đến 10 dòng]
- Khách hàng mình nhắm tới: [ai, đang giải quyết vấn đề đó bằng gì]
- Mình sẽ bỏ vào: [tiền, thời gian, công sức dự kiến]
- Mình sợ nhất điều gì: [nếu có]

VIỆC CẦN LÀM
Phản biện theo đúng 5 mục dưới đây. Không khen mở đầu, vào thẳng.

KHUÔN KẾT QUẢ
1. GIẢ ĐỊNH CHƯA KIỂM CHỨNG: 3 điều mình đang mặc nhiên cho là
   đúng. Mỗi điều kèm một cách kiểm chứng rẻ và nhanh (dưới 1 tuần,
   dưới 1 triệu đồng).
2. ĐIỂM YẾU LỚN NHẤT: 5 điểm, xếp từ nguy hiểm nhất xuống.
3. CÂU HỎI KHÓ: 3 câu mà khách hàng thật hoặc nhà đầu tư sẽ hỏi
   khiến mình lúng túng.
4. AI ĐANG LÀM RỒI: Những cách giải quyết đang tồn tại, kể cả cách
   thủ công, và vì sao khách có thể vẫn chọn cách cũ.
5. PHIÊN BẢN NHỎ NHẤT NÊN THỬ: Một thử nghiệm làm được trong 2 tuần
   để biết nên đi tiếp hay dừng, kèm con số cụ thể để ra quyết định.

GIỌNG VÀ GIỚI HẠN
- Thẳng nhưng tôn trọng, không mỉa mai.
- Không bịa số liệu thị trường. Nếu cần số, nói rõ mình nên tự tìm
  ở đâu.
- Kết bằng một câu: Nếu chỉ được làm một việc tuần này thì làm gì.

==========================================================
PROMPT 8. BIẾN PROMPT TIẾNG ANH THÀNH CỦA MÌNH
Dùng khi: Lấy prompt từ prompts.chat hay bất kỳ đâu về dùng.
==========================================================
VAI TRÒ
Bạn là chuyên gia viết prompt. Bạn biết cách giữ phần lõi của một
prompt tốt và bỏ đi phần thừa.

BỐI CẢNH
- Việc mình cần làm: [mô tả cụ thể]
- Công cụ mình dùng: [ChatGPT / Claude / Gemini]
- Ngôn ngữ mình muốn nhận kết quả: Tiếng Việt
- Mức độ dài của kết quả: [ngắn gọn / vừa / chi tiết]

VIỆC CẦN LÀM
1. Đọc prompt gốc mình dán ở cuối.
2. Nói trong 3 dòng: Prompt này thực chất yêu cầu AI làm gì.
3. Viết lại thành prompt tiếng Việt cho việc của mình, theo đủ 5
   phần: Vai trò, bối cảnh, việc cần làm, khuôn kết quả, giới hạn.
4. Bỏ các ràng buộc lỗi thời (ví dụ các câu bắt chỉ trả lời trong
   khung code, cấm giải thích) nếu chúng làm kết quả tệ đi, và nói
   rõ đã bỏ gì.
5. Thêm một dòng cuối: "Trước khi làm, hãy hỏi mình tối đa 3 câu."

KHUÔN KẾT QUẢ
A. PROMPT MỚI: Đặt trong khung code để mình copy nguyên khối.
B. ĐÃ ĐỔI GÌ: Bảng 2 cột, cột trái ghi phần gốc, cột phải ghi lý
   do sửa hoặc bỏ.
C. CÁCH THỬ: Một ví dụ dữ liệu mẫu để mình chạy thử prompt mới
   ngay, biết nó chạy đúng hay chưa.

GIỌNG VÀ GIỚI HẠN
- Prompt mới phải đứng độc lập, đọc là hiểu, không cần xem bản gốc.
- Không thêm vai trò màu mè kiểu "bạn là thiên tài số một thế giới".
- Giữ nguyên các thuật ngữ kỹ thuật, tên công cụ bằng tiếng Anh.

PROMPT GỐC:
[Dán vào đây]
```

```
{
  "mcpServers": {
    "prompts.chat": {
      "url": "https://prompts.chat/api/mcp"
    }
  }
}
```

Muốn xem bản gốc tiếng Anh của cả kho thì mở thẳng kho prompt trên prompts.chat .

Giải nén, mở file bo-prompt-tieng-viet.txt bằng Notepad hoặc TextEdit, copy khối nào cần rồi dán vào ô chat. Nếu dùng Claude, bạn kéo-thả thẳng file vào khung chat rồi nhắn: "Nhớ giúp mình bộ prompt này, lát nữa mình gọi tên là dùng nhé."

## Đóng góp prompt và tự dựng thư viện riêng

### Đăng prompt của bạn

Prompt bạn sửa ra mà chạy tốt thì nên chia sẻ lại. Vào prompts.chat/prompts/new , đăng nhập rồi điền nội dung. Prompt được duyệt sẽ tự đồng bộ sang kho dữ liệu trên GitHub, nghĩa là người dùng khắp thế giới tải về đều có phần của bạn. [2]

- Đặt tên vai rõ ràng, ví dụ "Người rà soát hợp đồng thuê nhà", đừng đặt tên chung chung.
- Bỏ hết thông tin riêng tư trước khi đăng (tên khách, số điện thoại, số liệu nội bộ công ty).
- Nhớ rằng prompt đăng lên là theo giấy phép CC0, tức bạn tặng hẳn cho cộng đồng, ai cũng dùng và sửa được.

### Dựng thư viện prompt riêng cho công ty

Công ty bạn muốn có kho prompt nội bộ, không đưa lên mạng công cộng? Dự án cho tự dựng bản riêng, có thể gắn logo, màu thương hiệu và bắt đăng nhập. Phần này cần người biết kỹ thuật, nên nếu bạn không rành thì gửi phần này cho bạn làm IT.

```
npx prompts.chat new thu-vien-prompt-cua-toi
cd thu-vien-prompt-cua-toi
```

Trình cài đặt sẽ hỏi lần lượt về tên thương hiệu, màu sắc, cách đăng nhập (GitHub, Google hoặc tài khoản công ty) và các tính năng muốn bật. Bản tự dựng dùng cơ sở dữ liệu PostgreSQL. [6]

### Học viết prompt bài bản

Tác giả còn viết một cuốn sách tương tác về cách viết prompt, hơn 28 chương, từ căn bản tới các kỹ thuật nâng cao như chuỗi suy luận và cách dựng trợ lý tự động. Đọc miễn phí tại The Interactive Book of Prompting . [2]

## Lưu ý cho người Việt và lỗi thường gặp

- Prompt tiếng Anh vẫn trả lời được tiếng Việt: Giữ nguyên prompt gốc rồi thêm một dòng cuối "Hãy trả lời hoàn toàn bằng tiếng Việt". Cách này thường cho kết quả tốt hơn là dịch cả prompt sang tiếng Việt vụng về.
- Đừng dán dữ liệu nhạy cảm: Thông tin khách hàng, hợp đồng, số tài khoản, mã nguồn nội bộ. Prompt bạn gõ sẽ đi qua máy chủ của hãng AI, và nếu bạn lỡ đăng prompt kèm dữ liệu lên prompts.chat thì cả thế giới đọc được.
- Cẩn thận các bản "tổng hợp prompt" bán trên mạng: Nhiều bộ "1000 prompt chuyên nghiệp" rao bán trên group chính là kho này tải về rồi đóng gói lại. Dữ liệu gốc miễn phí hoàn toàn, không ai có quyền bắt bạn trả tiền cho nó.
- Bạn hoàn toàn được dùng cho mục đích kiếm tiền: Giấy phép CC0 cho phép dùng thương mại, không cần ghi nguồn. Nhưng ghi nguồn vẫn là việc nên làm, vừa lịch sự vừa giúp người khác tìm thấy kho gốc.
- Prompt cũ gặp model mới: Nhiều prompt viết từ 2022, hay có câu kiểu "đừng giải thích, chỉ trả lời trong khung code". Model bây giờ thông minh hơn nhiều, bạn cứ mạnh dạn bỏ bớt mấy câu ràng buộc cũ nếu thấy kết quả gượng gạo.

### Lỗi hay gặp

### Copy xong dán vào ChatGPT mà kết quả chung chung

Nguyên nhân gần như luôn là thiếu bối cảnh. Thêm 3 câu ở phần Sửa prompt cho đúng việc của bạn : Người đọc là ai, giọng văn thế nào, muốn nhận kết quả dạng gì.

### Mở file prompts.csv bằng Excel thì chữ dính vào nhau

Excel đang đọc sai mã hoá. Mở Excel trước, vào Data → From Text/CSV , chọn file, rồi chọn mã hoá UTF-8 và dấu phân cách là dấu phẩy. Hoặc đơn giản hơn: Tải file lên Google Sheets, nó tự nhận.

### Gõ lệnh npx mà máy báo không tìm thấy

Máy chưa cài Node.js. Tải bản LTS tại nodejs.org , cài xong đóng và mở lại cửa sổ dòng lệnh rồi thử lại.

### Cài plugin vào Claude Code nhưng gõ lệnh không thấy gì

Thoát hẳn Claude Code rồi mở lại, vì plugin chỉ nạp lúc khởi động. Sau đó gõ dấu / rồi gõ prompts để xem máy gợi ý lệnh nào.

### Nối MCP xong mà AI nói không thấy công cụ nào

Kiểm tra 3 thứ: Đã lưu đúng file cấu hình của app chưa, đã khởi động lại app chưa, và đoạn JSON có bị thiếu dấu ngoặc không. Dán lại đoạn mẫu ở phần 7 là chắc nhất.

### Tìm mãi không ra prompt hợp ý

Đừng cố tìm cái vừa in. Lấy prompt gần đúng nhất rồi nhờ AI sửa, hoặc dùng luôn prompt số 8 trong bộ khởi động phía trên để biến prompt gốc thành của bạn.

Vậy là xong. Thư viện thì miễn phí và luôn ở đó, phần quyết định kết quả nằm ở chỗ bạn chịu sửa prompt cho đúng việc của mình. Lấy một việc đang làm dở hôm nay, thử một prompt, rồi comment kể mình nghe kết quả nhé.

Đăng ký sớm

## Khoá học AI của mình sắp mở

Để lại email, mình báo trước ngày mở đăng ký và giữ mức giảm 20% cho người đăng ký sớm.

Miễn phí · Không spam · Huỷ bất cứ lúc nào

Xong rồi, cảm ơn bạn. Mình sẽ báo ngay khi mở đăng ký.

- prompts.chat: Trang web chính thức
- f/prompts.chat: Mã nguồn và README trên GitHub
- prompts.csv: File dữ liệu toàn bộ prompt
- CLAUDE-PLUGIN.md: Tài liệu plugin cho Claude Code
- prompts.chat: Tài liệu API và MCP
- SELF-HOSTING.md: Hướng dẫn tự dựng thư viện riêng
