-- ULTIMATE FIX: Remove Infinite Recursion
-- Run this in Supabase SQL Editor

-- Step 1: Drop ALL policies causing recursion
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Step 2: Create a function to check if user is admin (avoids recursion)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 3: Recreate profiles policies WITHOUT recursion
CREATE POLICY "Enable read for users" ON profiles
    FOR SELECT
    USING (true);  -- Allow all reads (simplest fix)

CREATE POLICY "Enable insert for users" ON profiles
    FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable update for own profile" ON profiles
    FOR UPDATE
    USING (auth.uid() = id);

-- Step 4: Fix order_items policies
DROP POLICY IF EXISTS "Users can view own order items" ON order_items;
DROP POLICY IF EXISTS "Admins can view all order items" ON order_items;

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

-- Step 5: Fix orders policies
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON orders;
DROP POLICY IF EXISTS "Admins can update orders" ON orders;

CREATE POLICY "Enable read for orders" ON orders
    FOR SELECT
    USING (auth.uid() = user_id OR is_admin());

CREATE POLICY "Enable insert for orders" ON orders
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update for orders" ON orders
    FOR UPDATE
    USING (is_admin());
