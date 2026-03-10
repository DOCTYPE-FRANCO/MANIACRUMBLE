-- Fix RLS policy for products table to allow anonymous access

-- Drop existing policy
DROP POLICY IF EXISTS "Anyone can view active products" ON products;

-- Recreate policy with proper anonymous access
CREATE POLICY "Anyone can view active products" ON products 
FOR SELECT 
USING (active = true);

-- Also allow anonymous access to all products (not just active ones) for testing
-- You can remove this later if you only want active products visible
CREATE POLICY "Public read access" ON products 
FOR SELECT 
TO anon, authenticated
USING (true);
