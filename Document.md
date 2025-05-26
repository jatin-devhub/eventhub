# Database
For in memory database chose better-sqlite3 as it is faster

# Back-End

## Routes
### Get /api/events
- **Query Params**
  - title
  - location
  - date
  - dateBefore
  - dateAfter
  - page (default 1)
  - limit (default 10)
- It gets all the events paginated, filtered and ordered by date

### Get /api/events/[id]
- It gets event details

### Post /api/events/register
- Helps create event just pass name and email in the body

### Get /api/admin/popular
- It gets top 10 most popular events
- It requires a security header x-admin-secret

### Get /api/admin/daily
- It gets registered users of each day in past 30 days
- It requires a security header x-admin-secret

# Front-End

## Components
- Header - For entire header of application, currently just has name
- Modal - For using modals of the application

## Pages
- /events - for listing and filtering all events and option to register for it
- /events/id - for showing details of an event and registring for it. Kept it simple
- /admin/analytics - for showing daily registrations and top registered events (secured using very basic security)
- /admin/login - simple login security for admin page

Didn't added env file in gitignore due to simplicity