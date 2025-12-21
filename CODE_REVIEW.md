# Code Review - Wedding Invitations Website

## 📋 Tổng quan

Báo cáo này review cấu trúc HTML, CSS và naming conventions để tránh trùng lặp và cải thiện maintainability.

---

## 🔴 Vấn đề nghiêm trọng

### 1. **Trùng lặp class names cho Section Titles**

**Vấn đề:**
- `.section-title` (memories-section)
- `.section-title-1` và `.section-title-2` (together-section)
- `.ceremony-section-title-1` và `.ceremony-section-title-2` (ceremony-section)

**Đề xuất:** Tạo hệ thống naming nhất quán:
```css
/* Thay vì */
.section-title
.section-title-1
.section-title-2
.ceremony-section-title-1
.ceremony-section-title-2

/* Nên dùng */
.section-title                    /* Base class */
.section-title--split             /* Modifier cho title 2 dòng */
.section-title--primary           /* Dòng đầu */
.section-title--secondary         /* Dòng thứ hai */
```

### 2. **Trùng lặp CSS cho Image Styles**

**Vấn đề:**
- `.memories-image-small` và `.ceremony-image-small` có style tương tự
- `.memories-image-large` và `.dating-image-large` có style tương tự
- `.memories-image` và `.ceremony-image` có style giống nhau

**Đề xuất:** Tạo utility classes chung:
```css
/* Base image classes */
.image-rounded {
  border-radius: 6px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06);
  object-fit: cover;
}

.image-small { height: 123px; }
.image-medium { height: 212px; }
.image-large { height: 320px; }
```

### 3. **Trùng lặp Text Styles**

**Vấn đề:**
- `.memories-text`, `.dating-text`, `.ceremony-text-1`, `.ceremony-text-2`, `.together-text-content` có nhiều style giống nhau
- Font family, weight, size lặp lại nhiều lần

**Đề xuất:** Tạo text utility classes:
```css
.text-italic {
  font-family: 'Sarabun', sans-serif;
  font-weight: 400;
  font-style: italic;
  font-size: 10px;
  line-height: 16px;
  color: var(--color-text, #565857);
}

.text-body {
  font-family: 'Sarabun', sans-serif;
  font-weight: 300;
  font-size: 12px;
  line-height: 20px;
  color: var(--color-text, #565857);
}
```

---

## 🟡 Vấn đề cần cải thiện

### 4. **Inconsistency trong Section Naming**

**Vấn đề:**
- Tất cả sections đều có suffix `-section` (tốt)
- Nhưng class names bên trong không nhất quán:
  - `header-background` vs `header-overlay` (OK)
  - `welcome-title` vs `welcome-text` (OK)
  - `memories-layout` vs `dating-content` vs `ceremony-layout` (không nhất quán)

**Đề xuất:** Standardize layout naming:
```css
/* Thay vì */
.memories-layout
.dating-content
.ceremony-layout

/* Nên dùng */
.memories-layout
.dating-layout
.ceremony-layout
```

### 5. **Image Stack Naming Inconsistency**

**Vấn đề:**
- `.memories-image-stack` (số ít)
- `.ceremony-image-stack-1` và `.ceremony-image-stack-2` (số nhiều với số)

**Đề xuất:**
```css
/* Thay vì */
.memories-image-stack
.ceremony-image-stack-1
.ceremony-image-stack-2

/* Nên dùng */
.memories-image-wrapper
.ceremony-image-wrapper--left
.ceremony-image-wrapper--right
```

### 6. **Text Content Naming**

**Vấn đề:**
- `.ceremony-text-1` và `.ceremony-text-2` (dùng số)
- `.together-text-content` (dùng content)
- `.memories-text` (không có suffix)

**Đề xuất:**
```css
/* Thay vì */
.ceremony-text-1
.ceremony-text-2
.together-text-content
.memories-text

/* Nên dùng */
.ceremony-text--left
.ceremony-text--right
.together-text
.memories-text
```

