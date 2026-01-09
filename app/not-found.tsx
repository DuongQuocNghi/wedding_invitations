'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page immediately
    router.replace('/');
  }, [router]);

  return (
    <div className="min-h-screen w-full bg-[#EBDAD0] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#9F7D6A] mb-4">
          Trang không tồn tại
        </h1>
        <p className="text-[#9F7D6A]">
          Đang chuyển hướng về trang chủ...
        </p>
      </div>
    </div>
  );
}