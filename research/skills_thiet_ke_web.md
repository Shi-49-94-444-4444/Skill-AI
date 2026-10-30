# Source: https://cuongmeai.com/tai-lieu/8-skill-thiet-ke-web-cho-claude


Có khá nhiều skill thiết kế cho Claude đang được chia sẻ, nhưng nằm rải rác mỗi nơi một ít. Tài liệu này gom tám cái đáng dùng nhất về một chỗ, nói rõ từng cái là gì, cài ra sao, gõ câu lệnh nào và khi nào nên dùng .

Anh em chưa từng cài skill nào cũng đọc được: Phần đầu giải thích “skill” là gì và chỉ cách cài dễ nhất (kéo-thả một file). Nếu anh em đã quen rồi thì nhảy luôn xuống mục mình cần ở mục lục dưới đây.

## 1. Skill là gì? Hai cách cài cho người mới

Skill hiểu nôm na là một gói hướng dẫn mình cài thêm cho Claude để nó giỏi một việc cụ thể. Giống như cài thêm app cho điện thoại: Máy vẫn là máy đó, nhưng làm được thêm việc mới. Về mặt kỹ thuật, mỗi skill chỉ là một file văn bản tên SKILL.md chứa các luật mà Claude phải tuân theo.

Điểm hay là Claude tự biết khi nào cần dùng . Anh em không phải gọi tên skill. Cài xong, chỉ cần nhắn “làm cho mình trang landing page bán khoá học” là nó tự lôi skill thiết kế ra áp dụng.

Có hai nơi để cài và hai nơi này khác nhau . Anh em chọn đúng chỗ kẻo cài rồi mà không thấy gì:

Dùng ở đâu | Cách cài | Phù hợp với
Claude trên web / app (claude.ai) | Kéo-thả file SKILL.md vào khung chat | Người không rành kỹ thuật, dễ nhất
Claude Code (chạy trong cửa sổ dòng lệnh) | Gõ một dòng npx skills add ... | Anh em có code dự án trên máy

### Ba kiểu công cụ trong bộ này

8 món trong bài không cùng một loại. Biết đúng loại thì lúc cài anh em biết mình đang làm gì, lúc hỏng cũng biết nhìn vào đâu.

Loại | Là gì | Trong bài này
Skill | Một thư mục chứa file SKILL.md , bên trong là bộ hướng dẫn để Claude giỏi thêm một việc. [11] | Taste Skill, Emil Kowalski, Web Design Guidelines, Image to Code, Awesome Design HTML
Skill kèm chương trình | Ngoài file hướng dẫn còn cài thêm một chương trình chạy bằng dòng lệnh. Chỉ dùng được trong Claude Code. | Impeccable, Playwright CLI
File tham chiếu | Chỉ là một file chữ DESIGN.md anh em đưa cho Claude đọc. Không cài gì hết. | Awesome Claude Design

Skill cài xong phải mở lại Claude Code mới thấy, kiểm bằng lệnh /skills . Chương trình dòng lệnh nằm ngoài Claude, anh em gõ thẳng trong Terminal cũng chạy. File tham chiếu thì nằm im trong dự án, Claude chỉ đọc khi anh em nhắc tới. Hỏng cái nào cứ theo đúng đường đó mà dò.

- Bấm nút Xem trên GitHub ở mục skill anh em cần, rồi mở file SKILL.md . Ở góc trên bên phải có nút Download raw file (biểu tượng mũi tên xuống), bấm vào đó để tải file về máy.
- Mở Claude, kéo file vừa tải thả vào khung chat (chỗ anh em gõ tin nhắn).
- Nhắn một câu: “Cài giúp mình skill này nha” . Claude sẽ tự thêm vào.
- Xong. Từ giờ chỉ cần nhắn việc cần làm, nó tự dùng skill đó.

Muốn tự cài tay: Mở Claude → Settings → Capabilities (hoặc Skills ) → thêm file vừa tải. Không muốn tải file thì mở SKILL.md trên GitHub, bấm nút Copy raw file rồi dán thẳng nội dung vào chat cũng được.

- Cài Node.js trước nếu máy chưa có, tải ở nodejs.org , bấm Next tới hết là xong.
- Mở cửa sổ dòng lệnh (Windows: Gõ cmd vào thanh tìm kiếm; Mac: Mở Terminal ).
- Chuyển vào thư mục dự án của anh em, rồi dán một dòng trong các mục bên dưới và nhấn Enter.
- Mở lại Claude Code. Gõ /skills để kiểm tra xem skill đã nằm trong danh sách chưa.

Muốn skill dùng được ở mọi dự án chứ không riêng dự án này, thêm --global vào cuối dòng lệnh.

### Cú pháp chung của lệnh npx skills

Phần lớn skill trong bài cài bằng một công cụ tên skills của nhóm Vercel Labs. [10] Không cần cài nó trước, chữ npx ở đầu lệnh tự tải về rồi chạy. Dòng đầu trong ô dưới để kiểm tra máy đã có Node.js chưa: Hiện ra số kiểu v22.x.x là có rồi, báo command not found thì tải bản LTS ở nodejs.org . [14]

```
# kiểm tra Node.js
node -v
# cài cả bộ skill của một kho
npx skills add <tên-người>/<tên-kho>
# chỉ cài một skill trong kho đó
npx skills add <tên-người>/<tên-kho> --skill "tên-skill"
# cài cho cả máy thay vì riêng dự án đang mở
npx skills add <tên-người>/<tên-kho> -g
# xem những skill đã cài
npx skills list
```

Mặc định skill được chép vào .claude/skills/ trong dự án đang mở. Chỉ dự án đó dùng được, nhưng đẩy lên Git thì cả nhóm cùng có. Thêm -g (hoặc --global ) thì skill vào ~/.claude/skills/ , mọi dự án trên máy đều dùng được. [10]

