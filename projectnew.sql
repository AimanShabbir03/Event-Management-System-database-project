create database EventtManagementSystem;
use EventtManagementSystem
go
-- Table: User
CREATE TABLE Userr (
    user_id INT PRIMARY KEY,
    username NVARCHAR(100) NOT NULL,
    email NVARCHAR(255) NOT NULL,
    password NVARCHAR(255) NOT NULL,
    role NVARCHAR(50) NOT NULL
);
INSERT INTO Userr (user_id, username, email, password, role)
VALUES 
(1, 'AhmedAli', 'ahmed.ali@pakistan.com', 'pass123', 'admin'),
(2, 'FatimaKhan', 'fatima.khan@pakistan.com', 'secure123', 'planner'),
(3, 'BilalSheikh', 'bilal.sheikh@pakistan.com', 'pakpass', 'user');
select * from Userr
drop table userr
delete from Userr where username='AhmedAli'
SELECT * FROM Userr 

select * from userr where user_id = '1';
-- Table: Event
CREATE TABLE Event(
    event_id INT PRIMARY KEY,
    event_name NVARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    location NVARCHAR(255) NOT NULL,
    organizer_id INT NOT NULL
    FOREIGN KEY (organizer_id) REFERENCES Userr(user_id)
);
INSERT INTO Event (event_id, event_name, date, location, organizer_id)
VALUES 
(1, 'Eid Festival', '2024-04-15', 'Karachi Expo Center', 1),
(2, 'Tech Meetup', '2024-05-10', 'Lahore IT Park', 2),
(3, 'Book Fair', '2024-06-20', 'Islamabad Convention Center', 3);
select * from event
drop table event
-- Table: Attendee
CREATE TABLE Attendee (
    attendee_id INT PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    email NVARCHAR(255) NOT NULL,
    phone NVARCHAR(15) NOT NULL,
    event_id INT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES Event(event_id)
);
INSERT INTO Attendee (attendee_id, name, email, phone, event_id)
VALUES 
(1, 'Ali Hassan', 'ali.hassan@pakistan.com', '03001234567', 1),
(2, 'Sara Ahmed', 'sara.ahmed@pakistan.com', '03219876543', 2),
(3, 'Zainab Noor', 'zainab.noor@pakistan.com', '03324567890', 3);
select * from Attendee
drop table Attendee
-- Table: Vendor
CREATE TABLE Vendor (
    vendor_id INT PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    service_type NVARCHAR(100) NOT NULL,
    contact NVARCHAR(100) NOT NULL,
    email NVARCHAR(255) NOT NULL
);
INSERT INTO Vendor (vendor_id, name, service_type, contact, email)
VALUES 
(1, 'PakCatering', 'Catering', 'Muhammad Rizwan', 'catering@pakcatering.com'),
(2, 'DecorPak', 'Decoration', 'Sadia Malik', 'decor@decorpak.com'),
(3, 'PakTechServices', 'Tech Support', 'Umar Farooq', 'tech@paktech.com');
select * from vendor
-- Table: EventVendor
CREATE TABLE EventVendor (
    event_vendor_id INT PRIMARY KEY,
    event_id INT NOT NULL,
    vendor_id INT NOT NULL,
    service_cost DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (event_id) REFERENCES Event(event_id),
    FOREIGN KEY (vendor_id) REFERENCES Vendor(vendor_id)
);
-- Insert into EventVendor
INSERT INTO EventVendor (event_vendor_id, event_id, vendor_id, service_cost)
VALUES 
(1, 1, 1, 50000),
(2, 2, 2, 30000),
(3, 3, 3, 20000);
select * from eventvendor
drop table EventVendor
-- Table: Task
CREATE TABLE Task (
    task_id INT PRIMARY KEY,
    task_name NVARCHAR(100) NOT NULL,
    status NVARCHAR(50) NOT NULL,
    due_date DATE NOT NULL,
    event_id INT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES Event(event_id)
);
INSERT INTO Task (task_id, task_name, status, due_date, event_id)
VALUES 
(1, 'Set up Stage', 'Pending', '2024-04-10', 1),
(2, 'Distribute Invitations', 'Completed', '2024-05-01', 2),
(3, 'Arrange Books', 'Pending', '2024-06-15', 3);
select * from task
drop table task
-- Table: Budget
CREATE TABLE Budget (
    budget_id INT PRIMARY KEY,
    event_id INT NOT NULL,
    total_budget DECIMAL(10, 2) NOT NULL,
    spent DECIMAL(10, 2) NOT NULL,
    remaining DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (event_id) REFERENCES Event(event_id)
);
INSERT INTO Budget (budget_id, event_id, total_budget, spent, remaining)
VALUES 
(1, 1, 100000, 50000, 50000),
(2, 2, 80000, 30000, 50000),
(3, 3, 60000, 20000, 40000);
select * from budget
drop table budget
-- Table: Resource
CREATE TABLE Resource (
    resource_id INT PRIMARY KEY,
    resource_name NVARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    cost_per_unit DECIMAL(10, 2) NOT NULL,
    event_id INT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES Event(event_id)
);
INSERT INTO Resource (resource_id, resource_name, quantity, cost_per_unit, event_id)
VALUES 
(1, 'Chairs', 100, 500, 1),
(2, 'Projectors', 5, 10000, 2),
(3, 'Bookshelves', 10, 2000, 3);
select * from resource
drop table resource
-- Table: Payment
CREATE TABLE Payment (
    payment_id INT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    vendor_id INT NOT NULL,
    event_id INT NOT NULL,
    FOREIGN KEY (vendor_id) REFERENCES Vendor(vendor_id),
    FOREIGN KEY (event_id) REFERENCES Event(event_id)
);

