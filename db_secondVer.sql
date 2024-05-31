CREATE DATABASE IF NOT EXISTS volunteer;
USE volunteer;

-- Drop tables if they exist
DROP TABLE IF EXISTS User_Event;
DROP TABLE IF EXISTS Notification;
DROP TABLE IF EXISTS UpdateTable;
DROP TABLE IF EXISTS Event;
DROP TABLE IF EXISTS User_Branch;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Branch;
DROP TABLE IF EXISTS Role;
DROP TABLE IF EXISTS Type;

-- Create tables
CREATE TABLE Role (
    RoleID INT PRIMARY KEY AUTO_INCREMENT,
    Role_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Branch (
    BranchID INT PRIMARY KEY AUTO_INCREMENT,
    Branch_name VARCHAR(255) NOT NULL,
    Location VARCHAR(255) NOT NULL,
    Description TEXT
);

CREATE TABLE User (
    User_ID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(255) NOT NULL UNIQUE,
    First_name VARCHAR(255) NOT NULL,
    Last_name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Phone_number VARCHAR(15) DEFAULT NULL,
    Password VARCHAR(255) NOT NULL,
    Receive_email BOOLEAN DEFAULT NULL,
    Role_ID INT,
    FOREIGN KEY (Role_ID) REFERENCES Role(RoleID) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE User_Branch (
    User_Branch_ID INT PRIMARY KEY AUTO_INCREMENT,
    User_ID INT,
    BranchID INT,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (BranchID) REFERENCES Branch(BranchID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Event (
    EventID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    Date DATE DEFAULT NULL,
    Location VARCHAR(255) DEFAULT NULL,
    Participant INT DEFAULT NULL,
    BranchID INT,
    FOREIGN KEY (BranchID) REFERENCES Branch(BranchID) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE Type (
    TypeID INT PRIMARY KEY AUTO_INCREMENT,
    Type_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Notification (
    NotificationID INT PRIMARY KEY AUTO_INCREMENT,
    Message TEXT NOT NULL,
    Time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Manager INT,
    EventID INT,
    TypeID INT,
    FOREIGN KEY (Manager) REFERENCES User(User_ID) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (EventID) REFERENCES Event(EventID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (TypeID) REFERENCES Type(TypeID) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE User_Event (
    User_Event_ID INT PRIMARY KEY AUTO_INCREMENT,
    User_ID INT,
    EventID INT,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (EventID) REFERENCES Event(EventID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE UpdateTable (
    UpdateID INT PRIMARY KEY AUTO_INCREMENT,
    Time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Message TEXT NOT NULL,
    Manager INT,
    BranchID INT,
    FOREIGN KEY (Manager) REFERENCES User(User_ID) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (BranchID) REFERENCES Branch(BranchID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert sample data
INSERT INTO Role (Role_name) VALUES ('Admin'), ('Manager'), ('User');

INSERT INTO Branch (Branch_name, Location, Description) VALUES
('Central', 'Downtown', 'Central branch'),
('West', 'Westside', 'Western branch'),
('East', 'Eastside', 'Eastern branch');

INSERT INTO User (Username, First_name, Last_name, Email, Phone_number, Password, Receive_email, Role_ID) VALUES
('john_doe', 'John', 'Doe', 'john.doe@example.com', '123-456-7890', 'password123', TRUE, 1),
('jane_smith', 'Jane', 'Smith', 'jane.smith@example.com', '234-567-8901', 'password456', TRUE, 2),
('bob_brown', 'Bob', 'Brown', 'bob.brown@example.com', '345-678-9012', 'password789', FALSE, 3);

-- Insert sample data into User_Branch (many-to-many relationship)
INSERT INTO User_Branch (User_ID, BranchID) VALUES
(1, 1),
(1, 2),
(2, 2),
(3, 3),
(3, 1);

INSERT INTO Event (Name, Description, Date, Location, Participant, BranchID) VALUES
('Annual Meeting', 'Annual corporate meeting', '2024-06-15', 'Main Hall', 100, 1),
('Team Building', 'Outdoor team building activities', '2024-07-20', 'Park', 50, 2),
('Product Launch', 'Launch of the new product line', '2024-08-25', 'Conference Room', 200, 3);

INSERT INTO Type (Type_name) VALUES ('General'), ('Reminder'), ('Alert');

INSERT INTO Notification (Message, Time_stamp, Manager, EventID, TypeID) VALUES
('Meeting scheduled', NOW(), 1, 1, 1),
('Team building event reminder', NOW(), 2, 2, 2),
('Product launch alert', NOW(), 3, 3, 3);

INSERT INTO User_Event (User_ID, EventID) VALUES
(1, 1),
(2, 2),
(3, 3);

INSERT INTO UpdateTable (Time_stamp, Message, Manager, BranchID) VALUES
(NOW(), 'System update', 1, 1),
(NOW(), 'Policy change', 2, 2),
(NOW(), 'New branch opening', 3, 3);
