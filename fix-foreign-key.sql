-- Fix 400 Error: Add Foreign Key Relationship
-- Run this AFTER running FINAL-FIX-RECURSION.sql

-- The 400 error happens because Supabase can't join orders->profiles
-- We need to ensure the foreign key exists and is properly named

-- Check if foreign key exists, if not create it
DO $$ 
BEGIN
    -- Add foreign key constraint if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'orders_user_id_fkey' 
        AND table_name = 'orders'
    ) THEN
        ALTER TABLE orders 
        ADD CONSTRAINT orders_user_id_fkey 
        FOREIGN KEY (user_id) 
        REFERENCES profiles(id) 
        ON DELETE CASCADE;
    END IF;
END $$;

-- Verify the relationship works
SELECT 
    o.id,
    o.user_id,
    p.name,
    p.email
FROM orders o
LEFT JOIN profiles p ON o.user_id = p.id
LIMIT 1;
