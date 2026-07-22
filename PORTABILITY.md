# Domain Portability and Free Backup Plan

## Goal

Keep the site, catalog exports, legal pages, email templates, and creator contact records independent from any single domain.

## Free setup

1. Keep this website folder in a Git repository.
2. Export admin submissions as JSON daily while still using the free static version.
3. Store legal docs and email templates in the repository.
4. Keep DNS, hosting, analytics, email, and storage accounts documented in a private admin note.
5. Use relative links where possible so the site can move from one domain to another.

## New domain checklist

1. Buy or connect the new domain.
2. Deploy the same repository to the new host.
3. Update analytics domain settings.
4. Update legal contact email if needed.
5. Email creators and subscribers with the new canonical domain.
6. If the old domain is available, add 301 redirects to the new domain.

## What must never live only on the domain

- Creator contact list
- Catalog metadata
- Legal records and permissions
- Email subscriber export
- API keys
- Payment and revenue records
