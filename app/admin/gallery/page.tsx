'use client';

import { useEffect, useMemo, useState } from 'react';

type GalleryItem = {
  image: string;
  tag: string[];
  hidden: boolean;
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
  const [data, setData] = useState<GalleryData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedKeys, setSelectedKeys] = useState<Record<string, boolean>>({});
  const [tagInput, setTagInput] = useState('');
  const [hidden, setHidden] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
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
            setHidden(firstItem.hidden);
          }
        }
      } catch (error) {
        console.error(error);
        setStatus('Không load được dữ liệu từ galleryData.json');
      }
    };

    fetchData();
  }, []);

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

  const handleSelectItem = (fi: FlatItem) => {
    setSelectedCategory(fi.category);
    setSelectedIndex(fi.index);
    setTagInput(fi.item.tag.join(', '));
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
        const res = await fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category: t.category,
            index: t.index,
            tag: tags,
            hidden,
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
          if (!result.success) return;
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

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-slate-50 text-slate-900">
      <header className="border-b bg-white px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Gallery Manager (local)</h1>
          <p className="text-xs text-slate-500">
            Quản lý tag và trạng thái ẩn, ghi trực tiếp vào file
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
        <section className="flex-1 border-r bg-white overflow-y-auto">
          <div className="p-3 flex items-center justify-between border-b bg-slate-50">
            <span className="text-xs font-medium text-slate-600">
              Danh sách hình ({flatItems.length})
            </span>
          </div>
          <div className="p-3">
            {flatItems.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {flatItems.map((fi) => {
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
              <div className="p-3 border-b">
                <div className="relative w-full pb-[66%] rounded-md overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentItem.item.image}
                    alt={currentItem.item.image}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2 text-[11px] text-slate-500 break-all">
                  {currentItem.item.image}
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  Category:{' '}
                  <span className="font-mono">{currentItem.category}</span> | #
                  {currentItem.index}
                </p>
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

