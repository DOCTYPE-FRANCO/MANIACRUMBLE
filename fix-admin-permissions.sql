-- Fix Admin Permissions for Orders and Profiles

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Create new policies that allow admins to view all profiles
CREATE POLICY "Users can view own profile" ON profiles 
    FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles 
    FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Ensure order_items can be read by admins
DROP POLICY IF EXISTS "Users can view own order items" ON order_items;

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
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