Trong danh sách /skills , mỗi skill hiện dưới tên gọi của nó. Tên này thường khác tên kho lúc cài, nên thấy lệch đừng tưởng cài hỏng.

Ngại gõ lệnh thì copy dòng lệnh ở mục anh em cần, dán thẳng vào khung chat Claude Code rồi nhắn: “Chạy giúp mình lệnh này, hỏi lại nếu cần quyền gì.” Claude sẽ xin phép trước khi chạy, anh em chỉ việc bấm đồng ý.

Đừng cài hết 8 cái một lúc. Nhiều skill cùng nói về thiết kế thì Claude dễ bị “nhiễu”, kết quả lại dở hơn. Bắt đầu với Taste Skill + Playwright CLI . Hai cái này bổ sung nhau chứ không chồng chéo: Một cái lo cái đẹp, một cái lo kiểm tra. Thấy thiếu gì thì mới thêm.

## 2. Taste Skill: Nạp gu thẩm mỹ cho Claude

Đây là món mình thấy đáng xài nhất trong cả bộ , vì nó không sửa code mà sửa tư duy thẩm mỹ của Claude. Vẫn cùng một con AI, cùng một câu lệnh, nhưng kết quả trả về khác hẳn.

Cụ thể, Taste Skill là một danh sách rất dài các luật kiểu “cấm làm thế này, phải làm thế kia”, viết ra từ việc soi hàng trăm trang web do AI tạo và ghi lại mọi lỗi lặp lại. Nó chặn thẳng những dấu hiệu “web do AI làm”: Gradient tím sang xanh dương, hero căn giữa nền tối, hàng card giống hệt nhau lặp từ section này sang section khác, chữ to đùng kèm dòng phụ bé tí. Đổi lại, nó đẩy Claude sang bố cục bất đối xứng, thứ bậc chữ rõ ràng, khoảng trắng thoáng và chuyển động có lý do.

### Ba “núm xoay” để điều chỉnh

Điểm hay nhất của Taste Skill là ba con số ở đầu file, anh em sửa được bằng tay để ra đúng cái mình muốn, thang điểm từ 1 đến 10:

Núm | Để thấp nghĩa là | Để cao nghĩa là
DESIGN_VARIANCE Độ phá cách bố cục | Căn giữa, sạch sẽ, an toàn | Bất đối xứng, lệch grid, hiện đại
MOTION_INTENSITY Độ mạnh của chuyển động | Chỉ đổi màu khi đưa chuột lên | Hiệu ứng theo thanh cuộn, nút hút theo chuột
VISUAL_DENSITY Lượng thông tin mỗi màn | Thoáng, nhiều khoảng trắng | Dày đặc kiểu bảng điều khiển

Làm landing page bán hàng thì mình hay để VARIANCE 7 , MOTION 5 , DENSITY 3 . Làm trang quản trị nội bộ thì ngược lại: VARIANCE 3 , MOTION 2 , DENSITY 8 .

- Cách dễ: Mở repo ở ô dưới, vào skills/taste-skill/SKILL.md , bấm Download raw file , rồi kéo file đó vào chat Claude và nhắn “Cài giúp mình skill này”.
- Cách dòng lệnh (cả repo, gồm 13 biến thể): Dán npx skills add https://github.com/Leonxlnx/taste-skill
- Chỉ lấy đúng bản chuẩn: Dán npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
- Muốn dùng ở mọi dự án thì thêm --global vào cuối.

Nằm trong repo Leonxlnx/taste-skill . Đây là bản v2, viết lại gần như toàn bộ so với v1: Có thêm phần tự suy luận ý đồ thiết kế từ yêu cầu, bản đồ design system, khung code GSAP mẫu và danh sách kiểm tra trước khi xuất kết quả.

Mở repo trên GitHub · MIT · Claude · Cursor · Codex

### Chọn đúng gu trong 13 skill

Repo này có 13 skill, mỗi cái một tính cách. [1] Mấy cái anh em hay dùng nhất:

Tên skill | Hợp với kiểu trang nào
taste-skill (bản chính) | Có hệ thống thiết kế thật và bước tự rà trước khi xuất code
soft-skill | Trang cần cảm giác êm, sang, nhiều khoảng thở
minimalist-skill | Tối giản kiểu Notion/Linear, ít chi tiết thừa
brutalist-skill | Mạnh, tương phản cao, khối chữ lớn
redesign-skill | Sửa lại một trang có sẵn, rà trước rồi mới đổi
brandkit , stitch-skill , output-skill | Việc phụ trợ: Dựng bộ nhận diện, ghép màn, chuẩn hoá đầu ra

Cài cả bộ không làm Claude rối. Mỗi skill có một dòng mô tả riêng, Claude đọc mô tả rồi tự chọn cái khớp với việc anh em đang nhờ. Muốn chắc ăn thì nói thẳng gu trong câu nhờ việc, ví dụ “làm theo hướng tối giản”.

### Cách dùng

Skill tự kích hoạt khi anh em nhờ việc liên quan tới giao diện. Cứ nói việc mình cần, không cần gọi tên skill:

```
Làm trang giới thiệu cho tiệm cà phê của mình: Một khúc đầu trang, một khúc menu,
một khúc đánh giá khách. Gu trầm, ít màu, chữ là nhân vật chính. Đừng dùng template.

Trang /pricing của mình nhìn nhạt quá. Rà lại rồi sửa cho ra chất riêng,
nhưng giữ nguyên nội dung chữ và cấu trúc dữ liệu.
```

## 3. Emil Kowalski: Chuyển động mượt và “đã mắt”

