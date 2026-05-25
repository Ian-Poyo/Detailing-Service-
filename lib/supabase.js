import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Sign up
const { data, error } = await supabase.auth.signUp({ email, password })
// Then insert into profiles:
await supabase.from('profiles').insert({ id: data.user.id, full_name, phone })

// Log in
const { data, error } = await supabase.auth.signInWithPassword({ email, password })

// In customer dashboard — load their bookings
const { data: bookings } = await supabase
  .from('bookings')
  .select('*, vehicles(*)')
  .eq('user_id', session.user.id)
  .order('date', { ascending: true })

// Load their profile/loyalty
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', session.user.id)
  .single()