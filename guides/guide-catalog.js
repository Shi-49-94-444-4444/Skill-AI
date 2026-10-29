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
  updated: '2026-10-29',
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
      keywords: ['grill-me', 'tdd', 'grilling', 'to-spec', 'diagnosing-bugs', 'code review', 'glossary', 'claude code', 'codex', 'kỹ thuật phần mềm'],
      source: 'https://github.com/mattpocock/skills'
    },
    {
      slug: 'vercel-agent-skills',
      title: 'Vercel Agent Skills',
      group: 'skill-collections',
      summary: 'Bộ skill chính thức của Vercel cho React, Next.js, React Native, review UI, văn phong tài liệu và deploy.',
      keywords: ['vercel', 'react', 'next.js', 'react native', 'web design guidelines', 'deploy', 'view transitions', 'writing guidelines', 'tối ưu hiệu năng'],
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
      slug: 'taste-skill',
      title: 'Taste Skill',
      group: 'design',
      summary: 'Skill chỉ đạo nghệ thuật cho agent: bốc hướng thiết kế, kiểm tra bằng trình duyệt thật, tránh giao diện “mùi AI”.',
      keywords: ['taste', 'design', 'frontend', 'landing page', 'anti-slop', 'inspect', 'art direction', 'giao diện'],
      source: 'https://github.com/Leonxlnx/taste-skill'
    },
    {
      slug: 'awesome-design-md',
      title: 'Awesome DESIGN.md',
      group: 'design',
      summary: 'Thư viện file DESIGN.md phân tích hệ thống thiết kế của các thương hiệu lớn để agent dựng UI cùng phong cách.',
      keywords: ['design.md', 'design system', 'voltagent', 'getdesign', 'brand', 'stitch', 'hệ thống thiết kế', 'ui'],
      source: 'https://github.com/VoltAgent/awesome-design-md'
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
      title: 'ECC',
      group: 'agent-harness',
      summary: 'Hệ thống tối ưu harness cho agent: skill, instinct, memory, bảo mật và quy trình nghiên cứu trước khi code.',
      keywords: ['ecc', 'everything claude code', 'harness', 'hooks', 'instincts', 'memory', 'security', 'cursor', 'opencode', 'rules'],
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
      keywords: ['playwright', 'cli', 'browser', 'trình duyệt', 'screenshot', 'automation', 'microsoft', 'snapshot', 'test'],
      source: 'https://github.com/microsoft/playwright-cli'
    },
    {
      slug: 'watermarks-remover',
      title: 'Watermarks Remover',
      group: 'tools',
      summary: 'Skill và dịch vụ Python loại bỏ dấu vết AI (ký tự ẩn, metadata C2PA/EXIF) khỏi nội dung bạn sở hữu.',
      keywords: ['watermark', 'c2pa', 'exif', 'synthid', 'unicode', 'metadata', 'privacy', 'remove-ai-marks', 'quyền riêng tư'],
      source: 'https://github.com/guillaumemeyer/watermarks-remover'
    }
  ]
});
