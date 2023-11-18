import supabaseClient from "./supabase"

export const runtime = "edge";

const SupabaseTableName = "table_name"

export default async function Home() {

  // const client
  const resp = await fetch("https://timeapi.io/api/Time/current/zone?timeZone=UTC")
  const data = await resp.json()

  const supabaseData = await supabaseClient.from(SupabaseTableName).select().limit(1)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre>{JSON.stringify(supabaseData, null, 2)}</pre>
    </main>
  )
}
