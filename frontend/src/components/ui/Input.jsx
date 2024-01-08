// este componente lo uso ya que sino react-hook-form no puede acceder aca
import { forwardRef } from 'react'

export const Input = forwardRef((props, ref) => {
  return (
    <input
      type='text'
      className='bg-zinc-800 px-3 py-2 block my-2 w-full'
      ref={ref}
      {...props}
    />
  )
})

/* 
El error "Component definition is missing display name" (La definición del componente no tiene nombre de visualización) suele ocurrir cuando estás utilizando la extensión de React DevTools y tu componente no tiene un nombre de visualización. El nombre de visualización es una propiedad opcional que se puede agregar a un componente de React para facilitar la identificación en las herramientas de desarrollo.

En tu caso, el componente que estás exportando es anónimo porque no tiene un nombre específico. Puedes agregar un nombre de visualización utilizando la propiedad displayName de la siguiente manera:

jsx
Copy code
import { forwardRef } from 'react';

export const Input = forwardRef(function InputComponent(props, ref) {
  return (
    <input
      type='text'
      className='bg-zinc-800 px-3 py-2 block my-2 w-full'
      ref={ref}
      {...props}
    />
  );
});

// Agregar el nombre de visualización
Input.displayName = 'Input';
En este ejemplo, he dado al componente la función anónima que actúa como nombre de visualización. También puedes asignar el nombre directamente a la función del componente:

jsx
Copy code
import { forwardRef } from 'react';

const Input = forwardRef(function InputComponent(props, ref) {
  return (
    <input
      type='text'
      className='bg-zinc-800 px-3 py-2 block my-2 w-full'
      ref={ref}
      {...props}
    />
  );
});

// Agregar el nombre de visualización
Input.displayName = 'Input';

export { Input };
Añadir un nombre de visualización no afecta el comportamiento del componente, pero puede ser útil para identificar más fácilmente el componente en las herramientas de desarrollo de React.
*/