Taste Skill lo cái đẹp tĩnh. Còn cái này lo cái đẹp khi nó động . Emil Kowalski là người từng làm ở Vercel và Linear, cũng là tác giả thư viện thông báo Sonner. Bộ skill này là kinh nghiệm nhiều năm của anh ấy đóng gói lại. [5]

Vấn đề mà nó giải quyết rất cụ thể: AI thường chọn sai nguyên liệu cho một hiệu ứng. Chọn kiểu gia tốc ease-in cho menu đang mở ra (trong khi đúng phải là ease-out ), cho nút bấm phóng ra từ scale(0) , tức là từ hư không, không có gì trong đời thực xuất hiện như vậy. Từng lỗi nhỏ nghe không đáng gì, nhưng cộng dồn lại thì giao diện hoặc “có hồn”, hoặc... nhạt.

### Vài luật cụ thể nó dạy Claude

- Không bao giờ dùng ease-in cho giao diện. Nó khởi động chậm, đúng lúc mắt người đang nhìn kỹ nhất, làm web cảm giác lag dù thời gian y hệt.
- Hiệu ứng giao diện phải dưới 300ms. Menu 180ms cảm giác nhanh hơn hẳn menu 400ms.
- Nút bấm phải thu nhỏ khi nhấn : transform: scale(0.97) . Người dùng cảm nhận được là máy đã “nghe” mình.
- Việc làm bằng bàn phím thì cấm hiệu ứng. Thứ anh em bấm cả trăm lần mỗi ngày mà có animation là thành chậm. Raycast không có hiệu ứng mở/đóng và đó là lựa chọn đúng.
- Chỉ tạo hiệu ứng cho transform và opacity . Hai thứ này chạy trên card đồ hoạ. Đụng vào height , width , margin là máy phải tính lại bố cục, gây giật.
- Dùng đường cong tự định nghĩa, không dùng mặc định. Easing có sẵn của CSS quá nhẹ, thiếu lực. Ví dụ dùng cubic-bezier(0.23, 1, 0.32, 1) .

### Repo có 15 skill, không phải một

Khi cài bằng dòng lệnh, anh em được cả 15 cái. Đây là 9 cái đáng chú ý nhất:

Skill | Dùng khi nào
emil-design-eng | Skill chính: Triết lý chung, chủ yếu về chuyển động, có cả lời khuyên thiết kế. Cài cái này trước.
animate | Cần dựng một hiệu ứng mới từ đầu, nó tự chọn đường cong, thời lượng, thuộc tính đúng.
review-animations | Đã có hiệu ứng rồi, muốn nhờ soi xem sai ở đâu.
improve-animations | Quét toàn bộ hiệu ứng trong dự án, trả về kế hoạch sửa theo thứ tự ưu tiên.
find-animation-opportunities | Tìm chỗ nào nên có chuyển động. Quan trọng hơn, chỉ ra chỗ nào không nên .
apple-design | Nguyên tắc thiết kế và chuyển động của Apple, rút từ các buổi WWDC, dịch sang web.
animation-vocabulary | Dạy anh em cách gọi tên hiệu ứng mình muốn, để AI hiểu đúng ngay lần đầu.
pick-ui-library | Chọn thư viện đúng cho việc, thay vì để AI tự viết tay một component toast hay cài một package đã bỏ hoang.
prototype | Dựng nhiều phiên bản khác nhau của cùng một phần giao diện, rồi bấm qua lại để so sánh.
- Cách dễ: Mở repo ở ô dưới, vào skills/emil-design-eng/SKILL.md , bấm Download raw file , rồi kéo file đó vào chat Claude và nhắn “Cài giúp mình skill này”.
- Cách dòng lệnh (lấy hết 15 skill): Dán npx skills@latest add emilkowalski/skills
- Sau khi cài, thử nhắn: “Soi lại toàn bộ animation trong dự án này giúp mình” . Nó sẽ trả về một bảng Trước / Sau / Vì sao cho từng lỗi.

Skill chính emil-design-eng trong repo emilkowalski/skills . Bên trong có bảng quyết định “có nên tạo hiệu ứng không”, bảng thời lượng theo từng loại thành phần, các đường cong gia tốc nên dùng, mẹo dùng clip-path và blur , luật về thao tác kéo-thả và một danh sách kiểm tra cuối cùng.

Mở repo trên GitHub · Chuyển động và chi tiết

## 4. Impeccable: Một câu lệnh dọn sạch bố cục

Thay vì ngồi mò mẫm đoán già đoán non nên để font nào, khoảng cách bao nhiêu cho chuẩn, thì với Impeccable anh em chỉ cần quăng đúng một câu lệnh . Nó tự dọn dẹp, căn chỉnh lại toàn bộ bố cục.

Impeccable khởi nguồn từ skill frontend-design của chính Anthropic, rồi mở rộng ra thành 24 câu lệnh và 59 luật kiểm tra tự động . Phần kiểm tra này chạy được mà không cần gọi AI , nên vừa nhanh vừa không tốn token. [6]

### Vài lệnh hay dùng nhất

Lệnh | Nó làm gì
/impeccable init | Phải chạy đầu tiên. Nó hỏi về sản phẩm của anh em (ai dùng, dùng để làm gì, giọng điệu thương hiệu thế nào) rồi ghi vào file PRODUCT.md . Các lệnh sau đọc file này nên không bị trả lời chung chung.
/impeccable layout | Sửa bố cục, khoảng cách, nhịp thị giác. Đây là lệnh “dọn dẹp” anh em cần nhất.
/impeccable typeset | Sửa font, cỡ chữ, thứ bậc chữ.
/impeccable critique | Review thiết kế như một designer: Thứ bậc, độ rõ ràng, cảm xúc người xem.
/impeccable polish | Pass cuối trước khi đưa web lên. Đồng bộ lại design system, kiểm tra còn sót gì không.
/impeccable bolder · /impeccable quieter | Một cặp đối nghịch. Web nhạt quá thì bolder , ồn quá thì quieter .
/impeccable distill | Lược bỏ hết, chỉ giữ phần cốt lõi. Dùng khi trang bị nhồi quá nhiều thứ.
/impeccable harden | Lo mấy ca khó: Lỗi, chữ bị tràn, đa ngôn ngữ, trạng thái rỗng.

