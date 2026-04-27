/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Database, Layout, Smartphone, Shield, Cloud } from 'lucide-react';

export interface Course {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  icon: any;
  featured?: boolean;
  nextBatch: string;
}

export const COURSES: Course[] = [
  {
    id: 'fs-web',
    title: 'Full Stack Web Development',
    description: 'Master modern web technologies from frontend to backend with industry-standard practices.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Next.js'],
    icon: Layout,
    featured: true,
    nextBatch: 'May 15',
  },
  {
    id: 'ds-ml',
    title: 'Data Science & Machine Learning',
    description: 'Learn to extract insights from data and build predictive models using Python and Pandas.',
    techStack: ['Python', 'Pandas', 'Scikit-Learn', 'TensorFlow'],
    icon: Database,
    nextBatch: 'June 1',
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design Strategy',
    description: 'Create stunning user interfaces and intuitive experiences that users love.',
    techStack: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    icon: Layout,
    nextBatch: 'May 20',
  },
  {
    id: 'mobile-dev',
    title: 'Mobile App Development',
    description: 'Build high-performance native-like apps for iOS and Android using cross-platform tools.',
    techStack: ['React Native', 'Firebase', 'Redux', 'App Store'],
    icon: Smartphone,
    featured: true,
    nextBatch: 'June 5',
  },
  {
    id: 'cyber-sec',
    title: 'Cyber Security Essentials',
    description: 'Protect digital assets and infrastructures from evolving cyber threats and vulnerabilities.',
    techStack: ['Ethical Hacking', 'Networking', 'Pen Testing', 'Security+'],
    icon: Shield,
    nextBatch: 'May 25',
  },
  {
    id: 'cloud-devops',
    title: 'Cloud Architecture & DevOps',
    description: 'Scale applications efficiently using modern cloud infrastructure and CI/CD pipelines.',
    techStack: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    icon: Cloud,
    nextBatch: 'June 10',
  },
];

export const FEATURES = [
  {
    title: 'Live Mentorship',
    description: 'Learn directly from industry experts with real-time feedback and guidance.',
    icon: 'Live',
  },
  {
    title: 'Project-Based',
    description: 'Build a portfolio of real-world projects that stand out to employers.',
    icon: 'Projects',
  },
  {
    title: 'Global Community',
    description: 'Join thousands of students and alumni across the globe for networking.',
    icon: 'Community',
  },
  {
    title: 'Career Coaching',
    description: 'Get personalized career advice, resume reviews, and interview prep.',
    icon: 'Career',
  },
];

export const STATS = [
  { label: 'Students', value: '5000+' },
  { label: 'Live Courses', value: '15+' },
  { label: 'Satisfaction', value: '98%' },
  { label: 'Placements', value: '1200+' },
];

export const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Frontend Developer @ TechFlow',
    content: 'Codesphere Academy changed my life. The project-based learning model helped me land my dream job in just 4 months.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Data Scientist @ InsightAI',
    content: 'The depth of the curriculum is unmatched. The instructors are clearly experts in their fields and care about student success.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
  },
  {
    name: 'Elena Gilbert',
    role: 'Product Designer @ CreativeCloud',
    content: 'I loved the community aspect. I made friends and collaborators who I still work with today. Highly recommend!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
  },
];
