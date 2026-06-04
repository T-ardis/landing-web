import { Client } from '@notionhq/client';
import { NextRequest, NextResponse } from 'next/server';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

function richText(value: string) {
  return { rich_text: [{ text: { content: value ?? '' } }] };
}

function inferSource(referrer: string): { utm_source: string; utm_medium: string } | null {
  if (!referrer) return null;
  try {
    const host = new URL(referrer).hostname.replace('www.', '');
    if (/google\./.test(host))  return { utm_source: 'google',   utm_medium: 'organic' };
    if (/bing\./.test(host))    return { utm_source: 'bing',     utm_medium: 'organic' };
    if (/yahoo\./.test(host))   return { utm_source: 'yahoo',    utm_medium: 'organic' };
    if (/t\.co|twitter\./.test(host)) return { utm_source: 'twitter', utm_medium: 'social' };
    if (/instagram\./.test(host))     return { utm_source: 'instagram', utm_medium: 'social' };
    if (/linkedin\./.test(host))      return { utm_source: 'linkedin',  utm_medium: 'social' };
    if (/facebook\./.test(host))      return { utm_source: 'facebook',  utm_medium: 'social' };
  } catch { /* invalid URL */ }
  return null;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, utm_campaign, utm_term, utm_content, referrer } = body;
  let { utm_source, utm_medium } = body;

  // Auto-tag if no UTM params but referrer is recognisable
  if (!utm_source && referrer) {
    const inferred = inferSource(referrer);
    if (inferred) {
      utm_source = inferred.utm_source;
      utm_medium = inferred.utm_medium;
    }
  }

  // Fallback for truly direct / unknown traffic
  if (!utm_source) {
    utm_source = 'direct';
    utm_medium = 'unknown';
  }

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
        ...(utm_source   && { utm_source:   richText(utm_source) }),
        ...(utm_medium   && { utm_medium:   richText(utm_medium) }),
        ...(utm_campaign && { utm_campaign: richText(utm_campaign) }),
        ...(utm_term     && { utm_term:     richText(utm_term) }),
        ...(utm_content  && { utm_content:  richText(utm_content) }),
        ...(referrer     && { Referrer:     richText(referrer) }),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Notion error:', err);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
