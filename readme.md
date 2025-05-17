[![javiertinc@cedula](https://javiertinc.github.io/cedula/images/gh-header-dev.png)](https://github.com/JaviertINC/cedula)

¿Estás confundido o cansado de estar creando funciones para validar el RUN/RUT, el número de documento o pasaporte?

**jtCedula** es tu respuesta.

Aquí te presento una librería simple y ligera que te ayudará a validar el RUN/RUT, el número de documento o pasaporte de una manera rápida y eficiente. Con solo unas pocas líneas de código, podrás asegurarte de que los datos ingresados sean válidos y estén en el formato correcto.

> [!NOTE]
> Este proyecto no está afiliado a ninguna entidad gubernamental ni tiene relación con el gobierno de Chile. Es una herramienta independiente creada para facilitar la validación de documentos en aplicaciones web.

[![Documentación](https://javiertinc.github.io/cedula/images/gh-documentacion.png)](https://github.com/JaviertINC/cedula/wiki)

Te invito a revisar la [**documentación**](https://github.com/JaviertINC/cedula/wiki) para comprobar lo fácil que es usarlo. Aquí encontrarás ejemplos de uso, funciones disponibles y mucho más.

> [!IMPORTANT]
> Las validaciones en esta librería son cálculos matemáticos y no están relacionadas con la veracidad de los datos. Por lo tanto, no se garantiza que el RUN/RUT, el número de documento o pasaporte sea real o esté asociado a una persona específica. Esta librería solo valida la estructura y formato de los datos ingresados.

[![Instalación](https://javiertinc.github.io/cedula/images/gh-instalacion.png)](https://github.com/JaviertINC/cedula/wiki)
¡Esto es realmente rápido y sencillo! Solo necesitas un gestor de paquetes como npm, yarn o pnpm. Si ya tienes uno instalado, simplemente ejecuta uno de los siguientes comandos en la raíz de tu proyecto:

```bash
npm install @javiertinc/cedula
```

```bash
yarn add @javiertinc/cedula
```

```bash
pnpm add @javiertinc/cedula
```

> [!TIP]
> Este proyecto está hecho con [Typescript](https://www.typescriptlang.org) e incluye las interfaces y el tipado de las funciones.

¡Y listo! ¡Ya tienes jtCedula instalado y listo para usar!

[![Algunos ejemplos](https://javiertinc.github.io/cedula/images/gh-algunos-ejemplos.png)](https://github.com/JaviertINC/cedula/wiki)

> [!TIP]
> Por si no lo sabías, el RUN (Rol Único Nacional) es un número de identificación único asignado a cada ciudadano chileno. Es utilizado para diversos fines, como la identificación en trámites gubernamentales, bancarios y comerciales. El RUN se compone de un número seguido de un dígito verificador, que puede ser un número o la letra "K".
> Y el RUT (Rol Único Tributario) es un número de identificación fiscal utilizado en Chile para identificar a las personas y empresas en sus obligaciones tributarias. Y es el mismo número que el RUN, pero se utiliza en un contexto diferente.

```typescript
import jtCedula from '@javiertinc/cedula';

// Valida si el RUN es válido
// puedes pasarle el RUN con o sin puntos y guion, pero es importante pasarle el dígito verificador
jtCedula.run.validate('123456789'); //Ejemplo de respuesta: true
jtCedula.run.validate('12345678k'); //Ejemplo de respuesta: false

// Calcula el dígito verificador
jtCedula.run.dv('12345678'); //Ejemplo de respuesta: '9'

// Formatea el RUN con puntos y guion
jtCedula.run.format('12345678-9'); //Ejemplo de respuesta: '12.345.678-9'
jtCedula.run.format('12345678k'); //Ejemplo de respuesta: '12.345.678-k'

// Desformatea el RUN eliminando puntos y guion
jtCedula.run.unformat('12.345.678-9'); //Ejemplo de respuesta: '123456789'

// Tanto format como unformat aceptan un segundo parámetro para forzar la estructura con ceros a la izquierda
jtCedula.run.format('12345678-9', true); //Ejemplo de respuesta: '0.012.345.678-9'
jtCedula.run.unformat('12.345.678-k', true); //Ejemplo de respuesta: '0012345678k'

// Genera RUN aleatorios válidos
jtCedula.run.generate(2); //Ejemplo de respuesta: ['12.345.678-9', '12.345.678-k']
// Puedes generar RUN aleatorios válidos dentro de un rango específico
jtCedula.run.generate(2, {min: 10, max: 19}); //Ejemplo de respuesta: ['10.123.456-7', '15.123.456-k']

// Valida si el número de documento es válido
jtCedula.documentNumber.validate('123456789'); //Ejemplo de respuesta: true
jtCedula.documentNumber.validate('123.456.789'); //Ejemplo de respuesta: true
jtCedula.documentNumber.validate('123.JKL.RRR'); //Ejemplo de respuesta: false
jtCedula.documentNumber.validate('A123456789'); //Ejemplo de respuesta: true
```

![Roadmap](https://javiertinc.github.io/cedula/images/gh-roadmap.png)

| Función | Estado | Observaciones |
| ------- | :------: | ------ |
| Validar RUN/RUT | ✅ |  |
| Obtener dígito verificador | ✅ |  |
| Formatear RUN/RUT | ✅ |  |
| Desformatear RUN/RUT | ✅ |  |
| Generar RUN/RUT aleatorio | ✅ |  |
| Validar número de documento | ✅ |  |
| Validar número de pasaporte | ❌ | Estoy investigando los criterios de validación. |