Gõ kèm tên khu vực cho nó tập trung: /impeccable audit blog , /impeccable polish settings , hoặc nói thẳng bằng tiếng người: /impeccable redo this hero section . Lệnh nào dùng nhiều thì ghim lại bằng /impeccable pin audit , từ đó chỉ cần gõ /audit .

### Danh sách những thứ nó cấm

Phần này đáng đọc, vì nó chính là bảng kê “dấu hiệu web do AI làm” mà anh em nên tự tránh kể cả khi không cài skill:

- Font bị dùng quá nhiều: Arial, Inter, font hệ thống mặc định
- Chữ xám đặt trên nền màu
- Đen thuần hoặc xám thuần, luôn pha thêm một chút sắc độ
- Bọc mọi thứ trong card, rồi lại lồng card trong card
- Easing nhún nảy kiểu bounce / elastic, nhìn đã lỗi thời
- Gradient tím sang xanh dương, ánh sáng phát quang trên nền tối
- Mở cửa sổ dòng lệnh, chuyển vào thư mục gốc dự án của anh em.
- Dán: npx impeccable install rồi Enter. Nó tự nhận ra anh em đang dùng Claude Code hay Cursor và cài đúng chỗ.
- Mở lại Claude Code, chạy đúng một lần : /impeccable init và trả lời vài câu hỏi về sản phẩm.
- Từ đó gõ /impeccable là thấy đủ danh sách lệnh.

Cách khác chỉ cho Claude Code: /plugin marketplace add pbakaus/impeccable , rồi mở /plugin và chọn Impeccable. Cập nhật về sau: npx impeccable update .

Impeccable không phải một file SKILL.md kéo-thả được như mấy skill khác. Nó cài kèm một chương trình nhỏ và một “hook”, tức là cái bẫy tự chạy mỗi khi Claude sửa file giao diện. Vì vậy: (1) Nó chỉ dùng được với Claude Code / Cursor / Codex, không dùng được trên claude.ai ; (2) hook này chạy độc lập với việc anh em có cho phép từng lệnh hay không, nên chỉ cài ở dự án anh em tin. Nếu muốn tắt hết hook cho một lần chạy, thêm --no-hooks khi cài. Chế độ live cũng chỉ hoạt động trên máy anh em, đừng cố chạy nó trên web đang phát hành .

Impeccable không phát hành dưới dạng một file SKILL.md rời. Trình cài đặt tự dựng skill, hook và bộ quét ngay trong dự án của anh em. Toàn bộ 24 lệnh đã có trong bảng phía trên, tài liệu đầy đủ ở impeccable.style .

Mở repo trên GitHub · Apache 2.0 · Cài bằng dòng lệnh

## 5. Web Design Guidelines: Giám khảo khó tính

Bốn skill trên lo phần làm ra . Cái này lo phần chấm điểm . Nó đóng vai một ông giám khảo khó tính, soi từng dòng code dựa trên bộ quy chuẩn thiết kế của Vercel: Hơn 100 luật về khả năng tiếp cận, hiệu năng và trải nghiệm. [2]

Điểm thông minh nhất: file skill rất ngắn, vì nó không chứa luật nào cả . Mỗi lần chạy, nó tải bộ luật mới nhất từ repo của Vercel về rồi mới chấm. Nghĩa là bộ quy chuẩn luôn cập nhật, anh em cài một lần dùng mãi không bị lỗi thời.

### Nó soi những gì

- Khả năng tiếp cận: Thiếu nhãn aria-label , dùng thẻ HTML sai nghĩa, nút không bấm được bằng bàn phím
- Trạng thái focus: Viền focus có nhìn thấy không, dùng focus-visible đúng chưa
- Biểu mẫu: Có autocomplete chưa, báo lỗi ra sao, kiểm tra dữ liệu thế nào
- Chuyển động: Có tôn trọng prefers-reduced-motion không (người bị say chuyển động cần cái này), có dùng thuộc tính nhẹ cho card đồ hoạ không
- Chữ: Dấu ngoặc kép cong, dấu ba chấm đúng ký tự, số dạng cột thẳng hàng
- Ảnh: Có khai báo kích thước chưa (không khai là trang nhảy giật khi tải), lazy loading, chữ thay thế
- Chế độ tối, cảm ứng, đa ngôn ngữ và vài nhóm nữa
- Cách dễ: Mở repo ở ô dưới, vào skills/web-design-guidelines/SKILL.md , bấm Download raw file , rồi kéo file đó vào chat Claude và nhắn “Cài giúp mình skill này”.
- Cách dòng lệnh (lấy luôn cả bộ skill của Vercel): Dán npx skills add vercel-labs/agent-skills
- Gọi nó bằng cách nhắn thẳng tiếng Việt: “Soi lại giao diện giúp mình” , “Kiểm tra accessibility” , “Audit thiết kế trang này” .

Skill này cần vào mạng để tải bộ luật mới nhất. Nếu Claude báo không truy cập được, anh em bật quyền tìm kiếm web cho nó.

### Cách dùng

Chỉ muốn đúng skill soi lỗi, không lấy cả bộ của Vercel thì cài bằng lệnh này:

```
npx skills add vercel-labs/agent-skills --skill web-design-guidelines
```

Khi nhờ soi, nói rõ file hoặc thư mục cần soi, không thì nó sẽ hỏi lại anh em muốn soi cái gì. [2] Bộ luật nó tải về nằm ở repo web-interface-guidelines . [12]

