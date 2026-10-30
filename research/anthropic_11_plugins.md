# Source: https://cuongmeai.com/tai-lieu/11-plugin-mien-phi-anthropic


Trong video mình có nói về bộ plugin mà Anthropic (công ty làm ra Claude) tặng miễn phí cho mọi người. Video chỉ dài vài phút nên mình chỉ kịp khoe kết quả. Tài liệu này là bản đầy đủ: plugin là cái gì, cài ra sao, gõ lệnh nào, và quan trọng nhất là ở Việt Nam thì cái nào dùng được ngay, cái nào phải chỉnh lại.

Mình viết cho người chưa từng đụng vào AI . Mọi từ chuyên môn đều được giải thích bằng tiếng Việt đời thường ngay khi xuất hiện lần đầu. Đọc xong, bạn cài được ít nhất một plugin và chạy được lệnh đầu tiên trong khoảng 10 phút.

- Plugin là gì? Giải thích cho người chưa biết gì
- Cài plugin từng bước (2 cách, chọn cách dễ)
- Điểm mặt đủ 11 plugin và lệnh của từng cái
- Ba bài thực chiến: Bán hàng, Marketing, Tài chính
- Ở Việt Nam thì cái nào dùng tốt?
- Bộ prompt tiếng Việt tải về dùng ngay
- Kiểm chứng: Điều gì đúng, điều gì cần nói lại cho chuẩn

## 1. Plugin là gì? Giải thích cho người chưa biết gì

Hãy tưởng tượng Claude là một nhân viên mới cực kỳ thông minh nhưng chưa biết công ty bạn làm gì . Bình thường, mỗi lần nhờ việc bạn phải giải thích lại từ đầu: Báo giá công ty mình trình bày kiểu gì, email chào hàng phải có những phần nào, báo cáo tài chính chốt sổ theo quy trình ra sao.

Plugin (đọc là “plắc-in”) hiểu nôm na là một gói nghề cài thêm cho Claude , giải quyết đúng chuyện đó. Nó giống như bạn đưa cho nhân viên mới một cuốn cẩm nang nghề đã viết sẵn: Đọc xong là biết việc. Cài một lần, dùng mãi mãi, không phải giải thích lại nữa.

### Bên trong một plugin có ba thứ

Mỗi plugin là một thư mục chứa file chữ thuần, không có code, không cần lập trình. Ba thành phần chính:

- Skill (kỹ năng) : Là phần kiến thức nghề. Claude tự động lôi ra dùng khi thấy việc bạn nhờ có liên quan. Ví dụ trong plugin Bán hàng có skill “cách nghiên cứu một công ty khách hàng”; bạn chỉ cần nhắn “tìm hiểu giúp mình công ty X” là nó tự áp dụng, không cần gọi tên skill.
- Command (lệnh tắt) : Là những câu lệnh bắt đầu bằng dấu gạch chéo / , ví dụ /sales:call-prep . Gõ vào là Claude chạy đúng một quy trình đã dựng sẵn. Giống nút bấm nhanh trên điều khiển TV.
- Connector (đầu nối) : Là dây nối Claude sang các phần mềm bạn đang xài: Slack, Notion, HubSpot, Google Drive, Microsoft 365… Nối rồi thì Claude đọc được dữ liệu thật của bạn chứ không chỉ đoán mò. Dân kỹ thuật gọi giao thức này là MCP ; bạn không cần nhớ từ đó, chỉ cần biết đó là “cái dây nối”.

Connector không tự bật. Sau khi cài plugin, bạn vẫn phải tự đăng nhập vào từng công cụ để cấp quyền, giống như lần đầu cho một app điện thoại truy cập danh bạ. Nếu chưa nối gì, plugin vẫn chạy được nhưng chỉ làm việc trên thông tin bạn dán vào và những gì tìm được trên web.

### Cowork là gì và tại sao lại nhắc tới nó?

Claude Cowork là chế độ làm việc theo dự án của Claude: Thay vì hỏi đáp từng câu, bạn giao cho nó nguyên một đầu việc kèm thư mục tài liệu, rồi nó tự làm và trả ra file. Bộ 11 plugin này sinh ra chủ yếu cho Cowork [1] . Chúng cũng chạy được trong Claude Code , phiên bản Claude chạy bằng dòng lệnh trên máy tính, dành cho người quen kỹ thuật hơn.

Bản thân 11 plugin là mã nguồn mở, giấy phép Apache-2.0, tải và sửa thoải mái không tốn đồng nào [2] . Nhưng để chạy chúng trong Cowork thì bạn cần tài khoản Claude có trả phí (Pro, Max, Team hoặc Enterprise), vì Anthropic phát hành tính năng plugin dưới dạng bản xem trước cho người dùng trả phí [1] . Ngoài ra, vài connector là dịch vụ tính tiền riêng (HubSpot, ZoomInfo, Snowflake…). Nói “hoàn toàn miễn phí” là chưa đủ ý.

## 2. Cài plugin từng bước (2 cách, chọn cách dễ)

Có hai đường cài. Nếu bạn không rành kỹ thuật, chỉ cần đọc Cách A rồi bỏ qua Cách B.

- Mở trình duyệt, vào địa chỉ claude.com/plugins . Đây là gian hàng plugin chính thức của Anthropic.
- Đăng nhập bằng tài khoản Claude của bạn (nút ở góc trên bên phải).
- Tìm plugin muốn dùng, ví dụ gõ “Sales” vào ô tìm kiếm, rồi bấm vào tên nó để mở trang giới thiệu.
- Bấm nút Install (Cài đặt) màu nổi ở đầu trang. Plugin sẽ được thêm vào Claude Cowork của bạn.
- Mở Claude, chuyển sang chế độ Cowork . Gõ dấu / vào ô chat, nếu thấy danh sách lệnh mới hiện ra (ví dụ /sales:call-prep ) là cài thành công.
- Muốn nối công cụ: Vào phần Connectors trong cài đặt, bấm Connect ở công cụ bạn dùng (Slack, Notion, Google Drive…), rồi đăng nhập cấp quyền.

