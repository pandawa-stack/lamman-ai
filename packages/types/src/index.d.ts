export interface Brief {
    product_name: string;
    one_liner: string;
    audience: string;
    problem: string;
    solution: string;
    differentiator?: string;
    offer?: string;
    cta: string;
    languages: string[];
}
export interface Design {
    primary: string;
    accent: string;
    bg: string;
    font_heading: string;
    font_body: string;
    tone_visual: 'modern-minimal' | 'playful' | 'corporate' | 'bold-contrast';
}
export interface Voice {
    archetype: string;
    tone: string[];
    reading_level: 'dasar' | 'menengah' | 'lanjutan';
    power_words: boolean;
    jargon_free: boolean;
    use_statistics: boolean;
    conversational: boolean;
}
export interface Layout {
    order: string[];
    container: string;
    hero_style: 'dark' | 'light';
    feature_grid: number;
    testimonial_style: 'cards' | 'carousel' | 'grid';
    spacing: 'compact' | 'normal' | 'relaxed';
    cta_style: 'solid' | 'gradient' | 'outline';
    sticky_navbar: boolean;
    sticky_cta: boolean;
    scroll_to_top: boolean;
}
export interface LandingCopy {
    hero: {
        headline: string;
        subheadline: string;
        bullets: string[];
        primary_cta: string;
        secondary_cta: string;
        social_proof: string;
    };
    benefits: Array<{
        title: string;
        desc: string;
    }>;
    features: Array<{
        title: string;
        desc: string;
    }>;
    testimonials: Array<{
        name: string;
        role: string;
        quote: string;
    }>;
    pricing: {
        plans: Array<{
            name: string;
            price: string;
            items: string[];
        }>;
        note: string;
    };
    faq: Array<{
        q: string;
        a: string;
    }>;
    cta: {
        headline: string;
        kicker: string;
        button: string;
    };
}
export interface ProjectState {
    step: number;
    brief: Brief;
    design: Design;
    voice: Voice;
    layout: Layout;
    copy?: LandingCopy;
    html?: string;
}
//# sourceMappingURL=index.d.ts.map