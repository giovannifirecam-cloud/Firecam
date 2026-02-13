export interface ServiceData {
  id: string;
  title: string;
  hook: string;
  description: string[];
  features: string[];
  cta: string;
  imageUrl: string;
  videoUrl: string;
}

export interface ValueProp {
  title: string;
  headline: string;
  description: string[];
  highlight: string;
}

export interface TestimonialData {
  quote: string;
  author: string;
  role: string;
  location: string;
  stars: number;
  date: string;
}

export interface HeroHeadline {
  p1: string;
  p1Suffix?: string;
  connector: string;
  p2: string;
  suffix: string;
}

export interface HeroSlideData {
  id: number;
  badge: string;
  title: string;
  headline: HeroHeadline;
  subheadline: string;
  topics: string[];
  topicIcons?: string[];
  cta: string;
  imageUrl: string;
  videoUrl?: string;
}