Chỉ cần bước 1-5 là dùng được. Bước 6 để sau cũng không sao.

- Mở ứng dụng Terminal trên máy (máy Mac: Bấm phím Command + phím cách, gõ “Terminal”, Enter).
- Dán dòng đầu tiên bên dưới rồi Enter. Dòng này khai báo kho plugin của Anthropic cho máy bạn.
- Dán dòng thứ hai rồi Enter. Dòng này cài plugin Bán hàng. Muốn cài plugin khác thì đổi chữ sales thành tên plugin khác ( marketing , finance , legal …).
- Gõ / trong Claude Code để kiểm tra lệnh mới đã xuất hiện chưa.

```
claude plugin marketplace add anthropics/knowledge-work-plugins

claude plugin install sales@knowledge-work-plugins
```

Đừng cài hết 11 plugin cùng lúc. Cài nhiều quá thì danh sách lệnh dài lê thê, và Claude phải cân nhắc nhiều kiến thức nghề khác nhau nên dễ chọn nhầm hướng. Cài 1-2 cái đúng nghề của bạn , xài quen rồi hẵng thêm.

## 3. Điểm mặt đủ 11 plugin và lệnh của từng cái

Dưới đây là trọn bộ 11 plugin trong đợt đầu, kèm việc nó làm được, lệnh tắt và các công cụ nó nối được [2] [3] . Bấm vào tên plugin để mở phần chi tiết: lệnh tắt, công cụ nối được và một câu “Dùng để làm gì trong đời thực” cho dễ hình dung.

Làm được: Nghiên cứu khách hàng tiềm năng, chuẩn bị nội dung trước cuộc gọi, rà soát danh sách cơ hội bán hàng, soạn email chào hàng, dựng “battlecard” (bảng so sánh nhanh mình với đối thủ để nhân viên bán hàng cầm theo).

Lệnh chính: /sales:prospect-research (tìm hiểu khách tiềm năng), /sales:call-prep (chuẩn bị cuộc gọi), /sales:call-summary (biến ghi chú cuộc gọi thành biên bản kèm việc cần làm), /sales:pipeline-review (soi sức khỏe đường ống bán hàng, chỉ ra deal đang chết dí), /sales:forecast (dự báo doanh số theo ba kịch bản tốt, thường, xấu) [4] .

Nối được với: HubSpot, Close, Clay, ZoomInfo, Slack, Notion, Jira, Fireflies, Microsoft 365.

Dùng để làm gì trong đời thực: Sáng mai bạn có cuộc gọi với một công ty lạ hoắc. Gõ một lệnh, Claude tra web, tóm tắt công ty đó làm gì, ai là người ra quyết định, họ vừa có tin gì mới, rồi gợi ý luôn dàn ý cuộc gọi và ba câu hỏi nên hỏi.

Làm được: Viết nội dung, lên kế hoạch chiến dịch, giữ đúng giọng thương hiệu, làm brief phân tích đối thủ, báo cáo hiệu quả chiến dịch.

Lệnh chính: /marketing:draft-content (viết nội dung), /marketing:campaign-plan (lập kế hoạch chiến dịch).

Nối được với: Slack, Canva, Figma, HubSpot, Amplitude, Notion, Ahrefs, SimilarWeb, Klaviyo.

Dùng để làm gì trong đời thực: Bạn nạp cho nó tài liệu thương hiệu (giọng văn, màu, những từ cấm dùng) một lần. Từ đó mọi bài post, email, kịch bản quảng cáo nó viết ra đều đúng chất công ty bạn, không còn giọng “AI viết” chung chung.

Làm được: Soạn bút toán, đối chiếu số liệu giữa các sổ, lập báo cáo tài chính, phân tích chênh lệch giữa kế hoạch và thực tế, quản lý quy trình chốt sổ cuối kỳ.

Lệnh chính: /finance:reconciliation (đối chiếu số liệu), /finance:variance-analysis (phân tích chênh lệch).

Nối được với: Snowflake, Databricks, BigQuery, Slack, Microsoft 365.

Dùng để làm gì trong đời thực: Cuối tháng bạn có hai file: Sao kê ngân hàng và sổ kế toán. Đưa cả hai cho nó, nó chỉ ra dòng nào lệch, lệch bao nhiêu, và đoán nguyên nhân, việc mà bình thường một kế toán dò tay mất cả buổi.

Làm được: Rà hợp đồng theo hệ thống cờ màu XANH / VÀNG / ĐỎ cho từng điều khoản, phân loại nhanh thỏa thuận bảo mật (NDA), tra cứu yêu cầu tuân thủ, đánh giá rủi ro, soạn thư phản hồi.

Lệnh chính: /legal:review-contract (rà hợp đồng), /legal:triage-nda (phân loại NDA).

Nối được với: Slack, Box, Egnyte, Jira, Microsoft 365.

Dùng để làm gì trong đời thực: Đối tác gửi hợp đồng 20 trang. Nó đọc, đánh dấu xanh cho điều khoản bình thường, vàng cho điều khoản nên thương lượng, đỏ cho điều khoản nguy hiểm, kèm giải thích vì sao. Bạn đọc phần đỏ trước là tiết kiệm được nửa buổi.

Làm được: Phân loại và xếp mức ưu tiên cho ticket (phiếu yêu cầu hỗ trợ), soạn thư trả lời, chuẩn bị hồ sơ chuyển cấp trên, tra ngữ cảnh khách hàng, viết bài hướng dẫn cho kho kiến thức.

Lệnh chính: /customer-support:triage (phân loại), /customer-support:draft-response (soạn phản hồi).

Nối được với: Slack, Intercom, HubSpot, Guru, Jira, Notion, Microsoft 365.

Dùng để làm gì trong đời thực: Sáng ra 40 tin nhắn khách hàng. Nó chia thành nhóm “gấp, trả lời ngay”, “hỏi thông thường”, “góp ý sản phẩm”, và viết sẵn bản nháp trả lời cho nhóm thông thường.

