CREATE TABLE task(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) UNIQUE NOT NULL,
  description TEXT
);

/* le agrego una nueva columna a task, ya que ya esta creada seria lo mismo que al momento de crearla le agrege "user_id INTEGER REFERENCES users(id)" */
ALTER TABLE task ADD COLUMN user_id INTEGER REFERENCES users(id);


/* el titulo no debe ser unico, le quitamos el UNIQUE
ya que al crear otra tarea con un nuevo usuario y si el titulo es igual a al titulo de una tarea de otro usuario no me dejara crearla, manualmente corroboraremos que el titulo es unico para dicho usuario */
ALTER TABLE task DROP CONSTRAINT task_title_key;



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