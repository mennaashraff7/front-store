/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15),
    user_id bigint, 
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