Làm được: Viết tài liệu mô tả tính năng (spec), lập lộ trình sản phẩm, tổng hợp kết quả phỏng vấn người dùng, cập nhật tình hình cho các bên liên quan, theo dõi đối thủ.

Lệnh chính: /product-management:write-spec , /product-management:roadmap .

Nối được với: Linear, Asana, Monday, ClickUp, Jira, Notion, Figma, Amplitude, Pendo, Intercom, Fireflies, Slack.

Dùng để làm gì trong đời thực: Bạn có 12 bản ghi phỏng vấn khách hàng. Nó đọc hết, rút ra 5 nỗi đau lặp lại nhiều nhất, rồi biến thành đề xuất tính năng có xếp thứ tự ưu tiên.

Làm được: Viết câu truy vấn SQL (ngôn ngữ hỏi dữ liệu trong cơ sở dữ liệu), phân tích thống kê, vẽ biểu đồ, dựng bảng theo dõi chỉ số.

Lệnh chính: /data:write-query (viết truy vấn), /data:analyze (phân tích).

Nối được với: Snowflake, Databricks, BigQuery, Definite, Hex, Amplitude, Jira.

Dùng để làm gì trong đời thực: Bạn không biết SQL. Bạn chỉ nói “cho tôi xem doanh thu theo tháng của 12 tháng gần nhất, tách theo kênh bán”. Nó viết câu lệnh, chạy, và giải thích kết quả bằng tiếng Việt.

Làm được: Quản lý đầu việc, sắp lịch, và ghi nhớ bối cảnh công việc của riêng bạn.

Lệnh chính: /productivity:plan-day (lên kế hoạch ngày), /productivity:summarize-week (tổng kết tuần).

Nối được với: Slack, Notion, Asana, Linear, Jira, Monday, ClickUp, Microsoft 365.

Dùng để làm gì trong đời thực: 8 giờ sáng, gõ một lệnh, nó nhìn lịch họp và danh sách việc rồi đề xuất thứ tự làm trong ngày, kèm cảnh báo hai cuộc họp bị chồng giờ.

Làm được: Tìm một lần ra hết trong email, chat, tài liệu, wiki nội bộ, thay vì mở từng app đi lục.

Lệnh chính: /enterprise-search:find (tìm), /enterprise-search:summarize (tóm tắt kết quả).

Nối được với: Slack, Notion, Guru, Jira, Asana, Microsoft 365.

Dùng để làm gì trong đời thực: “Hồi tháng 3 mình chốt giá với bên nào là 120 triệu nhỉ?” Nó lục Slack, Drive, Notion cùng lúc và trả lời kèm đường dẫn tới đúng tin nhắn.

Làm được: Tra cứu tài liệu khoa học, phân tích dữ liệu gen, hỗ trợ lên kế hoạch thí nghiệm trong nghiên cứu tiền lâm sàng.

Nối được với: PubMed, bioRxiv, ClinicalTrials.gov, ChEMBL, BioRender, Benchling, Open Targets, Synapse, Wiley, Owkin.

Dùng để làm gì trong đời thực: Dành cho phòng lab và viện nghiên cứu. Người làm kinh doanh bình thường bỏ qua cái này.

Làm được: Tạo plugin mới từ đầu, hoặc sửa lại plugin có sẵn cho hợp với công ty bạn, mà không cần biết lập trình.

Lệnh chính: /plugin:create (tạo mới), /plugin:customize (tuỳ chỉnh).

Dùng để làm gì trong đời thực: Đây là plugin mình thấy đáng giá nhất với người Việt . Bạn lấy plugin Marketing gốc, bảo nó “sửa lại cho thị trường Việt Nam: Viết tiếng Việt, kênh chính là Facebook và TikTok chứ không phải LinkedIn, tiền tính bằng VNĐ”, rồi lưu thành plugin riêng của bạn.

Sau đợt 11 plugin đầu tiên, Anthropic đã phát hành thêm nhiều plugin nữa: Nhân sự (HR), Thiết kế, Kỹ thuật, Vận hành, Phân tích tài chính, và bốn plugin chuyên ngành tài chính (Ngân hàng đầu tư, Nghiên cứu cổ phiếu, Quỹ đầu tư tư nhân, Quản lý gia sản) [3] . Vào lại claude.com/plugins thỉnh thoảng để xem có gì mới.

## 4. Ba bài thực chiến: Bán hàng, Marketing, Tài chính

Cài xong rồi thì gõ gì? Dưới đây là ba tình huống có thật, kèm câu lệnh bạn copy dán được ngay. Chỗ nào có [dấu ngoặc vuông] thì thay bằng thông tin của bạn.

### Bài 1: Chuẩn bị cuộc gọi bán hàng trong 3 phút

Tình huống: Chiều nay bạn gọi cho một công ty sản xuất bao bì ở Bình Dương, chưa biết gì về họ.

Với công ty Việt Nam nhỏ, thông tin trên web tiếng Anh gần như không có, nên phần “tin tức gần đây” hay bị trống hoặc bịa. Cách chữa: Tự copy vài bài báo tiếng Việt về công ty đó dán vào cùng lệnh. Chất lượng lên hẳn.

### Bài 2: Lên kế hoạch chiến dịch Marketing

Tình huống: Bạn bán khoá học online, muốn chạy chiến dịch 4 tuần cho đợt khai giảng tháng sau.

### Bài 3: Đối chiếu sổ sách cuối tháng

Tình huống: Bạn là kế toán một công ty nhỏ, cuối tháng phải khớp sao kê ngân hàng với sổ quỹ.

Câu “Không tự suy đoán số liệu thiếu, chỗ nào không chắc thì ghi rõ” ở cuối prompt tài chính là bắt buộc. AI có thói quen “điền cho đủ” khi thiếu dữ liệu, và trong kế toán thì một con số bịa nguy hiểm hơn một ô trống. Luôn kiểm tra lại bằng tay mọi con số trước khi nộp cho sếp hoặc cơ quan thuế.

