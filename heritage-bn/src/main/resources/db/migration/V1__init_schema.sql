-- Create roles table
CREATE TABLE roles (
                       id BIGSERIAL PRIMARY KEY,
                       name VARCHAR(20) NOT NULL UNIQUE,
                       description VARCHAR(100)
);

-- Create users table
CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,
                       username VARCHAR(50) NOT NULL UNIQUE,
                       email VARCHAR(100) NOT NULL UNIQUE,
                       password VARCHAR(120) NOT NULL,
                       first_name VARCHAR(50),
                       last_name VARCHAR(50),
                       active BOOLEAN NOT NULL DEFAULT TRUE,
                       email_verified BOOLEAN NOT NULL DEFAULT FALSE,
                       auth_provider VARCHAR(20) NOT NULL DEFAULT 'LOCAL',
                       provider_id VARCHAR(100),
                       created_by VARCHAR(50),
                       created_date TIMESTAMP,
                       last_modified_by VARCHAR(50),
                       last_modified_date TIMESTAMP
);

-- Create the join table for users and roles
CREATE TABLE user_roles (
                            user_id BIGINT NOT NULL,
                            role_id BIGINT NOT NULL,
                            PRIMARY KEY (user_id, role_id),
                            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                            FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Create indexes
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_provider ON users(auth_provider, provider_id);

-- Insert default roles
INSERT INTO roles (name, description) VALUES
                                          ('ROLE_USER', 'Standard user role'),
                                          ('ROLE_MANAGER', 'Manager with additional privileges'),
                                          ('ROLE_ADMIN', 'Administrator with full access');

-- Insert a default admin user (password: admin123)
INSERT INTO users (
    username,
    email,
    password,
    first_name,
    last_name,
    active,
    email_verified,
    auth_provider,
    created_by,
    created_date
) VALUES (
             'admin',
             'admin@heritage.com',
             '$2a$10$lfEYHkm0C/wv9N88KcW9gOMnCZlOQVEjAX5w5H36hdBqy7MvjkHGa',
             'System',
             'Administrator',
             TRUE,
             TRUE,
             'LOCAL',
             'system',
             CURRENT_TIMESTAMP
         );

-- Assign admin role to default admin user
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u, roles r
WHERE u.username = 'admin' AND r.name = 'ROLE_ADMIN';

-- Assign manager role to default admin user
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u, roles r
WHERE u.username = 'admin' AND r.name = 'ROLE_MANAGER';

-- Assign user role to default admin user
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u, roles r
WHERE u.username = 'admin' AND r.name = 'ROLE_USER';
