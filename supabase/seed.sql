-- ============================================
-- METALR - Seed Data
-- Executez APRES schema.sql
-- ============================================

-- ============================================
-- ARTICLES (6 articles existants)
-- ============================================

INSERT INTO articles (slug, title, excerpt, content, category, category_label, badge, date, image_url, featured, author, read_time, status, views) VALUES

-- Article 1
(
  'metalr-nouvelle-usine-afrique-nord',
  '{"fr":"METALR ouvre une nouvelle usine en Afrique du Nord","en":"METALR opens a new factory in North Africa","zh":"METALR 在北非开设新工厂","ar":"METALR تفتح مصنعاً جديداً في شمال أفريقيا"}',
  '{"fr":"Extension de notre capacité de production avec une 6ème usine à Casablanca pour mieux servir nos clients africains.","en":"Expanding our production capacity with a 6th factory in Casablanca to better serve our African clients.","zh":"在卡萨布兰卡建立第6家工厂，扩大生产能力，更好地服务非洲客户。","ar":"توسيع طاقتنا الإنتاجية بافتتاح المصنع السادس في الدار البيضاء لخدمة عملائنا الأفارقة بشكل أفضل."}',
  '{"fr":"## Une nouvelle etape pour METALR\n\nMETALR poursuit son expansion internationale avec l''ouverture d''une nouvelle usine a Casablanca, au Maroc. Cette 6eme unite de production renforce notre capacite a repondre aux besoins croissants de nos clients en Afrique du Nord et de l''Ouest.\n\n### Les chiffres cles\n- **5000 m²** de surface de production\n- **80 emplois** crees localement\n- **Capacite** de 2000 tonnes/an\n\nCette usine ultramoderne integre les dernieres technologies de decoupe laser et de soudure automatisee.","en":"## A new milestone for METALR\n\nMETALR continues its international expansion with the opening of a new factory in Casablanca, Morocco. This 6th production unit strengthens our ability to meet the growing needs of our clients in North and West Africa.\n\n### Key figures\n- **5000 m²** production area\n- **80 jobs** created locally\n- **Capacity** of 2000 tons/year\n\nThis state-of-the-art factory integrates the latest laser cutting and automated welding technologies.","zh":"## METALR 的新里程碑\n\nMETALR 继续国际扩张，在摩洛哥卡萨布兰卡开设新工厂。","ar":"## مرحلة جديدة لـ METALR\n\nتواصل METALR توسعها الدولي بافتتاح مصنع جديد في الدار البيضاء بالمغرب."}',
  'entreprise',
  '{"fr":"Entreprise","en":"Company","zh":"企业","ar":"شركة"}',
  '{"fr":"Nouveau","en":"New","zh":"新","ar":"جديد"}',
  '2026-01-15',
  'https://images.unsplash.com/photo-1762968269894-1d7e7ce8894e?w=800',
  true,
  'METALR',
  '5 min',
  'published',
  2456
),

-- Article 2
(
  'innovation-structures-agripv',
  '{"fr":"Innovation : Structures AgriPV de nouvelle génération","en":"Innovation: Next-generation AgriPV Structures","zh":"创新：新一代农业光伏结构","ar":"ابتكار: هياكل AgriPV من الجيل الجديد"}',
  '{"fr":"Découvrez nos nouvelles structures photovoltaïques adaptées à l''agriculture, optimisant rendement agricole et production d''énergie.","en":"Discover our new photovoltaic structures adapted to agriculture, optimizing agricultural yield and energy production.","zh":"探索我们专为农业设计的新型光伏结构，优化农业产量和能源生产。","ar":"اكتشف هياكلنا الكهروضوئية الجديدة المكيفة للزراعة، مما يحسن المردود الزراعي وإنتاج الطاقة."}',
  '{"fr":"## AgriPV : L''avenir de l''agriculture\n\nNos structures AgriPV permettent de combiner production agricole et generation d''energie solaire sur une meme parcelle.","en":"## AgriPV: The future of agriculture\n\nOur AgriPV structures allow combining agricultural production and solar energy generation on the same plot.","zh":"## AgriPV：农业的未来","ar":"## AgriPV: مستقبل الزراعة"}',
  'innovation',
  '{"fr":"Innovation","en":"Innovation","zh":"创新","ar":"ابتكار"}',
  '{"fr":"Innovation","en":"Innovation","zh":"创新","ar":"ابتكار"}',
  '2026-01-10',
  'https://images.unsplash.com/photo-1724148266038-280d0cd00f8c?w=800',
  false,
  'METALR',
  '4 min',
  'published',
  1834
),