INSERT INTO Payment (payment_id, amount, date, vendor_id, event_id)
VALUES 
(1, 50000, '2024-04-05', 1, 1),
(2, 30000, '2024-05-02', 2, 2),
(3, 20000, '2024-06-18', 3, 3);
select * from payment
drop table payment
-- Table: Feedback
CREATE TABLE Feedback (
    feedback_id INT PRIMARY KEY,
    event_id INT NOT NULL,
    attendee_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comments NVARCHAR(MAX),
    FOREIGN KEY (event_id) REFERENCES Event(event_id),
    FOREIGN KEY (attendee_id) REFERENCES Attendee(attendee_id)
);

INSERT INTO Feedback (feedback_id, event_id, attendee_id, rating, comments)
VALUES 
(1, 1, 1, 5, 'Amazing event, well-organized!'),
(2, 2, 2, 4, 'Great tech talks, but seating was limited.'),
(3, 3, 3, 5, 'Excellent book collection!');
select * from feedback
drop table Feedback
-- Table: Sponsor
CREATE TABLE Sponsor (
    sponsor_id INT PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    email NVARCHAR(255) NOT NULL,
    phone NVARCHAR(15) NOT NULL,
    event_id INT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES Event(event_id)
);
INSERT INTO Sponsor (sponsor_id, name, email, phone, event_id)
VALUES 
(1, 'HBL Bank', 'sponsor@hbl.com', '03451234567', 1),
(2, 'PTCL', 'sponsor@ptcl.com', '03119876543', 2),
(3, 'UBL Bank', 'sponsor@ubl.com', '03224567890', 3);
select * from sponsor
drop table sponsor
-- Table: Media
CREATE TABLE Media (
    media_id INT PRIMARY KEY,
    media_type NVARCHAR(50) NOT NULL,
    path NVARCHAR(255) NOT NULL,
    event_id INT NOT NULL,
    uploaded_by INT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES Event(event_id),
    FOREIGN KEY (uploaded_by) REFERENCES Userr(user_id)
);
INSERT INTO Media (media_id, media_type, path, event_id, uploaded_by)
VALUES 
(1, 'Photo', '/media/eid_festival.jpg', 1, 1),
(2, 'Video', '/media/tech_meetup.mp4', 2, 2),
(3, 'Photo', '/media/book_fair.jpg', 3, 3);
select * from media
drop table media
-- Table: Invitation
CREATE TABLE Invitation (
    invitation_id INT PRIMARY KEY,
    event_id INT NOT NULL,
    attendee_id INT NOT NULL,
    status NVARCHAR(50) NOT NULL,
    FOREIGN KEY (event_id) REFERENCES Event(event_id),
    FOREIGN KEY (attendee_id) REFERENCES Attendee(attendee_id)
);
INSERT INTO Invitation (invitation_id, event_id, attendee_id, status)
VALUES 
(1, 1, 1, 'Accepted'),
(2, 2, 2, 'Declined'),
(3, 3, 3, 'Accepted');
select * from invitation
drop table invitation
-- Table: EventType
CREATE TABLE EventType (
    type_id INT PRIMARY KEY,
    type_name NVARCHAR(100) NOT NULL,
    description NVARCHAR(MAX)
);