## 5. Ở Việt Nam thì cái nào dùng tốt?

Đây là phần mình muốn nói thẳng nhất. Bộ plugin này được thiết kế cho công ty Mỹ dùng bộ công cụ Mỹ. Không phải cái nào bê nguyên về Việt Nam cũng chạy ngon. Mình chia làm ba nhóm.

### Nhóm A: Dùng được ngay, gần như không cần chỉnh

- Marketing : Ngon nhất trong cả bộ. Việc viết nội dung, lên lịch chiến dịch, phân tích đối thủ không phụ thuộc vào luật hay hệ thống của nước nào. Chỉ cần dặn nó viết tiếng Việt, dùng Facebook/TikTok/Zalo thay LinkedIn, và tiền tính bằng VNĐ.
- Productivity : Lên kế hoạch ngày, tổng kết tuần là việc phổ quát. Chạy tốt kể cả khi bạn không nối app nào, chỉ dán danh sách việc vào.
- Cowork Plugin Management : Chính là công cụ để bạn Việt hoá mấy plugin còn lại. Nên cài đầu tiên.
- Product Management : Viết spec, tổng hợp phỏng vấn người dùng, lập roadmap: Công ty công nghệ Việt Nam đa số đã dùng Jira/Notion/Linear rồi nên nối được luôn.
- Customer Support : Phần phân loại ticket và soạn nháp phản hồi dùng ngay được, kể cả khi bạn nhận tin nhắn qua Facebook hay Zalo rồi copy vào.

### Nhóm B: Dùng được nhưng phải chỉnh trước

- Sales : Phần soạn email, chuẩn bị cuộc gọi, tổng kết cuộc gọi rất tốt. Điểm vướng: Các đầu nối như ZoomInfo, Clay, Close hầu như không có dữ liệu doanh nghiệp Việt Nam, và phần lớn công ty Việt dùng CRM nội địa hoặc Excel chứ không dùng HubSpot. Cách chữa: Xuất danh sách khách ra file Excel/CSV rồi đưa cho Claude, đừng trông vào đầu nối.
- Finance : Logic đối chiếu và phân tích chênh lệch thì đúng ở mọi nước. Nhưng kiến thức nghề bên trong plugin viết theo chuẩn mực kế toán Mỹ, còn Việt Nam dùng VAS : Hệ thống tài khoản, mẫu biểu báo cáo, cách hạch toán thuế giá trị gia tăng đều khác. Các đầu nối Snowflake/BigQuery cũng xa lạ với doanh nghiệp Việt, ở ta là MISA, Fast, Bravo hoặc Excel. Cách chữa: Dùng /plugin:customize để nạp lại chuẩn mực VAS và hệ thống tài khoản theo Thông tư 200 hoặc 133, rồi cho ăn dữ liệu bằng file Excel.
- Data : Bản thân việc viết SQL thì không phân biệt quốc gia. Nhưng nếu công ty bạn không có kho dữ liệu kiểu Snowflake/BigQuery thì đầu nối vô dụng. Cách chữa: Vẫn dùng được bằng cách đưa file CSV/Excel trực tiếp.
- Enterprise Search : Chỉ hữu ích nếu công ty bạn thật sự lưu tài liệu trên Slack, Notion, Microsoft 365 hay Google Workspace. Công ty dùng Zalo nhóm và ổ cứng chung thì plugin này không với tới được.

### Nhóm C: Cân nhắc kỹ hoặc bỏ qua

- Legal : Hệ thống cờ xanh, vàng, đỏ rất hay để đọc nhanh một hợp đồng và biết chỗ nào cần chú ý. Nhưng kiến thức pháp lý bên trong dựa trên luật Mỹ. Hợp đồng theo pháp luật Việt Nam có những quy định riêng (về hình thức, về điều khoản phạt vi phạm, về cơ quan giải quyết tranh chấp) mà plugin không nắm. Hãy coi nó là công cụ đọc lướt để khoanh vùng, tuyệt đối không thay thế luật sư. Đây không phải tư vấn pháp lý.
- Bio Research : Chỉ dành cho viện nghiên cứu và phòng lab. Người làm kinh doanh bỏ qua.

Một: Cần tài khoản Claude trả phí và thẻ thanh toán quốc tế (Visa/Mastercard) để đăng ký. Hai: Nhiều đầu nối là dịch vụ tính tiền riêng, có cái vài trăm đô một tháng, đừng lên kế hoạch dựa vào chúng. Ba: Khi bạn nối Claude vào dữ liệu công ty, dữ liệu đó được gửi lên máy chủ ở nước ngoài để xử lý. Với dữ liệu khách hàng cá nhân, hãy đối chiếu quy định bảo vệ dữ liệu cá nhân hiện hành trước khi nối, và cân nhắc chỉ đưa dữ liệu đã ẩn danh.

## 6. Bộ prompt tiếng Việt tải về dùng ngay

Mình soạn sẵn bốn bộ câu lệnh tiếng Việt, đã chỉnh cho bối cảnh Việt Nam, dùng được cả khi bạn chưa cài plugin nào , vì chúng viết lại phần kiến thức nghề ngay trong câu lệnh. Bấm Xem chi tiết để đọc trước, bấm Tải để lấy file về máy.

Tải trọn bộ 4 file một lần Bốn bộ prompt: Bán hàng, Marketing, Tài chính, Chăm sóc khách hàng.

### Bộ prompt Bán hàng (bản Việt Nam)

Nghiên cứu khách tiềm năng, chuẩn bị cuộc gọi, viết email chào hàng, tổng kết cuộc gọi, rà soát danh sách cơ hội, tất cả bằng tiếng Việt, tính bằng VNĐ.

