const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: './.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedHomepage() {
    const content = [
        // Section Headers
        {
            section: 'homepage',
            block_key: 'services_header',
            title: 'Comprehensive Healthcare Solutions',
            subtitle: 'We combine pharmaceutical expertise with modern technology to provide a full range of healthcare services across Ghana.',
            metadata: { tag: 'What We Do' },
            sort_order: 10
        },
        {
            section: 'homepage',
            block_key: 'products_header',
            title: 'Featured Products',
            subtitle: 'Our most popular medicines and healthcare essentials, curated for quality and efficacy.',
            metadata: { tag: 'Best Sellers' },
            sort_order: 20
        },
        {
            section: 'homepage',
            block_key: 'categories_header',
            title: 'Shop by Category',
            subtitle: 'Find exactly what you need by browsing our specialized healthcare categories.',
            metadata: { tag: 'Specialties' },
            sort_order: 30
        },
        {
            section: 'homepage',
            block_key: 'stats_header',
            title: 'Trusted by Thousands Across Ghana',
            subtitle: 'Our impact in numbers — a testament to our commitment to healthcare excellence.',
            metadata: {},
            sort_order: 40
        },
        {
            section: 'homepage',
            block_key: 'about_header',
            title: 'More Than Just a Pharmacy',
            subtitle: 'We combine pharmaceutical expertise with a commitment to excellence, integrity, and respect for human life.',
            metadata: { tag: 'Why Choose WIDAMA' },
            sort_order: 50
        },
        // Services
        {
            section: 'homepage',
            block_key: 'service_1',
            title: 'Retail Pharmacy',
            content: 'Licensed pharmaceutical dispensing and professional consultations for individuals and families.',
            metadata: { icon: 'ri-capsule-line', color: 'from-brand-500 to-brand-700', link: '/shop' },
            sort_order: 11
        },
        {
            section: 'homepage',
            block_key: 'service_2',
            title: 'Wholesale Pharmacy',
            content: 'Reliable bulk supply of genuine medicines to hospitals, clinics, and pharmacies nationwide.',
            metadata: { icon: 'ri-truck-line', color: 'from-gold-500 to-gold-700', link: '/about' },
            sort_order: 12
        },
        {
            section: 'homepage',
            block_key: 'service_3',
            title: 'Manufacturing',
            content: 'Quality-assured pharmaceutical production meeting international GMP standards.',
            metadata: { icon: 'ri-flask-line', color: 'from-brand-500 to-brand-700', link: '/about' },
            sort_order: 13
        },
        {
            section: 'homepage',
            block_key: 'service_4',
            title: 'Training Institute',
            content: 'Empowering the next generation of healthcare professionals through specialized pharmacy training.',
            metadata: { icon: 'ri-graduation-cap-line', color: 'from-gold-500 to-gold-700', link: '/about' },
            sort_order: 14
        },
        // Stats
        {
            section: 'homepage',
            block_key: 'stat_1',
            title: '20',
            subtitle: 'Years of Experience',
            metadata: { suffix: '+' },
            sort_order: 41
        },
        {
            section: 'homepage',
            block_key: 'stat_2',
            title: '50',
            subtitle: 'Healthcare Partners',
            metadata: { suffix: '+' },
            sort_order: 42
        },
        {
            section: 'homepage',
            block_key: 'stat_3',
            title: '15',
            subtitle: 'Thousand Customers',
            metadata: { suffix: 'k+' },
            sort_order: 43
        },
        {
            section: 'homepage',
            block_key: 'stat_4',
            title: '100',
            subtitle: 'Quality Products',
            metadata: { suffix: '%' },
            sort_order: 44
        },
        // Trust Badges
        {
            section: 'homepage',
            block_key: 'trust_badge_1',
            title: 'Genuine Products',
            subtitle: '100% Guaranteed',
            metadata: { icon: 'ri-shield-check-line' },
            sort_order: 1
        },
        {
            section: 'homepage',
            block_key: 'trust_badge_2',
            title: 'Licensed Pharmacy',
            subtitle: 'Pharmacy Council Ghana',
            metadata: { icon: 'ri-medal-line' },
            sort_order: 2
        },
        {
            section: 'homepage',
            block_key: 'trust_badge_3',
            title: 'Expert Advice',
            subtitle: 'Consult a Pharmacist',
            metadata: { icon: 'ri-nurse-line' },
            sort_order: 3
        },
        {
            section: 'homepage',
            block_key: 'trust_badge_4',
            title: 'Fast Delivery',
            subtitle: 'Nationwide Shipping',
            metadata: { icon: 'ri-truck-line' },
            sort_order: 4
        },
        // About Section Details
        {
            section: 'homepage',
            block_key: 'about_card',
            title: 'Quality Healthcare Since 2004',
            content: 'WIDAMA started as a popular drug store and has grown into a comprehensive healthcare ecosystem dedicated to serving Ghana with integrity.',
            metadata: { tag: 'Established' },
            sort_order: 51
        },
        {
            section: 'homepage',
            block_key: 'about_value_1',
            title: 'Integrity First',
            content: 'We never compromise on the quality and authenticity of our products.',
            metadata: { icon: 'ri-shield-star-line' },
            sort_order: 52
        },
        {
            section: 'homepage',
            block_key: 'about_value_2',
            title: 'Innovation Driven',
            content: 'Constantly improving our services and product range to serve you better.',
            metadata: { icon: 'ri-lightbulb-line' },
            sort_order: 53
        },
        {
            section: 'homepage',
            block_key: 'about_testimonial',
            title: 'Customer Feedback',
            content: 'WIDAMA is my trusted pharmacy. Always genuine medicines and excellent service.',
            metadata: { author: 'Satisfied Customer' },
            sort_order: 60
        },
        // CTA Banner
        {
            section: 'homepage',
            block_key: 'cta_banner',
            title: 'Ready to Experience Healthcare Excellence?',
            content: 'Visit us at WIDAMA Towers, Ashaiman Lebanon, or shop online for genuine medicines and health products delivered nationwide.',
            button_text: 'Shop Now',
            button_url: '/shop',
            metadata: { secondary_button_text: 'Contact Us', secondary_button_url: '/contact' },
            sort_order: 70
        },
        // Newsletter
        {
            section: 'homepage',
            block_key: 'newsletter',
            title: 'Join Our Newsletter',
            subtitle: 'Stay updated with the latest healthcare news and exclusive offers.',
            metadata: { tag: 'Subscribe' },
            sort_order: 80
        }
    ];

    for (const item of content) {
        const { error } = await supabase
            .from('cms_content')
            .upsert(item, { onConflict: 'section,block_key' });

        if (error) {
            console.error(`Error upserting ${item.block_key}:`, error);
        } else {
            console.log(`Successfully upserted ${item.block_key}`);
        }
    }
}

seedHomepage();
