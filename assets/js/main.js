// Smooth scroll cho các nút có data-scroll-target
const scrollButtons = document.querySelectorAll('[data-scroll-target]');

scrollButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetSelector = btn.getAttribute('data-scroll-target');
    if (!targetSelector) return;
    const target = document.querySelector(targetSelector);
    if (!target) return;

    const offset = 90; // có thể chỉnh nếu muốn chừa khoảng cách phía trên
    const rect = target.getBoundingClientRect();
    const absoluteY = window.scrollY + rect.top - offset;

    window.scrollTo({ top: absoluteY, behavior: 'smooth' });
  });
});

// Lightbox cho gallery
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightbox.classList.remove('pointer-events-none', 'opacity-0');
}

function closeLightbox() {
  if (!lightbox || !lightboxImg) return;
  lightbox.classList.add('opacity-0');
  // đợi animation xong rồi mới chặn pointer event
  setTimeout(() => {
    lightbox?.classList.add('pointer-events-none');
    if (lightboxImg) lightboxImg.src = '';
  }, 200);
}

if (galleryItems.length && lightbox && lightboxImg && lightboxClose) {
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-img');
      if (!src) return;
      openLightbox(src);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

// Xử lý form RSVP (demo: chỉ hiển thị thông báo, không gửi đi đâu)
window.handleRsvpSubmit = function (event) {
  event.preventDefault();
  const form = event.target;
  const status = document.getElementById('rsvp-status');
  if (!status) return;

  status.textContent = 'Cảm ơn bạn! Chúng tôi đã ghi nhận thông tin.';
  status.classList.remove('hidden');

  // Reset form sau vài giây
  setTimeout(() => {
    form.reset();
  }, 500);
};
