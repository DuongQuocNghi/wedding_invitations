'use client';

import { useEffect, useMemo, useState } from 'react';

type Orientation = 'landscape' | 'portrait';

type GalleryItem = {
  image: string;
  tag: string[];
  orientation?: Orientation;
  hidden: boolean;
  /** Display order (smaller = first). Null/undefined = use array order. */
  index?: number | null;
};

type GalleryData = {
  data: Record<string, GalleryItem[]>;
};

type FlatItem = {
  category: string;
  index: number;
  item: GalleryItem;
};

export default function GalleryAdminPage() {
  const isProd = process.env.NODE_ENV === 'production';

  const [data, setData] = useState<GalleryData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedKeys, setSelectedKeys] = useState<Record<string, boolean>>({});
  const [tagInput, setTagInput] = useState('');
  const [displayIndexInput, setDisplayIndexInput] = useState('');
  const [orientation, setOrientation] = useState<Orientation>('landscape');
  const [hidden, setHidden] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<
    'all' | 'pre_wedding' | 'wedding_3101' | 'wedding_0802'
  >('all');
  const [filterHiddenOnly, setFilterHiddenOnly] = useState(false);
  const [filterNoTagOnly, setFilterNoTagOnly] = useState(false);
  const [filterOrientation, setFilterOrientation] = useState<
    'all' | 'landscape' | 'portrait'
  >('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    if (isProd) {
      setStatus(
        'Trang quản lý gallery chỉ dùng trong môi trường development/local.',
      );
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch('/api/gallery', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load gallery data');
        const json: GalleryData = await res.json();
        setData(json);
        const categories = Object.keys(json.data || {});
        if (categories.length > 0) {
          setSelectedCategory(categories[0]);
          setSelectedIndex(0);
          const firstItem = json.data[categories[0]]?.[0];
          if (firstItem) {
            setTagInput(firstItem.tag.join(', '));
            setDisplayIndexInput(
              firstItem.index != null ? String(firstItem.index) : '',
            );
            setOrientation(
              firstItem.orientation === 'portrait' ? 'portrait' : 'landscape',
            );
            setHidden(firstItem.hidden);
          }
        }
      } catch (error) {
        console.error(error);
        setStatus('Không load được dữ liệu từ galleryData.json');
      }
    };

    fetchData();
  }, [isProd]);

  const flatItems = useMemo<FlatItem[]>(() => {
    if (!data?.data) return [];
    return Object.entries(data.data).flatMap(([category, items]) =>
      items.map((item, index) => ({
        category,
        index,
        item,
      })),
    );
  }, [data]);

  const currentItem: FlatItem | null = useMemo(() => {
    if (!data || selectedCategory == null || selectedIndex == null) return null;
    const items = data.data[selectedCategory];
    if (!items || !items[selectedIndex]) return null;
    return {
      category: selectedCategory,
      index: selectedIndex,
      item: items[selectedIndex],
    };
  }, [data, selectedCategory, selectedIndex]);

  const allTags = useMemo<string[]>(() => {
    const set = new Set<string>();
    flatItems.forEach((fi) => {
      if (filterCategory !== 'all' && fi.category !== filterCategory) {
        return;
      }
      fi.item.tag.forEach((t) => set.add(t));
    });
    return Array.from(set).sort();
  }, [flatItems, filterCategory]);

  const displayedItems = useMemo<FlatItem[]>(() => {
    let items = flatItems;

    if (filterCategory !== 'all') {
      items = items.filter((fi) => fi.category === filterCategory);
    }

    if (filterHiddenOnly) {
      items = items.filter((fi) => !fi.item.hidden);
    }

    if (filterNoTagOnly) {
      items = items.filter((fi) => !fi.item.tag || fi.item.tag.length === 0);
    }

    if (selectedTag) {
      items = items.filter((fi) => fi.item.tag.includes(selectedTag));
    }

    if (filterOrientation !== 'all') {
      items = items.filter((fi) => {
        const o = fi.item.orientation === 'portrait' ? 'portrait' : 'landscape';
        return o === filterOrientation;
      });
    }

    // Sort by display index (smaller first); null/undefined last; then by category and array index
    return [...items].sort((a, b) => {
      const orderA = a.item.index ?? Infinity;
      const orderB = b.item.index ?? Infinity;
      if (orderA !== orderB) return orderA - orderB;
      if (a.category !== b.category) return a.category.localeCompare(b.category);
      return a.index - b.index;
    });
  }, [
    flatItems,
    filterCategory,
    filterHiddenOnly,
    filterNoTagOnly,
    filterOrientation,
    selectedTag,
  ]);

  const handleSelectItem = (fi: FlatItem) => {
    setSelectedCategory(fi.category);
    setSelectedIndex(fi.index);
    setTagInput(fi.item.tag.join(', '));
    setDisplayIndexInput(
      fi.item.index != null ? String(fi.item.index) : '',
    );
    setOrientation(
      fi.item.orientation === 'portrait' ? 'portrait' : 'landscape',
    );
    setHidden(fi.item.hidden);
    setStatus(null);

    const key = `${fi.category}:${fi.index}`;
    setSelectedKeys((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = async () => {
    const tags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    // Debug: log giá trị đang chuẩn bị lưu
    // Lưu ý: log này xuất hiện trên browser console, không phải terminal
    console.log('[GalleryAdmin] handleSave', {
      tags,
      hidden,
      selectedCategory,
      selectedIndex,
      selectedKeys,
    });

    const targets: { category: string; index: number }[] = [];

    // Nếu có nhiều hình được chọn thì áp dụng cho tất cả
    Object.entries(selectedKeys).forEach(([key, value]) => {
      if (!value) return;
      const [category, indexStr] = key.split(':');
      const index = Number(indexStr);
      if (!Number.isNaN(index)) {
        targets.push({ category, index });
      }
    });

    // Nếu chưa chọn gì, fallback về hình hiện tại
    if (targets.length === 0) {
      if (!selectedCategory || selectedIndex == null) {
        setStatus('Chưa chọn hình để lưu');
        return;
      }
      targets.push({ category: selectedCategory, index: selectedIndex });
    }

    setIsSaving(true);
    setStatus(null);
    try {
      // Gửi tuần tự từng request để tránh race condition khi đọc/ghi cùng lúc vào file JSON
      const responses: { target: { category: string; index: number }; result: { success: boolean; item: GalleryItem } }[] =
        [];

      for (const t of targets) {
        // eslint-disable-next-line no-await-in-loop
        const displayIndex =
          displayIndexInput.trim() === ''
            ? null
            : Number(displayIndexInput.trim());
        const res = await fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category: t.category,
            index: t.index,
            tag: tags,
            orientation,
            hidden,
            displayIndex:
              Number.isNaN(displayIndex) ? undefined : displayIndex,
          }),
        });

        if (!res.ok) {
          const error = await res.json().catch(() => null);
          throw new Error(error?.error || 'Lưu thất bại');
        }

        // eslint-disable-next-line no-await-in-loop
        const result = (await res.json()) as {
          success: boolean;
          item: GalleryItem;
        };

        responses.push({ target: t, result });
      }

      if (data) {
        const next: GalleryData = {
          data: { ...data.data },
        };

        responses.forEach(({ target, result }) => {
          if (!result.success || !result.item) return;
          const existing = next.data[target.category] || [];
          const cloned = [...existing];
          if (cloned[target.index]) {
            cloned[target.index] = result.item;
            next.data[target.category] = cloned;
          }
        });

        setData(next);
      }

      setStatus(
        `Đã lưu cho ${targets.length} hình vào galleryData.json`,
      );
      // Sau khi lưu thành công thì bỏ chọn tất cả
      setSelectedKeys({});
    } catch (error) {
      console.error(error);
      setStatus('Có lỗi khi lưu vào galleryData.json');
    } finally {
      setIsSaving(false);
    }
  };

  if (isProd) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600">
        <p className="text-sm">
          Trang quản lý gallery chỉ dùng trong môi trường development/local.
        </p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-slate-50 text-slate-900">
      <header className="border-b bg-white px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Gallery Manager (local)</h1>
          <p className="text-xs text-slate-500">
            Quản lý tag, orientation và trạng thái ẩn, ghi trực tiếp vào file
            <span className="font-mono ml-1">
              lib/constants/galleryData.json
            </span>
          </p>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <p className="text-[11px] text-slate-600">
            Đang chọn:{' '}
            {
              Object.values(selectedKeys).filter((value) => value)
                .length
            }{' '}
            hình
          </p>
          {status && (
            <p className="text-[11px] text-slate-600 max-w-md text-right">
              {status}
            </p>
          )}
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Left: image list (thumbnail view) */}
        <section className="flex-1 border-r bg-white flex flex-col">
          <div className="p-3 flex flex-col gap-2 border-b bg-slate-50 sticky top-0 z-10">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-slate-600">
                Danh sách hình ({displayedItems.length}/{flatItems.length})
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-500">Lọc theo bộ:</span>
                {[
                  { key: 'all', label: 'Tất cả' },
                  { key: 'pre_wedding', label: 'Pre-wedding' },
                  { key: 'wedding_3101', label: 'Wedding 31/01' },
                  { key: 'wedding_0802', label: 'Wedding 08/02' },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() =>
                      setFilterCategory(
                        opt.key as
                          | 'all'
                          | 'pre_wedding'
                          | 'wedding_3101'
                          | 'wedding_0802',
                      )
                    }
                    className={[
                      'px-2 py-0.5 rounded-full border text-[11px] transition-colors',
                      filterCategory === opt.key
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                        : 'border-slate-300 text-slate-600 hover:border-slate-500',
                    ].join(' ')}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex items-center gap-1.5 text-[11px] text-slate-600">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  checked={filterHiddenOnly}
                  onChange={(e) => setFilterHiddenOnly(e.target.checked)}
                />
                Ẩn hình đã bị ẩn
              </label>
              <label className="inline-flex items-center gap-1.5 text-[11px] text-slate-600">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  checked={filterNoTagOnly}
                  onChange={(e) => setFilterNoTagOnly(e.target.checked)}
                />
                Chỉ hình chưa gắn tag
              </label>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500 whitespace-nowrap">
                Lọc theo orientation:
              </span>
              <div className="flex gap-1.5">
                {[
                  { key: 'all' as const, label: 'Tất cả' },
                  { key: 'landscape' as const, label: 'Landscape (ngang)' },
                  { key: 'portrait' as const, label: 'Portrait (dọc)' },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setFilterOrientation(opt.key)}
                    className={[
                      'px-2 py-0.5 rounded-full border text-[11px] transition-colors',
                      filterOrientation === opt.key
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                        : 'border-slate-300 text-slate-600 hover:border-slate-500',
                    ].join(' ')}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-[11px] text-slate-500 whitespace-nowrap">
                Lọc theo tag:
              </span>
              <div className="flex-1 flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedTag(null)}
                  className={[
                    'px-2 py-0.5 rounded-full border text-[11px] transition-colors',
                    selectedTag === null
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                      : 'border-slate-300 text-slate-600 hover:border-slate-500',
                  ].join(' ')}
                >
                  Tất cả tag
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() =>
                      setSelectedTag((current) =>
                        current === tag ? null : tag,
                      )
                    }
                    className={[
                      'px-2 py-0.5 rounded-full border text-[11px] transition-colors',
                      selectedTag === tag
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                        : 'border-slate-300 text-slate-600 hover:border-slate-500',
                    ].join(' ')}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="p-3 flex-1 overflow-y-auto">
            {displayedItems.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
                {displayedItems.map((fi) => {
                  const isActive =
                    fi.category === selectedCategory &&
                    fi.index === selectedIndex;
                  const key = `${fi.category}:${fi.index}`;
                  const isSelected = !!selectedKeys[key];
                  return (
                    <button
                      key={`${fi.category}-${fi.index}`}
                      type="button"
                      onClick={() => handleSelectItem(fi)}
                      className={[
                        'group relative overflow-hidden rounded-md border text-left transition-all',
                        isActive || isSelected
                          ? 'border-emerald-500 ring-1 ring-emerald-500'
                          : 'border-slate-200 hover:border-slate-400 hover:shadow-sm',
                      ].join(' ')}
                    >
                      {/* Checkbox & index badge */}
                      <div className="absolute top-1 left-1 z-10 flex items-center gap-1">
                        <input
                          type="checkbox"
                          className="h-3.5 w-3.5 rounded border-slate-300 text-emerald-600 bg-white/80"
                          readOnly
                          checked={isSelected}
                        />
                        <span className="px-1.5 py-0.5 rounded bg-black/50 text-[9px] text-white font-mono">
                          #{fi.index}
                        </span>
                        {fi.item.index != null && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-600/90 text-[9px] text-white font-mono">
                            index: {fi.item.index}
                          </span>
                        )}
                      </div>

                      {/* Hidden badge */}
                      {fi.item.hidden && (
                        <span className="absolute top-1 right-1 z-10 px-1.5 py-0.5 rounded bg-rose-500/80 text-[9px] text-white">
                          hidden
                        </span>
                      )}

                      {/* Thumbnail */}
                      <div className="relative w-full pb-[75%] bg-slate-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={fi.item.image}
                          alt={fi.item.image}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform"
                        />
                      </div>

                      {/* Bottom overlay info */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-1.5 pb-1.5 pt-6">
                        {fi.item.index != null && (
                          <p className="text-[9px] text-emerald-200 font-mono">
                            index: {fi.item.index}
                          </p>
                        )}
                        <p className="text-[9px] text-slate-100 font-mono truncate">
                          {fi.category}
                        </p>
                        {fi.item.tag.length > 0 && (
                          <p className="mt-0.5 text-[9px] text-slate-100/90 truncate">
                            {fi.item.tag.join(', ')}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                Không tìm thấy item nào trong galleryData.json
              </p>
            )}
          </div>
        </section>

        {/* Right: detail + form */}
        <section className="w-[400px] max-w-[45%] bg-white flex flex-col border-l">
          <div className="p-3 border-b bg-slate-50">
            <h2 className="text-sm font-semibold text-slate-700">
              Chi tiết / Chỉnh sửa
            </h2>
          </div>

          {currentItem ? (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="p-3 border-b space-y-2">
                <div className="relative w-full pb-[66%] rounded-md overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentItem.item.image}
                    alt={currentItem.item.image}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-slate-500 break-all">
                      {currentItem.item.image}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      Category:{' '}
                      <span className="font-mono">
                        {currentItem.category}
                      </span>{' '}
                      | #{currentItem.index}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      window.open(currentItem.item.image, '_blank', 'noopener')
                    }
                    className="shrink-0 inline-flex items-center rounded-md border border-slate-300 bg-white px-2 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Xem full hình
                  </button>
                </div>
              </div>

              <div className="p-3 space-y-3 overflow-y-auto">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Tag (dạng &quot;abc, dev, test&quot;)
                  </label>
                  <textarea
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    rows={3}
                    className="w-full text-xs rounded border border-slate-300 px-2 py-1.5 font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="abc, dev, test"
                  />
                  {allTags.length > 0 && (
                    <div className="mt-2">
                      <p className="text-[11px] text-slate-500 mb-1">
                        Tag có sẵn (bấm để thêm):
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {allTags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() =>
                              setTagInput((prev) => {
                                const current = prev
                                  .split(',')
                                  .map((t) => t.trim())
                                  .filter((t) => t.length > 0);
                                if (current.includes(tag)) return prev;
                                const next = [...current, tag];
                                return next.join(', ');
                              })
                            }
                            className="px-2 py-0.5 rounded-full border border-slate-300 bg-white text-[11px] text-slate-700 hover:border-emerald-500 hover:bg-emerald-50"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Thứ tự hiển thị (index)
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={displayIndexInput}
                    onChange={(e) => setDisplayIndexInput(e.target.value)}
                    className="w-full text-xs rounded border border-slate-300 px-2 py-1.5 font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Để trống = theo thứ tự mảng"
                  />
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    Số nhỏ hiển thị trước. Trống = cuối danh sách.
                  </p>
                </div>

                <div>
                  <span className="block text-xs font-medium text-slate-700 mb-1.5">
                    Orientation
                  </span>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="orientation"
                        value="landscape"
                        className="border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        checked={orientation === 'landscape'}
                        onChange={() => setOrientation('landscape')}
                      />
                      Landscape (ngang)
                    </label>
                    <label className="inline-flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="orientation"
                        value="portrait"
                        className="border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        checked={orientation === 'portrait'}
                        onChange={() => setOrientation('portrait')}
                      />
                      Portrait (dọc)
                    </label>
                  </div>
                </div>

                <label className="inline-flex items-center gap-2 text-xs text-slate-700">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    checked={hidden}
                    onChange={(e) => setHidden(e.target.checked)}
                  />
                  Hidden (ẩn hình này)
                </label>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full mt-2 inline-flex justify-center items-center rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Đang lưu...' : 'Lưu vào galleryData.json'}
                </button>

                <p className="text-[10px] text-slate-400">
                  Trang này chỉ dùng local. API sẽ ghi trực tiếp vào file JSON
                  trên disk, không cần deploy.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center px-4 text-xs text-slate-500">
              Chọn một hình bên trái để chỉnh sửa.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

