CREATE TABLE task(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) UNIQUE NOT NULL,
  description TEXT
);

/* le agrego una nueva columna a task, ya que ya esta creada seria lo mismo que al momento de crearla le agrege "user_id INTEGER REFERENCES users(id)" */
ALTER TABLE task ADD COLUMN user_id INTEGER REFERENCES users(id);



CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- añadimos una nueva columna para la fotito que la traeremos de gravatar
ALTER TABLE users ADD COLUMN gravatar VARCHAR(255);