-- Article 3
(
  'projet-passerelle-urbaine-lyon',
  '{"fr":"Projet d''exception : Passerelle urbaine à Lyon","en":"Exceptional project: Urban footbridge in Lyon","zh":"杰出项目：里昂城市人行天桥","ar":"مشروع استثنائي: جسر مشاة حضري في ليون"}',
  '{"fr":"Un ouvrage d''art de 150 mètres reliant deux quartiers, alliant design contemporain et performance structurelle.","en":"A 150-meter structure connecting two neighborhoods, combining contemporary design and structural performance.","zh":"150米长的工程艺术品，连接两个街区，融合当代设计与结构性能。","ar":"عمل هندسي بطول 150 متراً يربط حيين، يجمع بين التصميم المعاصر والأداء الهيكلي."}',
  '{"fr":"## Passerelle urbaine Lyon\n\nUn projet d''exception alliant design et performance.","en":"## Lyon Urban Footbridge\n\nAn exceptional project combining design and performance.","zh":"## 里昂城市人行天桥","ar":"## جسر مشاة حضري في ليون"}',
  'projet',
  '{"fr":"Projet","en":"Project","zh":"项目","ar":"مشروع"}',
  '{"fr":"En cours","en":"In progress","zh":"进行中","ar":"جاري"}',
  '2026-01-05',
  'https://images.unsplash.com/photo-1639321372181-25041ed58bdb?w=800',
  false,
  'METALR',
  '3 min',
  'published',
  1623
),

-- Article 4
(
  'metalr-salon-energies-renouvelables-2026',
  '{"fr":"METALR au Salon des Énergies Renouvelables 2026","en":"METALR at the Renewable Energy Trade Show 2026","zh":"METALR 参展 2026 年可再生能源展","ar":"METALR في معرض الطاقات المتجددة 2026"}',
  '{"fr":"Retrouvez-nous au salon Intersolar Europe à Munich du 15 au 17 juin 2026, stand B4.230.","en":"Meet us at Intersolar Europe in Munich from June 15 to 17, 2026, stand B4.230.","zh":"2026年6月15日至17日，在慕尼黑 Intersolar Europe 展会上找到我们，展位 B4.230。","ar":"التقوا بنا في معرض Intersolar Europe في ميونيخ من 15 إلى 17 يونيو 2026، الجناح B4.230."}',
  '{"fr":"## Salon Intersolar Europe 2026\n\nRetrouvez METALR au salon Intersolar Europe a Munich.","en":"## Intersolar Europe 2026\n\nMeet METALR at Intersolar Europe in Munich.","zh":"## Intersolar Europe 2026","ar":"## Intersolar Europe 2026"}',
  'evenement',
  '{"fr":"Événement","en":"Event","zh":"活动","ar":"حدث"}',
  '{"fr":"À venir","en":"Upcoming","zh":"即将举行","ar":"قادم"}',
  '2025-12-28',
  'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=800',
  false,
  'METALR',
  '2 min',
  'published',
  980
),

-- Article 5
(
  'certification-iso-14001-tous-sites',
  '{"fr":"Certification ISO 14001 obtenue pour nos 5 sites","en":"ISO 14001 Certification obtained for all 5 sites","zh":"获得所有5个基地 ISO 14001 认证","ar":"الحصول على شهادة ISO 14001 لجميع المواقع الخمسة"}',
  '{"fr":"METALR renforce son engagement environnemental avec la certification ISO 14001 pour l''ensemble de ses sites de production.","en":"METALR strengthens its environmental commitment with ISO 14001 certification for all its production sites.","zh":"METALR 通过所有生产基地 ISO 14001 认证，进一步强化环保承诺。","ar":"METALR تعزز التزامها البيئي بالحصول على شهادة ISO 14001 لجميع مواقع الإنتاج."}',
  '{"fr":"## Certification ISO 14001\n\nUn engagement fort pour l''environnement.","en":"## ISO 14001 Certification\n\nA strong commitment to the environment.","zh":"## ISO 14001 认证","ar":"## شهادة ISO 14001"}',
  'entreprise',
  '{"fr":"Entreprise","en":"Company","zh":"企业","ar":"شركة"}',
  '{"fr":"Certification","en":"Certification","zh":"认证","ar":"شهادة"}',
  '2025-12-20',
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
  false,
  'METALR',
  '3 min',
  'published',
  756
),

