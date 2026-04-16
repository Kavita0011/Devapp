# DevappKavita - Personal App Showcase & Playstore

## 1. Project Overview

- **Project Name**: DevappKavita
- **Type**: Web Application (React + Vite)
- **Core Functionality**: A personal showcase platform to display apps and websites, with a built-in admin dashboard to manage them like a custom Playstore
- **Target Users**: Visitors browsing your portfolio, and you (admin) managing the content

## 2. UI/UX Specification

### Layout Structure

**Public Pages:**
- Header: Logo (DevappKavita), Navigation (Apps, Websites, About)
- Hero Section: Animated intro with your branding
- Content Grid: Card-based display for apps/websites
- Footer: Social links, copyright

**Admin Dashboard:**
- Sidebar navigation
- Main content area with CRUD operations
- Forms for adding/editing apps

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Visual Design

**Color Palette:**
- Background: `#0a0a0f` (deep dark)
- Surface: `#12121a` (card background)
- Primary: `#00d4ff` (cyan accent)
- Secondary: `#ff006e` (pink accent)
- Text Primary: `#ffffff`
- Text Secondary: `#8888aa`
- Border: `#2a2a3a`

**Typography:**
- Headings: "Clash Display", sans-serif (Google Fonts)
- Body: "Satoshi", sans-serif (Google Fonts)
- Sizes: H1: 3rem, H2: 2rem, Body: 1rem

**Spacing System:**
- Base unit: 8px
- Sections: 80px padding
- Cards: 24px padding
- Grid gap: 24px

**Visual Effects:**
- Glassmorphism cards with subtle blur
- Gradient borders on hover
- Smooth 0.3s transitions
- Floating particle background animation
- Staggered fade-in animations on load

### Components

**App/Website Card:**
- Icon/Thumbnail (120x120)
- Title
- Description (truncated)
- Category badge
- "View" button
- Admin: Edit/Delete buttons

**Category Tabs:**
- All, Apps, Websites
- Active state with underline accent

**Admin Form:**
- Image URL input
- Title input
- Description textarea
- Category selector (App/Website)
- Link URL input
- Save/Cancel buttons

## 3. Functionality Specification

### Core Features

**Public View:**
1. Display all apps and websites in a responsive grid
2. Filter by category (All / Apps / Websites)
3. Click card to open external link
4. Smooth animations and transitions

**Admin Dashboard:**
1. View all items in table/list format
2. Add new app/website (modal or inline form)
3. Edit existing items
4. Delete items with confirmation
5. Data persists in localStorage

### Data Structure
```json
{
  "id": "unique-id",
  "title": "App Name",
  "description": "Description text",
  "category": "app" | "website",
  "imageUrl": "https://...",
  "link": "https://...",
  "createdAt": "timestamp"
}
```

### User Interactions
- Tab switching for categories
- Modal for add/edit forms
- Toast notifications for actions
- Confirm dialog for deletions

## 4. Acceptance Criteria

- [ ] Landing page loads with hero section
- [ ] Apps and websites display in grid
- [ ] Category filter works correctly
- [ ] Clicking card opens the link
- [ ] Admin dashboard is accessible via /admin
- [ ] Can add new app/website
- [ ] Can edit existing item
- [ ] Can delete item
- [ ] Data persists after page refresh (localStorage)
- [ ] Responsive on mobile/tablet/desktop
- [ ] Animations are smooth