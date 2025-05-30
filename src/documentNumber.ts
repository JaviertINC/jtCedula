const documentNumber = {
    /**
     * Desformatea el número de documento. 
     * @param serial - Número de documento a desformatear. Puntos son opcionales.
     * @returns - El número de documento desformateado, en mayúsculas y sin puntos.
     **/
    unformat(serial: string): string {
        return serial.replace(/\./g, '').replace(/-/g, '').toUpperCase();
    },

    /**
     * Formatea el número de documento. 
     * @param serial - Número de documento a formatear. Debe incluir el dígito verificador.
     * @returns - El número de documento formateado, con puntos y en mayúsculas.
     **/
    format(serial: string): string {
        serial = this.unformat(serial);
        if (serial.length === 10) {
            return serial.slice(0, 1) + serial.slice(1, 4) + '.' + serial.slice(4, 7) + '.' + serial.slice(7, 10);
        } else if (serial.length === 9) {
            return serial.slice(0, 3) + '.' + serial.slice(3, 6) + '.' + serial.slice(6, 9);
        } else {
            return 'Serial no válido';
        }
    },

    /**
     * Valida el número de documento. 
     * @param serial - Número de documento a validar. Puede incluir puntos y guiones.
     * @returns - true si es válido, false si no.
     **/
    validate(serial: string): boolean {
        serial = this.unformat(serial);
        if (serial.length === 10) {
            return /^[AB]{1}[0-9]{9}$/.test(serial);
        } else if (serial.length === 9) {
            return /^[0-9ABCDEF]{3}[0-9]{6}$/.test(serial);
        } else {
            return false;
        }
    },

    /**
     * Genera un número de documento aleatorio. 
     * @param quantity - Cantidad de números a generar. Por defecto es 1.
     * @param options - Opciones para la generación:
     *   - onlyOld: Genera solo números antiguos (A o B + 9 dígitos).
     *   - onlyNew: Genera solo números nuevos (3 caracteres alfanuméricos + 6 dígitos).
     * @returns - Un array con los números de documento generados.
     **/
    generate(quantity: number = 1, options: { onlyOld?: boolean, onlyNew?: boolean } = { onlyOld: false, onlyNew: false }): string[] {
        let results: string[] = [];
        for (let i = 0; i < quantity; i++) {
            let serial = '';
            if (options?.onlyOld) {
                serial += Math.random() < 0.5 ? 'A' : 'B';
                for (let i = 0; i < 9; i++) {
                    serial += Math.floor(Math.random() * 10);
                }
            } else if (options?.onlyNew) {
                for (let i = 0; i < 3; i++) {
                    serial += (Math.random() < 0.5) ? String.fromCharCode(Math.floor(Math.random() * 6) + 65) : Math.floor(Math.random() * 10);
                }
                for (let i = 0; i < 6; i++) {
                    serial += Math.floor(Math.random() * 10);
                }
            } else {
                if (Math.random() < 0.5) {
                    serial += Math.random() < 0.5 ? 'A' : 'B';
                    for (let i = 0; i < 9; i++) {
                        serial += Math.floor(Math.random() * 10);
                    }
                } else {
                    for (let i = 0; i < 3; i++) {
                        serial += (Math.random() < 0.5) ? String.fromCharCode(Math.floor(Math.random() * 6) + 65) : Math.floor(Math.random() * 10);
                    }
                    for (let i = 0; i < 6; i++) {
                        serial += Math.floor(Math.random() * 10);
                    }
                }
            }
            results.push(this.format(serial));
        }
        return results;
    }
}

export default documentNumber;