-- COMPLETE FIX FOR ALL ERRORS
-- Run this ONCE in Supabase SQL Editor to fix everything

-- ============================================
-- PART 1: Fix Infinite Recursion in RLS
-- ============================================

-- Drop ALL existing policies that cause recursion
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON orders;
DROP POLICY IF EXISTS "Admins can update orders" ON orders;
DROP POLICY IF EXISTS "Users can insert own orders" ON orders;
DROP POLICY IF EXISTS "Users can view own order items" ON order_items;
DROP POLICY IF EXISTS "Admins can view all order items" ON order_items;

-- Create admin check function (SECURITY DEFINER bypasses RLS)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- PART 2: Create New RLS Policies
-- ============================================

-- Profiles: Allow all reads (simplest, no recursion)
CREATE POLICY "Enable read for users" ON profiles
    FOR SELECT
    USING (true);

CREATE POLICY "Enable insert for users" ON profiles
    FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable update for own profile" ON profiles
    FOR UPDATE
    USING (auth.uid() = id);

-- Orders: Users see own, admins see all
CREATE POLICY "Enable read for orders" ON orders
    FOR SELECT
    USING (auth.uid() = user_id OR is_admin());

CREATE POLICY "Enable insert for orders" ON orders
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update for orders" ON orders
    FOR UPDATE
    USING (is_admin());

-- Order Items: Users see own, admins see all
CREATE POLICY "Enable read for order items" ON order_items
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()
        )
        OR is_admin()
    );

-- ============================================
-- PART 3: Verify Setup
-- ============================================

-- Check if policies are working
SELECT 
    schemaname,
    tablename,
    policyname
FROM pg_policies
WHERE tablename IN ('profiles', 'orders', 'order_items')
ORDER BY tablename, policyname;
