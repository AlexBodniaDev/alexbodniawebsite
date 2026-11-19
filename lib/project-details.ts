// Case-study content for both languages in one file.
// Keys (project ids) are identical in both objects. Tool names are kept as-is.

export const projectDetailsEn: Record<string, any> = {
  "tennis-courts-3d": {
    tagline: "From a client's drawing to a tennis complex that's open in Lviv",
    overview:
      "A tennis complex in Lviv that I modeled from scratch using the client's technical drawing, covering geometry, materials and final renders. The project won the tender, the complex was built, and it's in use today.",
    challenge:
      "All I had was a technical drawing. I needed to turn it into something people could judge by eye before construction: how the complex looks, what it's made of and how the space is organized.",
    solution:
      "I built the 3D model on my own, set up the materials and produced renders from several angles. A drawing that only engineers could read became a clear picture of the finished place.",
    metrics: [
      { value: "Built", label: "The complex is open in Lviv" },
      { value: "Tender", label: "The project won the tender" },
      { value: "From scratch", label: "Full 3D model from the client's drawing" },
    ],
    process: [
      { title: "The drawing", description: "Received the technical drawing and worked through the layout, dimensions and court placement." },
      { title: "3D model", description: "Built the complex from zero: courts, fencing, buildings and the surrounding site." },
      { title: "Materials and renders", description: "Set up materials and produced visuals that show how the place would look in real life." },
      { title: "Outcome", description: "The project won the tender, and the complex was built and is operating in Lviv." },
    ],
    role: ["3D modeling", "Materials", "3D visualization", "Rendering"],
    technologies: [],
    images: [
      { src: "/tennis/entrance-viewtennis.webp", title: "Entrance area", description: "A paved walkway between two fenced courts, lined with lamp posts. This is how a visitor first sees the complex." },
      { src: "/tennis/all-courts-viewtennis.webp", title: "Overview", description: "A bird’s-eye view of the whole site: two tennis courts and a basketball court on the grass, with shade umbrellas, fences and small service buildings." },
      { src: "/tennis/second-entrance-viewtennis.webp", title: "Second entrance", description: "The complex from the opposite side: a lawn in the foreground, trees, fencing and a court in the distance." },
      { src: "/tennis/1-court-viewtennis.webp", title: "Court 1", description: "A low angle across the court: line markings, the net, a shade umbrella and the fence in the background." },
      { src: "/tennis/3-court-viewtennis.webp", title: "Court 3", description: "A view along a full court: markings, an umpire chair, benches under umbrellas and the green mesh fence." },
      { src: "/tennis/inventoty-boot-viewtennis.webp", title: "Equipment room", description: "A small utility building with a roller door, set beside a lamp post and the court fence." },
      { src: "/tennis/locker-room-viewtennis.webp", title: "Locker room", description: "An open changing area with a green roof, wooden panelling and benches, set right next to the court." },
      { src: "/tennis/locker-boot-view-2tennis.webp", title: "Locker room, another view", description: "The same building seen from the fence side, showing how it sits along the court." },
    ],
    liveUrl: "https://drive.google.com/file/d/1fCvXCnh6GpEOE-9ezJQq9DrB7j_E1OBw/view?usp=sharing",
  },

  "dnipro-redesign": {
    tagline: "Redesign of an ISP website: a new visual style and clearer presentation of services",
    overview:
      "Dnipro.net is a regional internet provider whose website looked and felt dated. I developed a new visual direction and redrew the key pages: home, internet, TV, information blocks and the footer.",
    challenge:
      "The old style didn't match a modern provider, and services and tariffs were hard to take in at a glance. The refresh had to help someone looking for a plan or a connection see where everything is straight away.",
    solution:
      "I created a new visual language and page layouts in Figma, with a clearer hierarchy, fresher blocks, and services and tariffs that are easier to find and compare.",
    metrics: [],
    process: [
      { title: "Site audit", description: "Went through the existing site and pinpointed what felt dated: style, how services were shown, block structure." },
      { title: "Visual direction", description: "Chose a modern look that still reads as the provider's own." },
      { title: "Page layouts", description: "Designed the updated pages: home, internet, TV, about, the info section and the footer." },
    ],
    role: ["Visual redesign", "UI design", "Page layouts"],
    technologies: ["Figma", "Adobe Photoshop"],
    images: [
      { src: "/dnepronet/main-hero-section-dnepronet.webp", title: "Home", description: "The first screen: a slogan card with the key offer over 3D shapes and an illustration of a computer, with slider arrows and dots." },
      { src: "/dnepronet/internet-dnepronet.webp", title: "Internet", description: "Four advantages as icons on a dark band, then tariff cards with speed, monthly price and an “Order” button, so plans are easy to compare." },
      { src: "/dnepronet/tv-dnepro-net.webp", title: "Television", description: "The TV page: tariff cards with price and an order button, and a map of service centres underneath." },
      { src: "/dnepronet/map-faq-dnepronet.webp", title: "Map and FAQ", description: "A map block and a list of common questions as an accordion, with one answer expanded." },
      { src: "/dnepronet/footer-dnepronet.webp", title: "Footer", description: "A “Still have questions?” email block between two 3D shapes, then the footer with navigation, support phone numbers and social links." },
      { src: "/dnepronet/about-dnepronet.webp", title: "About", description: "The company page: a photo and a card explaining what the company does, and a map of its partner connections." },
      { src: "/dnepronet/footer-about-dnepronet.webp", title: "About page footer", description: "The end of the company page: a coverage-map block and the dark footer with phone numbers." },
    ],
    liveUrl: "https://drive.google.com/file/d/1yDtr7PmPJqzxp4g4CTsx4sGefKuQHR3C/view?usp=sharing",
  },

  "ketotox-package": {
    tagline: "New packaging for weight-loss tablets, built around hand-drawn illustrations",
    overview:
      "A packaging redesign for Ketotox. I came up with the idea, the composition and every illustration myself, from the first sketch to the final mockup.",
    challenge:
      "Weight-loss packaging tends to look like a hundred others. The goal was a recognizable look that makes the product stand out on the shelf.",
    solution:
      "I developed the concept, drew original illustrations and combined them with typography and the required information blocks into one composition.",
    metrics: [],
    process: [
      { title: "Concept", description: "Defined the idea of the packaging and the visual image it rests on." },
      { title: "Illustrations", description: "Came up with and drew the illustrations by hand specifically for this product." },
      { title: "Packaging layout", description: "Assembled illustrations, type and mandatory information into one design." },
    ],
    role: ["Concept", "Illustration", "Packaging design"],
    technologies: [],
    images: [
      { src: "/ketotox/mockup-one-ketotox.webp", title: "Main mockup", description: "The white colourway: the brand name, four benefit lines on coloured ribbons, a gradient figure mark and a quality seal over a soft dotted pattern." },
      { src: "/ketotox/mockup-second-ketotox.webp", title: "Pink colourway", description: "The same layout in pink with a blue line-art ballerina, showing how the system works in another colour." },
      { src: "/ketotox/mockup-third-ketotox.webp", title: "Purple colourway", description: "A purple version with a blue line-art figure. The typography and information blocks stay in the same places." },
      { src: "/ketotox/illustrationsketotox.webp", title: "Illustrations", description: "Hand-drawn line figures on the left and the gradient pictograms they were turned into on the right." },
    ],
    liveUrl: "https://drive.google.com/file/d/1mrNA11sG5BVX7TRU8QoUoB2x8U7NYbxM/view?usp=sharing",
  },

  "mobile-app-todo": {
    tagline: "A demo app where I learned to work with AI",
    overview:
      "ToDo is a personal demo project. I can code (I have a bachelor's degree in computer science), so this one was about something else: learning to work with AI effectively. I designed a task app, generated the code with AI, and reviewed and fixed it myself. It's a demo, not a finished product.",
    challenge:
      "I wanted to learn how to work with AI and keep the result under control: set tasks, check what it generates and fix what doesn't work.",
    solution:
      "I designed the screens, then built the app together with AI: wrote the tasks, read the output, fixed the errors and finished the logic by hand. The result is an interactive demo that opens in the browser.",
    metrics: [],
    process: [
      { title: "Idea and screens", description: "Decided what the app should do and sketched the main screens." },
      { title: "Interface design", description: "Drew the visuals and the states of the main elements." },
      { title: "Code with AI", description: "Generated code with AI, reviewed it, fixed errors and finished parts by hand." },
    ],
    role: ["Concept", "UI design", "Development with AI"],
    technologies: ["AI-assisted coding"],
    images: [
      { src: "/todoapp/welcome-screen-dsrktodo.webp", title: "Welcome and onboarding", description: "The first screen a new user sees: just the brand logo and a single action." },
      { src: "/todoapp/task-screentodo.webp", title: "Task details", description: "Where the title, date, time and priority are set, all on one screen." },
      { src: "/todoapp/register-screentodo.webp", title: "Create account", description: "Sign-up with only the fields needed to get started." },
      { src: "/todoapp/progress-screen-todo.webp", title: "Progress screen", description: "The screen users can look how far they go." },
      { src: "/todoapp/pick-time-popuptodo.webp", title: "Time picker", description: "A custom time picker styled to match the rest of the app." },
      { src: "/todoapp/pick-date-popup-greentodo.webp", title: "Date picker", description: "A calendar-style date picker with a green accent marking the current selection." },
      { src: "/todoapp/main-screen-lightgreentodo.webp", title: "Main task board", description: "The screen users return to every day, with tasks grouped by status." },
      { src: "/todoapp/password-resettodo.webp", title: "Password reset", description: "Restoring access to the account." },
    ],
    liveUrl: "https://alexbodniadev.github.io/ToDoApp",
    githubUrl: "https://github.com/AlexBodniaDev/ToDoApp",
  },

  "mobile-app-cyclesense": {
    tagline: "A demo mobile app for tracking the menstrual cycle",
    overview:
      "CycleSense is a personal demo project: the interface of a cycle-tracking app, made to practice design and working with AI in development. It isn't a medical service or a launched product.",
    challenge:
      "Design a clear mobile interface for daily use and turn it into a working demo with AI.",
    solution:
      "I worked out the structure and visual system, then built the demo with AI while reviewing and fixing the code myself. The predictions and data in it are illustrative and are not medical advice.",
    metrics: [],
    process: [
      { title: "Concept", description: "Decided which sections the app needs and how someone would use them every day." },
      { title: "Interface design", description: "Drew the screens and the visual system of the mobile app." },
      { title: "Code with AI", description: "Built the demo with AI and reviewed and fixed the code myself." },
    ],
    role: ["Concept", "UI design", "Development with AI"],
    technologies: ["AI-assisted coding"],
    images: [
      { src: "/cyclesense/predictions-page-cyclesense.webp", title: "Predictions", description: "The main screen shows the next cycle date, the fertile window and the ovulation day, with a timeline strip above. Illustrative data." },
      { src: "/cyclesense/period-calendar-cyclesense.webp", title: "Cycle calendar", description: "A month view with colored indicators for each phase." },
      { src: "/cyclesense/symptomps-page-cyclesense.webp", title: "Symptom logging", description: "A grid layout for logging several symptoms in one session." },
      { src: "/cyclesense/insights-screen-cyclesense.webp", title: "Insights", description: "Patterns presented as short, readable summaries rather than raw charts." },
      { src: "/cyclesense/settings-page-cyclesense.webp", title: "Settings and personalization", description: "Options for adjusting the app to different cycle types and tracking goals." },
    ],
    liveUrl: "https://alexbodniadev.github.io/PeriodTrackerApp",
    githubUrl: "https://github.com/AlexBodniaDev/PeriodTrackerApp",
  },

  "mobile-app-cryptoxapp": {
    tagline: "A crypto dashboard demo: fitting a lot of data on one screen",
    overview:
      "CryptoX is a personal demo project: a dashboard for crypto assets. I made it to practice structuring dense information in an interface and to sharpen how I work with AI in development. It's an interface demo, not a trading service.",
    challenge:
      "Crypto dashboards are easy to overload with numbers. I wanted to find a way to show a lot of data while keeping the screen readable.",
    solution:
      "I worked out the screen structure and the data hierarchy, then built the demo with AI while reviewing and fixing the code myself.",
    metrics: [],
    process: [
      { title: "Structure", description: "Decided which data matters most and ordered it by priority." },
      { title: "UI design", description: "Drew the screens and designed how the data is presented." },
      { title: "Code with AI", description: "Built the demo with AI and reviewed and fixed the code myself." },
    ],
    role: ["Concept", "UI design", "Development with AI"],
    technologies: ["AI-assisted coding"],
    images: [
      { src: "/cryptox/main-screen-cryptox.webp", title: "Portfolio overview", description: "The main screen with total portfolio value, the 24-hour change and a compact asset list." },
      { src: "/cryptox/markets-page-cryptox.webp", title: "Markets", description: "Market data as a scannable list, with mini trend charts instead of full graphs." },
      { src: "/cryptox/portfolio-page-cryptox.webp", title: "Portfolio breakdown", description: "Per-asset entry price, current value and profit or loss, plus a donut chart of the allocation." },
      { src: "/cryptox/settings-page-cryptox.webp", title: "Settings", description: "Currency, security and notification options." },
      { src: "/cryptox/notifications-cryptox.webp", title: "Notifications", description: "A feed of price alerts and activity, with price alerts visually separated from system messages." },
      { src: "/cryptox/list-token-cryptox.webp", title: "Token list", description: "A list of tokens to pick from." },
      { src: "/cryptox/profile-settings-page-cryptox.webp", title: "Profile settings", description: "Account and profile options." },
    ],
    liveUrl: "https://alexbodniadev.github.io/CryptoXApp",
    githubUrl: "https://github.com/AlexBodniaDev/CryptoXApp",
  },

  "nasha-hata-real-estate": {
    tagline: "UX/UI and mobile version of a fences & gates manufacturer’s website (Voronin Design Studio)",
    overview:
      "Nasha Hata is a client project from my internship at Voronin Design Studio: a manufacturer of fences, gates and doors with a large catalogue and many content pages. I was responsible for improving UX and visuals, and I designed the full mobile version.",
    challenge:
      "A manufacturer’s site is packed with products, articles and technical detail. On a phone, all of that still has to feel easy to use.",
    solution:
      "I refined the UX and styling and independently prepared mobile layouts for every page in Adobe XD.",
    metrics: [],
    process: [
      { title: "UX and visuals", description: "Improved the user experience and the visual design of the pages." },
      { title: "Mobile version", description: "Designed the complete responsive layout for mobile screens." },
    ],
    role: ["UX/UI design", "Mobile responsive design"],
    technologies: ["Adobe XD"],
    images: [
      { src: "/nashakhata/Phonemainnashakhata.webp", title: "Main screen", description: "The first screen of the mobile site: the brand block on a navy-and-orange diagonal, a short intro to the company, a “Watch the video” button and a photo of a team member." },
      { src: "/nashakhata/Phonecataloguenashakhata.webp", title: "Blog", description: "The blog page: filter tabs for all content, news and articles, and large article cards with a date badge on each photo." },
      { src: "/nashakhata/Phonefeaturesnashakhata.webp", title: "Key numbers", description: "Three big figures (150+ materials, 200+ employees across Ukraine, 599+ different solutions), each with a short label, so the advantages read at a glance." },
      { src: "/nashakhata/Phoneprocessnashakhata.webp", title: "Production", description: "The production page: a short intro and a photo slider with arrows and a play button for the video." },
      { src: "/nashakhata/Phonetechnologiesnashakhata.webp", title: "Technologies", description: "A technologies page with a full-width photo of metalwork, a heading, body text and a bulleted list." },
      { src: "/nashakhata/Phoneaboutusnashakhata.webp", title: "About us", description: "The company page: a team photo, orange section labels (Process, Exact measurements) and body text in a single column on a dark background." },
      { src: "/nashakhata/Phonefaqnashakhata.webp", title: "FAQ", description: "Questions in an accordion with a plus icon on each row, a “load more” button above and the consultation block below." },
      { src: "/nashakhata/Phonecontactformnashakhata.webp", title: "Contact form", description: "An orange “Not sure what to choose?” block offering a free consultation, with one phone field and one button. The footer starts right below it." },
      { src: "/nashakhata/Phonefooternashakhata.webp", title: "Footer", description: "A full site map (about, works, production, career, blog, contacts, delivery and payment terms, warranty), payment-system icons and the studio credit." },
      { src: "/nashakhata/Phonecustom404nashakhata.webp", title: "404 page", description: "A custom error page: a big 404, a short message, a pattern of orange warning tape with the logo and a button back to the home page." },
    ],
    liveUrl: "https://nasha-hata.com/",
  },

  "tvoe-web-design": {
    tagline: "UX/UI and mobile version of the “Tvoe - Emotion Factory” website (Voronin Design Studio)",
    overview:
      "Tvoe - Emotion Factory is a client project from my internship at Voronin Design Studio. I improved the UX and visuals and designed the full mobile version.",
    challenge:
      "The interface had to work equally well on screens of different sizes while keeping one consistent style.",
    solution:
      "I refined the UX and visuals and independently prepared the mobile layouts in Adobe XD.",
    metrics: [],
    process: [
      { title: "UX and visuals", description: "Worked on usability and styling of the interface within a team project." },
      { title: "Mobile version", description: "Independently designed the layout for mobile screens." },
    ],
    role: ["UX/UI design", "Mobile responsive design"],
    technologies: ["Adobe XD"],
    images: [
      { src: "/tvoie/Phonemenuopenedtvoie.webp", title: "Menu", description: "The opened mobile menu on dark navy: emotion catalogue, about, reviews, corporate clients, how it works, partnership, contacts, a language switch, social icons and an “Activate certificate” button." },
      { src: "/tvoie/Phonesearchtvoie.webp", title: "Search", description: "A search field with a friendly empty state (“no such emotion yet”) and a “Popular emotions” block with an experience card as the fallback." },
      { src: "/tvoie/Phonepickgifttvoie.webp", title: "Gift picker", description: "A screen about the gift packaging: a short pitch, a yellow “Choose” button and a photo of the boxes and bags." },
      { src: "/tvoie/Phonecarttvoie.webp", title: "Cart", description: "A cart drawer with the chosen emotion, quantity control and the total, plus two actions: choose another emotion or place the order. The mascot fills the empty space." },
      { src: "/tvoie/Phonefavouritestvoie.webp", title: "Favourites", description: "The “Your wishes” list: a card with a photo, location, number of purchases, description, price, group size and duration, plus gift and buy buttons." },
      { src: "/tvoie/Phonelocationtvoie.webp", title: "Location", description: "Choosing the city: a pink block with the shop address, phone, opening hours and a route button, with the other cities listed below." },
      { src: "/tvoie/Phonemaptvoie.webp", title: "Map", description: "A contacts page with a map of Ukraine and pins by region, and text explaining how to collect the gift certificate or get it delivered." },
      { src: "/tvoie/Phonebookcalltvoie.webp", title: "Book a call", description: "A call-back form on a bright orange-yellow card with the mascot: one phone field and one dark button." },
      { src: "/tvoie/Phonewhyustvoie.webp", title: "Why us", description: "A short list of benefits for the customer, followed by a “Minimal statistics” block with big figures and icons." },
      { src: "/tvoie/Phonefeaturesforcompaniestvoie.webp", title: "For companies", description: "A block for business clients: four benefit cards with line icons and a team photo underneath." },
      { src: "/tvoie/PhoneFAQtvoie.webp", title: "FAQ", description: "A purple panel with white accordion rows for common certificate questions, each with a teal plus button." },
      { src: "/tvoie/Phonefootertvoie.webp", title: "Footer", description: "A city dropdown, a list of experience categories for the selected city, and the logo with social icons on dark blue." },
      { src: "/tvoie/Phonefootertvoie2.webp", title: "Footer, continued", description: "Contact details, opening hours, payment icons, an “Activate certificate” button and a site map with services and projects." },
      { src: "/tvoie/Phone404tvoie.webp", title: "404 page", description: "A friendly error page: the 404 built from photo tiles of emotions, a short apology and a yellow button that leads to choosing an emotion." },
    ],
    liveUrl: "https://www.tvoeshop.com/",
  },

  "medis-healthcare": {
    tagline: "UX/UI and mobile version of a healthcare website (Voronin Design Studio)",
    overview:
      "Medis is a client project from my internship at Voronin Design Studio. I was responsible for improving UX and visuals and for the full mobile adaptation.",
    challenge:
      "People come to a medical site looking for specific information, often from a phone. The mobile version had to be as clear as the desktop one.",
    solution:
      "I refined the UX and styling and independently prepared the mobile layouts in Adobe XD.",
    metrics: [],
    process: [
      { title: "UX and visuals", description: "Improved the user experience and the visual side of the project." },
      { title: "Mobile version", description: "Independently designed the responsive layouts for mobile screens." },
    ],
    role: ["UX/UI design", "Mobile responsive design"],
    technologies: ["Adobe XD"],
    images: [
      { src: "/medis/Desktopwebsiteovervievmedis.webp", title: "Website overview", description: "The home page in full: a promo banner with an illustration and price, two large entry cards (Research and Results) and the start of the benefits block." },
      { src: "/medis/Desktopmainscreenmedis.webp", title: "Personal account", description: "The patient area: a profile card with a switcher between family members on the left, and liked promotions with price buttons on the right." },
      { src: "/medis/Desktopchooseplanmedis.webp", title: "Choose analyses", description: "Step one of the booking flow: a grid of analysis categories with icons, a search field and a grid/list switch. The bar at the bottom always shows how many items are chosen and the total." },
      { src: "/medis/Desktoppricesmedis.webp", title: "Price list", description: "The analyses as a table with category tabs above it. Each row has its price and an add-to-basket button, so the list is easy to scan." },
      { src: "/medis/Desktoppricescardmedis.webp", title: "Benefits and packages", description: "A teal block with four benefits of the online lab (discount, speed, convenience, confidentiality), then a carousel of complex-research cards with the selected package enlarged." },
      { src: "/medis/Desktopchoosedatemedis.webp", title: "Choose a date", description: "A calendar with available, busy and selected days in different colours, next to a column of time slots for the chosen day." },
      { src: "/medis/Desktopverificationmedis.webp", title: "Verification", description: "Step four: the patient enters a phone number, with a switch between returning and new patient. A code arrives by SMS." },
      { src: "/medis/Desktoppaymentscreenmedis.webp", title: "Payment", description: "The last step: patient tabs, the selected analyses with date and place, discount options and the final amount to pay." },
      { src: "/medis/Desktopmapmedis.webp", title: "Map", description: "Choosing a branch: a map with pins, a filter column on the left and cards with the opening hours of each branch underneath." },
      { src: "/medis/Desktopreviewscontactformmedis.webp", title: "Reviews and contact form", description: "A carousel of patient reviews with three cards, then a teal “Got questions? Write to us” form and a yellow bar offering home sample collection." },
      { src: "/medis/Desktopfootermedis.webp", title: "Footer", description: "The contact form on teal, then the dark footer with navigation columns, phone number, social icons, payment systems and two action buttons." },
      { src: "/medis/Phonemainscreenmedis.webp", title: "Promotions (mobile)", description: "A promotion card with an illustration, price, validity dates and a basket button. The yellow branch selector stays pinned at the top." },
      { src: "/medis/Phonefeaturesmedis.webp", title: "Benefits (mobile)", description: "The online-lab benefits as stacked white cards on teal: an icon, a bold label and one line of explanation each." },
      { src: "/medis/Phonepricesmedis.webp", title: "Price list (mobile)", description: "Category tabs, search and a grid/list switch above a compact list. Each row has a price button, and the basket bar stays at the bottom." },
      { src: "/medis/Phonepricesonwebsitemedis.webp", title: "Complex research (mobile)", description: "A package card with a short checklist, the online price and a “Buy now” button, with carousel dots below." },
      { src: "/medis/Phonereviewsmedis.webp", title: "Reviews (mobile)", description: "A swipeable review card with an avatar, name and role, followed by the start of the contact form." },
      { src: "/medis/Phoneverificationmedis.webp", title: "Verification (mobile)", description: "Step four on a phone: a progress stepper, a returning/new patient switch, a phone field and one yellow button to get the code." },
      { src: "/medis/Phonemapmedis.webp", title: "Map (mobile)", description: "Branch selection on a phone: a filters button, a city dropdown, street search, a map/list toggle and the map with pins." },
      { src: "/medis/Phonecontactformmedis.webp", title: "Contact form (mobile)", description: "A short form on teal: name, phone, question, a consent checkbox and one button, with the home-sampling bar pinned below." },
      { src: "/medis/Phonefootermedis.webp", title: "Footer (mobile)", description: "Logo, a short company description, phone number, social icons, two outlined buttons and the services menu on dark teal." },
    ],
    liveUrl: "https://medis.com.ua/",
  },

  "vespera-funeral-home": {
    tagline: "A bilingual funeral home website: designed in Figma, built in Framer",
    overview:
      "Vespera is a funeral home with a large amount of information: many services, countries and pages. The goal was a polished website, built from scratch, that is easy to navigate. I designed it in Figma, built it in Framer, connected a CMS and delivered two language versions.",
    challenge:
      "Many services, countries and pages had to live in one structure, and someone looking for help at a difficult moment needs to find the right thing quickly.",
    solution:
      "I started with the content structure, then designed in Figma and moved the design into Framer. The CMS lets the team manage services and pages without a developer, and the site is responsive on every screen and available in two languages.",
    metrics: [
      { value: "2 languages", label: "Fully localized site" },
      { value: "CMS", label: "Content updated without a developer" },
    ],
    process: [
      { title: "Content structure", description: "Organized services, countries and pages into a clear site structure." },
      { title: "Design in Figma", description: "Designed the pages and the visual system." },
      { title: "Build in Framer", description: "Moved the design into Framer, assembled the pages and connected the CMS." },
      { title: "Responsive and languages", description: "Made it responsive across screens and set up two language versions." },
    ],
    role: ["UX/UI design", "Site structure", "Framer development", "CMS", "Responsive design", "Two languages"],
    technologies: ["Figma", "Framer"],
    images: [
      { src: "/vespera/Desktopmainvespera.webp", title: "Main screen", description: "The hero with the main message, three short service lines, a “Find out the price” button and a photo, under a top bar with phone numbers, a language switch and the main menu." },
      { src: "/vespera/Desktopcountriesvespera.webp", title: "Countries", description: "A grid of the most common repatriation destinations with flags and an “All available countries” button, followed by the start of the repatriation page." },
      { src: "/vespera/Desktoprepatriationvespera.webp", title: "Repatriation", description: "The service page: a short promise, a row of four photos and a step-by-step explanation of how the process works." },
      { src: "/vespera/Desktopfaqvespera.webp", title: "FAQ", description: "The cremation countries grid, then a list of common questions as thin-lined accordion rows." },
      { src: "/vespera/Desktopcontactfootervespera.webp", title: "Contacts and footer", description: "A consultation form (name, phone, one button) beside a portrait, then the dark footer with navigation and phone numbers." },
      { src: "/vespera/Phonemain.webp", title: "Main screen (mobile)", description: "Logo and menu on top, the hero photo, three service lines and a call-to-action button, with floating phone, Telegram and WhatsApp buttons on the side." },
      { src: "/vespera/PhoneFAQvespera.webp", title: "FAQ (mobile)", description: "Questions in a single column with large, easy-to-tap plus icons and thin dividers." },
      { src: "/vespera/Phonecontactsvespera.webp", title: "Contacts (mobile)", description: "A contact block with a question as the heading, a short explanation and a phone number with a flag, followed by the FAQ heading." },
      { src: "/vespera/Phonecontactformvespera.webp", title: "Contact form (mobile)", description: "A consultation form under the portrait: name, phone and one dark button." },
      { src: "/vespera/Phonefooter.webp", title: "Footer (mobile)", description: "The end of the form, then a dark footer with the logo, two columns of links and contact details." },
    ],
    liveUrl: "https://vesperafuneralhome.framer.website/",
  },
}

