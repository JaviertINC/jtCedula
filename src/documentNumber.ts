const documentNumber = {
    unformat(serial: string): string {
        return serial.replace(/\./g, '').replace(/-/g, '').toUpperCase();
    },

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