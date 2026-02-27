const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: './.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedAboutPage() {
    const content = [
        // Hero
        {
            section: 'about_page',
            block_key: 'about_hero',
            title: 'More Than Just',
            subtitle: 'A Pharmacy',
            content: 'From a single pharmacy in Ashaiman to a comprehensive healthcare ecosystem — WIDAMA\'s story is one of vision, dedication, and an unwavering commitment to health.',
            metadata: { tag: 'Est. 2004' },
            sort_order: 10
        },
        // Story
        {
            section: 'about_page',
            block_key: 'about_story_header',
            title: 'How It All Started',
            subtitle: 'The Beginning',
            content: null,
            metadata: { tag: 'The Beginning' },
            sort_order: 20
        },
        {
            section: 'about_page',
            block_key: 'about_story_content',
            title: 'Founding Years',
            subtitle: null,
            content: 'In 2004, Mr. Wisdom Amezah established WIDAMA Pharmacy after starting as a popular over-the-counter shop, commonly known as a drug store. This humble beginning shaped our vision to make quality healthcare accessible to every Ghanaian. What began as a popular drug store in Ashaiman has grown into one of Ghana\'s most trusted healthcare brands. Through dedication and an unwavering commitment to quality, WIDAMA expanded into wholesale pharmaceutical distribution, later adding a pharmaceutical manufacturing wing and a professional training institute. Today, WIDAMA Towers in Ashaiman Lebanon stands as both our headquarters and a testament to what can be achieved through integrity, innovation, and a deep respect for human life.',
            metadata: {},
            sort_order: 30
        },
        // Founder
        {
            section: 'about_page',
            block_key: 'about_founder',
            title: 'Mr. Wisdom Amezah',
            subtitle: 'Founder & CEO',
            content: 'Our mission has always been to serve with integrity, innovate for better healthcare, and respect every life we touch.',
            metadata: { icon: 'ri-user-star-line' },
            sort_order: 40
        },
        // Milestones
        {
            section: 'about_page',
            block_key: 'about_milestone_1',
            title: 'Foundation',
            subtitle: '2004',
            content: 'WIDAMA Pharmacy was established by Mr. Wisdom Amezah in Ashaiman, Ghana, with a vision to make quality healthcare accessible.',
            metadata: {},
            sort_order: 51
        },
        {
            section: 'about_page',
            block_key: 'about_milestone_2',
            title: 'Wholesale Expansion',
            subtitle: '2008',
            content: 'WIDAMA expands into wholesale pharmaceutical distribution, serving hospitals and clinics across Ghana.',
            metadata: {},
            sort_order: 52
        },
        {
            section: 'about_page',
            block_key: 'about_milestone_3',
            title: 'WIDAMA Towers',
            subtitle: '2014',
            content: 'Construction of WIDAMA Towers in Ashaiman Lebanon, a landmark building housing our headquarters and operations.',
            metadata: {},
            sort_order: 53
        },
        {
            section: 'about_page',
            block_key: 'about_milestone_4',
            title: 'Manufacturing Wing',
            subtitle: '2018',
            content: 'Launch of our pharmaceutical manufacturing arm, producing quality medicines that meet international standards.',
            metadata: {},
            sort_order: 54
        },
        {
            section: 'about_page',
            block_key: 'about_milestone_5',
            title: 'Training Institute',
            subtitle: '2021',
            content: 'Establishment of WIDAMA Training Institute to educate and empower the next generation of pharmacy professionals.',
            metadata: {},
            sort_order: 55
        },
        {
            section: 'about_page',
            block_key: 'about_milestone_6',
            title: '20 Years Strong',
            subtitle: '2024',
            content: 'Celebrating 20 years of service to Ghana — expanding into e-commerce to bring healthcare to every doorstep.',
            metadata: {},
            sort_order: 56
        },
        // Mission & Vision
        {
            section: 'about_page',
            block_key: 'about_mission',
            title: 'Our Mission',
            subtitle: null,
            content: 'To provide accessible, affordable, and quality pharmaceutical products and healthcare services to all Ghanaians, while upholding the highest standards of integrity and professional excellence.',
            metadata: { icon: 'ri-focus-3-line' },
            sort_order: 60
        },
        {
            section: 'about_page',
            block_key: 'about_vision',
            title: 'Our Vision',
            subtitle: null,
            content: 'To become Ghana\'s most trusted and comprehensive healthcare brand — leading in pharmaceutical retail, wholesale, manufacturing, and professional training.',
            metadata: { icon: 'ri-eye-line' },
            sort_order: 70
        },
        // Core Values
        {
            section: 'about_page',
            block_key: 'about_value_1',
            title: 'Integrity',
            subtitle: null,
            content: 'We uphold the highest standards of honesty and transparency in all our dealings, ensuring every product is genuine and every interaction is trustworthy.',
            metadata: { icon: 'ri-shield-star-line', color: 'bg-brand-50 text-brand-600', borderColor: 'border-brand-100 hover:border-brand-300' },
            sort_order: 81
        },
        {
            section: 'about_page',
            block_key: 'about_value_2',
            title: 'Innovation',
            subtitle: null,
            content: 'We continuously seek new ways to improve healthcare delivery, embracing modern technology and progressive business practices.',
            metadata: { icon: 'ri-lightbulb-flash-line', color: 'bg-gold-50 text-gold-600', borderColor: 'border-gold-100 hover:border-gold-300' },
            sort_order: 82
        },
        {
            section: 'about_page',
            block_key: 'about_value_3',
            title: 'Commitment to Excellence',
            subtitle: null,
            content: 'From our product curation to customer service, we pursue excellence in everything we do — never settling for less than the best.',
            metadata: { icon: 'ri-medal-line', color: 'bg-brand-50 text-brand-600', borderColor: 'border-brand-100 hover:border-brand-300' },
            sort_order: 83
        },
        {
            section: 'about_page',
            block_key: 'about_value_4',
            title: 'Respect for Human Life',
            subtitle: null,
            content: 'At the core of our mission is a profound respect for human life. Every medicine we stock, every service we provide exists to protect and improve lives.',
            metadata: { icon: 'ri-heart-pulse-line', color: 'bg-red-50 text-red-500', borderColor: 'border-red-100 hover:border-red-300' },
            sort_order: 84
        },
        // Services
        {
            section: 'about_page',
            block_key: 'about_service_1',
            title: 'Retail Pharmacy',
            subtitle: 'Our Offerings',
            content: 'Walk-in and online pharmaceutical dispensing with licensed pharmacist consultation. We carry a wide range of prescription and over-the-counter medicines.',
            metadata: { icon: 'ri-store-2-line', features: ["Prescription Medicines", "OTC Products", "Health Supplements", "Personal Care"] },
            sort_order: 91
        },
        {
            section: 'about_page',
            block_key: 'about_service_2',
            title: 'Wholesale Pharmacy',
            subtitle: 'Our Offerings',
            content: 'Reliable bulk pharmaceutical supply to hospitals, clinics, pharmacies, and healthcare facilities nationwide.',
            metadata: { icon: 'ri-truck-line', features: ["Bulk Ordering", "Competitive Pricing", "Nationwide Delivery", "Credit Facilities"] },
            sort_order: 92
        },
        {
            section: 'about_page',
            block_key: 'about_service_3',
            title: 'Manufacturing',
            subtitle: 'Our Offerings',
            content: 'Production of quality pharmaceutical products in our state-of-the-art facility, adhering to international GMP standards.',
            metadata: { icon: 'ri-flask-line', features: ["GMP Certified", "Quality Control", "R&D Department", "Local Production"] },
            sort_order: 93
        },
        {
            section: 'about_page',
            block_key: 'about_service_4',
            title: 'Training Institute',
            subtitle: 'Our Offerings',
            content: 'WIDAMA Training Institute offers professional development programs for pharmacy technicians and healthcare workers.',
            metadata: { icon: 'ri-graduation-cap-line', features: ["Pharmacy Technician", "Continuing Education", "Practical Training", "Certification"] },
            sort_order: 94
        },
        // CTA
        {
            section: 'about_page',
            block_key: 'about_cta',
            title: 'Experience the WIDAMA Difference',
            subtitle: null,
            content: 'Visit us at WIDAMA Towers, Ashaiman Lebanon, or shop online for genuine medicines and health products.',
            metadata: { button1_text: 'Start Shopping', button1_url: '/shop', button2_text: 'Contact Us', button2_url: '/contact' },
            sort_order: 100
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

seedAboutPage();