```
BỘ PROMPT BÁN HÀNG: BẢN VIỆT NAM
Cường Mê AI · cuongmeai.com
Dựa trên plugin Sales của Anthropic, viết lại cho bối cảnh Việt Nam.
Cách dùng: Copy nguyên một mục, thay phần trong [ngoặc vuông], dán vào Claude.

=====================================================================
PROMPT 1. NGHIÊN CỨU KHÁCH HÀNG TIỀM NĂNG
=====================================================================
Bạn là chuyên viên nghiên cứu thị trường B2B tại Việt Nam.

Công ty cần tìm hiểu: [Tên công ty]
Website: [địa chỉ web]
Ngành: [ngành]
Nguồn mình có sẵn: [dán các bài báo, bài đăng Facebook, thông tin đăng ký doanh nghiệp nếu có]

Hãy trả về bằng tiếng Việt:
1. Công ty này làm gì, 5 gạch đầu dòng, ngôn ngữ dễ hiểu
2. Quy mô ước tính: Nhân sự, doanh thu, số chi nhánh (ghi rõ đây là ước tính)
3. Ba dấu hiệu cho thấy họ đang có nhu cầu mua thứ mình bán
4. Ai nhiều khả năng là người ra quyết định, và ai là người ảnh hưởng
5. Ba tin tức hoặc thay đổi gần đây có thể dùng để mở đầu câu chuyện
6. Ba rủi ro khiến thương vụ này khó chốt

QUAN TRỌNG: Thông tin nào bạn không tìm được thì ghi rõ "chưa có dữ liệu".
Tuyệt đối không bịa số liệu, tên người, hay tin tức.

=====================================================================
PROMPT 2. CHUẨN BỊ CUỘC GỌI
=====================================================================
Chuẩn bị giúp mình cuộc gọi bán hàng.

Khách hàng: [tên công ty, ngành, quy mô]
Người gặp: [tên, chức vụ]
Sản phẩm mình bán: [mô tả 1-2 câu], giá tham khảo [số] VNĐ
Mục tiêu cuộc gọi: [ví dụ: Xin buổi demo 30 phút]
Bối cảnh trước đó: [đã trao đổi gì chưa, nguồn khách từ đâu]

Trả về bằng tiếng Việt:
1. Dàn ý cuộc gọi 15 phút, chia theo phút
2. Câu mở đầu 2 câu, tự nhiên như người Việt nói chuyện, không sáo rỗng
3. Năm câu hỏi khai thác nhu cầu, xếp từ dễ tới sâu
4. Ba phản đối thường gặp và cách trả lời, mỗi cách không quá 3 câu
5. Cách chốt bước tiếp theo
6. Một câu tóm tắt giá trị sản phẩm dành cho đúng chức vụ của người này

=====================================================================
PROMPT 3. VIẾT EMAIL CHÀO HÀNG
=====================================================================
Viết email chào hàng gửi lần đầu.

Người nhận: [tên, chức vụ, công ty]
Lý do mình liên hệ họ: [dấu hiệu cụ thể, ví dụ: Họ vừa mở nhà máy mới]
Sản phẩm: [mô tả 1 câu]
Kết quả mình từng mang lại cho khách tương tự: [số liệu cụ thể nếu có]
Lời kêu gọi hành động: [ví dụ: Xin 15 phút gọi điện tuần sau]

Yêu cầu:
- Tiếng Việt, xưng hô lịch sự theo văn hoá công sở Việt Nam
- Tối đa 120 từ, đọc trên điện thoại không phải cuộn nhiều
- Tiêu đề email dưới 8 từ, không dùng chữ viết hoa toàn bộ, không dùng từ giật gân
- Không hứa hẹn quá lời, không dùng sáo ngữ kiểu "giải pháp tối ưu toàn diện"
- Viết 3 phiên bản với 3 góc tiếp cận khác nhau để mình chọn

=====================================================================
PROMPT 4. TỔNG KẾT CUỘC GỌI
=====================================================================
Đây là ghi chú thô mình viết sau cuộc gọi với khách:
[dán ghi chú hoặc bản ghi âm đã gỡ băng]

Biến thành biên bản gọn bằng tiếng Việt gồm:
1. Thông tin cuộc gọi: Ngày, người tham dự, thời lượng
2. Nhu cầu khách nêu ra, trích nguyên văn nếu có
3. Ngân sách, thời gian, người quyết định, nếu khách có nhắc
4. Phản đối hoặc lo ngại khách đưa ra
5. Việc cần làm, ghi rõ ai làm và hạn chót
6. Đánh giá khả năng chốt: Cao, trung bình hay thấp, kèm lý do
7. Email cảm ơn gửi ngay sau cuộc gọi, dưới 100 từ

Chỗ nào ghi chú không nói tới thì ghi "không đề cập", đừng suy đoán.

=====================================================================
PROMPT 5. RÀ SOÁT DANH SÁCH CƠ HỘI BÁN HÀNG
=====================================================================
Mình đính kèm file Excel danh sách cơ hội bán hàng.
Các cột: [liệt kê tên cột], đơn vị tiền VNĐ.

Phân tích và trả về bằng tiếng Việt:
1. Tổng giá trị đường ống, chia theo giai đoạn
2. Những cơ hội đang đứng yên quá lâu, nêu rõ bao nhiêu ngày không đổi
3. Ba cơ hội đáng dồn sức nhất tuần này, kèm lý do
4. Ba cơ hội nên buông, kèm lý do
5. Dự báo doanh số tháng này theo 3 kịch bản: Tốt, nhiều khả năng nhất, xấu
6. Kế hoạch hành động cho tuần tới, tối đa 7 việc

Mọi con số phải lấy từ file, không được ước lượng thêm.
```

### Bộ prompt Marketing (bản Việt Nam)

Nạp giọng thương hiệu, lên kế hoạch chiến dịch, viết nội dung đa kênh, phân tích đối thủ, đã đổi kênh và đơn vị tiền cho phù hợp Việt Nam.

