// creamos este middleware para no tener que ir validadno en cada archivo

export const validateSchema = (schema) => async (req, res, next) => {
  // esto hariamos en cada archivo pero justamente este middleware nos ahorra esto que lo repetiriamos varias veces
  // createTaskSchema.parse({ title: 'hello', description: null })

  try {
    await schema.parse(req.body)
    // zod, si sale todo bien sigue y sino tira un trhow
    next()
  } catch (error) {
    console.log(error.errors)
    if (Array.isArray(error.errors)) {
      return res.status(400).json(error.errors.map((error) => error.message))
    }

    return res.status(400).json(error.message)
  }
}
