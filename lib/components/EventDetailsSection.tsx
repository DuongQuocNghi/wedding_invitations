'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { AppColors } from '@/lib/constants/colors';
import { AppSpacing } from '@/lib/constants/spacing';
import { getDefaultEventTab } from '@/lib/constants/events';

interface FamilyMember {
  title: string;
  name: string;
}

interface FamilyDetailsProps {
  label: string;
  family: FamilyMember[];
}

function FamilyColumn({ label, family }: FamilyDetailsProps) {
  return (
    <div className="flex flex-col items-center">
      <p className="font-sarabun font-light text-xs leading-[1.2] tracking-[0.1px] text-[#5C4A37] opacity-80">
        {label}
      </p>
      <div style={{ height: AppSpacing.s8 }} />
      {family.map((member, index) => (
        <div key={index} className="mb-1 text-center whitespace-nowrap">
          <span className="font-sarabun text-xs leading-[1.2] text-[#5C4A37] opacity-80">
            {member.title}{' '}
          </span>
          <span className="font-sarabun font-medium text-sm leading-[1.2] tracking-[0.05px] text-[#5C4A37]">
            {member.name}
          </span>
        </div>
      ))}
    </div>
  );
}

interface EventDateProps {
  day: string;
  time: string;
  date: string;
  month: string;
  year: string;
}

function EventDate({ day, time, date, month, year }: EventDateProps) {
  return (
    <div className="flex flex-col items-center" style={{ transform: 'scale(1.2)' }}>
      <p className="font-sarabun font-medium text-sm leading-[1.2] tracking-[0.05px] text-[#5E121F]">
        {day}
      </p>
      <div style={{ height: AppSpacing.s8 * 1.5 }} />
      <div className="flex items-center gap-2">
        <div className="py-2 px-[12px] border-t border-b border-[#9F7D6A]">
          <p className="font-frutiger font-light text-xs leading-[1.2] text-[#5E121F] opacity-80" style={{ letterSpacing: '0.06em' }}>
            {time}
          </p>
        </div>
        <p className="font-frutiger font-bold text-[32px] leading-none tracking-[0.07px] text-[#5E121F]">
          {date}
        </p>
        <div className="py-2 px-[12px] border-t border-b border-[#9F7D6A]">
          <p className="font-frutiger font-light text-xs leading-[1.2] text-[#5E121F] opacity-80" style={{ letterSpacing: '0.06em' }}>
            {year}
          </p>
        </div>
      </div>
      <div style={{ height: AppSpacing.s8 * 1.5 }} />
      <p className="font-sarabun font-medium text-sm leading-[1.2] tracking-[0.05px] text-[#5E121F]">
        {month}
      </p>
    </div>
  );
}

interface LocationProps {
  name: string;
  address: string[];
  mapUrl: string;
}

function Location({ name, address, mapUrl }: LocationProps) {
  const openMap = () => {
    window.open(mapUrl, '_blank');
  };

  return (
    <div className="flex flex-col items-center">
      <p className="font-sarabun font-light text-sm leading-[1.2] tracking-[0.1px] text-[#565857] opacity-80">
        Tại
      </p>
      <div style={{ height: 2 }} />
      <p className="font-sarabun text-base leading-[1.6] tracking-[0.07px] text-[#565857]">
        {name}
      </p>
      <div style={{ height: 2 }} />
      {address.map((line, index) => (
        <p
          key={index}
          className="font-sarabun font-normal text-sm leading-[1.2] tracking-[0.1px] text-[#565857] opacity-80 whitespace-nowrap"
        >
          {line}
        </p>
      ))}
      <button
        onClick={openMap}
        className="mt-1 font-sarabun text-sm leading-[1.6] tracking-[0.07px] text-[#5054D3] underline"
      >
        Xem bản đồ
      </button>
    </div>
  );
}

interface TabButtonProps {
  text: string;
  isActive: boolean;
  onClick: () => void;
}

