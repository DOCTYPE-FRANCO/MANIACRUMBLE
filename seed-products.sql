-- Insert products into the database
-- Make sure to run this in your Supabase SQL Editor

INSERT INTO products (id, name, description, price, image, category, quantity, featured, active) VALUES
-- Snapbacks
('S1', 'Black SnapBack', 'SnapBack Hat.', 8999.00, '/Products/BlackSnapback.jpg', 'snapback', 15, true, true),
('S2', 'Red SnapBack', 'SnapBack Hat.', 8999.00, '/Products/RedSnapback.jpg', 'snapback', 12, false, true),
('S3', 'Blonde SnapBack', 'SnapBack Hat.', 8999.00, '/Products/BlondeSnapbackpic.jpg', 'snapback', 10, false, true),

-- Beanies
('B1', 'Black Beanie', 'Don''t Think, Jump Editions.', 8999.00, '/Products/Beanie.jpg', 'beanie', 20, true, true),
('B2', 'Beanie', 'S....', 8999.00, '/Products/BeanieModel.jpg', 'beanie', 8, false, true),
('B3', 'Beanie Model', 'A....', 8999.00, '/Products/BeanieModel (2).jpg', 'beanie', 5, false, true),

-- Wave Caps
('W1', 'Black Wave Cap', 'Wave Cap Hat.', 6999.00, '/Products/BlackWaveCap.jpg', 'wavecap', 25, true, true),
('W2', 'Camo Wave Cap', 'Wave Cap .', 6999.00, '/Products/CamoSkullCap.jpg', 'wavecap', 18, false, true),
('W3', 'Pink Wave Cap', 'Wave Cap .', 6999.00, '/Products/PinkSkullCap.jpg', 'wavecap', 14, false, true),
('W4', 'Gray Wave Cap', 'Wave Cap .', 6999.00, '/Products/GraySkullCap.jpg', 'wavecap', 10, false, true),
('W5', 'OG Wave Cap', 'Limited Edition Wave Cap .', 6999.00, '/Products/OGSkullcap.jpg', 'wavecap', 7, false, true),
('W6', 'OG Wave Cap (Pink)', 'Limited Edition Wave Cap .', 6999.00, '/Products/SkullCappink.jpg', 'wavecap', 6, false, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  image = EXCLUDED.image,
  category = EXCLUDED.category,
  quantity = EXCLUDED.quantity,
  featured = EXCLUDED.featured,
  active = EXCLUDED.active;
