(function () {
  'use strict';

  const headers = {
    'Lệnh/Skill': 'skill',
    'Mô tả': 'description',
    'Dùng khi': 'whenToUse',
    'Cách dùng': 'howToUse',
    Category: 'category',
    'Lĩnh vực': 'domain'
  };

  function normalize(value) {
    if (window.SkillAI?.text?.normalize) return window.SkillAI.text.normalize(value);
    return String(value ?? '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLocaleLowerCase('vi-VN')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function text(value) {
    return String(value ?? '').replace(/\r\n?/g, '\n');
  }

  function headerKey(value) {
    return normalize(value).replace(/\s*\/\s*/g, '/');
  }

  function sourceUrl(config) {
    if (config.dataUrl && config.dataUrl.trim()) return config.dataUrl.trim();
    return [
      'https://raw.githubusercontent.com',
      encodeURIComponent(config.repositoryOwner),
      encodeURIComponent(config.repositoryName),
      encodeURIComponent(config.dataBranch),
      encodeURIComponent(config.excelFile)
    ].join('/');
  }

  function urls(config) {
    const result = [];
    if (/^(localhost|127\.0\.0\.1|\[::1\])$/i.test(location.hostname)) {
      result.push(new URL(encodeURIComponent(config.excelFile), location.href).href);
    }
    result.push(sourceUrl(config));
    return [...new Set(result)];
  }

  async function fetchWorkbook(config) {
    const failures = [];
    for (const url of urls(config)) {
      try {
        const response = await fetch(`${url}${url.includes('?') ? '&' : '?'}v=${Date.now()}`, { cache: 'no-store' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return { buffer: await response.arrayBuffer(), url };
      } catch (error) {
        failures.push(`${url} (${error.message})`);
      }
    }
    throw new Error(`Không tải được file Excel. ${failures.join('; ')}`);
  }

  function findSheet(workbook, preferred) {
    if (preferred && workbook.SheetNames.includes(preferred)) return preferred;
    const required = Object.keys(headers).map(headerKey);
    const found = workbook.SheetNames.find((name) => {
      const rows = XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1, raw: false, defval: '' });
      return rows.some((row) => {
        const values = new Set(row.map(headerKey));
        return required.every((item) => values.has(item));
      });
    });
    if (!found) throw new Error(`Không tìm thấy sheet có đủ 6 cột yêu cầu. Sheet hiện có: ${workbook.SheetNames.join(', ')}`);
    return found;
  }

  function headerRow(rows) {
    const required = Object.keys(headers).map(headerKey);
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
      const columns = new Map();
      rows[rowIndex].forEach((value, columnIndex) => columns.set(headerKey(value), columnIndex));
      if (required.every((item) => columns.has(item))) return { rowIndex, columns };
    }
    throw new Error('Không nhận diện được hàng tiêu đề dữ liệu.');
  }

  function fingerprint(records) {
    let hash = 2166136261;
    const value = records.map((record) => Object.values(record).join('\u241f')).join('\u241e');
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
  }

  const FEATURED_SKILLS = [
    {
      skill: 'design-taste-frontend',
      description: 'Chỉ đạo nghệ thuật chống thiết kế AI rập khuôn (anti-slop). Chọn hướng mỹ thuật (bố cục, bảng màu, typography, blueprint) từ 247 website Awwwards và kiểm định bằng trình duyệt thật.',
      whenToUse: 'Khi xây dựng, thiết kế lại, làm đẹp hoặc rà soát landing page, marketing site, hero hoặc dashboard cần cá tính riêng, tránh giao diện "mùi AI".',
      howToUse: '/design-taste-frontend [tùy chọn hướng thiết kế hoặc URL cần review]',
      category: 'Frontend Design / UI-UX',
      domain: 'Thiết kế/UI-UX',
      guideSlug: 'taste-skill'
    },
    {
      skill: 'ui-ux-pro-max',
      description: 'Hệ tri thức thiết kế UI/UX thông minh: 79 phong cách, 192 bảng màu sản phẩm kèm lý do chọn màu, 74 bộ ghép font, 119 hướng dẫn UX, 17 preset GSAP và 22 technology stacks.',
      whenToUse: 'Khi xây dựng layout, chọn hệ màu/typography, thiết kế component, review UX/accessibility và triển khai animation cho web/mobile.',
      howToUse: 'python scripts/search.py "<truy vấn>" [--domain <domain>] [--stack <stack>]',
      category: 'UI/UX Design',
      domain: 'Thiết kế/UI-UX',
      guideSlug: 'awesome-design-md'
    },
    {
      skill: 'webapp-testing',
      description: 'Bộ công cụ kiểm thử frontend web app cục bộ với Playwright: quản lý vòng đời server (with_server.py), chụp ảnh màn hình, xem browser logs và xác minh tương tác.',
      whenToUse: 'Khi cần viết test tự động, debug tương tác giao diện cục bộ, chụp ảnh màn hình kiểm thử hoặc xác minh luồng người dùng thực tế.',
      howToUse: 'python scripts/with_server.py --server "npm start" --port 3000 -- python test.py',
      category: 'Testing / QA',
      domain: 'Lập trình/phần mềm',
      guideSlug: 'playwright-cli'
    },
    {
      skill: 'web-artifacts-builder',
      description: 'Bộ công cụ khởi tạo và phát triển artifact HTML/React đa component phức tạp với Tailwind CSS và shadcn/ui: quản lý trạng thái, routing nội bộ và bundle tối ưu.',
      whenToUse: 'Khi cần tạo ứng dụng web tương tác phức tạp dạng artifact, dashboard đa tab, visualizer hoặc prototype có state management.',
      howToUse: 'scripts/init-artifact.sh <tên-dự-án>',
      category: 'Web Development / Artifact Creation',
      domain: 'Lập trình/phần mềm',
      guideSlug: 'vercel-agent-skills'
    },
    {
      skill: 'web-design-guidelines',
      description: 'Bộ tiêu chuẩn rà soát giao diện web theo chuẩn thiết kế Vercel: 100+ quy tắc về accessibility (a11y), responsive, typography, touch target và định dạng xuất file:line súc tích.',
      whenToUse: 'Khi kiểm tra độ chuẩn xác của giao diện, audit accessibility, review UX trước khi deploy sản phẩm.',
      howToUse: '/web-design-guidelines [file-hoặc-pattern]',
      category: 'UI/UX / Design Standards',
      domain: 'Thiết kế/UI-UX',
      guideSlug: 'vercel-agent-skills'
    },
    {
      skill: 'remotion-best-practices',
      description: 'Router và tập quy chuẩn sản xuất video programmatic bằng code React với Remotion: composition, animation timing, audio layering và render video hiệu năng cao.',
      whenToUse: 'Khi xây dựng, xuất hoặc chỉnh sửa video programmatic bằng React và Remotion.',
      howToUse: '/remotion-best-practices',
      category: 'Video / Motion Design',
      domain: 'Thiết kế/UI-UX',
      guideSlug: 'awesome-design-md'
    },
    {
      skill: 'canvas-design',
      description: 'Quy trình xây dựng triết lý thị giác (Design Philosophy) và biểu đạt thành tác phẩm canvas đồ họa (.png / .pdf): cấu trúc không gian, phối màu tương phản và bố cục nghệ thuật nguyên bản.',
      whenToUse: 'Khi cần tạo poster, tranh nghệ thuật số, thiết kế đồ họa tĩnh có triết lý thị giác riêng biệt.',
      howToUse: '/canvas-design',
      category: 'Visual / Creative Design',
      domain: 'Thiết kế/UI-UX',
      guideSlug: 'awesome-design-md'
    },
    {
      skill: 'code-review',
      description: 'Quy trình rà soát code theo hai trục độc lập bằng sub-agents song song: trục Standards (độ tuân thủ chuẩn coding của repo) và trục Spec (độ khớp yêu cầu kỹ thuật ban đầu).',
      whenToUse: 'Khi cần review pull request, commit diff, nhánh tính năng hoặc rà soát chất lượng code trước khi merge.',
      howToUse: '/code-review [commit-hoặc-branch]',
      category: 'Code Quality / Review',
      domain: 'Lập trình/phần mềm',
      guideSlug: 'mattpocock-skills'
    },
    {
      skill: 'codebase-design',
      description: 'Hệ từ vựng và nguyên lý thiết kế mô-đun sâu (Deep Modules): tối đa hóa hành vi đằng sau giao diện tinh gọn, đặt đúng ranh giới nối (seams) và tăng khả năng testability.',
      whenToUse: 'Khi thiết kế kiến trúc mô-đun mới, tái cấu trúc codebase phức tạp hoặc tạo seams cho unit tests.',
      howToUse: '/codebase-design',
      category: 'Software Architecture / Codebase',
      domain: 'Lập trình/phần mềm',
      guideSlug: 'mattpocock-skills'
    },
    {
      skill: 'coding-standards',
      description: 'Quy ước lập trình nền tảng đa ngôn ngữ từ Everything Claude Code: đặt tên rõ ràng, tính bất biến (immutability), xử lý lỗi tường minh và giảm thiểu side effects.',
      whenToUse: 'Khi bắt đầu dự án mới, rà soát tính nhất quán mã nguồn hoặc thiết lập baseline quy chuẩn kỹ thuật.',
      howToUse: '/coding-standards',
      category: 'Development Standards',
      domain: 'Lập trình/phần mềm',
      guideSlug: 'mattpocock-skills'
    },
    {
      skill: 'frontend-design',
      description: 'Định hướng thiết kế thị giác khác biệt và có cá tính riêng cho web: thẩm mỹ bám rễ vào bản sắc chủ thể, typography đặc trưng và bố cục phá cách không khuôn mẫu.',
      whenToUse: 'Khi cần tạo bản sắc thị giác độc nhất cho website, xây dựng trang chủ thương hiệu hoặc tránh các mẫu thiết kế chung chung.',
      howToUse: '/frontend-design',
      category: 'Frontend Development / UI Design',
      domain: 'Thiết kế/UI-UX',
      guideSlug: 'taste-skill'
    }
  ];

  function deduplicate(records) {
    const unique = new Map();
    records.forEach((record) => {
      const key = `/${normalize(record.skill).replace(/^\/+/, '')}`;
      const existing = unique.get(key);
      if (existing) {
        existing.duplicateCount += 1;
        existing.duplicateRows.push(record.sourceRow);
        return;
      }
      unique.set(key, { ...record, duplicateCount: 1, duplicateRows: [record.sourceRow] });
    });

    // Tích hợp và làm giàu dữ liệu cho 11 kỹ năng tiêu biểu
    FEATURED_SKILLS.forEach((feat, i) => {
      const key = `/${normalize(feat.skill).replace(/^\/+/, '')}`;
      const existing = unique.get(key);
      const cleanSkill = normalize(feat.skill).replace(/^\/+/, '');
      if (existing) {
        existing.description = feat.description;
        existing.whenToUse = feat.whenToUse;
        existing.howToUse = feat.howToUse;
        existing.category = feat.category;
        existing.domain = feat.domain;
        existing.guideSlug = feat.guideSlug;
        existing.searchText = normalize([cleanSkill, `/${cleanSkill}`, existing.skill, feat.description, feat.whenToUse, feat.category, feat.domain].join(' '));
      } else {
        unique.set(key, {
          id: `featured:${feat.skill}`,
          sourceRow: i + 1,
          skill: feat.skill,
          description: feat.description,
          whenToUse: feat.whenToUse,
          howToUse: feat.howToUse,
          category: feat.category,
          domain: feat.domain,
          guideSlug: feat.guideSlug,
          searchText: normalize([cleanSkill, `/${cleanSkill}`, feat.skill, feat.description, feat.whenToUse, feat.category, feat.domain].join(' ')),
          duplicateCount: 1,
          duplicateRows: [i + 1]
        });
      }
    });

    return [...unique.values()];
  }

  function parse(buffer, config) {
    if (!window.XLSX) throw new Error('Thư viện đọc Excel chưa sẵn sàng.');
    const workbook = XLSX.read(buffer, { type: 'array', raw: false });
    const sheetName = findSheet(workbook, config.worksheet);
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, raw: false, defval: '' });
    const found = headerRow(rows);
    const columns = {};
    Object.entries(headers).forEach(([source, target]) => columns[target] = found.columns.get(headerKey(source)));
    const records = [];

    for (let rowIndex = found.rowIndex + 1; rowIndex < rows.length; rowIndex += 1) {
      const row = rows[rowIndex];
      const record = {
        id: `${sheetName}:${rowIndex + 1}`,
        sourceRow: rowIndex + 1,
        skill: text(row[columns.skill]),
        description: text(row[columns.description]),
        whenToUse: text(row[columns.whenToUse]),
        howToUse: text(row[columns.howToUse]),
        category: text(row[columns.category]),
        domain: text(row[columns.domain])
      };
      if (![record.skill, record.description, record.whenToUse, record.howToUse, record.category, record.domain]
        .some((value) => value.trim())) continue;
      const clean = normalize(record.skill).replace(/^\/+/, '');
      record.searchText = normalize([clean, `/${clean}`, record.skill, record.description, record.whenToUse].join(' '));
      records.push(record);
    }

    if (!records.length) throw new Error('Sheet không có dòng dữ liệu hợp lệ.');
    const uniqueRecords = deduplicate(records);
    return {
      records: uniqueRecords,
      sourceRecordCount: records.length,
      duplicatesRemoved: records.length - uniqueRecords.length,
      sheetName,
      sourceHeaders: Object.keys(headers),
      version: `${records.length}-${fingerprint(records)}`
    };
  }

  async function load(config) {
    const result = await fetchWorkbook(config);
    return { ...parse(result.buffer, config), url: result.url, loadedAt: new Date().toISOString() };
  }

  window.SkillAIData = Object.freeze({ load, normalize, requiredHeaders: Object.freeze({ ...headers }) });
}());