function TabButton({ text, isActive, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full h-11 rounded-[22px] border transition-all"
      style={{
        borderColor: isActive ? AppColors.accent : AppColors.surfaceMedium,
        backgroundColor: isActive ? AppColors.surfaceMedium : AppColors.surfaceLight,
        boxShadow: isActive
          ? `0 4px 6px rgba(159, 125, 106, 0.12)`
          : `0 2px 6px rgba(159, 125, 106, 0.04)`,
      }}
    >
      <p
        className={`font-utm-futura-light text-lg leading-[1.56] tracking-[0.07px] font-light ${
          isActive ? 'text-[#5E121F]' : 'text-[#565857]'
        }`}
        style={{
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
        {text}
      </p>
    </button>
  );
}

export function EventDetailsSection() {
  // Default tab: 0 = "Tiệc nhà gái", 1 = "Lễ tân hôn"
  // Check query param ?a=1 first, otherwise use date-based logic
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    setSelectedTab(getDefaultEventTab());
  }, []);

  const brideFamily: FamilyMember[] = [
    { title: 'Ông', name: 'LÝ CHÍ GIAI' },
    { title: 'Bà', name: 'CHUNG THỊ CẨM VÂN' },
  ];

  const groomFamily: FamilyMember[] = [
    { title: 'Ông', name: 'DƯƠNG VĂN MINH' },
    { title: 'Bà', name: 'NGUYỄN LÊ TUYẾT PHƯỢNG' },
  ];

  return (
    <div className="w-full px-4">
      {/* Tabs */}
      <div className="relative h-[100px] flex items-center">
        <div className="w-full flex gap-4">
          <div className="flex-1">
            <TabButton
              text="Tiệc nhà gái"
              isActive={selectedTab === 0}
              onClick={() => setSelectedTab(0)}
            />
          </div>
          <div className="flex-1">
            <TabButton
              text="Lễ tân hôn"
              isActive={selectedTab === 1}
              onClick={() => setSelectedTab(1)}
            />
          </div>
        </div>
        {/* Decoration SVG */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Image
            src="/assets/svg/NL_tab.svg"
            alt="Tab decoration"
            width={100}
            height={100}
            style={{ width: 'auto', height: 'auto' }}
            className="w-auto h-auto"
          />
        </div>
      </div>

      <div style={{ height: AppSpacing.s16 }} />

      {/* Tab content */}
      {selectedTab === 0 ? (
        <div className="flex flex-col items-center">
          {/* Family details */}
          <div className="w-full flex gap-4">
            <div className="flex-1">
              <FamilyColumn label="NHÀ GÁI" family={brideFamily} />
            </div>
            <div className="flex-1">
              <FamilyColumn label="NHÀ TRAI" family={groomFamily} />
            </div>
          </div>

          <div style={{ height: AppSpacing.s32 }} />

          {/* Invitation text */}
          <p className="text-center font-sarabun font-light text-base leading-[1.67] text-[#565857]">
            Trân trọng kính mời đến dự bữa tiệc rượu chung vui<br />
            được tổ chức vào
          </p>

          <div style={{ height: AppSpacing.s16 * 2 }} />

          {/* Event date */}
          <EventDate
            day="THỨ BẢY"
            time="LÚC 18:30"
            date="31"
            month="THÁNG 01"
            year="NĂM 2026"
          />

          <div style={{ height: AppSpacing.s16 * 2 }} />

          {/* Location */}
          <Location
            name="NHÀ HÀNG ÁI HUÊ 2"
            address={[
              '338 Trần Hưng Đạo, Phường 11, Quận 5, HCM',
            ]}
            mapUrl="https://maps.app.goo.gl/qpimk6XEoDmA6src7"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {/* Family details */}
          <div className="w-full flex gap-4">
            <div className="flex-1">
              <FamilyColumn label="NHÀ TRAI" family={groomFamily} />
            </div>
            <div className="flex-1">
              <FamilyColumn label="NHÀ GÁI" family={brideFamily} />
            </div>
          </div>

          <div style={{ height: AppSpacing.s32 }} />

          {/* Invitation text */}
          <p className="text-center font-sarabun font-light text-base leading-[1.67] text-[#565857]">
            Trân trọng kính mời đến dự bữa tiệc rượu chung vui<br />
            được tổ chức vào
          </p>

          <div style={{ height: AppSpacing.s16 * 2 }} />

          {/* Event date */}
          <EventDate
            day="CHỦ NHẬT"
            time="LÚC 10:15"
            date="08"
            month="THÁNG 02"
            year="NĂM 2026"
          />

          <div style={{ height: AppSpacing.s16 * 2 }} />

          {/* Location */}
          <Location
            name="NHÀ HÀNG Minh Phú"
            address={[
              '146 Đ. Lê Văn Việt, Tăng Nhơn Phú B, Thủ Đức',
            ]}
            mapUrl="https://maps.app.goo.gl/MCkVr82wMV39BA4V9"
          />
        </div>
      )}

      <div style={{ height: AppSpacing.s36 * 2 }} />
    </div>
  );
}

