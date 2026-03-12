-- Update existing products with Naira prices
-- Run this in your Supabase SQL Editor

UPDATE products SET price = 8999.00 WHERE id IN ('S1', 'S2', 'S3', 'B1', 'B2', 'B3');
UPDATE products SET price = 6999.00 WHERE id IN ('W1', 'W2', 'W3', 'W4', 'W5', 'W6');

-- Update default country in addresses table
ALTER TABLE addresses ALTER COLUMN country SET DEFAULT 'Nigeria';

-- Verify the updates
SELECT id, name, price FROM products ORDER BY id;