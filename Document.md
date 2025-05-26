# Database
For in memory database chose better-sqlite3 as it is faster

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