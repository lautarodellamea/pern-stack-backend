// en los schemas de nuestra base de datos definimos que esperamos en nuestra base de datos
// usaremos la biblioteca que instalamos "zod" es de typescript pero podemos usarla en js

import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z
    .string({
      required_error: 'El titulo es requerido',
      invalid_type_error: 'El titulo debe ser un texto',
    })
    .min(1)
    .max(255),
  description: z
    .string({
      required_error: 'La descripcion es requerida',
      invalid_type_error: 'La descripcion debe ser un texto',
    })
    .min(1)
    .max(255)
    .optional(),
})

export const updateTaskSchema = z.object({
  title: z
    .string({
      required_error: 'El titulo es requerido',
      invalid_type_error: 'El titulo debe ser un texto',
    })
    .min(1)
    .max(255)
    .optional(),
  description: z
    .string({
      required_error: 'La descripcion es requerida',
      invalid_type_error: 'La descripcion debe ser un texto',
    })
    .min(1)
    .max(255)
    .optional(),
})