```
Soi toàn bộ file trong thư mục app/ theo bộ quy tắc giao diện, liệt kê lỗi kèm số dòng,
xếp theo mức nghiêm trọng. Chưa sửa gì hết, để mình duyệt trước.

Sửa giúp mình các lỗi mức cao trong danh sách vừa rồi, mỗi lần sửa một file.
```

Đừng nhờ soi và sửa trong cùng một câu. Cho nó liệt kê lỗi trước, anh em đọc qua rồi mới chọn cái nào đáng sửa. Nhiều điều trong bộ quy tắc là chuyện quan điểm, không phải lỗi thật của dự án anh em.

Nằm trong vercel-labs/agent-skills . File rất ngắn vì nó chỉ là cái “mỏ neo”, luật thật nằm ở repo web-interface-guidelines và được tải mới mỗi lần chạy.

Mở repo trên GitHub · MIT · Chính chủ Vercel

## 6. Awesome Design: Khung thiết kế của hãng lớn

Hiểu nôm na: Nó nạp nguyên bộ khung thiết kế của mấy ông lớn vào cho Claude. Bảng màu, kiểu chữ, độ bo góc, khoảng cách, chuẩn hoá sẵn hết, anh em chỉ việc gọi tên thương hiệu.

Có hai bản , cùng ý tưởng nhưng khác cách làm và trong bộ 8 skill này chúng được tính là hai. Anh em nên biết để chọn đúng:

 | Awesome Design HTML | Awesome Claude Design
Dạng file | Hơn 110 trang HTML chạy được thật | 68 file DESIGN.md dạng văn bản
Dùng với | Claude Code (cài thành skill) | Claude Design trên claude.ai, hoặc để trong dự án Claude Code
Ưu điểm | Claude mở file ra là thấy luôn pixel, không phải tưởng tượng | Nhẹ, dựng ra cả design system hoàn chỉnh kèm UI kit
Có gì | Khoảng 90 trang web và 22 mẫu app iOS | 68 thương hiệu, chia theo ngành

Bản HTML dựa trên một lập luận mình thấy khá thuyết phục: Một dòng chữ “nút màu xanh bo tròn” buộc người đọc phải tưởng tượng, còn một file HTML thì chính nó là kết quả. Claude đọc file đó và thấy đúng những pixel mà anh em thấy. Một file HTML 300 dòng truyền tải màu, cỡ chữ, chuyển động, tương tác trong 30 giây. Viết bằng văn bản thì mất hàng giờ mà vẫn mất độ chính xác. [3]

### Cách gọi: Nói tên thương hiệu là xong

Không có câu lệnh gì đặc biệt. Cài rồi thì cứ nhắn bình thường, nhắc tên thương hiệu là nó tự lôi file tham chiếu ra:

```
Làm cho mình một trang sản phẩm theo kiểu Linear
Bắt chước cái hero gradient của Stripe
Dựng mockup iPhone màn hình Now Playing của Spotify
Nút 3D dày kiểu Duolingo
Trang landing tối kiểu Cursor
```

Có sẵn: Stripe, Linear, Notion, Apple, Vercel, Figma, Airbnb, Cursor, Claude, Mistral, Spotify, Tesla, Ferrari, BMW, Nike, Shopify, Supabase, Sentry… cùng 22 mẫu app iOS.

- Mở Claude Code, dán đúng câu này vào chat: Please install this Claude Code skill for me: https://github.com/yzfly/awesome-design-html
- Claude tự tải cả repo về thư mục skill của nó. Xong.
- Thích làm tay thì chạy: git clone https://github.com/yzfly/awesome-design-html.git ~/.claude/skills/awesome-design-html
- Không muốn cài gì: Vào thư viện trực tuyến , mở trang nào thích rồi nhấn Ctrl+S lưu lại. Mỗi trang là một file HTML độc lập, dùng làm mẫu được ngay.

Dùng Claude Design trên web thì khác: Vào awesome-claude-design , tải file DESIGN.md của thương hiệu anh em thích, rồi đính vào khung chat ở claude.ai/design và nhắn “Create a design system from this DESIGN.md”.

Không dùng Claude Design trên web vẫn tận dụng được kiểu file này. Kho VoltAgent/awesome-design-md có 73 file DESIGN.md rút từ website các thương hiệu lớn, mỗi file kèm hai trang preview.html sáng và tối để xem trước. [13]

- Mở kho, vào thư mục design-md/ , chọn thương hiệu anh em thích, mở DESIGN.md rồi copy nội dung. Muốn lấy cả kho thì bấm nút Code màu xanh, chọn Download ZIP .
- Chép file vào thư mục gốc của dự án, giữ nguyên tên DESIGN.md . Để ngay gốc thì Claude tìm dễ và cả nhóm dùng chung một bản.
- Nhắc tên file trong câu nhờ việc, đừng để Claude tự đoán. Câu mẫu ở ô dưới.

```
Đọc file DESIGN.md ở thư mục gốc rồi dựng trang chủ theo đúng bảng màu, kiểu chữ
và cách tạo nút mô tả trong đó. Chỗ nào file không nói thì hỏi mình, đừng tự chế.
```

Skill này cần cả thư mục hơn 110 file HTML mới chạy đủ . Riêng file SKILL.md chỉ là phần hướng dẫn, nó liệt kê thương hiệu nào nằm ở file nào. Anh em tải mỗi file đó về thì Claude biết danh sách nhưng không có file tham chiếu để đọc. Muốn dùng thật thì cài bằng một trong ba cách ở trên.

Thêm nữa, mấy file này là tham chiếu học hỏi, không phải design system chính thức của các hãng. Bảng màu, logo, font riêng vẫn thuộc về họ. Nên dùng làm cảm hứng để tạo ra hệ thống riêng, đừng sao y 1:1 rồi đem đi thương mại.