```
BỘ PROMPT MARKETING: BẢN VIỆT NAM
Cường Mê AI · cuongmeai.com
Dựa trên plugin Marketing của Anthropic, viết lại cho bối cảnh Việt Nam.

=====================================================================
PROMPT 1. NẠP GIỌNG THƯƠNG HIỆU (chạy MỘT LẦN, trước mọi prompt khác)
=====================================================================
Từ giờ khi viết nội dung cho mình, luôn tuân thủ hồ sơ thương hiệu sau.

TÊN THƯƠNG HIỆU: [tên]
SẢN PHẨM: [mô tả 1-2 câu]
KHÁCH HÀNG: [tuổi, giới tính, nghề, thu nhập, nỗi đau chính]
GIỌNG NÓI: [chọn: Thân mật như bạn bè / chuyên nghiệp gần gũi / nghiêm túc chuyên gia]
XƯNG HÔ: [ví dụ: Mình - bạn / bên em - anh chị]
TỪ HAY DÙNG: [liệt kê]
TỪ CẤM DÙNG: [liệt kê, ví dụ: Số 1 Việt Nam, cam kết 100%, giải pháp tối ưu]
ĐỘ DÀI CÂU: Ưu tiên câu ngắn, tối đa 20 từ một câu
CẤM: Dùng emoji trừ khi mình yêu cầu; dùng dấu gạch ngang dài; viết hoa cả từ để nhấn mạnh

Nhắc lại hồ sơ này bằng 3 câu để mình xác nhận bạn đã hiểu đúng.

=====================================================================
PROMPT 2. LẬP KẾ HOẠCH CHIẾN DỊCH
=====================================================================
Lập kế hoạch chiến dịch marketing.

Sản phẩm: [tên], giá [số] VNĐ
Mục tiêu: [số] đơn hoặc [số] khách đăng ký, trong [số] tuần
Ngân sách: [số] VNĐ
Kênh đang có: Facebook Page [số] theo dõi, TikTok [số], Zalo OA [số], email [số] địa chỉ
Đối thủ chính: [tên 2-3 đối thủ]

Trả về bằng tiếng Việt:
1. Thông điệp chính: một câu, dưới 15 từ
2. Ba góc tiếp cận nội dung khác nhau, mỗi góc kèm lý do vì sao hợp với khách hàng mục tiêu
3. Lịch nội dung theo tuần: Tuần nào đăng gì, trên kênh nào, dạng nội dung gì
4. Ngân sách chia theo tuần và theo kênh, tính bằng VNĐ, kèm lý do chia như vậy
5. Ba chỉ số cần theo dõi, kèm ngưỡng cảnh báo phải dừng lại chỉnh
6. Kế hoạch dự phòng nếu sau tuần 1 kết quả kém hơn 50% so với kỳ vọng

=====================================================================
PROMPT 3. VIẾT NỘI DUNG ĐA KÊNH TỪ MỘT Ý
=====================================================================
Ý tưởng gốc: [mô tả ý tưởng hoặc dán bài viết dài]

Biến thành 5 dạng nội dung, giữ đúng giọng thương hiệu đã nạp:
1. Bài đăng Facebook 150-200 từ, có móc câu ở 2 dòng đầu
2. Kịch bản TikTok 30 giây: Chia theo giây, ghi rõ lời thoại và hình ảnh trên màn hình
3. Email gửi danh sách khách, tối đa 150 từ, có 1 lời kêu gọi hành động duy nhất
4. Ba dòng tiêu đề quảng cáo dưới 40 ký tự
5. Nội dung tin nhắn Zalo OA, tối đa 60 từ

Mỗi nội dung phải đứng độc lập được, không phải bản dịch máy móc của nhau.

=====================================================================
PROMPT 4. PHÂN TÍCH ĐỐI THỦ
=====================================================================
Phân tích đối thủ giúp mình.

Đối thủ: [tên, website, fanpage]
Mình đính kèm: [ảnh chụp màn hình bài đăng của họ, bảng giá, hoặc bài báo]
Sản phẩm mình: [mô tả]

Trả về bằng tiếng Việt:
1. Họ định vị mình là gì: một câu
2. Thông điệp và giọng điệu họ dùng
3. Kênh nào họ mạnh nhất, dựa trên bằng chứng nào
4. Ba điểm họ làm tốt hơn mình
5. Ba khoảng trống họ bỏ ngỏ mà mình chen vào được
6. Một câu định vị cho thương hiệu mình để khác biệt rõ với họ

Chỉ dựa trên dữ liệu mình cung cấp và thông tin công khai.
Không suy đoán doanh thu hay ngân sách quảng cáo của họ.
```

### Bộ prompt Tài chính (đã chỉnh theo chuẩn Việt Nam)

Đối chiếu sổ sách, phân tích chênh lệch, đọc báo cáo tài chính, lập kế hoạch dòng tiền, đã thay chuẩn mực kế toán Mỹ bằng ghi chú theo VAS và có khoá “cấm bịa số”.