-- Article 6
(
  'partenariat-ecole-centrale-rd',
  '{"fr":"Partenariat avec l''École Centrale pour la R&D","en":"Partnership with École Centrale for R&D","zh":"与中央大学开展研发合作","ar":"شراكة مع مدرسة سنترال للبحث والتطوير"}',
  '{"fr":"Collaboration avec l''École Centrale de Nantes sur les structures métalliques innovantes et les matériaux du futur.","en":"Collaboration with École Centrale de Nantes on innovative metal structures and the materials of the future.","zh":"与南特中央大学合作研究创新金属结构和未来材料。","ar":"تعاون مع مدرسة سنترال نانت حول الهياكل المعدنية المبتكرة ومواد المستقبل."}',
  '{"fr":"## Partenariat R&D\n\nUne collaboration prometteuse avec l''Ecole Centrale de Nantes.","en":"## R&D Partnership\n\nA promising collaboration with Ecole Centrale de Nantes.","zh":"## 研发合作","ar":"## شراكة البحث والتطوير"}',
  'innovation',
  '{"fr":"Innovation","en":"Innovation","zh":"创新","ar":"ابتكار"}',
  '{"fr":"Partenariat","en":"Partnership","zh":"合作","ar":"شراكة"}',
  '2025-12-15',
  'https://images.unsplash.com/photo-1685376594043-844022374fe6?w=800',
  false,
  'METALR',
  '4 min',
  'published',
  542
);

-- ============================================
-- REALISATIONS (6 projets existants)
-- ============================================

INSERT INTO realisations (slug, title, category, category_label, location, description, challenges, solutions, year, surface, client, duration, budget, main_image_url, gallery, status) VALUES