INSERT INTO EventType (type_id, type_name, description)
VALUES 
(1, 'Festival', 'Cultural or traditional festival event.'),
(2, 'Meetup', 'Technology or professional networking event.'),
(3, 'Expo', 'Exhibition or showcase of books or products.');
select * from EventType
-- Table: EventSchedule
CREATE TABLE EventSchedule (
    schedule_id INT PRIMARY KEY,
    event_id INT NOT NULL,
    time_slot NVARCHAR(50) NOT NULL,
    activity NVARCHAR(MAX) NOT NULL,
    location NVARCHAR(255) NOT NULL,
    FOREIGN KEY (event_id) REFERENCES Event(event_id)
);
INSERT INTO EventSchedule (schedule_id, event_id, time_slot, activity, location)
VALUES 
(1, 1, '10:00 AM - 12:00 PM', 'Opening Ceremony', 'Main Hall'),
(2, 2, '02:00 PM - 04:00 PM', 'Keynote Speech', 'Conference Room'),
(3, 3, '01:00 PM - 03:00 PM', 'Book Launch', 'Auditorium');
select * from eventschedule
drop table EventSchedule
-- Table: ContactUs
CREATE TABLE ContactUs (
    contact_id INT PRIMARY KEY,
    user_id INT NOT NULL,
    message NVARCHAR(MAX) NOT NULL,
    response_status NVARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Userr(user_id)
);

INSERT INTO ContactUs (contact_id, user_id, message, response_status)
VALUES 
(1, 1, 'Need more details about the event schedule.', 'Resolved'),
(2, 2, 'Can we increase the budget?', 'Pending'),
(3, 3, 'Requesting additional vendor services.', 'Resolved');
select * from contactus
drop table ContactUs

SELECT e.event_name, a.name AS attendee_name, f.rating, f.comments
FROM Event e
JOIN Attendee a ON e.event_id = a.event_id
JOIN Feedback f ON e.event_id = f.event_id AND a.attendee_id = f.attendee_id;

SELECT e.event_name, v.name AS vendor_name, ev.service_cost
FROM Event e
JOIN EventVendor ev ON e.event_id = ev.event_id
JOIN Vendor v ON ev.vendor_id = v.vendor_id;

SELECT e.event_name, u.username AS organizer, b.total_budget, b.spent, b.remaining
FROM Event e
JOIN Userr u ON e.organizer_id = u.user_id
JOIN Budget b ON e.event_id = b.event_id;

SELECT event_name
FROM Event
WHERE event_id IN (
    SELECT event_id
    FROM Budget
    WHERE total_budget > spent
);

SELECT name
FROM Attendee
WHERE attendee_id IN (
    SELECT attendee_id
    FROM Feedback
    WHERE rating = 5 AND event_id IN (
        SELECT event_id
        FROM Event
        WHERE location = 'Lahore'
    )
);

SELECT event_name
FROM Event
WHERE event_id IN (
    SELECT event_id
    FROM EventVendor
    WHERE service_cost > 40000
);

SELECT e.event_name, COUNT(a.attendee_id) AS total_attendees
FROM Event e
LEFT JOIN Attendee a ON e.event_id = a.event_id
GROUP BY e.event_name;

SELECT e.event_name, AVG(f.rating) AS average_rating
FROM Event e
LEFT JOIN Feedback f ON e.event_id = f.event_id
GROUP BY e.event_name;

SELECT v.name AS vendor_name, SUM(p.amount) AS total_paid
FROM Vendor v
JOIN Payment p ON v.vendor_id = p.vendor_id
GROUP BY v.name;

