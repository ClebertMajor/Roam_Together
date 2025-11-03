# Roam_Together

Roam_Together is a simple static website that helps users find and connect with travel companions. This repository contains the site HTML, CSS, JavaScript, and assets required to run the site locally and develop on it.

## Quick preview (open locally)

use VS Code's Live Server extension 
```
## File overview

- `index.html` — Home / landing page. The main entry point.
- `login.html` — Page for users to log in or create an account.
- `profile.html` — User profile page (shows user info, trips, matches).
- `about.html` — Information about the service and how it works.
- `style.css` and `css/style.css` — Project styles. (There are two style files; the top-level `style.css` is currently used by some pages.)
- `js/main.js` — Client-side JavaScript used by the site.
- `images/` — Image assets used throughout the site.

## Navigation & how to use the site

- Landing (`index.html`): primary call-to-action button (Get Started) takes users to `login.html`.
- Login (`login.html`): allows users to sign in or create a new account. On success the site should navigate to `profile.html` (note: if authentication is only simulated in client-side code, the page will still navigate locally).
- Profile (`profile.html`): view and edit your profile
- About (`about.html`): learn more about Roam_Together and its purpose.

