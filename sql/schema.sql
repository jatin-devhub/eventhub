CREATE TABLE events (
  id INT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(100),
  date DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE registrations (
  id INT PRIMARY KEY,
  event_id INT,
  name VARCHAR(100),
  email VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id)
);

create index idx_events_title on events(title);
create index idx_events_location on events(location);
create index idx_events_date on events(date);

-- Sample event data
INSERT INTO events (id, title, description, location, date) VALUES
(1, 'Tech Meetup', 'Discuss latest in tech', 'Noida', '2025-06-10 18:00:00'),
(2, 'Webinar on AI', 'Online session on AI trends', 'Online', '2025-06-12 20:00:00'),
(3, 'React Workshop', 'Hands-on React training', 'Delhi', '2025-06-15 10:00:00'),
(4, 'Mysql for Beginners', 'Join us for an introductory session on MySQL, one of the most popular relational database systems in the world. This beginner-friendly event is perfect for students, aspiring developers, and tech enthusiasts looking to understand the fundamentals of SQL and relational databases.', 'Pune', '2025-06-18 10:00:00');