### 7. **Date Styling Inconsistency**

**Vấn đề:**
- `.dating-date-brown` và `.dating-date-beige` (màu trong tên class - không tốt)
- Không có class tương tự cho event dates

**Đề xuất:**
```css
/* Thay vì */
.dating-date-brown
.dating-date-beige

/* Nên dùng */
.dating-date--primary
.dating-date--secondary
/* Hoặc */
.dating-date-day
.dating-date-month
```

---

## 🟢 Vấn đề nhỏ

### 8. **Z-index không có hệ thống**

**Vấn đề:** Z-index được dùng ngẫu nhiên (0, 1, 2, 3, 10) không có quy tắc

**Đề xuất:** Tạo z-index scale:
```css
:root {
  --z-base: 0;
  --z-background: 1;
  --z-content: 2;
  --z-overlay: 3;
  --z-modal: 10;
}
```

### 9. **Container Padding Inconsistency**

**Vấn đề:**
- Một số section có `.container` với padding
- Một số section có `.container` nhưng override padding (`.dating-section .container { padding: 0; }`)

**Đề xuất:** Tạo container variants:
```css
.container { /* default với padding */ }
.container--no-padding { padding: 0; }
.container--full-width { max-width: 100%; }
```

### 10. **Unused CSS Class**

**Vấn đề:**
- `.together-section .section-title` (line 810) được define nhưng không được dùng trong HTML

**Đề xuất:** Xóa hoặc sử dụng class này

---

## 📊 Tổng hợp Sections

### Sections hiện tại:
1. ✅ `header-section` - OK
2. ✅ `welcome-section` - OK
3. ✅ `event-details-section` - OK
4. ✅ `quote-section` - OK
5. ⚠️ `memories-section` - Cần refactor
6. ⚠️ `dating-section` - Cần refactor
7. ⚠️ `ceremony-section` - Cần refactor
8. ⚠️ `together-section` - Cần refactor
9. ✅ `album-section` - OK
10. ✅ `thank-you-section` - OK

---

## 🎯 Đề xuất Refactoring Plan

### Phase 1: Tạo Utility Classes
1. Tạo base classes cho images
2. Tạo base classes cho text
3. Tạo z-index system

### Phase 2: Refactor Section Classes
1. Standardize section title classes
2. Standardize layout/content naming
3. Standardize image wrapper naming

### Phase 3: Cleanup
1. Remove unused classes
2. Consolidate duplicate styles
3. Update HTML to use new classes

---

## 📝 Naming Convention Recommendations

### BEM-like Structure (Recommended)
```
.block
.block__element
.block__element--modifier
.block--modifier
```

### Examples:
```css
/* Good */
.section-title
.section-title--split
.section-title__primary
.section-title__secondary

.memories-layout
.memories-layout__left
.memories-layout__right
.memories-layout__image

/* Bad */
.section-title-1
.section-title-2
.memories-left
.memories-right
```

---

## ✅ Điểm tốt

1. ✅ Tất cả sections đều có suffix `-section` - nhất quán
2. ✅ Sử dụng CSS variables cho colors - tốt
3. ✅ Semantic HTML structure - tốt
4. ✅ Responsive considerations - tốt
5. ✅ Image optimization (loading, width, height) - tốt

---

## 🔧 Quick Wins (Có thể fix ngay)

1. **Rename `.dating-content` → `.dating-layout`** để nhất quán
2. **Rename `.ceremony-image-stack-1/2` → `.ceremony-image-wrapper--left/right`**
3. **Rename `.ceremony-text-1/2` → `.ceremony-text--left/right`**
4. **Rename `.section-title-1/2` → `.section-title--primary/secondary`**
5. **Remove unused `.together-section .section-title` class**

---

## 📌 Priority

- **High:** Fix trùng lặp image/text styles (Issue #2, #3)
- **Medium:** Standardize naming conventions (Issue #4, #5, #6)
- **Low:** Z-index system, container variants (Issue #8, #9)