-- Realisation 1 (Stabulation)
(
  'stabulation-180-vaches',
  '{"fr":"Stabulation 180 vaches","en":"180-cow stabling","zh":"180头奶牛畜舍","ar":"مربط أبقار حديث"}',
  'agriculture',
  '{"fr":"Agriculture","en":"Agriculture","zh":"农业","ar":"زراعة"}',
  '{"fr":"Normandie, France","en":"Normandy, France","zh":"诺曼底，法国","ar":"بيكاردي، فرنسا"}',
  '{"fr":"Ce projet de stabulation moderne pour 180 vaches laitières représente l''excellence de notre savoir-faire en structures agricoles. Conçu pour optimiser le bien-être animal et la productivité de l''élevage, ce bâtiment intègre les dernières innovations en matière de ventilation naturelle et de gestion des flux. La structure métallique galvanisée garantit une durabilité exceptionnelle face aux conditions climatiques normandes, tout en offrant une flexibilité d''aménagement intérieur permettant d''adapter les espaces selon les besoins de l''exploitation.","en":"This modern dairy barn project for 180 cows represents the excellence of our expertise in agricultural structures. Designed to optimize animal welfare and farm productivity, this building integrates the latest innovations in natural ventilation and flow management. The hot-dip galvanized steel structure guarantees exceptional durability against Norman climate conditions, while offering interior layout flexibility to adapt spaces to the farm''s needs.","zh":"这个为180头奶牛设计的现代化牛舍项目代表了我们在农业结构方面的卓越专业知识。该建筑专为优化动物福利和农场生产力而设计，融合了自然通风和流量管理方面的最新创新。热镀锌钢结构保证了在诺曼底气候条件下的卓越耐久性，同时提供室内布局灵活性，可根据农场需求调整空间。","ar":"يمثل هذا المشروع الحديث لإسطبل 180 بقرة حلوب تميزنا في الهياكل الزراعية. صُمم لتحسين رفاهية الحيوان وإنتاجية المزرعة، ويدمج هذا المبنى أحدث الابتكارات في التهوية الطبيعية وإدارة التدفق."}',
  '[{"fr":"Intégration d''un système de ventilation naturelle optimisé","en":"Integration of an optimized natural ventilation system","zh":"集成优化自然通风系统","ar":"دمج نظام تهوية طبيعية محسّن"},{"fr":"Résistance aux vents forts de la région normande","en":"Resistance to strong winds in the Norman region","zh":"抵御诺曼底地区强风","ar":"مقاومة الرياح القوية في منطقة نورماندي"},{"fr":"Installation rapide pour minimiser l''impact sur l''exploitation","en":"Fast installation to minimize impact on the farm","zh":"快速安装以减少对农场的影响","ar":"تركيب سريع لتقليل الأثر على المزرعة"},{"fr":"Respect des normes bien-être animal","en":"Compliance with animal welfare standards","zh":"符合动物福利标准","ar":"الامتثال لمعايير رفاهية الحيوان"}]',
  '[{"fr":"Structure métallique galvanisée à chaud pour une durabilité maximale","en":"Hot-dip galvanized steel structure for maximum durability","zh":"热镀锌钢结构，实现最大耐久性","ar":"هيكل فولاذي مجلفن بالغطس الساخن لأقصى متانة"},{"fr":"Bardage ventilé avec ouvertures réglables automatiques","en":"Ventilated cladding with automatic adjustable openings","zh":"带可自动调节开口的通风围护结构","ar":"كسوة مهواة مع فتحات قابلة للضبط التلقائي"},{"fr":"Fondations renforcées calculées selon Eurocode","en":"Reinforced foundations calculated according to Eurocode","zh":"按欧洲规范计算的加强基础","ar":"أسس مقواة محسوبة وفق Eurocode"},{"fr":"Pré-assemblage en atelier pour un montage en 3 semaines","en":"Pre-assembly in workshop for 3-week installation","zh":"车间预组装，3周完成安装","ar":"تجميع مسبق في المصنع لتركيب في 3 أسابيع"}]',
  '2024',
  '1200 m²',
  'EARL Dubois',
  '4 mois',
  '450 000 €',
  'https://images.unsplash.com/photo-1653233532156-327bf57aab82?w=800',
  '["https://images.unsplash.com/photo-1675511029093-740b26a1c4ff?w=800","https://images.unsplash.com/photo-1745184778017-7b935ed2a4c1?w=800","https://images.unsplash.com/photo-1653233532156-327bf57aab82?w=800"]',
  'completed'
),

-- Realisation 2 (Centrale solaire)
(
  'centrale-solaire-5mw',
  '{"fr":"Centrale solaire 5 MW","en":"5 MW solar plant","zh":"5兆瓦太阳能电站","ar":"حقل ألواح شمسية أرضي"}',
  'photovoltaique',
  '{"fr":"Photovoltaïque","en":"Photovoltaic","zh":"光伏","ar":"كهروضوئي"}',
  '{"fr":"Occitanie, France","en":"Occitanie, France","zh":"奥克西塔尼，法国","ar":"نورماندي، فرنسا"}',
  '{"fr":"Installation complète d''une centrale photovoltaïque au sol de 5 MW avec structures métalliques sur mesure, optimisées pour le rendement énergétique maximal.","en":"Complete installation of a 5 MW ground-mounted photovoltaic plant with custom metal structures, optimized for maximum energy yield.","zh":"完整安装5兆瓦地面光伏电站，采用定制金属结构，优化最大能源产出。","ar":"تركيب كامل لمحطة طاقة شمسية أرضية بقدرة 5 ميغاواط مع هياكل معدنية مخصصة."}',
  '[]',
  '[]',
  '2025',
  '8000 m²',
  'Energies Solaires SARL',
  '6 mois',
  '1 200 000 €',
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
  '[]',
  'completed'
),

