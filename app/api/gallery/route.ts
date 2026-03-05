import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export const runtime = 'nodejs';
export const dynamic = 'force-static';
export const revalidate = 0;

const DATA_PATH = path.join(
  process.cwd(),
  'lib',
  'constants',
  'galleryData.json',
);

export async function GET() {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf-8');
    const json = JSON.parse(raw);
    return NextResponse.json(json);
  } catch (error) {
    console.error('Failed to read gallery data', error);
    return NextResponse.json(
      { error: 'Failed to read gallery data' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category, index, tag, hidden } = body as {
      category?: string;
      index?: number;
      tag?: string[];
      hidden?: boolean;
    };

    if (!category || typeof index !== 'number') {
      return NextResponse.json(
        { error: 'Invalid payload: category and index are required' },
        { status: 400 },
      );
    }

    const raw = await fs.readFile(DATA_PATH, 'utf-8');
    const json = JSON.parse(raw) as {
      data?: Record<
        string,
        {
          image: string;
          tag: string[];
          hidden: boolean;
        }[]
      >;
    };

    if (!json.data || !Array.isArray(json.data[category])) {
      return NextResponse.json(
        { error: `Category "${category}" not found` },
        { status: 404 },
      );
    }

    const items = json.data[category];
    if (!items[index]) {
      return NextResponse.json(
        { error: `Item at index ${index} not found in category ${category}` },
        { status: 404 },
      );
    }

    const nextTags = Array.isArray(tag) ? tag : [];
    items[index] = {
      ...items[index],
      tag: nextTags,
      hidden: Boolean(hidden),
    };

    await fs.writeFile(DATA_PATH, JSON.stringify(json, null, 2), 'utf-8');

    return NextResponse.json({ success: true, item: items[index] });
  } catch (error) {
    console.error('Failed to update gallery data', error);
    return NextResponse.json(
      { error: 'Failed to update gallery data' },
      { status: 500 },
    );
  }
}

