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
    const result = [sourceUrl(config)];
    if (/^(localhost|127\.0\.0\.1|\[::1\])$/i.test(location.hostname)) {
      result.push(new URL(encodeURIComponent(config.excelFile), location.href).href);
    }
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
      record.searchText = normalize([record.skill, record.description, record.whenToUse].join(' '));
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