-- Realisation 3 (Hall industriel)
(
  'hall-industriel',
  '{"fr":"Hall industriel","en":"Industrial hall","zh":"工业厂房","ar":"مستودع صناعي كبير"}',
  'industrie',
  '{"fr":"Industrie","en":"Industry","zh":"工业","ar":"صناعة"}',
  '{"fr":"Hauts-de-France","en":"Hauts-de-France","zh":"法国北部","ar":"إيل دو فرانس، فرنسا"}',
  '{"fr":"Complexe industriel de stockage et production avec pont roulant intégré, structure métallique haute performance pour usage intensif.","en":"Industrial complex for storage and production with integrated overhead crane, high-performance steel structure for intensive use.","zh":"集成行车的工业存储和生产综合体，高性能钢结构适用于密集使用。","ar":"مجمع صناعي للتخزين والإنتاج مع رافعة جسرية مدمجة، هيكل فولاذي عالي الأداء."}',
  '[]',
  '[]',
  '2024',
  '3500 m²',
  'Industrial Solutions Ltd',
  '5 mois',
  '780 000 €',
  'https://images.unsplash.com/photo-1685376594043-844022374fe6?w=800',
  '[]',
  'completed'
),

-- Realisation 4 (Passerelle)
(
  'passerelle-pietonne',
  '{"fr":"Passerelle piétonne","en":"Pedestrian footbridge","zh":"步行天桥","ar":"جسر مشاة معدني"}',
  'ouvrages',
  '{"fr":"Ouvrages d''art","en":"Civil engineering","zh":"土木工程","ar":"أعمال هندسية"}',
  '{"fr":"Île-de-France","en":"Île-de-France","zh":"法兰西岛","ar":"لييج، بلجيكا"}',
  '{"fr":"Passerelle piétonne métallique avec conception parasismique et design architectural contemporain.","en":"Metal pedestrian footbridge with seismic design and contemporary architectural styling.","zh":"金属人行天桥，具有抗震设计和当代建筑风格。","ar":"جسر مشاة معدني بتصميم مقاوم للزلازل وطراز معماري معاصر."}',
  '[]',
  '[]',
  '2025',
  '450 m lineaires',
  'Ministere des Transports',
  '8 mois',
  '2 100 000 €',
  'https://images.unsplash.com/photo-1548513911-163fbb0d1e23?w=800',
  '[]',
  'ongoing'
),

-- Realisation 5 (Ombrieres)
(
  'ombrieres-parking',
  '{"fr":"Ombrières parking","en":"Parking canopies","zh":"停车场遮阳棚","ar":"مظلة سيارات كهروضوئية"}',
  'photovoltaique',
  '{"fr":"Photovoltaïque","en":"Photovoltaic","zh":"光伏","ar":"كهروضوئي"}',
  '{"fr":"Lyon, France","en":"Lyon, France","zh":"里昂，法国","ar":"بروكسل، بلجيكا"}',
  '{"fr":"Ombrières de parking photovoltaïques pour un centre commercial, combinant protection des véhicules et production d''énergie verte.","en":"Photovoltaic parking canopies for a shopping center, combining vehicle protection and green energy production.","zh":"商业中心光伏停车遮阳棚，结合车辆保护和绿色能源生产。","ar":"مظلات مواقف سيارات كهروضوئية لمركز تجاري، تجمع بين حماية المركبات وإنتاج الطاقة الخضراء."}',
  '[]',
  '[]',
  '2025',
  '2000 m²',
  'Centre Commercial Confluence',
  '3 mois',
  '650 000 €',
  'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=800',
  '[]',
  'completed'
),

-- Realisation 6 (Batiment agricole)
(
  'batiment-agricole',
  '{"fr":"Bâtiment agricole","en":"Agricultural building","zh":"农业建筑","ar":"مستودع تخزين زراعي"}',
  'agriculture',
  '{"fr":"Agriculture","en":"Agriculture","zh":"农业","ar":"زراعة"}',
  '{"fr":"Beauce, France","en":"Beauce, France","zh":"博斯，法国","ar":"سومي، فرنسا"}',
  '{"fr":"Bâtiment de stockage agricole polyvalent avec charpente métallique optimisée pour grandes portées et charges importantes.","en":"Multipurpose agricultural storage building with steel frame optimized for large spans and heavy loads.","zh":"多功能农业仓储建筑，钢框架优化适用于大跨度和重载。","ar":"مبنى تخزين زراعي متعدد الاستخدامات مع هيكل فولاذي محسّن للامتدادات الكبيرة والأحمال الثقيلة."}',
  '[]',
  '[]',
  '2024',
  '1800 m²',
  'GAEC Les Champs Dores',
  '3 mois',
  '320 000 €',
  'https://images.unsplash.com/photo-1653233532156-327bf57aab82?w=800',
  '[]',
  'completed'
);
