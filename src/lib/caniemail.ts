/**
 * Types and utilities for working with caniemail.com data
 * API: https://www.caniemail.com/api/data.json
 */

enum SupportLevels {
  YES = 'y',
  PARTIAL = 'a',
  NO = 'n',
  UNKNOWN = 'u',
}

export interface CanIEmailFeature {
  slug: string;
  title: string;
  description: string;
  url: string;
  category: 'css' | 'html' | 'image' | 'others';
  tags: string[];
  keywords: string | null;
  last_test_date: string;
  test_url: string;
  test_results_url: string | null;
  stats: Record<string, Record<string, Record<string, string>>>;
  notes: string | null;
  notes_by_num: Record<string, string> | null;
}

export interface CanIEmailData {
  api_version: string;
  last_update_date: string;
  nicenames: {
    category: Record<string, string>;
    family: Record<string, string>;
    platform: Record<string, string>;
    support: Record<string, string>;
  };
  data: CanIEmailFeature[];
}

// Major email clients we care about for the report
export const MAJOR_CLIENTS = [
  { family: 'gmail', label: 'Gmail', platform: 'desktop-webmail' },
  { family: 'outlook', label: 'Outlook Windows', platform: 'windows' },
  { family: 'outlook', label: 'Outlook Mac', platform: 'macos' },
  { family: 'outlook', label: 'Outlook.com', platform: 'outlook-com' },
  { family: 'apple-mail', label: 'Apple Mail', platform: 'macos' },
  { family: 'apple-mail', label: 'iOS Mail', platform: 'ios' },
  { family: 'yahoo', label: 'Yahoo', platform: 'desktop-webmail' },
  { family: 'samsung-email', label: 'Samsung Email', platform: 'android' },
] as const;

export type MajorClient = (typeof MAJOR_CLIENTS)[number];

let cachedData: CanIEmailData | null = null;

export async function fetchCanIEmailData(): Promise<CanIEmailData> {
  if (cachedData) {
    return cachedData;
  }

  const response = await fetch('https://www.caniemail.com/api/data.json', {
    next: { revalidate: 86400 }, // Cache for 24 hours
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch caniemail data: ${response.status}`);
  }

  cachedData = await response.json();

  return cachedData!;
}

/**
 * Get the support level for a feature in a specific client
 * Returns the most recent test result
 */
export function getSupportLevel(
  feature: CanIEmailFeature,
  family: string,
  platform: string
): { level: SupportLevels; note?: string; version: string } | null {
  const familyStats = feature.stats[family];

  if (!familyStats) {
    return null;
  }

  const platformStats = familyStats[platform];

  if (!platformStats) {
    return null;
  }

  // Get the most recent version (last key)
  const versions = Object.keys(platformStats);

  if (versions.length === 0) {
    return null;
  }

  const latestVersion = versions[versions.length - 1];
  const rawValue = platformStats[latestVersion];

  // Parse value like "a #1" into level and note reference
  const match = rawValue.match(/^([ynau])\s*(?:#(\d+))?$/);

  if (!match) {
    return { level: SupportLevels.UNKNOWN, version: latestVersion };
  }

  const level = match[1] as SupportLevels;
  const noteNum = match[2];
  const note = noteNum ? feature.notes_by_num?.[noteNum] : undefined;

  return { level, note, version: latestVersion };
}

/**
 * Get support summary across all major clients
 */
export function getFeatureSupportSummary(feature: CanIEmailFeature): {
  partial: MajorClient[];
  supported: MajorClient[];
  unknown: MajorClient[];
  unsupported: MajorClient[];
} {
  const result = {
    partial: [] as MajorClient[],
    supported: [] as MajorClient[],
    unknown: [] as MajorClient[],
    unsupported: [] as MajorClient[],
  };

  for (const client of MAJOR_CLIENTS) {
    const support = getSupportLevel(feature, client.family, client.platform);

    if (!support || support.level === SupportLevels.UNKNOWN) {
      result.unknown.push(client);
    } else if (support.level === SupportLevels.YES) {
      result.supported.push(client);
    } else if (support.level === SupportLevels.PARTIAL) {
      result.partial.push(client);
    } else {
      result.unsupported.push(client);
    }
  }

  return result;
}

/**
 * Get the caniemail embed URL for a feature
 */
export function getEmbedUrl(slug: string): string {
  return `https://embed.caniemail.com/${slug}/`;
}

/**
 * Build a map of CSS property names to caniemail feature slugs
 */
export function buildCssPropertyMap(data: CanIEmailData): Map<string, CanIEmailFeature> {
  const map = new Map<string, CanIEmailFeature>();

  for (const feature of data.data) {
    if (feature.category !== 'css') {
      continue;
    }

    // The slug often matches the property name with "css-" prefix
    // e.g., "css-border-radius" -> "border-radius"
    const propertyName = feature.slug.replace(/^css-/, '').replace(/-/g, '-');
    map.set(propertyName, feature);

    // Also map the title if it's different (e.g., "border-radius")
    const titleLower = feature.title.toLowerCase();

    if (titleLower !== propertyName) {
      map.set(titleLower, feature);
    }

    // Map keywords too
    if (feature.keywords) {
      const keywords = feature.keywords.split(',').map((k) => {
        return k.trim().toLowerCase();
      });

      for (const keyword of keywords) {
        if (keyword && !map.has(keyword)) {
          map.set(keyword, feature);
        }
      }
    }
  }

  return map;
}

/**
 * Build a map of HTML elements/attributes to caniemail feature slugs
 */
export function buildHtmlFeatureMap(data: CanIEmailData): Map<string, CanIEmailFeature> {
  const map = new Map<string, CanIEmailFeature>();

  for (const feature of data.data) {
    if (feature.category !== 'html') {
      continue;
    }

    // Map by slug without "html-" prefix
    const elementName = feature.slug.replace(/^html-/, '');
    map.set(elementName, feature);

    // Map by title
    const titleLower = feature.title.toLowerCase().replace(/[<>]/g, '');

    if (titleLower !== elementName) {
      map.set(titleLower, feature);
    }
  }

  return map;
}
