-- CRITICAL FIX: Infinite Recursion in Profiles RLS
-- This replaces the broken fix-admin-permissions.sql

-- Step 1: Drop ALL existing policies on profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Step 2: Create simple, non-recursive policies
CREATE POLICY "Users can view own profile" ON profiles 
    FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles 
    FOR UPDATE 
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles 
    FOR INSERT 
    WITH CHECK (auth.uid() = id);

-- Step 3: Create admin view policy using auth.jwt() instead of profiles lookup
CREATE POLICY "Admins can view all profiles" ON profiles 
    FOR SELECT 
    USING (
        (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
        OR auth.uid() = id
    );

-- Step 4: Fix order_items policies
DROP POLICY IF EXISTS "Users can view own order items" ON order_items;
DROP POLICY IF EXISTS "Admins can view all order items" ON order_items;

CREATE POLICY "Users can view own order items" ON order_items 
    FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()
        )
    );

CREATE POLICY "Admins can view all order items" ON order_items 
    FOR SELECT 
    USING (
        (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
    );

-- Step 5: Fix orders policies for admins
DROP POLICY IF EXISTS "Admins can view all orders" ON orders;
DROP POLICY IF EXISTS "Admins can update orders" ON orders;

CREATE POLICY "Admins can view all orders" ON orders 
    FOR SELECT 
    USING (
        (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
        OR auth.uid() = user_id
    );

CREATE POLICY "Admins can update orders" ON orders 
    FOR UPDATE 
    USING (
        (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
    );