```
BỘ PROMPT TÀI CHÍNH: BẢN VIỆT NAM
Cường Mê AI · cuongmeai.com
Dựa trên plugin Finance của Anthropic, thay chuẩn mực Mỹ bằng ghi chú theo VAS.

CẢNH BÁO: Đây là công cụ hỗ trợ, KHÔNG thay thế kế toán viên có chuyên môn.
Luôn kiểm tra lại mọi con số bằng tay trước khi nộp báo cáo.

=====================================================================
KHUNG NỀN (dán đầu mỗi phiên làm việc)
=====================================================================
Bối cảnh làm việc:
- Doanh nghiệp Việt Nam, đơn vị tiền VNĐ, kỳ kế toán theo năm dương lịch
- Áp dụng Chuẩn mực kế toán Việt Nam (VAS), hệ thống tài khoản theo [Thông tư 200 hoặc Thông tư 133]
- KHÔNG áp dụng US GAAP hay IFRS trừ khi mình nói rõ
- Thuế giá trị gia tăng: [phương pháp khấu trừ / trực tiếp]

Quy tắc bắt buộc trong mọi câu trả lời:
1. Không tự điền số liệu thiếu. Thiếu thì ghi "cần bổ sung dữ liệu"
2. Không làm tròn nếu mình không yêu cầu
3. Mọi phép tính phải hiện công thức để mình kiểm tra lại
4. Cuối câu trả lời, liệt kê những giả định bạn đã dùng

=====================================================================
PROMPT 1. ĐỐI CHIẾU SỔ SÁCH
=====================================================================
Mình đính kèm 2 nguồn dữ liệu:
- Nguồn A: [ví dụ: Sao kê ngân hàng tháng 7]
- Nguồn B: [ví dụ: Sổ quỹ tiền gửi ngân hàng]

Hãy đối chiếu và trả về:
1. Bảng giao dịch khớp: Ngày, nội dung, số tiền
2. Bảng giao dịch chỉ có ở nguồn A
3. Bảng giao dịch chỉ có ở nguồn B
4. Bảng giao dịch khớp ngày nhưng lệch số tiền, ghi rõ chênh bao nhiêu
5. Với mỗi chênh lệch: Nguyên nhân khả dĩ nhất (ví dụ: Phí ngân hàng chưa hạch toán, séc chưa về, ghi nhầm ngày)
6. Tổng chênh lệch và kết luận đã cân đối chưa
7. Danh sách việc mình cần kiểm tra thủ công, xếp theo mức độ nghiêm trọng

=====================================================================
PROMPT 2. PHÂN TÍCH CHÊNH LỆCH KẾ HOẠCH VÀ THỰC TẾ
=====================================================================
Mình đính kèm bảng kế hoạch và bảng thực tế kỳ [tháng/quý].

Trả về:
1. Bảng so sánh từng khoản mục: Kế hoạch, thực tế, chênh lệch tuyệt đối, chênh lệch phần trăm
2. Đánh dấu khoản mục lệch quá [10]%, cả lệch tốt lẫn lệch xấu
3. Với mỗi khoản lệch lớn: Ba nguyên nhân có thể, xếp theo khả năng
4. Ba khoản đáng lo nhất và câu hỏi mình nên đi hỏi bộ phận nào
5. Dự báo nếu xu hướng này tiếp tục thì cuối kỳ ra sao
6. Bản tóm tắt 5 gạch đầu dòng để báo cáo sếp

=====================================================================
PROMPT 3. ĐỌC HIỂU BÁO CÁO TÀI CHÍNH
=====================================================================
Mình đính kèm báo cáo tài chính của [công ty] kỳ [thời gian].

Giải thích bằng tiếng Việt cho người KHÔNG học kế toán:
1. Công ty này kiếm tiền từ đâu, tiêu tiền vào đâu, diễn đạt đời thường
2. Sức khoẻ tài chính: Tốt, bình thường hay đáng lo, kèm 3 bằng chứng số
3. Các chỉ số quan trọng, kèm cách tính và ý nghĩa: Biên lợi nhuận gộp, biên lợi nhuận ròng, hệ số thanh toán hiện hành, vòng quay hàng tồn kho, hệ số nợ trên vốn chủ sở hữu
4. Ba dấu hiệu bất thường đáng đặt câu hỏi
5. Ba câu hỏi nên hỏi ban giám đốc

Mỗi chỉ số phải ghi rõ lấy số từ dòng nào trong báo cáo.

=====================================================================
PROMPT 4. KẾ HOẠCH DÒNG TIỀN 13 TUẦN
=====================================================================
Lập bảng dự báo dòng tiền 13 tuần tới.

Dữ liệu mình có:
- Số dư tiền hiện tại: [số] VNĐ
- Công nợ phải thu: [dán bảng hoặc mô tả, kèm kỳ hạn]
- Công nợ phải trả: [dán bảng, kèm kỳ hạn]
- Chi phí cố định hàng tháng: [lương, thuê mặt bằng, khác]
- Doanh thu dự kiến: [số] VNĐ mỗi tháng

Trả về:
1. Bảng dòng tiền theo tuần: Đầu kỳ, thu, chi, cuối kỳ
2. Tuần nào có nguy cơ âm tiền, đánh dấu rõ
3. Ba cách xử lý nếu thiếu tiền, xếp theo chi phí từ rẻ tới đắt
4. Ba giả định nhạy cảm nhất: Nếu sai lệch 20% thì kết quả đổi thế nào
5. Cảnh báo sớm: Chỉ số nào cần theo dõi hàng tuần
```

### Bộ prompt Chăm sóc khách hàng (bản Việt Nam)

Phân loại tin nhắn hàng loạt, soạn phản hồi giữ đúng giọng thương hiệu, xử lý khách giận, và biến câu hỏi lặp lại thành bài hướng dẫn.

