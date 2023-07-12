export interface Filterable<S> {
    isFilteredBy: (element: S) => boolean;
    toString: () => string;
}

export class School implements Filterable<School> {

    constructor(public name: string, public venue?: string) {}

    isFilteredBy(element: School): boolean {
        return this.name === element.name && (element.venue ? this.venue === element.venue : true);
    }

    toString(): string {
        return `${this.name}-${this.venue}`;
    }
}

export class Participant implements Filterable<Participant> {

    constructor(public name: string, public surname: string) {}

    isFilteredBy(element: Participant): boolean {
        return this.name === element.name && this.surname === element.surname;
    }

    toString(): string {
        return `${this.name} ${this.surname}`;
    }
}

export type Filterables = string | number | boolean | Filterable<any>;
