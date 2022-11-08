# _The Travel Enablers_ website source code

_The Travel Enablers © 2022, all rights reserved_

## Technologies Used

- Next.js written in Typescript
- Sass
- Contentful CMS
- Stripe Elements (stripe-js, stripe-react-js)
- Hosted on Netlify
- Webhooks between Contentful and Netlify trigger a build when content changes! The site will never be out-of-date.

## Project Requirements

The client wanted The Travel Enablers to primarily be a bespoke travel planning company, but also wanted to host trips for groups and be able to post articles written by them. As such, the following requirements were laid out to me:

- Keep custom trip planning core of site
- Ability to upload trips and articles to site without touching code
- Payment processing (Credit only - no PayPal) for group trips
- Display payment tiers and information about custom trip planning on site, but use Google form for initializing contact (payment occurs off-site)
- Contact form for general inquiries
- Analytics
- Optimal SEO

Considering the requirements of the client, I decided on my approach to development:

- Use Next.js to allow static site generation instead of client side rendering, as well as serverless functions and custom Head elements for each page
- Contentful for content management for an easy-to-use experience with no database hosting required
- Stripe for on-site payment processing, and robust tools on their dashboard
- Netlify for Netlify Forms, a tool that detects static forms and handles submissions to the dashboard, or to an email
- Typescript and Sass were personal choices for a better development experience

## Design Stage

The very first step in materializing this website was collaboration between the client and I on the design. We collaborated on everything from the fonts and the colour scheme to the final design. Throughout I was concious of WCAG guidelines and proper UI/UX. The final mobile-first and logo designs can be found [here](https://www.figma.com/file/lfmJIvKD4RUJF3NXUGO9VJ/The-Travel-Enabler?node-id=0%3A1)*

_*Note that these designs were final prior to development, and some elements changed during the final review of the completed website_

## Caveats

Unfortunately, I found out that Next.js' Image component leads to some performance issues on Netlify. While the issues aren't usually substantial, and lazy-loading allows the rest of the page to load with little-to-no impact, I'm actively looking into potential improvements, especially since images from Contentful will be impacted the most. 

Additionally, the client wanted the ability for payment plans to be made within the website. While Afterpay may have seemed like a clear solution, the nature of the business disqualified that option, and other solutions did not satisfy the client. Finally, we decided on adding options for an initial deposit in addition to the full price of each package, and further payments will be handled manually through the Stripe dashboard via invoices.The client was quite pleased with the solution. However, this approach led to the complication of the payment flow on the site, requiring potential clients to enter their name and email prior to paying. This is because an invoice through the Stripe dashboard requires a customer in the system, and a payment does not automatically create a customer. As such, a customer has to be created prior to the payment intents to ensure desired behaviour. 

Finally, due to the fact that the structure of a trip template is set and unchangeable by the client, strict publishing guidelines were required. This is a necessary evil, and documentation on these publishing guidelines was shared with the client. 

## Areas of Pride

Unlike my [Cosmetic Store](https://github.com/katelyngrimoldby/cosmetic-store) Project, much of my challenges and pride is centered around the programming behind this site. Some examples include: 

- Successfully implementing a complex Stripe workflow. While familarizing myself with Stripe Elements was a challenge, I really put my hacker mindset to the test when I had to revamp the workflow for the new plan around payment plans. While the UX may not be ideal compared to an in-house system, I don't think I could have structured the end result any better way. It's fully scalable for any number of packages, too!
- Integrating Contentful CMS. While I have worked with templating in an API before, I hadn't done so quite on the scale of a CMS before. Additionally, the Contentful Client lacked a lot of essential documentation, so I had to resort to YouTube videos to teach me. Fortunately, they were great videos and I finished the task confident and satisfied with my work. Despite the rigidness of the template, the package count is also fully scalable.
- I'm genuinely proud of this site as a whole. Since the early talks with the client, I've made this project my baby. Working on a professional website from scratch was entirely new to me, and nothing makes me happier knowing the client loves it as much as me. 

## Future Improvements

- Fix slow image loading. Maybe upgrading Next to 13 will do that? Will conduct more research prior to attempting anything
- Add support for embedded images in articles. I know it can be done, but I'm not sure how quite yet and want to find some good resources on implementing it in a performant and responsive manner
- Improve trip payment flow. I'm not sure if I can improve on it at all, but I will look into it. The flow isn't awful as-is but could be improved