Repo yzfly/awesome-design-html . Trong file hướng dẫn có danh sách đầy đủ thương hiệu kèm mã file, bảng “nguyên mẫu thiết kế” để tra khi anh em không nhớ tên hãng nào phù hợp và phần tiêu chuẩn chất lượng khi dựng trang mới.

Mở repo trên GitHub · MIT · Hơn 110 trang tham chiếu

## 7. Image to Code: Quăng ảnh vào, nhận code ra

Cái này siêu tiện: Anh em quăng cái ảnh chụp màn hình hoặc file thiết kế vào, Claude dịch thẳng thành code, bắt trọn từng chi tiết.

Nhưng điều ít người biết là skill này còn làm được chiều ngược lại và đó mới là phần hay. Nó buộc Claude phải tự vẽ ảnh thiết kế trước , rồi mới code theo ảnh đó. Thứ tự bắt buộc là: Vẽ ảnh → phân tích sâu ảnh → mới viết code . Lý do rất đơn giản: Nếu để AI code tự do ngay từ đầu, nó sẽ rơi về mấy mẫu quen tay. Còn khi phải vẽ ra trước rồi copy lại bằng code, nó có một “bản thiết kế” cụ thể để trung thành với.

### Mấy luật đáng chú ý trong skill này

- Một section một ảnh. Anh em yêu cầu 8 section thì nó vẽ 8 ảnh riêng, không dồn vào một ảnh dài chữ bé tí không đọc được.
- Cấm cắt ảnh cũ. Cần ảnh cận cảnh một phần nào thì phải vẽ ảnh mới, vì cắt ra là sai hết khoảng cách và tỷ lệ.
- Không được “lười” số lượng ảnh. Thà nhiều ảnh rõ còn hơn ít ảnh nén bé.
- Hero tối đa 3 dòng tiêu đề. Dài hơn thì phải bớt chữ, không được xuống dòng thêm.
- Chống “trôi dạt” khi code. Lỗi phổ biến nhất là ảnh vẽ ra rất ngon, nhưng code xong lại thành một trang chung chung. Skill có hẳn một mục cấm chuyện này.
- Cấm chữ sáo rỗng: “unleash”, “elevate”, “revolutionize”, “next-gen”, “seamless”, cùng mấy tên thương hiệu giả kiểu Acme, Nexus, NovaCore.

Bước vẽ ảnh chỉ chạy được khi phần mềm anh em đang dùng sinh được ảnh. Claude Code bản thường chưa tự vẽ ảnh, nên hoặc gắn thêm một MCP sinh ảnh, hoặc tự tạo ảnh ở chỗ khác rồi kéo vào khung chat. [1]

Ảnh sinh ra chỉ để chốt bố cục và tinh thần, đừng cắt ra dán vào trang. Chữ trong ảnh AI hay sai chính tả tiếng Việt, mà ảnh lại nặng hơn code rất nhiều.

Skill này chỉ chạy đúng quy trình khi anh em nói rõ thứ tự trong câu lệnh . Dán kèm câu này: “follow the skill: generate images, then analyze, then code” . Không nhắc thì nó dễ nhảy thẳng vào code.

Nếu anh em đã có sẵn ảnh thiết kế hoặc ảnh chụp màn hình, cứ kéo ảnh vào chat rồi nhắn: “Phân tích kỹ ảnh này rồi code lại y hệt: Màu, font, khoảng cách, bo góc, kiểu nút” . Bỏ qua bước vẽ ảnh.

```
Làm trang bán khoá học gồm bốn khúc: Đầu trang, lợi ích, giảng viên, bảng giá.
Vẽ trước bốn ảnh mẫu riêng cho bốn khúc, khổ lớn, mỗi khúc một tấm.
Phân tích từng ảnh về kiểu chữ, khoảng cách, màu và bố cục, rồi mới code theo đúng ảnh đó.
```

- Cách dễ: Mở repo ở ô dưới, vào skills/image-to-code-skill/SKILL.md , bấm Download raw file , rồi kéo file đó vào chat Claude và nhắn “Cài giúp mình skill này”.
- Cách dòng lệnh: Dán npx skills add https://github.com/Leonxlnx/taste-skill --skill "image-to-code"
- Nó nằm cùng repo với Taste Skill, nên nếu anh em đã cài cả repo ở mục 2 thì đã có luôn , không cần cài lại.

Nằm ở skills/image-to-code-skill/SKILL.md . Có 38 mục luật, trong đó đáng đọc nhất là mục 29 (danh sách “mùi AI” cần tránh), mục 14 (luật về hero) và mục 27 (chống trôi dạt khi chuyển từ ảnh sang code).

Mở repo trên GitHub · MIT · Cùng repo Taste Skill

## 8. Playwright CLI: Cho Claude một đôi mắt

Đây là món thay đổi cuộc chơi nhiều nhất và nó là chính chủ Microsoft . Bảy skill trên chỉ dạy Claude biết thế nào là đẹp. Cái này cho nó nhìn thấy kết quả mình vừa làm.

Cụ thể: Claude tự mở trình duyệt, vào trang nó vừa dựng, chụp ảnh màn hình hoặc đọc cấu trúc trang, rồi tự soi xem có bị bể khung, chữ tràn, nút lệch chỗ nào không, rồi tự sửa trước khi anh em kịp phát hiện. Không còn cái vòng lặp khổ sở “anh em mở xem → thấy lỗi → chụp ảnh → mô tả lại cho Claude → nó sửa → mở xem lại”.

### Mấy lệnh anh em nên biết

