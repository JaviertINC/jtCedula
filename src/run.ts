const run = {
    validate(run: string): boolean {
        run = this.unformat(run);
        if (run.length < 2) return false;
        return this.dv(run.slice(0, run.length - 1)) === run.slice(-1).toLowerCase();
    },

    dv(runBody: string): string {
        let runDigits = runBody.replace(/\./g, '').split('').reverse();
        let sum = 0;
        let mul = 2;
        for (let i = 0; i < runDigits.length; i++) {
            sum += parseInt(runDigits[i]) * mul;
            if (mul === 7) {
                mul = 2;
            } else {
                mul++;
            }
        }
        let res = sum % 11;
        if (res === 1) {
            return 'k';
        } else if (res === 0) {
            return '0';
        } else {
            return (11 - res).toString();
        }
    },

    format(run: string, zero: boolean = false): string {
        run = this.unformat(run);
        let runBody = run.slice(0, run.length - 1);
        runBody = zero ? runBody.padStart(10, '0') : runBody;
        let runDv = run.slice(-1);
        let formattedrun = '';
        for (let i = 0; i < runBody.length; i++) {
            if (i > 0 && (i % 3 === 0)) formattedrun += '.';
            formattedrun += runBody[runBody.length - 1 - i];
        }
        formattedrun = formattedrun.split('').reverse().join('');
        return (formattedrun + '-' + runDv).toLowerCase();
    },

    unformat(run: string, zero: boolean = false): string {
        return (zero ? run.replace(/\./g, '').replace(/-/g, '').padStart(11, '0') : run.replace(/\./g, '').replace(/-/g, '')).toLowerCase();
    },

    generate(quantity: number = 1, range: {min: number, max: number} = {min: 1, max: 27}): string[] {
        let results: string[] = [];
        for (let i = 0; i < quantity; i++) {
            let run = '';
            run += Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
            for (let i = 0; i < 6; i++) {
                run += Math.floor(Math.random() * 10);
            }
            run += this.dv(run);
            results.push(this.format(run));
        }
        return results;
    },

    getAge(run: string): {age: number, year: number, month: number} {
        /*
            Basado en el cálculo de edad por RUT de Fabian Villena

            https://github.com/fvillena/rut-a-edad
            https://villena.cl/blog/obtener-la-edad-de-un-individuo-desde-su-rut
            https://fabian.villena.cl/rut-a-edad-fecha-de-nacimiento.html
  
        */
        // Se limpia el RUN y se le quita el dígito verificador
        let cleanRun = Number(this.unformat(run).slice(0, -1));

        // Pendiente de la curva 
        let slope = 3.3363697569700348e-06;

        // Intercepto de la curva
        let intercept = 1932.2573852507373;

        // Se obtiene el año de nacimiento
        let year = Math.floor(cleanRun * slope + intercept);

        // Se obtiene el mes de nacimiento
        let month = Math.ceil((cleanRun * slope + intercept - year) * 12);
        // Se corrige el mes si es 0
        if (month === 0) {
            month = 12;
            year--;
        }

        // !!! No hay suficente exactitud para obtener el día de nacimiento
        // let day = Math.floor((cleanRun * slope + intercept - year - (month - 1) / 12) * 365.25);

        // Se obtiene la edad
        let today = new Date();
        let todayYear = today.getFullYear();
        let todayMonth = today.getMonth() + 1; // Los meses empiezan desde 0
        let age = todayYear - year;
        if (todayMonth < month || (todayMonth === month)) {
            age--;
        }

        return { age, year, month };
    }
}

export default run;