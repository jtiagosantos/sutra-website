'use server';

import { z } from 'zod';
import { actionClient } from '@/lib/safe-action';
import { notion } from '@/lib/notion';

const schema = z.object({
  pageId: z.string(),
});

export const getNotionPageAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { pageId } }) => {
    const result = await notion.getPage(pageId);

    return result;
  });
