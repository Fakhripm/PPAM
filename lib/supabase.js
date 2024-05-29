import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qdieccrbltkplyazjlga.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkaWVjY3JibHRrcGx5YXpqbGdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzNDM3OTQsImV4cCI6MjAzMTkxOTc5NH0.QQ5P6ahEgf_FztP9P62XOtMc3nPxk_l2wGUTKFi7LJA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})