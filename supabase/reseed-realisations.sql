-- ============================================
-- METALR - Re-seed Realisations
-- Executez dans l'editeur SQL Supabase
-- Compatible avec client/duration/budget en TEXT ou JSONB
-- ============================================

-- Etape 1 : Verifier le type actuel des colonnes
-- (Executez cette requete d'abord pour voir si client est text ou jsonb)
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'realisations'
  AND column_name IN ('client', 'duration', 'budget', 'year', 'surface');

-- ============================================
-- OPTION A : Si client/duration/budget sont en TEXT (schema original)
-- Decommentez et executez cette section
-- ============================================

/*
DELETE FROM realisations;

INSERT INTO realisations (slug, title, category, category_label, location, description, challenges, solutions, year, surface, client, duration, budget, main_image_url, gallery, status, views) VALUES

('stabulation-180-vaches',
 '{"fr":"Stabulation 180 vaches","en":"180-cow stabling","zh":"180头奶牛畜舍","ar":"مربط أبقار حديث"}',
 'agriculture',
 '{"fr":"Agriculture","en":"Agriculture","zh":"农业","ar":"زراعة"}',
 '{"fr":"Normandie, France","en":"Normandy, France","zh":"诺曼底，法国","ar":"نورماندي، فرنسا"}',
 '{"fr":"Ce projet de stabulation moderne pour 180 vaches laitieres represente l''excellence de notre savoir-faire en structures agricoles. Concu pour optimiser le bien-etre animal et la productivite de l''elevage, ce batiment integre les dernieres innovations en matiere de ventilation naturelle et de gestion des flux.","en":"This modern dairy barn project for 180 cows represents the excellence of our expertise in agricultural structures. Designed to optimize animal welfare and farm productivity.","zh":"这个为180头奶牛设计的现代化牛舍项目代表了我们在农业结构方面的卓越专业知识。","ar":"يمثل هذا المشروع الحديث لإسطبل 180 بقرة حلوب تميزنا في الهياكل الزراعية."}',
 '[{"fr":"Integration d''un systeme de ventilation naturelle optimise","en":"Integration of an optimized natural ventilation system","zh":"集成优化自然通风系统","ar":"دمج نظام تهوية طبيعية محسّن"},{"fr":"Resistance aux vents forts de la region normande","en":"Resistance to strong winds in the Norman region","zh":"抵御诺曼底地区强风","ar":"مقاومة الرياح القوية في منطقة نورماندي"}]',
 '[{"fr":"Structure metallique galvanisee a chaud pour une durabilite maximale","en":"Hot-dip galvanized steel structure for maximum durability","zh":"热镀锌钢结构，实现最大耐久性","ar":"هيكل فولاذي مجلفن بالغطس الساخن لأقصى متانة"},{"fr":"Bardage ventile avec ouvertures reglables automatiques","en":"Ventilated cladding with automatic adjustable openings","zh":"带可自动调节开口的通风围护结构","ar":"كسوة مهواة مع فتحات قابلة للضبط التلقائي"}]',
 '2024', '1200 m²', 'EARL Dubois', '4 mois', '450 000 €',
 'https://images.unsplash.com/photo-1653233532156-327bf57aab82?w=800',
 '["https://images.unsplash.com/photo-1675511029093-740b26a1c4ff?w=800","https://images.unsplash.com/photo-1745184778017-7b935ed2a4c1?w=800"]',
 'completed', 342),

('centrale-solaire-5mw',
 '{"fr":"Centrale solaire 5 MW","en":"5 MW solar plant","zh":"5兆瓦太阳能电站","ar":"محطة طاقة شمسية 5 ميغاواط"}',
 'photovoltaique',
 '{"fr":"Photovoltaïque","en":"Photovoltaic","zh":"光伏","ar":"كهروضوئي"}',
 '{"fr":"Occitanie, France","en":"Occitanie, France","zh":"奥克西塔尼，法国","ar":"أوكسيتانيا، فرنسا"}',
 '{"fr":"Installation complete d''une centrale photovoltaique au sol de 5 MW avec structures metalliques sur mesure, optimisees pour le rendement energetique maximal.","en":"Complete installation of a 5 MW ground-mounted photovoltaic plant with custom metal structures.","zh":"完整安装5兆瓦地面光伏电站，采用定制金属结构。","ar":"تركيب كامل لمحطة طاقة شمسية أرضية بقدرة 5 ميغاواط."}',
 '[]', '[]',
 '2025', '8000 m²', 'Energies Solaires SARL', '6 mois', '1 200 000 €',
 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
 '[]', 'completed', 189),

('hall-industriel',
 '{"fr":"Hall industriel 3500 m²","en":"3500 m² Industrial hall","zh":"3500平方米工业厂房","ar":"قاعة صناعية 3500 م²"}',
 'industrie',
 '{"fr":"Industrie","en":"Industry","zh":"工业","ar":"صناعة"}',
 '{"fr":"Hauts-de-France","en":"Hauts-de-France","zh":"法国北部","ar":"شمال فرنسا"}',
 '{"fr":"Complexe industriel de stockage et production avec pont roulant integre, structure metallique haute performance pour usage intensif.","en":"Industrial complex for storage and production with integrated overhead crane.","zh":"集成行车的工业存储和生产综合体。","ar":"مجمع صناعي للتخزين والإنتاج مع رافعة جسرية مدمجة."}',
 '[]', '[]',
 '2024', '3500 m²', 'Industrial Solutions Ltd', '5 mois', '780 000 €',
 'https://images.unsplash.com/photo-1685376594043-844022374fe6?w=800',
 '[]', 'completed', 267),

('passerelle-pietonne',
 '{"fr":"Passerelle pietonne 150m","en":"150m Pedestrian footbridge","zh":"150米步行天桥","ar":"جسر مشاة 150 متر"}',
 'ouvrages',
 '{"fr":"Ouvrages d''art","en":"Civil engineering","zh":"土木工程","ar":"أعمال هندسية"}',
 '{"fr":"Île-de-France","en":"Île-de-France","zh":"法兰西岛","ar":"إيل دو فرانس"}',
 '{"fr":"Passerelle pietonne metallique de 150 metres avec conception parasismique et design architectural contemporain.","en":"150-meter metal pedestrian footbridge with seismic design and contemporary architecture.","zh":"150米金属人行天桥，具有抗震设计和当代建筑风格。","ar":"جسر مشاة معدني بطول 150 متر بتصميم مقاوم للزلازل."}',
 '[]', '[]',
 '2025', '450 m lineaires', 'Ministere des Transports', '8 mois', '2 100 000 €',
 'https://images.unsplash.com/photo-1548513911-163fbb0d1e23?w=800',
 '[]', 'ongoing', 423),

('ombrieres-parking',
 '{"fr":"Ombrieres parking photovoltaiques","en":"Photovoltaic parking canopies","zh":"光伏停车场遮阳棚","ar":"مظلات مواقف سيارات كهروضوئية"}',
 'photovoltaique',
 '{"fr":"Photovoltaïque","en":"Photovoltaic","zh":"光伏","ar":"كهروضوئي"}',
 '{"fr":"Lyon, France","en":"Lyon, France","zh":"里昂，法国","ar":"ليون، فرنسا"}',
 '{"fr":"Ombrieres de parking photovoltaiques pour un centre commercial, combinant protection des vehicules et production d''energie verte.","en":"Photovoltaic parking canopies for a shopping center, combining vehicle protection and green energy production.","zh":"商业中心光伏停车遮阳棚。","ar":"مظلات مواقف سيارات كهروضوئية لمركز تجاري."}',
 '[]', '[]',
 '2025', '2000 m²', 'Centre Commercial Confluence', '3 mois', '650 000 €',
 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=800',
 '[]', 'completed', 156),

('batiment-agricole',
 '{"fr":"Batiment agricole polyvalent","en":"Multipurpose agricultural building","zh":"多功能农业建筑","ar":"مبنى زراعي متعدد الاستخدامات"}',
 'agriculture',
 '{"fr":"Agriculture","en":"Agriculture","zh":"农业","ar":"زراعة"}',
 '{"fr":"Beauce, France","en":"Beauce, France","zh":"博斯，法国","ar":"بوس، فرنسا"}',
 '{"fr":"Batiment de stockage agricole polyvalent avec charpente metallique optimisee pour grandes portees et charges importantes.","en":"Multipurpose agricultural storage building with steel frame optimized for large spans and heavy loads.","zh":"多功能农业仓储建筑，钢框架优化适用于大跨度和重载。","ar":"مبنى تخزين زراعي متعدد الاستخدامات مع هيكل فولاذي محسّن."}',
 '[]', '[]',
 '2024', '1800 m²', 'GAEC Les Champs Dores', '3 mois', '320 000 €',
 'https://images.unsplash.com/photo-1653233532156-327bf57aab82?w=800',
 '[]', 'completed', 98);
*/

-- ============================================
-- OPTION B : Si client/duration/budget sont en JSONB (migration executee)
-- Decommentez et executez cette section
-- ============================================

/*
DELETE FROM realisations;

INSERT INTO realisations (slug, title, category, category_label, location, description, challenges, solutions, year, surface, client, duration, budget, main_image_url, gallery, status, views) VALUES

('stabulation-180-vaches',
 '{"fr":"Stabulation 180 vaches","en":"180-cow stabling","zh":"180头奶牛畜舍","ar":"مربط أبقار حديث"}',
 'agriculture',
 '{"fr":"Agriculture","en":"Agriculture","zh":"农业","ar":"زراعة"}',
 '{"fr":"Normandie, France","en":"Normandy, France","zh":"诺曼底，法国","ar":"نورماندي، فرنسا"}',
 '{"fr":"Ce projet de stabulation moderne pour 180 vaches laitieres represente l''excellence de notre savoir-faire en structures agricoles. Concu pour optimiser le bien-etre animal et la productivite de l''elevage, ce batiment integre les dernieres innovations en matiere de ventilation naturelle et de gestion des flux.","en":"This modern dairy barn project for 180 cows represents the excellence of our expertise in agricultural structures. Designed to optimize animal welfare and farm productivity.","zh":"这个为180头奶牛设计的现代化牛舍项目代表了我们在农业结构方面的卓越专业知识。","ar":"يمثل هذا المشروع الحديث لإسطبل 180 بقرة حلوب تميزنا في الهياكل الزراعية."}',
 '[{"fr":"Integration d''un systeme de ventilation naturelle optimise","en":"Integration of an optimized natural ventilation system","zh":"集成优化自然通风系统","ar":"دمج نظام تهوية طبيعية محسّن"},{"fr":"Resistance aux vents forts de la region normande","en":"Resistance to strong winds in the Norman region","zh":"抵御诺曼底地区强风","ar":"مقاومة الرياح القوية في منطقة نورماندي"}]',
 '[{"fr":"Structure metallique galvanisee a chaud pour une durabilite maximale","en":"Hot-dip galvanized steel structure for maximum durability","zh":"热镀锌钢结构，实现最大耐久性","ar":"هيكل فولاذي مجلفن بالغطس الساخن لأقصى متانة"},{"fr":"Bardage ventile avec ouvertures reglables automatiques","en":"Ventilated cladding with automatic adjustable openings","zh":"带可自动调节开口的通风围护结构","ar":"كسوة مهواة مع فتحات قابلة للضبط التلقائي"}]',
 '2024', '1200 m²',
 '{"fr":"EARL Dubois","en":"EARL Dubois","zh":"EARL Dubois","ar":"EARL Dubois"}',
 '{"fr":"4 mois","en":"4 months","zh":"4个月","ar":"4 أشهر"}',
 '{"fr":"450 000 €","en":"€450,000","zh":"45万欧元","ar":"450,000 يورو"}',
 'https://images.unsplash.com/photo-1653233532156-327bf57aab82?w=800',
 '["https://images.unsplash.com/photo-1675511029093-740b26a1c4ff?w=800","https://images.unsplash.com/photo-1745184778017-7b935ed2a4c1?w=800"]',
 'completed', 342),

('centrale-solaire-5mw',
 '{"fr":"Centrale solaire 5 MW","en":"5 MW solar plant","zh":"5兆瓦太阳能电站","ar":"محطة طاقة شمسية 5 ميغاواط"}',
 'photovoltaique',
 '{"fr":"Photovoltaïque","en":"Photovoltaic","zh":"光伏","ar":"كهروضوئي"}',
 '{"fr":"Occitanie, France","en":"Occitanie, France","zh":"奥克西塔尼，法国","ar":"أوكسيتانيا، فرنسا"}',
 '{"fr":"Installation complete d''une centrale photovoltaique au sol de 5 MW avec structures metalliques sur mesure, optimisees pour le rendement energetique maximal.","en":"Complete installation of a 5 MW ground-mounted photovoltaic plant with custom metal structures.","zh":"完整安装5兆瓦地面光伏电站，采用定制金属结构。","ar":"تركيب كامل لمحطة طاقة شمسية أرضية بقدرة 5 ميغاواط."}',
 '[]', '[]',
 '2025', '8000 m²',
 '{"fr":"Energies Solaires SARL","en":"Energies Solaires SARL","zh":"Energies Solaires SARL","ar":"Energies Solaires SARL"}',
 '{"fr":"6 mois","en":"6 months","zh":"6个月","ar":"6 أشهر"}',
 '{"fr":"1 200 000 €","en":"€1,200,000","zh":"120万欧元","ar":"1,200,000 يورو"}',
 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
 '[]', 'completed', 189),

('hall-industriel',
 '{"fr":"Hall industriel 3500 m²","en":"3500 m² Industrial hall","zh":"3500平方米工业厂房","ar":"قاعة صناعية 3500 م²"}',
 'industrie',
 '{"fr":"Industrie","en":"Industry","zh":"工业","ar":"صناعة"}',
 '{"fr":"Hauts-de-France","en":"Hauts-de-France","zh":"法国北部","ar":"شمال فرنسا"}',
 '{"fr":"Complexe industriel de stockage et production avec pont roulant integre, structure metallique haute performance pour usage intensif.","en":"Industrial complex for storage and production with integrated overhead crane.","zh":"集成行车的工业存储和生产综合体。","ar":"مجمع صناعي للتخزين والإنتاج مع رافعة جسرية مدمجة."}',
 '[]', '[]',
 '2024', '3500 m²',
 '{"fr":"Industrial Solutions Ltd","en":"Industrial Solutions Ltd","zh":"Industrial Solutions Ltd","ar":"Industrial Solutions Ltd"}',
 '{"fr":"5 mois","en":"5 months","zh":"5个月","ar":"5 أشهر"}',
 '{"fr":"780 000 €","en":"€780,000","zh":"78万欧元","ar":"780,000 يورو"}',
 'https://images.unsplash.com/photo-1685376594043-844022374fe6?w=800',
 '[]', 'completed', 267),

('passerelle-pietonne',
 '{"fr":"Passerelle pietonne 150m","en":"150m Pedestrian footbridge","zh":"150米步行天桥","ar":"جسر مشاة 150 متر"}',
 'ouvrages',
 '{"fr":"Ouvrages d''art","en":"Civil engineering","zh":"土木工程","ar":"أعمال هندسية"}',
 '{"fr":"Île-de-France","en":"Île-de-France","zh":"法兰西岛","ar":"إيل دو فرانس"}',
 '{"fr":"Passerelle pietonne metallique de 150 metres avec conception parasismique et design architectural contemporain.","en":"150-meter metal pedestrian footbridge with seismic design and contemporary architecture.","zh":"150米金属人行天桥，具有抗震设计和当代建筑风格。","ar":"جسر مشاة معدني بطول 150 متر بتصميم مقاوم للزلازل."}',
 '[]', '[]',
 '2025', '450 m lineaires',
 '{"fr":"Ministere des Transports","en":"Ministry of Transport","zh":"交通部","ar":"وزارة النقل"}',
 '{"fr":"8 mois","en":"8 months","zh":"8个月","ar":"8 أشهر"}',
 '{"fr":"2 100 000 €","en":"€2,100,000","zh":"210万欧元","ar":"2,100,000 يورو"}',
 'https://images.unsplash.com/photo-1548513911-163fbb0d1e23?w=800',
 '[]', 'ongoing', 423),

('ombrieres-parking',
 '{"fr":"Ombrieres parking photovoltaiques","en":"Photovoltaic parking canopies","zh":"光伏停车场遮阳棚","ar":"مظلات مواقف سيارات كهروضوئية"}',
 'photovoltaique',
 '{"fr":"Photovoltaïque","en":"Photovoltaic","zh":"光伏","ar":"كهروضوئي"}',
 '{"fr":"Lyon, France","en":"Lyon, France","zh":"里昂，法国","ar":"ليون، فرنسا"}',
 '{"fr":"Ombrieres de parking photovoltaiques pour un centre commercial, combinant protection des vehicules et production d''energie verte.","en":"Photovoltaic parking canopies for a shopping center, combining vehicle protection and green energy production.","zh":"商业中心光伏停车遮阳棚。","ar":"مظلات مواقف سيارات كهروضوئية لمركز تجاري."}',
 '[]', '[]',
 '2025', '2000 m²',
 '{"fr":"Centre Commercial Confluence","en":"Confluence Shopping Center","zh":"Confluence商业中心","ar":"مركز كونفلوانس التجاري"}',
 '{"fr":"3 mois","en":"3 months","zh":"3个月","ar":"3 أشهر"}',
 '{"fr":"650 000 €","en":"€650,000","zh":"65万欧元","ar":"650,000 يورو"}',
 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=800',
 '[]', 'completed', 156),

('batiment-agricole',
 '{"fr":"Batiment agricole polyvalent","en":"Multipurpose agricultural building","zh":"多功能农业建筑","ar":"مبنى زراعي متعدد الاستخدامات"}',
 'agriculture',
 '{"fr":"Agriculture","en":"Agriculture","zh":"农业","ar":"زراعة"}',
 '{"fr":"Beauce, France","en":"Beauce, France","zh":"博斯，法国","ar":"بوس، فرنسا"}',
 '{"fr":"Batiment de stockage agricole polyvalent avec charpente metallique optimisee pour grandes portees et charges importantes.","en":"Multipurpose agricultural storage building with steel frame optimized for large spans and heavy loads.","zh":"多功能农业仓储建筑，钢框架优化适用于大跨度和重载。","ar":"مبنى تخزين زراعي متعدد الاستخدامات مع هيكل فولاذي محسّن."}',
 '[]', '[]',
 '2024', '1800 m²',
 '{"fr":"GAEC Les Champs Dores","en":"GAEC Les Champs Dores","zh":"GAEC Les Champs Dores","ar":"GAEC Les Champs Dores"}',
 '{"fr":"3 mois","en":"3 months","zh":"3个月","ar":"3 أشهر"}',
 '{"fr":"320 000 €","en":"€320,000","zh":"32万欧元","ar":"320,000 يورو"}',
 'https://images.unsplash.com/photo-1653233532156-327bf57aab82?w=800',
 '[]', 'completed', 98);
*/
