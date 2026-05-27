#!/usr/bin/env node

import { chromium } from '@playwright/test';
import { existsSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const OUT_DIR = join(ROOT, 'tmp', 'responsive');
const TARGET = process.argv[2] || 'https://juswer.mycafe24.com/?responsive_check=1';

const viewports = [
  { name: 'mobile-390', width: 390, height: 1200 },
  { name: 'mobile-360', width: 360, height: 1100 },
  { name: 'tablet-768', width: 768, height: 1100 },
  { name: 'desktop-1280', width: 1280, height: 1000 },
];

if (!existsSync(OUT_DIR)) {
  mkdirSync(OUT_DIR, { recursive: true });
}

const browser = await chromium.launch();
const results = [];

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  await page.goto(TARGET, { waitUntil: 'networkidle', timeout: 45000 });

  const metrics = await page.evaluate(() => {
    const selectors = [
      '.kt-header',
      '.kt-hero',
      '.kt-announcements__grid',
      '.kt-quick-grid',
      '.kt-newcomer',
      '.kt-gallery',
      '.kt-cta-grid',
      '.kt-footer',
    ];

    const boxes = selectors.map((selector) => {
      const element = document.querySelector(selector);
      if (!element) return { selector, present: false };

      const rect = element.getBoundingClientRect();
      return {
        selector,
        present: true,
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      };
    });

    const overflowing = Array.from(document.body.querySelectorAll('*'))
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          className: typeof element.className === 'string' ? element.className : '',
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
        };
      })
      .filter((item) => item.width > 0 && (item.left < -2 || item.right > window.innerWidth + 2))
      .slice(0, 20);

    return {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
      hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      boxes,
      overflowing,
    };
  });

  const screenshot = join(OUT_DIR, `${viewport.name}.png`);
  await page.screenshot({ path: screenshot, fullPage: true });
  results.push({ name: viewport.name, screenshot, metrics });
  await page.close();
}

await browser.close();

for (const result of results) {
  console.log(`\n[${result.name}] ${result.metrics.viewport.width}x${result.metrics.viewport.height}`);
  console.log(`documentWidth=${result.metrics.documentWidth}, horizontalOverflow=${result.metrics.hasHorizontalOverflow}`);
  console.log(`screenshot=${result.screenshot}`);

  for (const box of result.metrics.boxes) {
    if (!box.present) {
      console.log(`  missing ${box.selector}`);
      continue;
    }

    console.log(`  ${box.selector}: ${box.width}x${box.height} left=${box.left} right=${box.right}`);
  }

  if (result.metrics.overflowing.length > 0) {
    console.log('  overflowing elements:');
    for (const item of result.metrics.overflowing) {
      console.log(`    ${item.tag}.${item.className} left=${item.left} right=${item.right} width=${item.width}`);
    }
  }
}

const failed = results.some((result) => result.metrics.hasHorizontalOverflow);
process.exit(failed ? 1 : 0);
