'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AppColors } from '@/lib/constants/colors';
import { AppSpacing } from '@/lib/constants/spacing';

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
      <p className="font-sarabun font-semibold text-[10px] leading-[1.2] tracking-[0.1px] text-[#5C4A37]">
        {label}
      </p>
      <div style={{ height: AppSpacing.s8 }} />
      {family.map((member, index) => (
        <div key={index} className="mb-1 text-center">
          <span className="font-sarabun text-[10px] leading-[1.2] text-[#5C4A37]">
            {member.title}{' '}
          </span>
          <span className="font-sarabun font-bold text-[10px] leading-[1.2] tracking-[0.05px] text-[#5C4A37]">
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
    <div className="flex flex-col items-center">
      <p className="font-sarabun font-medium text-sm leading-[1.2] tracking-[0.05px] text-[#5C4A37]">
        {day}
      </p>
      <div style={{ height: AppSpacing.s8 }} />
      <div className="flex items-center gap-2">
        <div className="py-2 border-t border-b border-[#9F7D6A]">
          <p className="font-sarabun text-xs leading-[1.2] text-[#5C4A37]">
            {time}
          </p>
        </div>
        <p className="font-sarabun font-bold text-[32px] leading-none tracking-[0.07px] text-[#5E121F]">
          {date}
        </p>
        <div className="py-2 border-t border-b border-[#9F7D6A]">
          <p className="font-sarabun text-xs leading-[1.2] text-[#5C4A37]">
            {year}
          </p>
        </div>
      </div>
      <div style={{ height: AppSpacing.s4 }} />
      <p className="font-sansita-swashed text-sm leading-[1.43] tracking-[0.09px] text-[#5E121F]">
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
      <p className="font-sansita-swashed font-light text-[10px] leading-none text-[#565857]">
        Tại
      </p>
      <div style={{ height: AppSpacing.s4 }} />
      <p className="font-sansita-swashed text-[10px] leading-[1.6] tracking-[0.07px] text-[#565857]">
        {name}
      </p>
      <div style={{ height: AppSpacing.s4 }} />
      {address.map((line, index) => (
        <p
          key={index}
          className="font-sansita-swashed text-[10px] leading-[1.6] tracking-[0.07px] text-[#565857]"
        >
          {line}
        </p>
      ))}
      <button
        onClick={openMap}
        className="mt-2 font-sansita-swashed text-[10px] leading-[1.6] tracking-[0.07px] text-[#5054D3] underline"
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
  const [selectedTab, setSelectedTab] = useState(0); // 0 = bride, 1 = reception

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
          <p className="text-center font-sarabun text-[10px] leading-[1.6] text-[#5C4A37]">
            Trân trọng kính mời đến dự bữa tiệc rượu chung vui<br />
            được tổ chức vào
          </p>

          <div style={{ height: AppSpacing.s16 }} />

          {/* Event date */}
          <EventDate
            day="THỨ BẢY"
            time="LÚC 18:30"
            date="31"
            month="THÁNG 01"
            year="NĂM 2026"
          />

          <div style={{ height: AppSpacing.s16 }} />

          {/* Location */}
          <Location
            name="NHÀ HÀNG ÁI HUÊ 2"
            address={[
              '338 Trần Hưng Đạo, Phường 11, Quận 5,',
              'Thành phố Hồ Chí Minh',
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

          <div style={{ height: AppSpacing.s24 }} />

          {/* Invitation text */}
          <p className="text-center font-sarabun text-[10px] leading-[1.6] text-[#5C4A37]">
            Trân trọng kính mời đến dự bữa tiệc rượu chung vui<br />
            được tổ chức vào
          </p>

          <div style={{ height: AppSpacing.s24 }} />

          {/* Event date */}
          <EventDate
            day="CHỦ NHẬT"
            time="LÚC 10:15"
            date="08"
            month="THÁNG 02"
            year="NĂM 2026"
          />

          <div style={{ height: AppSpacing.s24 }} />

          {/* Location */}
          <Location
            name="NHÀ HÀNG Minh Phú"
            address={[
              '146 Đ. Lê Văn Việt, Tăng Nhơn Phú B, Thủ Đức,',
              'Thành phố Hồ Chí Minh',
            ]}
            mapUrl="https://maps.app.goo.gl/MCkVr82wMV39BA4V9"
          />
        </div>
      )}

      <div style={{ height: AppSpacing.s36 }} />
    </div>
  );
}

