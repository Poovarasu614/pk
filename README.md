# Personal Portfolio Website - Poovarasu

A modern, production-ready personal portfolio website built with vanilla HTML, CSS, and JavaScript. Features responsive design, dark/light themes, accessibility compliance, and smooth animations.

## 🌟 Features

### Core Functionality
- **Responsive Design**: Mobile-first approach with seamless adaptation to all screen sizes
- **Dark/Light Theme**: Toggle between themes with localStorage persistence
- **Smooth Animations**: CSS transitions and scroll-triggered animations
- **Contact Form**: Client-side validation with success states
- **Project Modal**: Detailed project information in accessible modals
- **Skills Animation**: Animated progress bars with intersection observer
- **Experience Filtering**: Filter experience by type (work, internships, freelance)
- **Keyboard Navigation**: Full keyboard accessibility and shortcuts
- **Print-Friendly**: Optimized print stylesheet for resume view

### Technical Features
- **Semantic HTML5**: Proper document structure and accessibility
- **CSS Custom Properties**: Consistent theming and easy maintenance
- **Vanilla JavaScript**: No dependencies, lightweight and fast
- **Intersection Observer**: Efficient scroll-based animations
- **Form Validation**: Real-time validation with user feedback
- **Local Storage**: Theme preference persistence
- **SEO Optimized**: Meta tags, Open Graph, and semantic markup

## 🚀 Quick Start

### Local Development

1. **Clone or download** this repository
2. **Open `index.html`** in your web browser
3. **That's it!** No build process required

```bash
# Using a local server (recommended)
npx serve .
# or
python -m http.server 8000
# or
php -S localhost:8000
```

### Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── css/
│   ├── styles.css          # Main stylesheet
│   └── print.css           # Print-specific styles
├── js/
│   └── scripts.js          # Main JavaScript file
├── assets/
│   ├── 1000101515.png      # Profile image
│   ├── favicon.ico         # Site favicon
│   ├── apple-touch-icon.png# Apple touch icon
│   └── resume.pdf          # Downloadable resume
├── README.md               # This file
└── LICENSE                 # MIT License
```

## 🌐 GitHub Pages Deployment

### Step-by-Step Deployment

1. **Create a new repository** on GitHub:
   ```bash
   # Navigate to your project folder
   cd portfolio
   
   # Initialize git repository
   git init
   
   # Add all files
   git add .
   
   # Make initial commit
   git commit -m \"Initial portfolio commit\"
   
   # Add GitHub remote (replace with your username)
   git remote add origin https://github.com/yourusername/portfolio.git
   
   # Push to GitHub
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click \"Settings\" tab
   - Scroll to \"Pages\" section
   - Select \"Deploy from a branch\"
   - Choose \"main\" branch and \"/ (root)\" folder
   - Click \"Save\"

3. **Access your site**:
   - Your site will be available at: `https://yourusername.github.io/portfolio`
   - Initial deployment may take 5-10 minutes

### Custom Domain (Optional)

1. **Add CNAME file** to repository root:
   ```
   yourdomain.com
   ```

2. **Configure DNS** with your domain provider:
   ```
   Type: CNAME
   Name: www
   Value: yourusername.github.io
   
   Type: A
   Name: @
   Value: 185.199.108.153
          185.199.109.153
          185.199.110.153
          185.199.111.153
   ```

## ✏️ Customization Guide

### Personal Information

**Replace placeholder content in these locations:**

1. **HTML Content** (`index.html`):
   ```html
   <!-- Update hero section -->
   <h1>Hi, I'm <span class=\"hero__name\">Your Name</span></h1>
   <p class=\"hero__subtitle\">Your Title/Role</p>
   
   <!-- Update contact information -->
   <p><a href=\"tel:+1234567890\">Your Phone</a></p>
   <p><a href=\"mailto:your.email@domain.com\">your.email@domain.com</a></p>
   
   <!-- Update social links -->
   <a href=\"https://github.com/yourusername\">GitHub</a>
   <a href=\"https://linkedin.com/in/yourprofile\">LinkedIn</a>
   ```

2. **JavaScript Data** (`js/scripts.js`):
   ```javascript
   // Update skills data
   const skillsData = {
     frontend: [
       { name: 'Your Skill', level: 85 },
       // Add your skills...
     ]
   };
   
   // Update projects data
   const projectsData = [
     {
       id: 'your-project',
       title: 'Your Project Title',
       description: 'Your project description',
       // Update with your project details...
     }
   ];
   
   // Update experience data
   const experienceData = [
     {
       title: 'Your Job Title',
       company: 'Company Name',
       // Update with your experience...
     }
   ];
   ```

3. **Meta Tags** (`index.html`):
   ```html
   <meta name=\"description\" content=\"Your description\">
   <meta name=\"author\" content=\"Your Name\">
   <meta property=\"og:title\" content=\"Your Name - Portfolio\">
   <meta property=\"og:description\" content=\"Your description\">
   ```

### Images and Assets

1. **Replace profile image**: Add your photo as `assets/profile.jpg`
2. **Update favicon**: Replace `assets/favicon.ico` with your icon
3. **Add resume**: Place your resume as `assets/resume.pdf`
4. **Project images**: Add project screenshots to `assets/` folder

### Styling Customization

**CSS Custom Properties** (`css/styles.css`):
```css
:root {
  /* Update colors */
  --color-primary: #your-color;
  --color-accent: #your-accent;
  
  /* Update fonts */
  --font-family-primary: 'Your Font', sans-serif;
  
  /* Update spacing */
  --space-custom: 2rem;
}
```

### Form Integration

**Connect contact form to Formspree**:

