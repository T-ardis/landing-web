import { Client } from '@notionhq/client';
import { NextRequest, NextResponse } from 'next/server';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  try {
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID! },
      properties: {
        Email: {
          title: [{ text: { content: email } }],
        },
        'Signed Up': {
          date: { start: new Date().toISOString() },
        },
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Notion error:', err);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
