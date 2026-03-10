-- Fix database policies - Run this in Supabase SQL Editor

-- Drop and recreate products policies
DROP POLICY IF EXISTS "Public can read products" ON products;
DROP POLICY IF EXISTS "Admins manage products" ON products;

CREATE POLICY "Anyone can read products" ON products 
FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins manage products" ON products FOR ALL 
TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Drop and recreate reviews policies  
DROP POLICY IF EXISTS "Public read reviews" ON reviews;
DROP POLICY IF EXISTS "Users manage own reviews" ON reviews;

CREATE POLICY "Anyone can read reviews" ON reviews 
FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Authenticated users insert reviews" ON reviews 
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own reviews" ON reviews 
FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users delete own reviews" ON reviews 
FOR DELETE TO authenticated USING (auth.uid() = user_id);
