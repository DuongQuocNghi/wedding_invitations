'use client';

const GRADIENT_COLOR = '#F4F1EA';

/**
 * Wedding Day hero section: image with bottom gradient blending into background,
 * "THANK YOU" and thank-you copy. Image is placeholder (gray) until imported.
 */
export function WeddingDayHeroSection() {
  return (
    <section className="w-full">
      {/* Image container: fixed height, width 100%; image keeps aspect ratio (object-cover) */}
      <div className="relative w-full h-[278px] overflow-hidden">
        <img
          src="https://ik.imagekit.io/8f6s5msl5/tr:w-1000/wedding_0802/w/GIA02398.jpg"
          alt="Wedding couple"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Gradient overlay: background color at bottom, fades to transparent upward */}
        <div
          className="absolute inset-x-0 bottom-0 h-[40%] pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${GRADIENT_COLOR} 0%, ${GRADIENT_COLOR} 20%, transparent 100%)`,
          }}
        />
      </div>

      {/* Text block over gradient / below image */}
      <div
        className="relative -mt-12 px-6 pb-2 flex flex-col items-center gap-3"
        style={{ color: '#5C4A37' }}
      >
        <h2
          className="text-center font-normal"
          style={{
            fontFamily: "'Castoro Titling', serif",
            fontWeight: 400,
            fontSize: '32px',
            lineHeight: '100%',
            letterSpacing: '0.06em',
          }}
        >
          THANK YOU
        </h2>
        <p
          className="text-center max-w-[360px]"
          style={{
            fontFamily: 'Sarabun, sans-serif',
            fontWeight: 300,
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: 0,
          }}
        >
          Chúng con/em xin chân thành gửi lời cảm ơn sự chúc phúc và tình cảm quý báu đã dành cho chúng con/em trong ngày trọng đại này.
        </p>
      </div>
    </section>
  );
}