Lệnh | Nó làm gì
playwright-cli open | Mở trình duyệt mới. Mặc định chạy ẩn, thêm --headed để cửa sổ hiện ra cho anh em nhìn cùng.
playwright-cli goto <địa chỉ> | Vào một trang
playwright-cli snapshot | Đọc cấu trúc trang dạng chữ. Đây là lệnh nó dùng nhiều nhất . Nó nhẹ hơn ảnh và chính xác hơn khi cần tìm phần tử.
playwright-cli screenshot | Chụp ảnh màn hình. Thêm --filename=trang-chu.png để đặt tên file.
playwright-cli resize 390 844 | Đổi kích thước cửa sổ để thử giao diện điện thoại
playwright-cli open --mobile | Giả lập hẳn một máy điện thoại
playwright-cli console | Đọc log lỗi trong trình duyệt
playwright-cli show --annotate | Món hay bị bỏ qua. Nó mở trang lên cho anh em khoanh vùng và ghi chú trực tiếp, rồi gửi lại cho Claude kèm ảnh. Góp ý thiết kế bằng cách vẽ, không phải bằng cách mô tả.
playwright-cli close | Đóng trình duyệt
- Cài Node.js 18 trở lên trước nếu chưa có, tải ở nodejs.org .
- Mở dòng lệnh, dán: npm install -g @playwright/cli@latest rồi Enter. Chờ nó tải xong.
- Kiểm tra bằng: playwright-cli --help . Thấy danh sách lệnh hiện ra là ổn.
- Chuyển vào thư mục dự án, dán: playwright-cli install --skills . File skill sẽ được đặt vào .claude/skills/playwright-cli .
- Muốn dùng ở mọi dự án thì thêm -g : playwright-cli install --skills -g

Cách khác: npx -y skills add microsoft/playwright-cli --skill playwright-cli --agent claude-code

### Cách dùng

Anh em ít khi phải gõ tay mấy lệnh trên, Claude sẽ gõ. Việc của anh em là nhắn cho rõ cần xem gì:

```
Mở http://localhost:3000, chụp màn hình ở bề ngang 390px và 1440px,
rồi nói xem khúc đầu trang có bị tràn ngang hay chữ bị cắt cụt chỗ nào không.

Bấm thử nút Đăng ký trên trang, xem console có báo lỗi gì không rồi kể lại cho mình.
```

Cùng nhà Microsoft, cùng điều khiển trình duyệt. Bản CLI gọn và nhanh, hợp việc chụp ảnh và kiểm tra lặt vặt mà không phải nhồi cả trang web vào bộ nhớ của Claude. Bản MCP giữ được phiên làm việc và soi sâu hơn, hợp việc dài hơi như chạy kịch bản kiểm thử.

Skill này cần chương trình playwright-cli cài trên máy mới chạy được . Kéo riêng file SKILL.md vào claude.ai là không dùng được, vì Claude trên web không chạy được lệnh trên máy anh em. Phải làm theo hộp cài ở trên.

Dùng được cũng không bắt buộc phải cài skill: Anh em có thể nhắn thẳng “Dùng playwright-cli kiểm tra giao diện trang này, chạy playwright-cli --help trước để biết lệnh” . Có skill thì nó làm chuẩn hơn.

Repo microsoft/playwright-cli . File skill là một bảng tra lệnh đầy đủ: Điều hướng, tương tác, bàn phím, chuột, tab, cookie, giả lập mạng, đọc log, chụp ảnh, quay video và cách nhắm vào phần tử bằng mã e15 lấy từ snapshot.

Mở repo trên GitHub · Chính chủ Microsoft · Cần cài thêm chương trình

## 9. Quy trình ghép cả bộ: Làm web trong 6 bước

Cài xong 8 skill mà không biết dùng theo thứ tự nào thì vẫn ra kết quả lộn xộn. Đây là quy trình mình đang chạy. Anh em cứ làm lần lượt, mỗi bước là một câu nhắn cho Claude.

### Khai báo bối cảnh một lần

Chạy /impeccable init . Nó hỏi sản phẩm của anh em là gì, ai dùng, giọng điệu thế nào, rồi ghi vào PRODUCT.md . Bước này tốn 3 phút nhưng tiết kiệm rất nhiều, vì mọi lệnh sau đều đọc file này nên không còn trả lời chung chung.

### Chốt hướng thiết kế trước khi code

Nhắn kiểu: “Làm trang landing bán khoá học tiếng Anh, phong cách như Linear nhưng ấm hơn. Đưa mình xem hướng thiết kế trước khi code.” Awesome Design lo phần tham chiếu thương hiệu, Taste Skill lo phần bố cục và nhịp thị giác. Chưa cho nó viết code ở bước này.

### Vẽ ảnh thiết kế rồi mới code

Nhắn: “follow the skill: generate images, then analyze, then code” . Image to Code sẽ vẽ ảnh từng section, phân tích, rồi mới dựng (cần công cụ sinh ảnh, xem mục 7). Nếu anh em đã có ảnh thiết kế sẵn thì kéo ảnh vào và bỏ qua bước vẽ.

### Dọn bố cục và chữ

Chạy /impeccable layout rồi /impeccable typeset . Hai lệnh này sửa khoảng cách, nhịp thị giác, font và cỡ chữ, mấy thứ dễ bị lệch nhất khi code nhanh.

### Thêm chuyển động, rồi soi lại chuyển động

Nhắn: “Thêm animation cho các phần cần thiết, rồi soi lại toàn bộ theo luật của Emil” . Skill của Emil Kowalski vừa dựng vừa chấm. Nó sẽ trả về bảng Trước / Sau / Vì sao: Chỗ nào ease-in thì đổi thành ease-out , chỗ nào scale(0) thì đổi thành scale(0.95) .

### Tự nhìn, tự sửa, rồi mới giao

