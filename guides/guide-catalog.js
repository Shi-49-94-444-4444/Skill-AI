/*
 * Danh mục Guide dùng chung cho menu Guide, ô tìm kiếm và trang tổng hợp.
 *
 * Thêm một Guide mới:
 *   1. Tạo file guides/<slug>.html (sao chép một trang Guide có sẵn làm khung).
 *   2. Thêm một mục vào `guides` bên dưới với đúng `slug` và `group`.
 *   3. Nếu cần nhóm mới, thêm vào `groups` (chỉ thêm khi đã có ít nhất một Guide thuộc nhóm đó).
 * Menu, tìm kiếm, trang tổng hợp và nút "Guide trước / tiếp theo" sẽ tự cập nhật.
 */
window.SKILL_AI_GUIDES = Object.freeze({
  updated: '2026-10-30',
  groups: [
    { id: 'skill-collections', label: 'Bộ sưu tập skill', description: 'Các bộ skill cài vào coding agent để làm việc có quy trình hơn.' },
    { id: 'design', label: 'Thiết kế giao diện', description: 'Skill và tài liệu giúp agent dựng giao diện có gu, có hệ thống thiết kế.' },
    { id: 'agent-harness', label: 'Agent và harness', description: 'Nền tảng chạy agent: harness, plugin, đa thiết bị, tối ưu hiệu năng.' },
    { id: 'tools', label: 'Công cụ cho agent', description: 'Ứng dụng và CLI phụ trợ: quản lý skill, điều khiển trình duyệt, làm sạch nội dung.' }
  ],
  guides: [
    {
      slug: 'mattpocock-skills',
      title: 'Matt Pocock Skills',
      group: 'skill-collections',
      summary: 'Bộ skill nhỏ, ghép được, giúp agent hỏi kỹ yêu cầu, viết test trước và giữ kiến trúc gọn.',
      keywords: ['grill-me', 'tdd', 'grilling', 'to-spec', 'diagnosing-bugs', 'code review', 'glossary', 'claude code', 'codex', 'kỹ thuật phần mềm', 'codebase-design', 'coding-standards'],
      source: 'https://github.com/mattpocock/skills'
    },
    {
      slug: 'vercel-agent-skills',
      title: 'Vercel Agent Skills',
      group: 'skill-collections',
      summary: 'Bộ skill chính thức của Vercel cho React, Next.js, React Native, review UI, văn phong tài liệu và deploy.',
      keywords: ['vercel', 'react', 'next.js', 'react native', 'web design guidelines', 'deploy', 'view transitions', 'writing guidelines', 'web-artifacts-builder', 'tối ưu hiệu năng'],
      source: 'https://github.com/vercel-labs/agent-skills'
    },
    {
      slug: 'nuwa-skill',
      title: 'Nuwa Skill (女娲)',
      group: 'skill-collections',
      summary: 'Skill chưng cất cách tư duy của một người cụ thể thành một skill riêng để agent suy luận theo góc nhìn đó.',
      keywords: ['nuwa', 'persona', 'tư duy', 'perspective', 'munger', 'feynman', 'naval', 'distill', 'chưng cất'],
      source: 'https://github.com/alchaincyf/nuwa-skill'
    },
    {
      slug: 'system-design-101',
      title: 'System Design 101',
      group: 'skill-collections',
      summary: 'Cẩm nang trực quan hóa kiến trúc hệ thống phân tán từ ByteByteGo: API Gateway, Caching, DB Sharding và Microservices.',
      keywords: ['system design', 'bytebytego', 'alex xu', 'caching', 'sharding', 'api gateway', 'microservices', 'distributed systems', 'kafka', 'redis'],
      source: 'https://github.com/ByteByteGoHq/system-design-101'
    },
    {
      slug: 'human-3-0',
      title: 'Human 3.0',
      group: 'skill-collections',
      summary: 'Mô hình phát triển bản thân 4 chiều (Tâm trí, Thể chất, Tinh thần, Sự nghiệp) và phỏng vấn AI tháo gỡ điểm nghẽn.',
      keywords: ['human 3.0', 'dan koe', 'phát triển bản thân', 'prompt phỏng vấn', 'khử giọng ai', 'de-ai', 'mind body spirit work'],
      source: 'https://cuongmeai.com/tai-lieu/human-3-0-nang-cap-ban-than'
    },
    {
      slug: 'taste-skill',
      title: 'Taste Skill',
      group: 'design',
      summary: 'Skill chỉ đạo nghệ thuật cho agent: bốc hướng thiết kế, kiểm tra bằng trình duyệt thật, tránh giao diện “mùi AI”.',
      keywords: ['taste', 'design', 'frontend', 'landing page', 'anti-slop', 'inspect', 'art direction', 'design-taste-frontend', 'frontend-design', 'giao diện'],
      source: 'https://github.com/Leonxlnx/taste-skill'
    },
    {
      slug: 'awesome-design-md',
      title: 'Awesome DESIGN.md',
      group: 'design',
      summary: 'Thư viện file DESIGN.md phân tích hệ thống thiết kế của các thương hiệu lớn để agent dựng UI cùng phong cách.',
      keywords: ['design.md', 'design system', 'voltagent', 'getdesign', 'brand', 'stitch', 'hệ thống thiết kế', 'ui', 'ui-ux-pro-max', 'canvas-design', 'remotion-best-practices'],
      source: 'https://github.com/VoltAgent/awesome-design-md'
    },
    {
      slug: 'web-design-skills',
      title: '8 Skill Thiết Kế Web Cho Claude',
      group: 'design',
      summary: 'Tuyển tập 8 kỹ năng frontend hàng đầu: Taste Skill v2, Emil Kowalski animation, Vercel guidelines và 3 núm xoay thẩm mỹ.',
      keywords: ['web design', '8 skill', 'emil kowalski', 'anti-slop', 'micro-interactions', 'taste-skill', 'playwright', 'tailwind'],
      source: 'https://cuongmeai.com/tai-lieu/8-skill-thiet-ke-web-cho-claude'
    },
    {
      slug: 'hyperframes',
      title: 'Hyperframes',
      group: 'design',
      summary: 'Khung công nghệ mã nguồn mở của HeyGen biến HTML, CSS thành video MP4 60FPS tất định cho coding agent.',
      keywords: ['hyperframes', 'heygen', 'video', 'programmatic video', 'html to video', 'mp4', 'motion', 'seekable animation'],
      source: 'https://github.com/heygen-com/hyperframes'
    },
    {
      slug: 'deepseek-harness',
      title: 'DeepSeek Harness',
      group: 'agent-harness',
      summary: 'Agent harness mã nguồn mở của DeepSeek, kiến trúc “mọi thứ là plugin”, chạy qua Web UI hoặc CLI.',
      keywords: ['dsh', 'deepseek', 'harness', 'plugin', 'cordis', 'web ui', 'mcp', 'provider', 'npx'],
      source: 'https://github.com/deepseek-ai/deepseek-harness'
    },
    {
      slug: 'ecc',
      title: 'ECC (Everything Claude Code)',
      group: 'agent-harness',
      summary: 'Hệ thống tối ưu harness cho agent: skill, instinct, memory, bảo mật và quy trình nghiên cứu trước khi code.',
      keywords: ['ecc', 'everything claude code', 'harness', 'hooks', 'instincts', 'memory', 'security', 'cursor', 'opencode', 'rules', 'coding-standards'],
      source: 'https://github.com/affaan-m/ECC'
    },
    {
      slug: 'cindy',
      title: 'Cindy',
      group: 'agent-harness',
      summary: 'AI agent mã nguồn mở dùng ngay, nối máy tính và điện thoại, gom Claude Code, Codex và Pi vào một giao diện.',
      keywords: ['cindy', 'agent', 'đa thiết bị', 'remote desktop', 'claude code', 'codex', 'pi', 'companion', 'desktop app'],
      source: 'https://github.com/makecindy/cindy'
    },
    {
      slug: 'cloudflare-security-audit',
      title: 'Cloudflare Security Audit',
      group: 'agent-harness',
      summary: 'Kỹ năng kiểm toán bảo mật 6 pha chính thức từ Cloudflare: sổ cái coverage ledger, verifier độc lập và triệt tiêu báo động giả.',
      keywords: ['cloudflare', 'security audit', 'vulnerability', 'penetration testing', 'coverage ledger', 'hunter', 'verifier', 'bảo mật'],
      source: 'https://github.com/cloudflare/security-audit-skill'
    },
    {
      slug: 'anthropic-plugins',
      title: '11 Plugin Anthropic',
      group: 'agent-harness',
      summary: 'Bộ plugin tri thức nghề nghiệp chính thức của Anthropic: kỹ năng nghề, lệnh tắt và đầu nối MCP (Slack, Notion, Jira) cho doanh nghiệp.',
      keywords: ['anthropic', 'plugins', 'cowork', 'sales', 'legal', 'finance', 'marketing', 'dev', 'mcp connectors', 'knowledge work'],
      source: 'https://cuongmeai.com/tai-lieu/11-plugin-mien-phi-anthropic'
    },
    {
      slug: 'skills-manager',
      title: 'Skills Manager',
      group: 'tools',
      summary: 'Ứng dụng desktop quản lý, đồng bộ và sắp xếp skill cho hơn 50 coding agent từ một thư viện trung tâm.',
      keywords: ['skills manager', 'desktop', 'preset', 'workspace', 'sync', 'skills.sh', 'marketplace', 'quản lý skill'],
      source: 'https://github.com/xingkongliang/skills-manager'
    },
    {
      slug: 'playwright-cli',
      title: 'Playwright CLI',
      group: 'tools',
      summary: 'CLI của Microsoft để agent điều khiển trình duyệt: mở trang, click, chụp màn hình, ghi lại thao tác thành code.',
      keywords: ['playwright', 'cli', 'browser', 'trình duyệt', 'screenshot', 'automation', 'microsoft', 'snapshot', 'test', 'webapp-testing'],
      source: 'https://github.com/microsoft/playwright-cli'
    },
    {
      slug: 'watermarks-remover',
      title: 'Watermarks Remover',
      group: 'tools',
      summary: 'Skill và dịch vụ Python loại bỏ dấu vết AI (ký tự ẩn, metadata C2PA/EXIF) khỏi nội dung bạn sở hữu.',
      keywords: ['watermark', 'c2pa', 'exif', 'synthid', 'unicode', 'metadata', 'privacy', 'remove-ai-marks', 'quyền riêng tư'],
      source: 'https://github.com/guillaumemeyer/watermarks-remover'
    },
    {
      slug: 'graphify',
      title: 'Graphify',
      group: 'tools',
      summary: 'Biểu đồ tri thức AST cho codebase, tài liệu và ảnh: tiết kiệm 71.5x token, không cần vector DB, xuất Obsidian và MCP.',
      keywords: ['graphify', 'knowledge graph', 'ast', 'tree-sitter', 'obsidian', 'mcp', 'call graph', 'god nodes', 'karpathy'],
      source: 'https://github.com/Graphify-Labs/graphify'
    },
    {
      slug: 'markitdown',
      title: 'Microsoft MarkItDown',
      group: 'tools',
      summary: 'Công cụ Microsoft chuyển đổi PDF, Word, Excel, PowerPoint thành Markdown sạch, loại bỏ việc nhân đôi token ảnh trên Claude.',
      keywords: ['markitdown', 'microsoft', 'token', 'pdf to markdown', 'excel to markdown', 'tiết kiệm token', 'mcp server', 'ocr'],
      source: 'https://cuongmeai.com/tai-lieu/markitdown-tiet-kiem-token'
    },
    {
      slug: 'rea-reverse-engineering',
      title: 'REA (Reverse Engineer Anything)',
      group: 'tools',
      summary: 'Bộ công cụ dịch ngược mã nguồn và hành vi ứng dụng đa tầng (Native, Electron, JS, .NET) với 409k sao cho coding agent.',
      keywords: ['rea', 'reverse engineer', 'decompilation', 'hopper', 'ghidra', 'electron asar', 'mcp', 'binary analysis', 'morluto'],
      source: 'https://github.com/morluto/rea'
    }
  ],
  skills: [
    {
      name: 'design-taste-frontend',
      command: '/design-taste-frontend',
      title: 'Design Taste Frontend (tasteskill v2)',
      group: 'design',
      category: 'Frontend Design / UI-UX',
      domain: 'Thiết kế/UI-UX',
      summary: 'Chỉ đạo nghệ thuật chống thiết kế AI rập khuôn (anti-slop). Chọn hướng mỹ thuật từ 247 website Awwwards và kiểm định bằng trình duyệt thật.',
      whenToUse: 'Khi dựng mới, làm lại, tạo landing page, marketing site, hero hoặc dashboard cần cá tính, tránh giao diện AI generic.',
      howToUse: '/design-taste-frontend [tùy chọn hướng thiết kế hoặc URL cần review]',
      guideSlug: 'taste-skill',
      keywords: ['taste', 'anti-slop', 'art direction', 'frontend', 'awwwards', 'landing page', 'ui-ux']
    },
    {
      name: 'ui-ux-pro-max',
      command: '/ui-ux-pro-max',
      title: 'UI/UX Pro Max - Design Intelligence',
      group: 'design',
      category: 'UI/UX Design',
      domain: 'Thiết kế/UI-UX',
      summary: 'Hệ tri thức UI/UX thông minh: 79 style, 192 bảng màu sản phẩm kèm lý do chọn màu, 74 cặp font, 119 quy tắc UX, 17 preset GSAP và 22 technology stacks.',
      whenToUse: 'Khi xây dựng layout, chọn hệ màu/typography, thiết kế component, review UX/accessibility và triển khai animation cho web/mobile.',
      howToUse: 'python scripts/search.py "<truy vấn>" [--domain <domain>] [--stack <stack>]',
      guideSlug: 'awesome-design-md',
      keywords: ['ui-ux-pro-max', 'design intelligence', 'palette', 'typography', 'gsap', 'design system', 'accessibility']
    },
    {
      name: 'webapp-testing',
      command: '/webapp-testing',
      title: 'Web Application Testing (Playwright)',
      group: 'tools',
      category: 'Testing / QA',
      domain: 'Lập trình/phần mềm',
      summary: 'Bộ công cụ kiểm thử frontend web app cục bộ với Playwright: quản lý vòng đời server (with_server.py), chụp ảnh màn hình, xem browser logs và xác minh tương tác.',
      whenToUse: 'Khi cần viết test tự động, debug tương tác giao diện cục bộ, chụp ảnh màn hình kiểm thử hoặc xác minh luồng người dùng thực tế.',
      howToUse: 'python scripts/with_server.py --server "npm start" --port 3000 -- python test.py',
      guideSlug: 'playwright-cli',
      keywords: ['playwright', 'testing', 'qa', 'e2e', 'automation', 'browser', 'with_server']
    },
    {
      name: 'web-artifacts-builder',
      command: '/web-artifacts-builder',
      title: 'Web Artifacts Builder',
      group: 'tools',
      category: 'Web Development / Artifact Creation',
      domain: 'Lập trình/phần mềm',
      summary: 'Bộ công cụ khởi tạo và phát triển artifact HTML/React đa component phức tạp với Tailwind CSS và shadcn/ui: quản lý trạng thái, routing nội bộ và bundle tối ưu.',
      whenToUse: 'Khi cần tạo ứng dụng web tương tác phức tạp dạng artifact, dashboard đa tab, visualizer hoặc prototype có state management.',
      howToUse: 'scripts/init-artifact.sh <tên-dự-án>',
      guideSlug: 'vercel-agent-skills',
      keywords: ['artifacts', 'shadcn', 'react', 'tailwind', 'claude.ai', 'components']
    },
    {
      name: 'web-design-guidelines',
      command: '/web-design-guidelines',
      title: 'Web Design Guidelines (Vercel)',
      group: 'design',
      category: 'UI/UX / Design Standards',
      domain: 'Thiết kế/UI-UX',
      summary: 'Bộ tiêu chuẩn rà soát giao diện web theo chuẩn thiết kế Vercel: 100+ quy tắc về accessibility (a11y), responsive, typography, touch target và định dạng xuất file:line súc tích.',
      whenToUse: 'Khi kiểm tra độ chuẩn xác của giao diện, audit accessibility, review UX trước khi deploy sản phẩm.',
      howToUse: '/web-design-guidelines [file-hoặc-pattern]',
      guideSlug: 'vercel-agent-skills',
      keywords: ['web design guidelines', 'vercel', 'accessibility', 'a11y', 'responsive', 'ux audit']
    },
    {
      name: 'remotion-best-practices',
      command: '/remotion-best-practices',
      title: 'Remotion Best Practices',
      group: 'design',
      category: 'Video / Motion Design',
      domain: 'Thiết kế/UI-UX',
      summary: 'Router và tập quy chuẩn sản xuất video programmatic bằng code React với Remotion: composition, animation timing, audio layering và render video hiệu năng cao.',
      whenToUse: 'Khi xây dựng, xuất hoặc chỉnh sửa video programmatic bằng React và Remotion.',
      howToUse: '/remotion-best-practices',
      guideSlug: 'awesome-design-md',
      keywords: ['remotion', 'video', 'react', 'animation', 'motion design', 'composition']
    },
    {
      name: 'hyperframes-video',
      command: '/hyperframes',
      title: 'Hyperframes Programmatic Video',
      group: 'design',
      category: 'Video / Programmatic Motion',
      domain: 'Thiết kế/UI-UX',
      summary: 'Khung kết xuất video tất định từ HTML, CSS và seekable animation. Biên dịch 60 FPS video bằng FFMPEG và Chromium headless.',
      whenToUse: 'Khi cần dựng video giới thiệu, animation động, slideshow tự động hóa bằng code HTML/CSS.',
      howToUse: '/hyperframes [mô tả kịch bản video và thời lượng]',
      guideSlug: 'hyperframes',
      keywords: ['hyperframes', 'video', 'html to video', 'mp4', 'motion', 'heygen']
    },
    {
      name: 'canvas-design',
      command: '/canvas-design',
      title: 'Canvas Design & Visual Philosophy',
      group: 'design',
      category: 'Visual / Creative Design',
      domain: 'Thiết kế/UI-UX',
      summary: 'Quy trình xây dựng triết lý thị giác (Design Philosophy) và biểu đạt thành tác phẩm canvas đồ họa (.png / .pdf): cấu trúc không gian, phối màu tương phản và bố cục nghệ thuật nguyên bản.',
      whenToUse: 'Khi cần tạo poster, tranh nghệ thuật số, thiết kế đồ họa tĩnh có triết lý thị giác riêng biệt.',
      howToUse: '/canvas-design',
      guideSlug: 'awesome-design-md',
      keywords: ['canvas', 'visual philosophy', 'art', 'poster', 'creative design', 'png', 'pdf']
    },
    {
      name: 'code-review',
      command: '/code-review',
      title: 'Code Review (Two-Axis Review)',
      group: 'skill-collections',
      category: 'Code Quality / Review',
      domain: 'Lập trình/phần mềm',
      summary: 'Quy trình rà soát code theo hai trục độc lập bằng sub-agents song song: trục Standards (độ tuân thủ chuẩn coding của repo) và trục Spec (độ khớp yêu cầu kỹ thuật ban đầu).',
      whenToUse: 'Khi cần review pull request, commit diff, nhánh tính năng hoặc rà soát chất lượng code trước khi merge.',
      howToUse: '/code-review [commit-hoặc-branch]',
      guideSlug: 'mattpocock-skills',
      keywords: ['code review', 'two-axis', 'standards', 'spec', 'subagent', 'pull request', 'diff']
    },
    {
      name: 'codebase-design',
      command: '/codebase-design',
      title: 'Codebase Design (Deep Modules)',
      group: 'skill-collections',
      category: 'Software Architecture / Codebase',
      domain: 'Lập trình/phần mềm',
      summary: 'Hệ từ vựng và nguyên lý thiết kế mô-đun sâu (Deep Modules): tối đa hóa hành vi đằng sau giao diện tinh gọn, đặt đúng ranh giới nối (seams) và tăng khả năng testability.',
      whenToUse: 'Khi thiết kế kiến trúc mô-đun mới, tái cấu trúc codebase phức tạp hoặc tạo seams cho unit tests.',
      howToUse: '/codebase-design',
      guideSlug: 'mattpocock-skills',
      keywords: ['codebase design', 'deep modules', 'seams', 'architecture', 'interface', 'implementation']
    },
    {
      name: 'coding-standards',
      command: '/coding-standards',
      title: 'Coding Standards & Best Practices',
      group: 'skill-collections',
      category: 'Development Standards',
      domain: 'Lập trình/phần mềm',
      summary: 'Quy ước lập trình nền tảng đa ngôn ngữ từ Everything Claude Code: đặt tên rõ ràng, tính bất biến (immutability), xử lý lỗi tường minh và giảm thiểu side effects.',
      whenToUse: 'Khi bắt đầu dự án mới, rà soát tính nhất quán mã nguồn hoặc thiết lập baseline quy chuẩn kỹ thuật.',
      howToUse: '/coding-standards',
      guideSlug: 'mattpocock-skills',
      keywords: ['coding standards', 'best practices', 'clean code', 'immutability', 'naming']
    },
    {
      name: 'cloudflare-audit',
      command: '/security-audit',
      title: 'Cloudflare Security Audit',
      group: 'agent-harness',
      category: 'Security / Penetration Testing',
      domain: 'Bảo mật/Hệ thống',
      summary: 'Quy trình kiểm toán bảo mật 6 pha chính thức từ Cloudflare: lập bản đồ trust boundaries, săn lỗ hổng đa lớp, kiểm chứng độc lập chống báo động giả.',
      whenToUse: 'Khi kiểm toán mã nguồn trước khi deploy, audit lỗ hổng web, API, supply chain hoặc cloud IAM.',
      howToUse: 'security audit this codebase, output to ~/audits/my-project',
      guideSlug: 'cloudflare-security-audit',
      keywords: ['security audit', 'cloudflare', 'vulnerability', 'penetration', 'ledger', 'hunter', 'verifier']
    },
    {
      name: 'graphify-ast',
      command: '/graphify',
      title: 'Graphify AST Knowledge Graph',
      group: 'tools',
      category: 'Knowledge Graph / AST Parsing',
      domain: 'Lập trình/phần mềm',
      summary: 'Biến codebase, tài liệu, file PDF và ảnh sơ đồ thành biểu đồ tri thức AST có thể truy vấn, tiết kiệm 71.5x token và xuất Obsidian vault.',
      whenToUse: 'Khi cần nắm bắt cấu trúc dự án lớn, tìm hiểu call graph giữa các hàm hoặc xuất Obsidian vault tra cứu.',
      howToUse: '/graphify . [--mode deep] [--wiki]',
      guideSlug: 'graphify',
      keywords: ['graphify', 'knowledge graph', 'ast', 'tree-sitter', 'obsidian', 'mcp']
    },
    {
      name: 'markitdown-cli',
      command: '/markitdown',
      title: 'Microsoft MarkItDown Token Saver',
      group: 'tools',
      category: 'Document Conversion / Token Optimization',
      domain: 'Lập trình/phần mềm',
      summary: 'Chuyển đổi 10 định dạng tài liệu (PDF, Word, Excel, PPTX, ZIP, Audio) sang Markdown sạch, loại bỏ việc nạp ảnh trang và tiết kiệm hơn 80% token.',
      whenToUse: 'Khi cần nạp tài liệu văn phòng dày, hợp đồng, bảng tính Excel vào Claude hoặc coding agent mà không muốn tốn token ảnh.',
      howToUse: 'markitdown <input-file> > <output.md>',
      guideSlug: 'markitdown',
      keywords: ['markitdown', 'microsoft', 'token', 'pdf', 'excel', 'word', 'optimization']
    },
    {
      name: 'rea-reverse',
      command: '/rea',
      title: 'REA Reverse Engineer Anything',
      group: 'tools',
      category: 'Reverse Engineering / Binary Analysis',
      domain: 'Bảo mật/Hệ thống',
      summary: 'Kết nối Hopper, Ghidra và Chrome DevTools qua MCP để dịch ngược mã nguồn nhị phân, giải nén Electron ASAR và tái hiện tính năng sạch sẽ.',
      whenToUse: 'Khi cần mổ xẻ cơ chế hoạt động của một ứng dụng không có mã nguồn gốc hoặc phân tích giao thức nhị phân.',
      howToUse: 'npx rea-agents setup',
      guideSlug: 'rea-reverse-engineering',
      keywords: ['rea', 'reverse engineer', 'decompilation', 'hopper', 'ghidra', 'electron', 'binary']
    },
    {
      name: 'frontend-design',
      command: '/frontend-design',
      title: 'Frontend Design (Distinctive Identity)',
      group: 'design',
      category: 'Frontend Development / UI Design',
      domain: 'Thiết kế/UI-UX',
      summary: 'Định hướng thiết kế thị giác khác biệt và có cá tính riêng cho web: thẩm mỹ bám rễ vào bản sắc chủ thể, typography đặc trưng và bố cục phá cách không khuôn mẫu.',
      whenToUse: 'Khi cần tạo bản sắc thị giác độc nhất cho website, xây dựng trang chủ thương hiệu hoặc tránh các mẫu thiết kế chung chung.',
      howToUse: '/frontend-design',
      guideSlug: 'taste-skill',
      keywords: ['frontend design', 'art direction', 'identity', 'distinctive', 'typography', 'palette']
    }
  ]
});