```
BỘ PROMPT CHĂM SÓC KHÁCH HÀNG: BẢN VIỆT NAM
Cường Mê AI · cuongmeai.com
Dựa trên plugin Customer Support của Anthropic.

=====================================================================
PROMPT 1. PHÂN LOẠI TIN NHẮN HÀNG LOẠT
=====================================================================
Đây là [số] tin nhắn khách hàng mình nhận trong [khoảng thời gian], gom từ Facebook, Zalo và email:
[dán toàn bộ tin nhắn, mỗi tin một dòng]

Phân loại giúp mình:
1. Nhóm theo chủ đề, mỗi nhóm ghi số lượng tin
2. Xếp mức ưu tiên cho từng tin: KHẨN (khách đang bực hoặc mất tiền), THƯỜNG, CHỜ ĐƯỢC
3. Với nhóm KHẨN: Ghi rõ vì sao khẩn và nên trả lời trong bao lâu
4. Ba vấn đề lặp lại nhiều nhất, đây là dấu hiệu sản phẩm hoặc quy trình có lỗi
5. Tin nào có thể trả lời bằng mẫu có sẵn, tin nào cần người thật xử lý

=====================================================================
PROMPT 2. SOẠN PHẢN HỒI
=====================================================================
Tin nhắn của khách:
[dán nguyên văn]

Bối cảnh:
- Khách đã mua: [sản phẩm], ngày [ngày]
- Lịch sử: [khách mới / khách quen / đã từng khiếu nại]
- Chính sách công ty liên quan: [dán chính sách đổi trả, bảo hành...]
- Kênh trả lời: [Facebook / Zalo / email]

Viết phản hồi bằng tiếng Việt:
- Xưng hô: [bên em - anh/chị]
- Ngắn gọn, hợp với kênh: Zalo và Facebook thì dưới 80 từ, email thì dưới 150 từ
- Cấu trúc: Ghi nhận vấn đề, nêu mình sẽ làm gì, mốc thời gian cụ thể
- Không hứa điều chính sách không cho phép
- Không dùng câu máy móc kiểu "chúng tôi rất tiếc về sự bất tiện này"

Viết 2 phiên bản: Một bản ngắn gọn, một bản ấm áp hơn.

=====================================================================
PROMPT 3. XỬ LÝ KHÁCH ĐANG GIẬN
=====================================================================
Khách đang rất bực. Nguyên văn:
[dán tin nhắn]

Sự thật về vụ việc: [mô tả trung thực chuyện gì đã xảy ra, lỗi của ai]
Mình được phép làm gì: [ví dụ: Hoàn tiền tối đa 500.000đ, đổi hàng, tặng voucher]

Trả về:
1. Đánh giá: Khách giận vì mất tiền, mất thời gian, hay cảm thấy bị coi thường
2. Câu trả lời hạ nhiệt, gửi ngay trong 5 phút, dưới 60 từ
3. Câu trả lời đầy đủ kèm phương án xử lý cụ thể
4. Ba điều TUYỆT ĐỐI không được nói trong tình huống này
5. Nếu khách vẫn không nguôi thì bước tiếp theo là gì

Nếu lỗi thuộc về công ty thì phải nhận lỗi thẳng, không vòng vo.

=====================================================================
PROMPT 4. BIẾN CÂU HỎI LẶP LẠI THÀNH BÀI HƯỚNG DẪN
=====================================================================
Ba tháng qua khách hỏi đi hỏi lại những câu sau:
[liệt kê các câu hỏi]

Viết bài hướng dẫn đăng lên trang hỗ trợ:
1. Tiêu đề đúng cách khách hay gõ khi tìm kiếm
2. Câu trả lời ngắn ở ngay đầu bài, cho người vội
3. Hướng dẫn từng bước, mỗi bước một việc, ghi rõ bấm vào đâu
4. Phần "Nếu vẫn không được thì sao"
5. Ba câu hỏi liên quan khác nên gắn link tới

Viết cho người không rành công nghệ. Tránh từ chuyên môn.
Chỗ nào buộc phải dùng thì giải thích ngay bằng một câu.
```

## 7. Kiểm chứng: Điều gì đúng, điều gì cần nói lại cho chuẩn

Mình luôn đối chiếu lại nội dung video với nguồn gốc trước khi làm tài liệu. Dưới đây là kết quả, vừa để bạn yên tâm, vừa để tránh hiểu nhầm.

### Những gì trong video là chính xác

- Đúng là 11 plugin trong đợt phát hành đầu tiên, phủ đủ Bán hàng, Marketing, Tài chính, Pháp lý và các nghề khác [1] .
- Đúng là kiến thức chuyên môn đã nạp sẵn . Đó chính là phần “skill” bên trong mỗi plugin, nên bạn không phải giải thích lại từ đầu.
- Đúng là nối thẳng vào công cụ hằng ngày : Slack, HubSpot, Notion, Microsoft 365 và nhiều thứ khác [2] .
- Đúng là rất hợp với startup nhỏ và freelancer . Người phụ trách sản phẩm doanh nghiệp của Anthropic mô tả đây là bước chuyển từ “trợ lý hữu ích” sang “cộng sự thực thụ”, nơi bạn giao được cả một dự án [5] .

### Ba chỗ nên nói lại cho chuẩn

Anthropic công bố công khai bộ plugin này vào ngày 30 tháng 1 năm 2026 , có bài blog chính thức và báo chí công nghệ đưa tin cùng ngày [1] [5] . Tính tới hôm nay đã hơn nửa năm. Kho plugin cũng đã mở rộng lên hơn 20 plugin chính thức, thêm cả Nhân sự, Kỹ thuật, Vận hành và bốn plugin chuyên ngành tài chính [3] .

Mã nguồn plugin miễn phí thật, giấy phép Apache-2.0, ai tải cũng được [2] . Nhưng để chạy chúng trong Cowork thì cần tài khoản Claude trả phí, và một số đầu nối là dịch vụ tính tiền riêng. Với người Việt còn thêm rào cản thẻ thanh toán quốc tế.

Plugin giúp bạn làm việc của nhiều người, nhưng nó không tự chịu trách nhiệm. Với ba nhóm việc ( số liệu tài chính, điều khoản pháp lý, và thông tin gửi cho khách hàng ) bắt buộc phải có người đọc lại trước khi phát hành. Đây là quy tắc mình không bao giờ bỏ.

Đăng ký sớm

## Khoá học AI của mình sắp mở

Để lại email, mình báo trước ngày mở đăng ký và giữ mức giảm 20% cho người đăng ký sớm.

Miễn phí · Không spam · Huỷ bất cứ lúc nào

Xong rồi, cảm ơn bạn. Mình sẽ báo ngay khi mở đăng ký.

- Anthropic: “Customize Cowork with plugins” (blog chính thức, 30/01/2026)
- GitHub: anthropics/knowledge-work-plugins (mã nguồn 11 plugin, giấy phép Apache-2.0)
- Claude Cowork Guide: Danh mục toàn bộ plugin chính thức, kèm lệnh và đầu nối
- Anthropic: Trang giới thiệu plugin Sales
- Axios: “Anthropic bolsters enterprise offerings with Cowork plugins” (30/01/2026)
- GitHub: anthropics/claude-plugins-official (kho plugin chính thức mở rộng, gồm cả plugin của đối tác)