Nhắn: “Dùng playwright-cli mở trang này, chụp ảnh ở cả máy tính và điện thoại, tìm lỗi hiển thị rồi tự sửa. Sau đó soi lại giao diện theo chuẩn Vercel.” Playwright nhìn, Web Design Guidelines chấm điểm. Đây là bước anh em hay bỏ qua nhất mà lại hiệu quả nhất.

Lưu đoạn dưới đây thành một file tên CLAUDE.md trong thư mục dự án, Claude sẽ tự đọc mỗi lần mở và theo quy trình mà không cần anh em nhắc lại.

```
Mỗi khi làm hoặc sửa giao diện: Chốt hướng thiết kế trước, dọn bố cục và chữ bằng Impeccable, soi animation theo luật Emil, cuối cùng dùng playwright-cli tự chụp ảnh kiểm tra ở cả máy tính và điện thoại rồi tự sửa trước khi báo xong.
```

## 10. Lỗi thường gặp và cách chữa

Bấm vào lỗi anh em đang gặp để xem cách chữa.

Hai nguyên nhân hay gặp nhất. Một là cài sai chỗ : Cài vào Claude Code nhưng lại đang chat trên claude.ai, hoặc ngược lại. Hai là cài vào thư mục khác : Skill cài theo dự án thì chỉ chạy trong dự án đó. Mở Claude Code gõ /skills để xem danh sách; không thấy thì cài lại kèm --global .

Lỗi này thật và khá phổ biến. Nhiều skill cùng nói về thiết kế thì chúng đá nhau : Taste Skill đẩy sang bố cục phá cách, Impeccable lại kéo về chuẩn mực. Chữa bằng cách tắt bớt, giữ 2-3 cái theo đúng việc đang làm. Làm web mới thì Taste + Playwright. Sửa web có sẵn thì Impeccable + Vercel.

Dấu hiệu của việc bỏ bước 6. Không có Playwright thì Claude code xong là xong, nó không nhìn lại. Cài Playwright rồi nhắn rõ: “Chụp ảnh ở 390px chiều ngang và sửa mọi chỗ bị tràn” .

Nghĩa là skill chưa được kích hoạt, hoặc anh em mô tả quá chung. Thử nói cụ thể hơn: Nêu tên thương hiệu tham chiếu, nêu cảm giác muốn có (“ấm, giấy, kiểu tạp chí”), nêu rõ cấm gì (“không gradient, không card lồng card”). Hoặc chạy npx impeccable detect . để nó chỉ thẳng ra file nào dòng nào đang mắc lỗi.

Gần như luôn là do tạo hiệu ứng cho sai thuộc tính. Chỉ được chạm vào transform và opacity . Đụng tới height , width , margin , padding là trình duyệt phải tính lại bố cục mỗi khung hình. Nhắn Claude: “Soi lại animation, chỉ dùng transform và opacity” .

Máy chưa có Node.js. Tải bản LTS ở nodejs.org, cài xong mở lại Terminal rồi chạy lại lệnh.

Thoát Claude Code rồi mở lại. Nó chỉ quét thư mục skill lúc khởi động.

Thiếu cờ -g . Chạy lại lệnh cài kèm -g , rồi gõ npx skills remove <tên-skill> trong dự án cũ để dọn bản thừa.

Anh em chưa nói soi file nào. Chỉ rõ đường dẫn thư mục hoặc tên file trong câu nhờ việc.

Phần mềm đang dùng chưa sinh được ảnh. Gắn thêm một MCP sinh ảnh, hoặc tự tạo ảnh ở chỗ khác rồi kéo vào khung chat.

Playwright CLI chạy ẩn mặc định, thêm --headed sau lệnh open để cửa sổ hiện ra. Báo chưa có trang là do chưa chạy open : Mở trang trước rồi mới chụp, snapshot hay đọc console.

Skill là file chữ do người lạ viết, trước khi cài nên mở SKILL.md đọc lướt xem nó bảo Claude làm gì. Playwright mở được mọi trang, nên đừng để nó tự lướt trang lạ rồi làm theo chữ trên đó. Mọi thứ ở đây đều sửa file trong dự án, nên trước khi cho chạy hàng loạt thì commit lại một bản cho chắc.

Đăng ký sớm

## Khoá học AI của mình sắp mở

Để lại email, mình báo trước ngày mở đăng ký và giữ mức giảm 20% cho người đăng ký sớm.

Miễn phí · Không spam · Huỷ bất cứ lúc nào

Xong rồi, cảm ơn bạn. Mình sẽ báo ngay khi mở đăng ký.

- Leonxlnx/taste-skill: Taste Skill, kèm Image to Code và 11 biến thể khác (MIT)
- vercel-labs/agent-skills: Web Design Guidelines (MIT)
- yzfly/awesome-design-html: Hơn 110 trang HTML tham chiếu thương hiệu (MIT)
- VoltAgent/awesome-claude-design: 68 file DESIGN.md cho Claude Design (MIT)
- emilkowalski/skills: Bộ 15 skill về chuyển động và chi tiết giao diện
- pbakaus/impeccable: 24 lệnh thiết kế và 59 luật phát hiện “mùi AI” (Apache 2.0)
- microsoft/playwright-cli: CLI điều khiển trình duyệt cho trợ lý AI
- playwright.dev: Tài liệu chính thức về cách cài skill Playwright CLI
- impeccable.style: Tài liệu đầy đủ của Impeccable
- vercel-labs/skills: Công cụ dòng lệnh npx skills add dùng để cài phần lớn skill ở trên
- Anthropic: Tài liệu chính thức về Agent Skills
- vercel-labs/web-interface-guidelines: Bộ quy tắc giao diện mà Web Design Guidelines tải về
- VoltAgent/awesome-design-md: 73 file DESIGN.md cho trợ lý code (MIT)
- nodejs.org: Trang tải Node.js chính thức