export const projectDetailsUk: Record<string, any> = {
  "tennis-courts-3d": {
    tagline: "Від креслення замовника до тенісного комплексу, який працює у Львові",
    overview:
      "Тенісний комплекс у Львові, який я повністю змоделював з нуля за кресленням замовника: від геометрії й матеріалів до фінальних рендерів. Проєкт виграв тендер, комплекс збудували, і він працює досі.",
    challenge:
      "Із вхідних даних було лише технічне креслення. З нього потрібно було зібрати об’єкт, який можна оцінити на око ще до початку будівництва: як він виглядає, з яких матеріалів складається і як організований простір.",
    solution:
      "Побудував 3D-модель комплексу самостійно, підібрав матеріали та підготував рендери з різних ракурсів. Креслення, зрозуміле лише інженерам, стало наочною картинкою майбутнього об’єкта.",
    metrics: [
      { value: "Збудовано", label: "Комплекс працює у Львові" },
      { value: "Тендер", label: "Проєкт виграв тендер" },
      { value: "З нуля", label: "Уся 3D-модель за кресленням замовника" },
    ],
    process: [
      { title: "Креслення", description: "Отримав технічне креслення й розібрав планування, розміри та розташування кортів." },
      { title: "3D-модель", description: "Побудував комплекс з нуля: корти, огородження, будівлі та територію навколо." },
      { title: "Матеріали та рендери", description: "Налаштував матеріали й підготував візуалізації, за якими видно, як об’єкт виглядатиме в реальності." },
      { title: "Результат", description: "Проєкт виграв тендер, комплекс збудований і діє у Львові." },
    ],
    role: ["3D-моделювання", "Матеріали", "3D-візуалізація", "Рендери"],
    technologies: [],
    images: [
      { src: "/tennis/entrance-viewtennis.webp", title: "Вхідна зона", description: "Тротуарна доріжка між двома огородженими кортами вздовж ліхтарів. Так відвідувач уперше бачить комплекс." },
      { src: "/tennis/all-courts-viewtennis.webp", title: "Загальний вигляд", description: "Вигляд зверху на всю територію: два тенісні корти та баскетбольний майданчик на траві, з парасолями від сонця, огорожею та невеликими службовими будівлями." },
      { src: "/tennis/second-entrance-viewtennis.webp", title: "Другий вхід", description: "Комплекс з протилежного боку: газон на передньому плані, дерева, огорожа та корт удалині." },
      { src: "/tennis/1-court-viewtennis.webp", title: "Корт №1", description: "Низький ракурс уздовж корту: лінії розмітки, сітка, парасоля від сонця та огорожа на задньому плані." },
      { src: "/tennis/3-court-viewtennis.webp", title: "Корт №3", description: "Вигляд уздовж цілого корту: розмітка, суддівська вишка, лавки під парасолями та зелена сітчаста огорожа." },
      { src: "/tennis/inventoty-boot-viewtennis.webp", title: "Інвентарна", description: "Невелика господарська будівля з рулонними воротами поруч із ліхтарем і огорожею корту." },
      { src: "/tennis/locker-room-viewtennis.webp", title: "Роздягальня", description: "Відкрита зона для перевдягання із зеленим дахом, дерев’яною обшивкою та лавками, зовсім поруч із кортом." },
      { src: "/tennis/locker-boot-view-2tennis.webp", title: "Роздягальня, інший ракурс", description: "Та сама будівля з боку огорожі, видно, як вона розташована вздовж корту." },
    ],
    liveUrl: "https://drive.google.com/file/d/1fCvXCnh6GpEOE-9ezJQq9DrB7j_E1OBw/view?usp=sharing",
  },

  "dnipro-redesign": {
    tagline: "Редизайн сайту інтернет-провайдера: новий візуальний стиль і зрозуміліша подача послуг",
    overview:
      "Dnipro.net — регіональний інтернет-провайдер, сайт якого виглядав застарілим і візуально, і за відчуттями. Я розробив новий візуальний напрямок і перемалював ключові сторінки: головну, інтернет, телебачення, інформаційні блоки та футер.",
    challenge:
      "Старий стиль сайту не відповідав сучасному провайдеру, а послуги й тарифи було важко швидко охопити поглядом. Потрібно було оновити вигляд так, щоб людина, яка шукає тариф або підключення, одразу розуміла, де що.",
    solution:
      "Створив нову візуальну мову та макети сторінок у Figma: чіткіша ієрархія, свіжіші блоки, послуги й тарифи легше знайти та порівняти.",
    metrics: [],
    process: [
      { title: "Аудит сайту", description: "Пройшовся по наявному сайту й виділив, що саме застаріло: стиль, подача послуг, структура блоків." },
      { title: "Візуальний напрямок", description: "Підібрав нову стилістику, яка виглядає сучасно й залишається впізнаваною для провайдера." },
      { title: "Макети сторінок", description: "Намалював оновлені сторінки: головну, інтернет, ТБ, про компанію, інформаційний розділ і футер." },
    ],
    role: ["Візуальний редизайн", "UI-дизайн", "Макети сторінок"],
    technologies: ["Figma", "Adobe Photoshop"],
    images: [
      { src: "/dnepronet/main-hero-section-dnepronet.webp", title: "Головна", description: "Перший екран: картка зі слоганом і головною пропозицією на тлі 3D-форм та ілюстрації комп’ютера, зі стрілками й крапками слайдера." },
      { src: "/dnepronet/internet-dnepronet.webp", title: "Інтернет", description: "Чотири переваги у вигляді іконок на темній смузі, а далі картки тарифів зі швидкістю, ціною за місяць і кнопкою «Замовити» для зручного порівняння." },
      { src: "/dnepronet/tv-dnepro-net.webp", title: "Телебачення", description: "Сторінка ТБ: картки тарифів із ціною та кнопкою замовлення, а нижче — карта центрів обслуговування." },
      { src: "/dnepronet/map-faq-dnepronet.webp", title: "Карта та FAQ", description: "Блок із картою та список поширених запитань у вигляді акордеона з одним розгорнутим відповіддю." },
      { src: "/dnepronet/footer-dnepronet.webp", title: "Футер", description: "Блок «Залишились запитання?» з полем для пошти між двома 3D-формами, а під ним футер із навігацією, телефонами підтримки та посиланнями на соцмережі." },
      { src: "/dnepronet/about-dnepronet.webp", title: "Про компанію", description: "Сторінка про провайдера: фото та картка про те, чим займається компанія, і карта її партнерських підключень." },
      { src: "/dnepronet/footer-about-dnepronet.webp", title: "Футер сторінки «Про компанію»", description: "Завершення сторінки про компанію: блок із картою покриття та темний футер із телефонами." },
    ],
    liveUrl: "https://drive.google.com/file/d/1yDtr7PmPJqzxp4g4CTsx4sGefKuQHR3C/view?usp=sharing",
  },

  "ketotox-package": {
    tagline: "Нова упаковка для таблеток для схуднення з авторськими ілюстраціями",
    overview:
      "Редизайн упаковки Ketotox. Ідею, композицію та всі ілюстрації я зробив сам: від першого скетчу до готового макета.",
    challenge:
      "Упаковка в категорії засобів для схуднення зазвичай схожа на сотню інших. Потрібно було знайти впізнаваний образ, який виділить продукт на полиці.",
    solution:
      "Придумав концепцію, намалював оригінальні ілюстрації та зібрав їх із типографікою та інформаційними блоками в єдину композицію.",
    metrics: [],
    process: [
      { title: "Концепція", description: "Сформулював ідею упаковки та візуальний образ, на якому вона тримається." },
      { title: "Ілюстрації", description: "Придумав і намалював ілюстрації вручну спеціально під цей продукт." },
      { title: "Макет упаковки", description: "Зібрав ілюстрації, шрифти та обов’язкову інформацію в цілісний дизайн." },
    ],
    role: ["Концепція", "Ілюстрація", "Дизайн упаковки"],
    technologies: [],
    images: [
      { src: "/ketotox/mockup-one-ketotox.webp", title: "Основний макет", description: "Біла кольорова версія: назва бренду, чотири рядки переваг на кольорових стрічках, градієнтна фігура-знак і печатка якості на тлі м’якого пунктирного візерунка." },
      { src: "/ketotox/mockup-second-ketotox.webp", title: "Рожева версія", description: "Той самий макет у рожевому кольорі з блакитною лінійною балериною, видно, як система працює в іншому кольорі." },
      { src: "/ketotox/mockup-third-ketotox.webp", title: "Фіолетова версія", description: "Фіолетова версія з блакитною лінійною фігурою. Типографіка та інформаційні блоки лишаються на тих самих місцях." },
      { src: "/ketotox/illustrationsketotox.webp", title: "Ілюстрації", description: "Намальовані від руки лінійні фігури ліворуч і градієнтні піктограми, у які вони перетворилися, праворуч." },
    ],
    liveUrl: "https://drive.google.com/file/d/1mrNA11sG5BVX7TRU8QoUoB2x8U7NYbxM/view?usp=sharing",
  },

  "mobile-app-todo": {
    tagline: "Демо-застосунок, у якому я вчився працювати з AI",
    overview:
      "ToDo — особистий демопроєкт. Кодити я вмію (маю бакалаврський диплом з комп’ютерних наук), тож цей проєкт був про інше: навчитися ефективно працювати з AI. Я спроєктував застосунок для завдань, згенерував код з AI й сам перевіряв та правив його. Це демо, а не готовий продукт.",
    challenge:
      "Хотів зрозуміти, як працювати з AI так, щоб результат лишався під контролем: ставити задачі, перевіряти згенероване й виправляти те, що працює не так.",
    solution:
      "Спроєктував екрани, а далі будував застосунок разом з AI: формулював задачі, читав відповіді, виправляв помилки й доробляв логіку вручну. Результат — інтерактивне демо в браузері.",
    metrics: [],
    process: [
      { title: "Ідея та екрани", description: "Визначив, що має вміти застосунок, і накидав основні екрани." },
      { title: "Дизайн інтерфейсу", description: "Намалював візуальну частину та стани основних елементів." },
      { title: "Код з AI", description: "Генерував код з AI, перевіряв його, виправляв помилки й доробляв вручну." },
    ],
    role: ["Концепція", "UI-дизайн", "Розробка з AI"],
    technologies: ["AI-assisted coding"],
    images: [
      { src: "/todoapp/welcome-screen-dsrktodo.webp", title: "Вітання та онбординг", description: "Перший екран, який бачить новий користувач: лише логотип бренду та одна дія." },
      { src: "/todoapp/task-screentodo.webp", title: "Деталі завдання", description: "Назва, дата, час і пріоритет задаються на одному екрані." },
      { src: "/todoapp/register-screentodo.webp", title: "Створення акаунта", description: "Реєстрація лише з тими полями, які потрібні для початку." },
      { src: "/todoapp/progress-screen-todo.webp", title: "Екран прогресу", description: "Відображення усіх винонаних та запланованих задач." },
      { src: "/todoapp/pick-time-popuptodo.webp", title: "Вибір часу", description: "Власний вибір часу в стилі решти застосунку." },
      { src: "/todoapp/pick-date-popup-greentodo.webp", title: "Вибір дати", description: "Вибір дати у вигляді календаря із зеленим акцентом на поточному виборі." },
      { src: "/todoapp/main-screen-lightgreentodo.webp", title: "Основна дошка завдань", description: "Екран, до якого користувач повертається щодня; завдання згруповані за статусом." },
      { src: "/todoapp/password-resettodo.webp", title: "Скидання пароля", description: "Відновлення доступу до акаунта." },
    ],
    liveUrl: "https://alexbodniadev.github.io/ToDoApp",
    githubUrl: "https://github.com/AlexBodniaDev/ToDoApp",
  },

  "mobile-app-cyclesense": {
    tagline: "Демо мобільного застосунку для відстеження циклу",
    overview:
      "CycleSense — особистий демопроєкт: інтерфейс застосунку для відстеження менструального циклу. Зробив для практики дизайну та роботи з AI у розробці. Це не медичний сервіс і не запущений продукт.",
    challenge:
      "Спроєктувати зрозумілий мобільний інтерфейс для щоденного використання й зібрати з нього працююче демо з AI.",
    solution:
      "Продумав структуру та візуальну систему, потім зібрав демо з AI, а код перевіряв і правив сам. Прогнози й дані в демо ілюстративні й не є медичними рекомендаціями.",
    metrics: [],
    process: [
      { title: "Концепція", description: "Визначив, які розділи потрібні в застосунку, і як людина з ними взаємодіє щодня." },
      { title: "Дизайн інтерфейсу", description: "Намалював екрани та візуальну систему мобільного застосунку." },
      { title: "Код з AI", description: "Збирав демо з AI, а код перевіряв і правив сам." },
    ],
    role: ["Концепція", "UI-дизайн", "Розробка з AI"],
    technologies: ["AI-assisted coding"],
    images: [
      { src: "/cyclesense/predictions-page-cyclesense.webp", title: "Прогнози", description: "Головний екран показує дату наступного циклу, фертильне вікно та день овуляції, а зверху — стрічку таймлайну. Дані ілюстративні." },
      { src: "/cyclesense/period-calendar-cyclesense.webp", title: "Календар циклу", description: "Місячний вигляд із кольоровими індикаторами фаз." },
      { src: "/cyclesense/symptomps-page-cyclesense.webp", title: "Запис симптомів", description: "Сітка, у якій можна записати кілька симптомів за один раз." },
      { src: "/cyclesense/insights-screen-cyclesense.webp", title: "Інсайти", description: "Закономірності подано як короткі зрозумілі підсумки, а не сирі графіки." },
      { src: "/cyclesense/settings-page-cyclesense.webp", title: "Налаштування та персоналізація", description: "Параметри, які підлаштовують застосунок під різні типи циклу та цілі відстеження." },
    ],
    liveUrl: "https://alexbodniadev.github.io/PeriodTrackerApp",
    githubUrl: "https://github.com/AlexBodniaDev/PeriodTrackerApp",
  },

  "mobile-app-cryptoxapp": {
    tagline: "Демо криптодашборду: як подати багато даних на одному екрані",
    overview:
      "CryptoX — особистий демопроєкт: дашборд для криптоактивів. Робив, щоб потренуватися структурувати щільну інформацію в інтерфейсі та відточити роботу з AI у розробці. Це демо інтерфейсу, а не торговий сервіс.",
    challenge:
      "Криптодашборди легко перевантажити цифрами. Хотів знайти спосіб показати багато даних так, щоб екран лишався читабельним.",
    solution:
      "Продумав структуру екранів та ієрархію даних, а потім зібрав демо з AI, а код перевіряв і правив сам.",
    metrics: [],
    process: [
      { title: "Структура", description: "Вирішив, які дані найважливіші, і розставив їх за пріоритетом." },
      { title: "UI-дизайн", description: "Намалював екрани та оформив подачу даних." },
      { title: "Код з AI", description: "Збирав демо з AI, а код перевіряв і правив сам." },
    ],
    role: ["Концепція", "UI-дизайн", "Розробка з AI"],
    technologies: ["AI-assisted coding"],
    images: [
      { src: "/cryptox/main-screen-cryptox.webp", title: "Огляд портфеля", description: "Головний екран із загальною вартістю портфеля, зміною за 24 години та компактним списком активів." },
      { src: "/cryptox/markets-page-cryptox.webp", title: "Ринки", description: "Дані ринку у вигляді списку для швидкого перегляду, із міні-графіками замість повних." },
      { src: "/cryptox/portfolio-page-cryptox.webp", title: "Розбивка портфеля", description: "Ціна входу, поточна вартість і прибуток чи збиток по кожному активу, а також кільцева діаграма розподілу." },
      { src: "/cryptox/settings-page-cryptox.webp", title: "Налаштування", description: "Вибір валюти, параметри безпеки та сповіщень." },
      { src: "/cryptox/notifications-cryptox.webp", title: "Сповіщення", description: "Стрічка цінових сповіщень і активності; цінові візуально відокремлені від системних." },
      { src: "/cryptox/list-token-cryptox.webp", title: "Список токенів", description: "Перелік токенів для вибору." },
      { src: "/cryptox/profile-settings-page-cryptox.webp", title: "Налаштування профілю", description: "Параметри акаунта та профілю." },
    ],
    liveUrl: "https://alexbodniadev.github.io/CryptoXApp",
    githubUrl: "https://github.com/AlexBodniaDev/CryptoXApp",
  },

  "nasha-hata-real-estate": {
    tagline: "UX/UI та мобільна версія сайту виробника парканів і воріт (Voronin Design Studio)",
    overview:
      "Наша Хата — клієнтський проєкт зі стажування у Voronin Design Studio: виробник парканів, воріт і дверей із великим каталогом і багатьма контентними сторінками. Я відповідав за покращення UX і візуалу та повністю зробив мобільну версію дизайну.",
    challenge:
      "Сайт виробника насичений продукцією, статтями та технічними деталями. На телефоні це має залишатися зручним.",
    solution:
      "Допрацював UX та оформлення й самостійно підготував мобільні макети всіх сторінок в Adobe XD.",
    metrics: [],
    process: [
      { title: "UX і візуал", description: "Покращував користувацький досвід і візуальне оформлення сторінок." },
      { title: "Мобільна версія", description: "Повністю розробив адаптив під мобільні екрани." },
    ],
    role: ["UX/UI-дизайн", "Мобільний адаптив"],
    technologies: ["Adobe XD"],
    images: [
      { src: "/nashakhata/Phonemainnashakhata.webp", title: "Головний екран", description: "Перший екран мобільної версії: бренд-блок на діагоналі синього й помаранчевого, короткий вступ про компанію, кнопка «Переглянути відео» та фото співробітниці." },
      { src: "/nashakhata/Phonecataloguenashakhata.webp", title: "Блог", description: "Сторінка блогу: вкладки-фільтри «весь контент / новини / статті» та великі картки статей із плашкою дати на кожному фото." },
      { src: "/nashakhata/Phonefeaturesnashakhata.webp", title: "Ключові цифри", description: "Три великі цифри (150+ матеріалів, 200+ працівників по всій Україні, 599+ різноманітних рішень) з коротким підписом, щоб переваги читалися одразу." },
      { src: "/nashakhata/Phoneprocessnashakhata.webp", title: "Виробництво", description: "Сторінка виробництва: короткий вступ і слайдер із фото зі стрілками та кнопкою відтворення відео." },
      { src: "/nashakhata/Phonetechnologiesnashakhata.webp", title: "Технології", description: "Сторінка технологій: фото металообробки на всю ширину, заголовок, основний текст і маркований список." },
      { src: "/nashakhata/Phoneaboutusnashakhata.webp", title: "Про нас", description: "Сторінка про компанію: фото команди, помаранчеві мітки розділів («Процес», «Точні заміри») та основний текст в одну колонку на темному тлі." },
      { src: "/nashakhata/Phonefaqnashakhata.webp", title: "FAQ", description: "Питання у вигляді акордеона з плюсом у кожному рядку, кнопка «Завантажити ще» зверху та блок консультації знизу." },
      { src: "/nashakhata/Phonecontactformnashakhata.webp", title: "Контактна форма", description: "Помаранчевий блок «Не знаєте що обрати?» з пропозицією безкоштовної консультації, одним полем телефону та однією кнопкою. Одразу під ним починається футер." },
      { src: "/nashakhata/Phonefooternashakhata.webp", title: "Футер", description: "Повна карта сайту (про нас, роботи, виробництво, кар’єра, блог, контакти, умови доставки й оплати, гарантії), іконки платіжних систем і підпис студії." },
      { src: "/nashakhata/Phonecustom404nashakhata.webp", title: "Сторінка 404", description: "Власна сторінка помилки: великий напис 404, коротке повідомлення, візерунок із помаранчевої сигнальної стрічки з логотипом і кнопка повернення на головну." },
    ],
    liveUrl: "https://nasha-hata.com/",
  },

  "tvoe-web-design": {
    tagline: "UX/UI та мобільна версія сайту «Твоє — Фабрика емоцій» (Voronin Design Studio)",
    overview:
      "Твоє — Фабрика емоцій — клієнтський проєкт зі стажування у Voronin Design Studio. Я покращував UX і візуальну частину та повністю зробив мобільну версію.",
    challenge:
      "Інтерфейс мав однаково добре працювати на екранах різних розмірів, зберігаючи єдиний стиль.",
    solution:
      "Допрацював UX та візуал і самостійно підготував мобільні макети в Adobe XD.",
    metrics: [],
    process: [
      { title: "UX і візуал", description: "Працював над зручністю та оформленням інтерфейсу в командному проєкті." },
      { title: "Мобільна версія", description: "Самостійно розробив адаптив під мобільні екрани." },
    ],
    role: ["UX/UI-дизайн", "Мобільний адаптив"],
    technologies: ["Adobe XD"],
    images: [
      { src: "/tvoie/Phonemenuopenedtvoie.webp", title: "Меню", description: "Відкрите мобільне меню на темно-синьому тлі: каталог емоцій, про нас, відгуки, корпоративним клієнтам, як це працює, співпраця, контакти, перемикач мови, соцмережі та кнопка «Активувати сертифікат»." },
      { src: "/tvoie/Phonesearchtvoie.webp", title: "Пошук", description: "Поле пошуку з доброзичливим станом «такої емоції ще немає» та блоком «Популярні емоції» з карткою досвіду як запасним варіантом." },
      { src: "/tvoie/Phonepickgifttvoie.webp", title: "Вибір подарунка", description: "Екран про подарункове пакування: короткий опис, жовта кнопка «Обрати» та фото коробок і пакетів." },
      { src: "/tvoie/Phonecarttvoie.webp", title: "Кошик", description: "Шторка кошика з обраною емоцією, лічильником кількості та сумою, а також двома діями: обрати ще одну емоцію або оформити замовлення. Порожнє місце заповнює маскот." },
      { src: "/tvoie/Phonefavouritestvoie.webp", title: "Обране", description: "Список «Твої бажання»: картка з фото, локацією, кількістю покупок, описом, ціною, кількістю людей і тривалістю, а також кнопки «Подарувати» й «Купити»." },
      { src: "/tvoie/Phonelocationtvoie.webp", title: "Локація", description: "Вибір міста: рожевий блок з адресою магазину, телефоном, графіком роботи та кнопкою «Прокласти маршрут», нижче — решта міст." },
      { src: "/tvoie/Phonemaptvoie.webp", title: "Карта", description: "Сторінка контактів з картою України та мітками по областях і текстом про те, як забрати подарунковий сертифікат або замовити доставку." },
      { src: "/tvoie/Phonebookcalltvoie.webp", title: "Замовити дзвінок", description: "Форма зворотного дзвінка на яскравій жовто-помаранчевій картці з маскотом: одне поле телефону та одна темна кнопка." },
      { src: "/tvoie/Phonewhyustvoie.webp", title: "Чому ми", description: "Короткий список переваг для клієнта, а за ним блок «Мінімальна статистика» з великими цифрами та іконками." },
      { src: "/tvoie/Phonefeaturesforcompaniestvoie.webp", title: "Для компаній", description: "Блок для бізнес-клієнтів: чотири картки переваг з лінійними іконками та командне фото внизу." },
      { src: "/tvoie/PhoneFAQtvoie.webp", title: "FAQ", description: "Фіолетова панель із білими рядками-акордеонами для поширених питань про сертифікат, у кожному — бірюзова кнопка-плюс." },
      { src: "/tvoie/Phonefootertvoie.webp", title: "Футер", description: "Випадний список міст, перелік категорій емоцій для обраного міста, а також логотип із соцмережами на темно-синьому тлі." },
      { src: "/tvoie/Phonefootertvoie2.webp", title: "Футер, продовження", description: "Контакти, графік роботи, іконки оплати, кнопка «Активний сертифікат» і карта сайту з послугами та проєктами." },
      { src: "/tvoie/Phone404tvoie.webp", title: "Сторінка 404", description: "Доброзичлива сторінка помилки: 404, складене з фото-плиток емоцій, коротке вибачення та жовта кнопка, що веде до вибору емоції." },
    ],
    liveUrl: "https://www.tvoeshop.com/",
  },

  "medis-healthcare": {
    tagline: "UX/UI та мобільна версія медичного сайту (Voronin Design Studio)",
    overview:
      "Medis — клієнтський проєкт зі стажування у Voronin Design Studio. Я відповідав за покращення UX і візуалу та за повний мобільний адаптив.",
    challenge:
      "У медичному продукті людина шукає конкретну інформацію, часто з телефону. Мобільна версія мала бути такою ж зрозумілою, як десктопна.",
    solution:
      "Допрацював UX та оформлення й самостійно підготував мобільні макети в Adobe XD.",
    metrics: [],
    process: [
      { title: "UX і візуал", description: "Покращував користувацький досвід і візуальну частину проєкту." },
      { title: "Мобільна версія", description: "Самостійно розробив адаптивні макети під мобільні екрани." },
    ],
    role: ["UX/UI-дизайн", "Мобільний адаптив"],
    technologies: ["Adobe XD"],
    images: [
      { src: "/medis/Desktopwebsiteovervievmedis.webp", title: "Огляд сайту", description: "Головна сторінка цілком: акційний банер з ілюстрацією та ціною, дві великі картки входу («Дослідження» та «Результати») і початок блоку переваг." },
      { src: "/medis/Desktopmainscreenmedis.webp", title: "Особистий кабінет", description: "Кабінет пацієнта: ліворуч картка профілю з перемикачем між членами родини, праворуч — вподобані акції з кнопками ціни." },
      { src: "/medis/Desktopchooseplanmedis.webp", title: "Вибір аналізів", description: "Перший крок запису: сітка категорій аналізів з іконками, пошук і перемикач «плитка / список». Нижня панель завжди показує кількість обраного та суму." },
      { src: "/medis/Desktoppricesmedis.webp", title: "Прайс-лист", description: "Аналізи у вигляді таблиці з вкладками категорій зверху. У кожному рядку є ціна та кнопка «в кошик», тож список легко проглядати." },
      { src: "/medis/Desktoppricescardmedis.webp", title: "Переваги та комплекси", description: "Бірюзовий блок із чотирма перевагами онлайн-лабораторії (знижка, швидкість, зручність, конфіденційність) і карусель карток комплексних досліджень, де обраний комплекс збільшено." },
      { src: "/medis/Desktopchoosedatemedis.webp", title: "Вибір дати", description: "Календар, де доступні, зайняті й обрані дні мають різні кольори, а поруч — колонка зі слотами часу на обраний день." },
      { src: "/medis/Desktopverificationmedis.webp", title: "Верифікація", description: "Четвертий крок: пацієнт вводить номер телефону, є перемикач «постійний / новий пацієнт». Код приходить в SMS." },
      { src: "/medis/Desktoppaymentscreenmedis.webp", title: "Оплата", description: "Останній крок: вкладки пацієнтів, обрані аналізи з датою та місцем, варіанти знижки та підсумкова сума до сплати." },
      { src: "/medis/Desktopmapmedis.webp", title: "Карта", description: "Вибір відділення: карта з мітками, колонка фільтрів ліворуч і картки з графіком роботи кожного відділення внизу." },
      { src: "/medis/Desktopreviewscontactformmedis.webp", title: "Відгуки та контактна форма", description: "Карусель відгуків пацієнтів із трьома картками, далі бірюзова форма «Виникли питання? Пиши нам» і жовта смуга з пропозицією виїзного забору аналізів." },
      { src: "/medis/Desktopfootermedis.webp", title: "Футер", description: "Контактна форма на бірюзовому тлі, а під нею темний футер із колонками навігації, телефоном, іконками соцмереж, платіжними системами та двома кнопками дій." },
      { src: "/medis/Phonemainscreenmedis.webp", title: "Акції (мобільна)", description: "Картка акційної пропозиції з ілюстрацією, ціною, термінами дії та кнопкою «в кошик». Жовтий вибір відділення закріплений угорі." },
      { src: "/medis/Phonefeaturesmedis.webp", title: "Переваги (мобільна)", description: "Переваги онлайн-лабораторії у вигляді білих карток на бірюзовому тлі: іконка, жирний підпис і одне речення пояснення." },
      { src: "/medis/Phonepricesmedis.webp", title: "Прайс-лист (мобільна)", description: "Вкладки категорій, пошук і перемикач виду над компактним списком. У кожному рядку є кнопка з ціною, а панель кошика лишається внизу." },
      { src: "/medis/Phonepricesonwebsitemedis.webp", title: "Комплексні дослідження (мобільна)", description: "Картка комплексу з коротким чекліст-списком, онлайн-ціною та кнопкою «Купити зараз», нижче — крапки каруселі." },
      { src: "/medis/Phonereviewsmedis.webp", title: "Відгуки (мобільна)", description: "Картка відгуку, яку можна гортати: аватар, імʼя та роль, а під нею початок контактної форми." },
      { src: "/medis/Phoneverificationmedis.webp", title: "Верифікація (мобільна)", description: "Четвертий крок на телефоні: індикатор кроків, перемикач «постійний / новий пацієнт», поле телефону та одна жовта кнопка для отримання коду." },
      { src: "/medis/Phonemapmedis.webp", title: "Карта (мобільна)", description: "Вибір відділення на телефоні: кнопка фільтрів, список міст, пошук вулиці, перемикач «карта / список» і карта з мітками." },
      { src: "/medis/Phonecontactformmedis.webp", title: "Контактна форма (мобільна)", description: "Коротка форма на бірюзовому тлі: імʼя, телефон, питання, згода на обробку даних і одна кнопка; унизу закріплена смуга виїзного забору." },
      { src: "/medis/Phonefootermedis.webp", title: "Футер (мобільна)", description: "Логотип, короткий опис компанії, телефон, іконки соцмереж, дві кнопки-контури та меню послуг на темно-бірюзовому тлі." },
    ],
    liveUrl: "https://medis.com.ua/",
  },

  "vespera-funeral-home": {
    tagline: "Багатомовний сайт похоронного бюро: дизайн у Figma, збірка у Framer",
    overview:
      "Vespera — похоронне бюро з великим обсягом інформації: багато послуг, країн і сторінок. Завданням було з нуля зробити якісний сайт, у якому легко орієнтуватися. Я спроєктував дизайн у Figma, зібрав сайт у Framer, підключив CMS і зробив дві мовні версії.",
    challenge:
      "Багато послуг, країн і сторінок мали жити в одній структурі, а людина, яка шукає допомогу в складний момент, повинна швидко знайти потрібне.",
    solution:
      "Спочатку продумав структуру контенту, потім намалював дизайн у Figma й переніс його у Framer. CMS дозволяє керувати послугами й сторінками без розробника, а сайт адаптований під всі екрани та доступний двома мовами.",
    metrics: [
      { value: "2 мови", label: "Повна локалізація сайту" },
      { value: "CMS", label: "Контент оновлюється без розробника" },
    ],
    process: [
      { title: "Структура контенту", description: "Розклав послуги, країни й сторінки в чітку структуру сайту." },
      { title: "Дизайн у Figma", description: "Спроєктував сторінки та візуальну систему." },
      { title: "Збірка у Framer", description: "Переніс дизайн у Framer, зібрав сторінки та підключив CMS." },
      { title: "Адаптив і мови", description: "Налаштував адаптив під всі екрани та зробив дві мовні версії." },
    ],
    role: ["UX/UI-дизайн", "Структура сайту", "Розробка у Framer", "CMS", "Адаптив", "Дві мови"],
    technologies: ["Figma", "Framer"],
    images: [
      { src: "/vespera/Desktopmainvespera.webp", title: "Головний екран", description: "Перший екран із головним меседжем, трьома короткими рядками про послуги, кнопкою «Дізнатися ціну» та фото, під верхньою панеллю з телефонами, перемикачем мови та меню." },
      { src: "/vespera/Desktopcountriesvespera.webp", title: "Країни", description: "Сітка найпоширеніших напрямків репатріації з прапорами та кнопкою «Усі доступні країни», а далі початок сторінки репатріації." },
      { src: "/vespera/Desktoprepatriationvespera.webp", title: "Репатріація", description: "Сторінка послуги: коротка обіцянка, ряд із чотирьох фото та покрокове пояснення, як відбувається процес." },
      { src: "/vespera/Desktopfaqvespera.webp", title: "FAQ", description: "Сітка країн, де організовують кремацію, а під нею список поширених запитань у вигляді акордеона з тонкими лініями." },
      { src: "/vespera/Desktopcontactfootervespera.webp", title: "Контакти та футер", description: "Форма консультації (ПІБ, телефон, одна кнопка) поруч із портретом, а далі темний футер із навігацією та телефонами." },
      { src: "/vespera/Phonemain.webp", title: "Головний екран (мобільна)", description: "Логотип і меню зверху, фото, три рядки про послуги та кнопка заклику до дії, а збоку — плаваючі кнопки телефону, Telegram і WhatsApp." },
      { src: "/vespera/PhoneFAQvespera.webp", title: "FAQ (мобільна)", description: "Питання в одну колонку з великими плюсами, які легко натиснути, та тонкими розділювачами." },
      { src: "/vespera/Phonecontactsvespera.webp", title: "Контакти (мобільна)", description: "Блок контактів із питанням у заголовку, коротким поясненням і номером телефону з прапором, далі починається заголовок FAQ." },
      { src: "/vespera/Phonecontactformvespera.webp", title: "Контактна форма (мобільна)", description: "Форма консультації під портретом: ПІБ, телефон і одна темна кнопка." },
      { src: "/vespera/Phonefooter.webp", title: "Футер (мобільна)", description: "Завершення форми, а далі темний футер із логотипом, двома колонками посилань і контактами." },
    ],
    liveUrl: "https://vesperafuneralhome.framer.website/",
  },
}

// Safety net: buttons/links (live site, source code) are the same in every language.
// If one language has a URL and the other doesn't, copy it so the buttons never disappear
// when the visitor switches between EN and UK.
for (const id of Object.keys(projectDetailsEn)) {
  const en = projectDetailsEn[id]
  const uk = projectDetailsUk[id]
  if (!en || !uk) continue
  for (const key of ["liveUrl", "githubUrl"]) {
    if (en[key] && !uk[key]) uk[key] = en[key]
    if (uk[key] && !en[key]) en[key] = uk[key]
  }
}