1. **Sign up** at [formspree.io](https://formspree.io)
2. **Create a new form** and get your endpoint
3. **Update JavaScript** (`js/scripts.js`):
   ```javascript
   Portfolio.config.formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';
   ```
4. **Update form submission** logic in `FormManager.simulateSubmission()`

## ♿ Accessibility Features

### Built-in Accessibility
- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **ARIA Labels**: Screen reader friendly navigation and interactive elements
- **Keyboard Navigation**: Full site navigation without mouse
- **Focus Management**: Visible focus indicators and logical tab order
- **Color Contrast**: WCAG AA compliant color combinations
- **Alternative Text**: Descriptive alt text for all images
- **Skip Links**: Quick navigation for screen reader users

### Keyboard Shortcuts
- **G**: Navigate to Projects section
- **C**: Navigate to Contact section
- **T**: Toggle dark/light theme
- **Escape**: Close modals and mobile menu

### Testing Accessibility
1. **Tab through the site** - ensure logical order
2. **Test with screen reader** (NVDA, JAWS, VoiceOver)
3. **Check color contrast** with tools like WebAIM
4. **Validate HTML** with W3C validator
5. **Run Lighthouse audit** for accessibility score

## 🎯 Performance Optimization

### Current Optimizations
- **Minified CSS**: Production-ready stylesheets
- **Optimized Images**: WebP format with fallbacks
- **Lazy Loading**: Images load when needed
- **Efficient Animations**: CSS transforms and opacity
- **Minimal JavaScript**: No external dependencies
- **Critical CSS**: Above-the-fold styling prioritized

### Lighthouse Targets
- **Performance**: 90+ score
- **Accessibility**: 100 score
- **Best Practices**: 95+ score
- **SEO**: 100 score

### Further Optimizations
```html
<!-- Add to <head> for better performance -->
<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">
<link rel=\"dns-prefetch\" href=\"//cdn.example.com\">

<!-- Optimize images with responsive srcset -->
<img src=\"image-800.webp\" 
     srcset=\"image-400.webp 400w, image-800.webp 800w\" 
     sizes=\"(max-width: 768px) 400px, 800px\">
```

## 🔧 Build Tools Integration (Optional)

### Using Vite
```bash
# Install Vite
npm install -D vite

# Add to package.json
{
  \"scripts\": {
    \"dev\": \"vite\",
    \"build\": \"vite build\",
    \"preview\": \"vite preview\"
  }
}

# Development
npm run dev

# Production build
npm run build
```

### Using Parcel
```bash
# Install Parcel
npm install -D parcel

# Add to package.json
{
  \"scripts\": {
    \"dev\": \"parcel index.html\",
    \"build\": \"parcel build index.html\"
  }
}
```

## 🧪 Testing Checklist

### Manual Testing
- [ ] **Responsive Design**: Test on mobile, tablet, desktop
- [ ] **Theme Toggle**: Verify dark/light mode switching
- [ ] **Navigation**: Test smooth scrolling and active states
- [ ] **Contact Form**: Validate form submission and error states
- [ ] **Modal Functionality**: Open/close project modals
- [ ] **Keyboard Navigation**: Tab through all interactive elements
- [ ] **Print View**: Check print stylesheet rendering

### Browser Testing
- [ ] **Chrome** (latest)
- [ ] **Firefox** (latest)
- [ ] **Safari** (latest)
- [ ] **Edge** (latest)
- [ ] **Mobile Safari** (iOS)
- [ ] **Chrome Mobile** (Android)

### Performance Testing
- [ ] **Lighthouse audit** (all categories 90+)
- [ ] **WebPageTest** performance metrics
- [ ] **GTmetrix** optimization recommendations
- [ ] **Core Web Vitals** compliance

## 🔮 Future Improvements

### Potential Enhancements
- **Blog Integration**: Add a blog section with markdown support
- **CMS Integration**: Connect to headless CMS for easy content updates
- **Analytics**: Add Google Analytics or privacy-focused alternatives
- **PWA Features**: Service worker for offline functionality
- **Internationalization**: Multi-language support
- **Advanced Animations**: Framer Motion or GSAP integration
- **API Integration**: Dynamic content from external APIs
- **Testing Suite**: Automated testing with Jest and Playwright

### Architecture Improvements
- **Component System**: Modularize HTML into reusable components
- **State Management**: Implement more sophisticated state handling
- **Build Pipeline**: Add CSS/JS minification and optimization
- **Version Control**: Implement semantic versioning
- **CI/CD Pipeline**: Automated testing and deployment

## 🐛 Troubleshooting

### Common Issues

**Theme not persisting:**
```javascript
// Check localStorage support
if (typeof Storage !== \"undefined\") {
  // localStorage is supported
} else {
  // Fallback for older browsers
}
```

**Images not loading:**
- Verify image paths are correct
- Check file extensions match actual files
- Ensure images are in `assets/` folder

**Animations not working:**
- Check if `prefers-reduced-motion` is set
- Verify Intersection Observer support
- Test JavaScript console for errors

**Form submission failing:**
- Update Formspree endpoint in JavaScript
- Check network tab for CORS issues
- Verify form field names match validation logic

### Browser Support
- **Modern browsers**: Full feature support
- **IE11**: Basic functionality (no CSS Grid)
- **Older browsers**: Graceful degradation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues).

## 📞 Support

If you have any questions or need help with customization:

- **Email**: poovarasu614@gmail.com
- **Phone**: 9566878849
- **GitHub**: [Create an issue](../../issues/new)

## 🙏 Acknowledgments

- **Design Inspiration**: Modern portfolio trends and accessibility guidelines
- **Icons**: SVG icons for social media and UI elements
- **Fonts**: System fonts for optimal performance
- **Community**: Web development community for best practices

---

**Built with ❤️ by Poovarasu** | **Information Technology Student**

*This portfolio showcases modern web development practices with a focus on performance, accessibility, and user experience.*