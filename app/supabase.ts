import { createClient } from '@supabase/supabase-js'

export const SUPABASE_NEXTJS_CACHE_TAG = "supabase"

/**
 * https://github.com/supabase/supabase-js/issues/725
 */
export const createFetch =
  (options: Pick<RequestInit, "next" | "cache">): any =>
  (url: RequestInfo | URL, init?: RequestInit) => {
    console.log("createFetch", url, init, options)
    return fetch(url, {
      ...init,
      ...options,
    });
  };

// global: { fetch: fetch.bind(globalThis) }

export default createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    global: {
      fetch: createFetch({
        next: {
          // revalidate: false,
          tags: [SUPABASE_NEXTJS_CACHE_TAG],
        },
      }),
    },
  }
)
